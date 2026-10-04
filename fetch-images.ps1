# ---------------------------------------------------------------------------
# fetch-images.ps1 - "Aaj Kya Khaye?" prototype
#
# Sources real, high-resolution food photographs for every mess listing from
# Wikimedia Commons (free / open licences only) and writes them - plus a
# credits file - into the project folder itself.
#
#   Run:  powershell -ExecutionPolicy Bypass -File fetch-images.ps1
#
# Output (flat, same folder as index.html - no subfolders):
#   veg-NN.jpg      photographs used for pure-veg messes
#   food-NN.jpg     photographs used for messes serving non-veg
#   CREDITS.txt     title / author / licence / source per file
#   sources.csv     same data, machine readable
#
# Images are resized to 1200px wide and saved as JPEG (quality 80) so the
# GitHub repository stays a sensible size while still being HD on screen.
# ---------------------------------------------------------------------------

$ErrorActionPreference = "Stop"
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Add-Type -AssemblyName System.Drawing

$Root   = Split-Path -Parent $MyInvocation.MyCommand.Path
$ImgDir = $Root    # flat layout: everything lives beside index.html

$LogPath = Join-Path $Root "fetch-images.log"   # keep the photo folder clean
if (Test-Path $LogPath) { Remove-Item $LogPath -Force }

function Log([string]$m) {
    $m | Out-File -FilePath $LogPath -Append -Encoding utf8
    Write-Host $m
}

# Wikimedia asks automated clients to identify themselves.
$UA = @{ "User-Agent" = "AajKyaKhayePrototype/1.0 (static prototype image sourcing)" }

$VegQueries = @(
    "Indian vegetarian thali", "Paneer curry", "Dal fry rice", "Masala dosa",
    "Idli sambar", "Chole bhature", "Pav bhaji", "Aloo paratha",
    "Vegetable curry India", "Indian sweets mithai", "Sambar rice", "Poha"
)

$FoodQueries = @(
    "Chicken curry", "Chicken biryani", "Chicken tikka masala", "Egg curry",
    "Tandoori chicken", "Mutton curry", "Fish curry India", "Butter chicken",
    "Chicken masala", "Keema matar", "Prawn curry", "Rogan josh",
    "Chicken korma", "Egg bhurji"
)

$FoodRe = 'food|curry|dish|thali|rice|biryani|roti|naan|dosa|idli|sabzi|paneer|dal\b|chicken|meat|sweets|mithai|cuisine|meal|plate|tiffin|snack|pav\b|bhaji|paratha|bhature|fry|keema|prawn|fish|mutton|egg|korma|bhurji|josh|vegetable|breakfast|lunch|dinner'

$Seen   = @{}
$TargetVeg  = 65    # 57 pure-veg messes + buffer for any download failure
$TargetFood = 95    # 83 non-veg-serving messes + buffer

