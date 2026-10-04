# Aaj Kya Khaye? — *Ghar ka Swad*

A polished, interactive **mobile app MVP prototype** for a mess-discovery and
**free** seat-reservation platform built for students, bachelors and people
living away from home.

> Discover → Compare → View menu & price → Check availability → **Reserve for free** → Visit the mess

---

## How to run

No build step, no dependencies.

**Option 1 — just open it**

Double-click `index.html`. It opens in any modern browser as a phone frame on
desktop and goes full-screen on a real phone.

**Option 2 — local server (optional)**

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File "serve.ps1"
# then open http://localhost:8787/
```

---

## Folder structure — completely flat

There are **no subfolders**. Open the project folder and everything is right
there, side by side with `index.html`:

| File(s) | Purpose |
|---------|---------|
| `index.html` | App shell: status bar, screen container, bottom tab bar |
| `styles.css` | Full design system (brand colours, cards, sheets, animations) |
| `data.js` | The 140 mess listings + generated sample attributes + photo map |
| `app.js` | Router, views, filters/sort, reservation flow, sheets |
| `logo.svg` | Official app logo / brand lockup |
| `mark.svg` | Icon-only logo mark (favicon) |
| `veg-NN.jpg` (60 files) | **Photographs for pure-veg messes** — 57 used |
| `food-NN.jpg` (94 files) | **Photographs for messes serving non-veg** — 83 used |
| `CREDITS.txt`, `sources.csv` | Title, author, licence and source page for every photo |
| `README.md` | This file |
| `fetch-images.ps1` | Optional: re-sources and re-sizes the photographs |
| `serve.ps1` | Optional: local HTTP server |

Because everything shares one folder, every reference in the code is a plain
filename (`styles.css`, `app.js`, `veg-12.jpg`) — no `css/`, `js/` or
`assets/` paths anywhere.

### Screens
1. **Home** — logo, tagline, location selector, search, **food tabs
   (All / 🌱 Veg / 🍗 Non-veg / 🙏 Jain)** that drive the suggestions,
   *Nearby Messes*, *Popular Near You*, *Looking for Ghar Ka Khana?*
2. **Explore** — search + **food tabs** + **Filters** (Location, Price,
   Rating, Distance, Open Now, Veg, Monthly Plan) + **Sort**
   (Recommended, Rating, Distance, Price, Name) across all **140 listings**
3. **Mess Details** — image, rating + review count, location, distance,
   status, timings, today's menu, lunch/dinner prices, monthly plan,
   price info, approximate seats, description, *Reserve a Seat*
4. **Free Reservation** — pick Lunch/Dinner, number of seats,
   **Reservation Fee: FREE**, confirm
5. **Confirmation** — ✓ confirmed, mess, meal, seats, reservation time,
   "Please reach the mess soon. Reservations are subject to availability."
6. **My Reservations** — Upcoming (Reserved, cancellable) + Past (Completed,
   Cancelled)
7. **Profile** — name, mobile, **food preference (Veg / Non-veg / Jain)**,
   saved preferences, My Reservations, Help & Support, About, Logout

Bottom navigation: **Home · Explore · My Reservations · Profile**

### Food preference (suggestion engine)
`state.diet` drives Home *and* Explore:

| Tab | Shows |
|-----|-------|
| 🍽️ All | every listing |
| 🌱 Veg | pure-veg messes (57) |
| 🍗 Non-veg | messes that serve non-veg — veg-and-non-veg + the added non-veg list (83) |
| 🙏 Jain | messes flagged with a Jain option (16) |

The same choice is editable from **Profile → Food preference** and stays in
sync across the app.

---

## Data rules (as specified)

- **140 listings** are searchable — the 120 supplied mess listings plus the
  added **non-veg / mixed mess list**. Names, locations and ratings are never
  invented; three listings that appeared in both lists
  (Akash Punjabi Mess (APM), Durga Mess, Gurudatta Mess) were merged instead of
  duplicated, carrying over their review counts and price notes.
- Listings marked **"Not rated" / "—"** display exactly that (**22** listings).
- Review counts (**10**) and price notes such as *"₹550 for two"*
  (**6**) come from the added listing and appear on the detail screen as
  *Price info (listing)*.
- Prices, menus, timings, seat counts, distances, monthly plans and the
  veg / non-veg / Jain flags are **generated prototype sample data**,
  labelled as such in the UI (footnotes, "Sample listing" tag, and a notice
  on every detail page).
- **No reservation fee anywhere.** No booking fee, no countdown timer,
  no "Booking Active", no auto-cancellation — reservations are a simple,
  free intent-to-visit system.

---

## Logo

- `logo.svg` — the official full lockup (house roof + fork, serving
  dome and spoon over the wordmark **AAJ KYA KHAYE?** on cream). Used in the
  Home header and the About sheet.
- `mark.svg` — the icon-only version (roof + fork, dome + spoon),
  used as the app favicon.

Both are referenced by filename only, so replacing either file updates
everywhere automatically.

---

## Mess photographs

Every listing has its **own real, high-resolution food photograph** — a
different image for each mess, no repeats. **154 photographs, ~25 MB**, all
sitting directly in the project folder (no image subfolder).

- **Names:**
  - `veg-NN.jpg` → used by pure-veg messes (60 available, 57 used)
  - `food-NN.jpg` → used by messes that serve non-veg (94 available, 83 used)
  - `CREDITS.txt` / `sources.csv` → title, author, licence and source page
    for every image
- **Source:** [Wikimedia Commons](https://commons.wikimedia.org) — a library
  that hosts **only free / open-licensed content** (CC0, CC BY, CC BY-SA,
  public domain). Images are pulled at 1200px and re-encoded as JPEG
  (quality 80), so they stay crisp in the app without bloating the repo.
- **Matching:** veg-only messes only ever get vegetarian photographs, so a
  photo never contradicts the "Pure Veg" badge. Every mess gets a unique
  file — no two listings share an image.
- **Fallback:** each `<img>` sits on top of the original generated gradient
  thumbnail and removes itself on error — a missing file degrades to the old
  gradient + emoji rather than a broken image.
- **Re-generate / top up:**

  ```powershell
  powershell -NoProfile -ExecutionPolicy Bypass -File "fetch-images.ps1"
  ```

  Existing files are skipped, so re-running only fetches what is missing.
  Six slots are currently empty because Wikimedia rate-limited them
  (HTTP 429); they are listed in `data.js` as `photoPool(...)` gaps —
  re-running after a while will fill them and you can delete them from that
  list. Images are assigned to listings **in order**, so the mapping stays
  stable either way.

> The photographs are real food images used as **prototype imagery**. They are
> *not* photographs of the actual messes, and the mess names, locations and
> ratings still come from the supplied listing.

---

## Publishing to GitHub

Everything is relative-path and dependency-free, and the folder is **flat**,
so it can be pushed as-is:

1. Create a repo and push the folder contents to the `main` branch.
2. In **Settings → Pages**, choose **Deploy from a branch** → `main` →
   `/ (root)`.
3. The site appears at `https://<user>.github.io/<repo>/`.

Nothing to build, no environment variables, no API keys. The photographs are
shipped inside the repository next to `index.html`, so they work offline and
on GitHub Pages alike.

---

*Prototype v1.0 — sample data only, not verified real-world information.*
