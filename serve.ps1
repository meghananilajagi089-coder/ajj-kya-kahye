param([string]$Root = 'C:\Users\User\OneDrive\Documents\Default Project', [int]$Port = 8787)

$types = @{
  'html' = 'text/html; charset=utf-8'
  'css'  = 'text/css; charset=utf-8'
  'js'   = 'application/javascript; charset=utf-8'
  'svg'  = 'image/svg+xml'
  'png'  = 'image/png'
  'jpg'  = 'image/jpeg'
  'jpeg' = 'image/jpeg'
  'ico'  = 'image/x-icon'
  'json' = 'application/json; charset=utf-8'
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Output "Serving $Root on http://localhost:$Port/"

while ($true) {
  $ctx = $listener.GetContext()
  try {
    $rel = [System.Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath.TrimStart('/'))
    if ($rel -eq '') { $rel = 'index.html' }
    $path = Join-Path $Root $rel
    if ((Test-Path $path -PathType Leaf) -and $path.StartsWith($Root, [System.StringComparison]::OrdinalIgnoreCase)) {
      $bytes = [System.IO.File]::ReadAllBytes($path)
      $ext = [System.IO.Path]::GetExtension($path).TrimStart('.').ToLower()
      $mime = if ($types.ContainsKey($ext)) { $types[$ext] } else { 'application/octet-stream' }
      $ctx.Response.StatusCode = 200
      $ctx.Response.ContentType = $mime
      $ctx.Response.ContentLength64 = $bytes.Length
      # HEAD must send the same headers with no body (HttpListener throws otherwise)
      if ($ctx.Request.HttpMethod -ne 'HEAD') {
        $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
      }
    } else {
      $msg = [System.Text.Encoding]::UTF8.GetBytes('Not found')
      $ctx.Response.StatusCode = 404
      $ctx.Response.OutputStream.Write($msg, 0, $msg.Length)
    }
  } catch {
    try { $ctx.Response.StatusCode = 500 } catch {}
  } finally {
    try { $ctx.Response.Close() } catch {}
  }
}