function Get-Candidates([string[]]$queries) {
    $lists = @()
    foreach ($q in $queries) {
        $url = "https://commons.wikimedia.org/w/api.php?action=query&generator=search" +
               "&gsrsearch=" + [uri]::EscapeDataString($q) +
               "&gsrnamespace=6&gsrlimit=40&prop=imageinfo" +
               "&iiprop=url%7Cmime%7Csize%7Cextmetadata&iiurlwidth=1200&format=json"

        $json = $null
        for ($try = 1; $try -le 4 -and -not $json; $try++) {
            try {
                $resp = Invoke-WebRequest -Uri $url -Headers $UA -UseBasicParsing -TimeoutSec 40
                $json = $resp.Content | ConvertFrom-Json
            } catch {
                Log ("  retry {0}/4 for '{1}': {2}" -f $try, $q, $_.Exception.Message)
                Start-Sleep -Seconds (3 * $try)
            }
        }
        if (-not $json) { Log ("  FAILED query: " + $q); Start-Sleep -Seconds 2; continue }

        $items = @()
        $pages = @()
        if ($json.query -and $json.query.pages) {
            $pages = $json.query.pages.PSObject.Properties | ForEach-Object { $_.Value }
        }
        foreach ($p in $pages) {
            if (-not $p.imageinfo) { continue }
            $ii = $p.imageinfo[0]
            if ($ii.mime -ne "image/jpeg")   { continue }
            if ($ii.width -lt 800)           { continue }
            if ($ii.height -lt 560)          { continue }
            if ($ii.width -lt ($ii.height * 0.85)) { continue }   # skip strong portraits
            if (-not $ii.thumburl)           { continue }
            if ($p.title -notmatch $FoodRe)  { continue }

            $thumb = ($ii.thumburl -split "\?")[0]
            if ($Seen.ContainsKey($thumb))   { continue }
            if (-not $ii.extmetadata)        { continue }

            $em     = $ii.extmetadata
            $artist = ""
            if ($em.Artist) { $artist = ($em.Artist.value -replace "<[^>]+>", "" -replace "\s+", " ").Trim() }
            $lic     = if ($em.LicenseShortName) { $em.LicenseShortName.value } else { "see source page" }
            $licUrl  = if ($em.LicenseUrl)       { $em.LicenseUrl.value }       else { "" }
            $page    = "https://commons.wikimedia.org/wiki/" + [uri]::EscapeDataString($p.title)

            $Seen[$thumb] = $true
            $items += [pscustomobject]@{
                Url   = $thumb
                Title = ($p.title -replace "^File:", "")
                Artist = $artist
                License = $lic
                LicenseUrl = $licUrl
                Page  = $page
                Query = $q
            }
        }
        Log ("  {0,-26} -> {1,2} candidates" -f $q, $items.Count)
        $lists += ,@($items)
        Start-Sleep -Milliseconds 1800     # stay well inside Wikimedia rate limits
    }
    return ,$lists
}

# Round-robin across queries so no single search term dominates the pool.
function Select-Pool($lists, [int]$target) {
    $picked = @()
    $i = 0
    while ($picked.Count -lt $target) {
        $progress = $false
        foreach ($l in $lists) {
            if ($i -lt $l.Count) {
                $picked += $l[$i]
                $progress = $true
                if ($picked.Count -ge $target) { break }
            }
        }
        if (-not $progress) { break }
        $i++
    }
    return ,$picked
}

function Save-Photo($item, [string]$destPath) {
    $tmp = [IO.Path]::GetTempFileName()
    Invoke-WebRequest -Uri $item.Url -OutFile $tmp -Headers $UA -TimeoutSec 90
    $src = [System.Drawing.Image]::FromFile($tmp)
    try {
        $maxW = 1200
        $w = $src.Width
        $h = $src.Height
        if ($w -gt $maxW) { $h = [int]([int]$h * $maxW / $w); $w = $maxW }

        $bmp = New-Object System.Drawing.Bitmap -ArgumentList @($w, $h)
        try {
            $g = [System.Drawing.Graphics]::FromImage($bmp)
            try {
                $g.Clear([System.Drawing.Color]::White)
                $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
                $g.SmoothingMode      = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
                $g.PixelOffsetMode    = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
                $g.DrawImage($src, 0, 0, $w, $h)
            } finally { $g.Dispose() }

            try {
                $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
                         Where-Object { $_.MimeType -eq "image/jpeg" } |
                         Select-Object -First 1
                $ep = New-Object System.Drawing.Imaging.EncoderParameters -ArgumentList 1
                $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter -ArgumentList @(
                                   [System.Drawing.Imaging.Encoder]::Quality, [long]80)
                $bmp.Save($destPath, $codec, $ep)
            } catch {
                $bmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
            }
        } finally { $bmp.Dispose() }
    } finally {
        $src.Dispose()
        Remove-Item $tmp -Force -ErrorAction SilentlyContinue
    }
}

# --------------------------------------------------------------- main ------
Log ("Start: " + (Get-Date -Format "yyyy-MM-dd HH:mm:ss"))

Log "== Veg pool =="
$vegList  = Select-Pool (Get-Candidates $VegQueries)  $TargetVeg
Log ("Veg pool ready: " + $vegList.Count)

Log "== Food pool =="
$foodList = Select-Pool (Get-Candidates $FoodQueries) $TargetFood
Log ("Food pool ready: " + $foodList.Count)

$results = @()
foreach ($prefix in @("veg", "food")) {
    $pool = if ($prefix -eq "veg") { $vegList } else { $foodList }
    $idx = 0
    foreach ($item in $pool) {
        $idx++
        $name = "{0}-{1:D2}.jpg" -f $prefix, $idx
        $dest = Join-Path $ImgDir $name
        if (Test-Path $dest) { $results += [pscustomobject]@{ File = $name; Item = $item; Status = "exists" }; continue }
        $done = $false
        for ($try = 1; $try -le 4 -and -not $done; $try++) {
            try {
                Save-Photo $item $dest
                $done = $true
            } catch {
                Remove-Item $dest -Force -ErrorAction SilentlyContinue   # never leave a partial file
                if ($try -ge 4) {
                    $results += [pscustomobject]@{ File = $name; Item = $item; Status = "FAILED" }
                    Log ("  FAILED {0}: {1}" -f $name, $_.Exception.Message)
                } else {
                    Log ("    429/failure on {0} - retry {1}/4 in {2}s" -f $name, $try, (4 * $try))
                    Start-Sleep -Seconds (4 * $try)
                }
            }
        }
        if ($done) {
            $kb = [int]((Get-Item $dest).Length / 1KB)
            $results += [pscustomobject]@{ File = $name; Item = $item; Status = "ok" }
            Log ("  saved {0,-14} {1,5} KB  {2}" -f $name, $kb, $item.Title.Substring(0, [Math]::Min(46, $item.Title.Length)))
        }
        Start-Sleep -Milliseconds 700
    }
}

# ---------------------------------------------------------------- credits ---
$okFiles  = @($results | Where-Object { $_.Status -ne "FAILED" })
$failFiles = @($results | Where-Object { $_.Status -eq "FAILED" })
Log ("Saved: " + $okFiles.Count + "   Failed: " + $failFiles.Count)

$hdr = @()
$hdr += "PHOTO CREDITS - Aaj Kya Khaye? (prototype)"
$hdr += "============================================================="
$hdr += "Every mess photograph in this folder is a real, high-resolution"
$hdr += "food image sourced from Wikimedia Commons (wikimedia.org), which"
$hdr += "hosts only free/open-licensed content. Images were resized to"
$hdr += "1200px wide and re-encoded as JPEG for this prototype."
$hdr += ""
$hdr += "Generated: " + (Get-Date -Format "yyyy-MM-dd")
$hdr += "Count: " + $okFiles.Count
$hdr += "============================================================="
$hdr += ""

$body = @()
$csv  = @("file,title,author,licence,licence_url,source_page")
foreach ($r in $okFiles) {
    $i = $r.Item
    $body += ("{0}`n    {1}`n    Author : {2}`n    Licence: {3}   {4}`n    Source : {5}`n" -f `
              $r.File, $i.Title, $i.Artist, $i.License, $i.LicenseUrl, $i.Page)
    $csv += ('"{0}","{1}","{2}","{3}","{4}","{5}"' -f `
             $r.File, ($i.Title -replace '"', "'"), ($i.Artist -replace '"', "'"),
             $i.License, $i.LicenseUrl, $i.Page)
}
if ($failFiles.Count -gt 0) {
    $body += ""
    $body += "NOT DOWNLOADED (re-run fetch-images.ps1 to retry):"
    foreach ($r in $failFiles) { $body += "  " + $r.File }
}

($hdr -join "`r`n") + "`r`n" + ($body -join "`r`n") |
    Out-File -FilePath (Join-Path $ImgDir "CREDITS.txt") -Encoding utf8
$csv -join "`r`n" | Out-File -FilePath (Join-Path $ImgDir "sources.csv") -Encoding utf8

Log ("CREDITS.txt + sources.csv written to " + $ImgDir)
Log "DONE"
