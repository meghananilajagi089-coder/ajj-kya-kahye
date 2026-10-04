/* =============================================================
   Aaj Kya Khaye? — Ghar ka Swad
   MVP prototype: discover → compare → view menu → check seats
                  → reserve for free → visit
   ============================================================= */

(function () {
  "use strict";

  /* ---------------------------------------------------------
     Icons
  --------------------------------------------------------- */
  const IC = {
    star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.6l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.7 1-5.8L3.5 9.8l5.9-.9z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20.2 20.2-3.8-3.8"/></svg>',
    sliders: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h9M18.5 7H20M4 17h4.5M14 17h6"/><circle cx="15.5" cy="7" r="2.3"/><circle cx="11" cy="17" r="2.3"/></svg>',
    sort: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 5v14M7 19l-3-3M7 19l3-3M17 19V5M17 5l-3 3M17 5l3 3"/></svg>',
    chev: '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>',
    chevDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 9 7 7 7-7"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.6 10 17.6 19 6.8"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="8.4"/><path d="M12 7.6V12l3 1.8"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="8.6"/><path d="M12 11.2v5M12 7.9v.1"/></svg>',
    alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><path d="M12 4.5 21 20H3z"/><path d="M12 10.5v4M12 17.2v.1"/></svg>',
    ticket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h11A2.5 2.5 0 0 1 20 8.5v1.2a2.3 2.3 0 0 0 0 4.6v1.2a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 15.5v-1.2a2.3 2.3 0 0 0 0-4.6z"/><path d="M13.5 6.5v11" stroke-dasharray="2 2.6"/></svg>',
    homeTab: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 10.6 12 3.6l8.5 7v9a1.2 1.2 0 0 1-1.2 1.2h-4.6v-5.6H9.3v5.6H4.7a1.2 1.2 0 0 1-1.2-1.2z"/></svg>',
    exploreTab: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.6"/><path d="m15.6 8.4-2 5.2-5.2 2 2-5.2z"/></svg>',
    resvTab: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.6" y="5.4" width="16.8" height="15" rx="3"/><path d="M8 3.4v4M16 3.4v4M3.6 10.2h16.8M9.4 15.4l1.9 1.9 3.4-3.6"/></svg>',
    profileTab: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8.6" r="3.7"/><path d="M4.8 20.2a7.4 7.4 0 0 1 14.4 0"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20s-7.4-4.6-7.4-9.4A4.1 4.1 0 0 1 12 7.9a4.1 4.1 0 0 1 7.4 2.7C19.4 15.4 12 20 12 20z"/></svg>',
    help: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="8.6"/><path d="M9.7 9.6a2.4 2.4 0 1 1 3.2 2.3c-.6.2-.9.8-.9 1.4v.4M12 16.7v.1"/></svg>',
    logout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.5 8.2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6.5a2 2 0 0 0 2-2v-2.2M10 12h10.5M17.6 9l3 3-3 3"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="8.4" r="3.6"/><path d="M5 19.6a7 7 0 0 1 14 0"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><path d="M7 3.8h10a1.6 1.6 0 0 1 1.6 1.6v13.2A1.6 1.6 0 0 1 17 20.2H7a1.6 1.6 0 0 1-1.6-1.6V5.4A1.6 1.6 0 0 1 7 3.8z"/><path d="M10.6 17.6h2.8"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 19c0-7 5-12 14-13 0 8-4.5 13-11 13H5z"/><path d="M5 19c2.5-3.5 5-6 8.5-8"/></svg>',
    settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="3.2"/><path d="M12 4.4v2M12 17.6v2M4.4 12h2M17.6 12h2M6.7 6.7l1.4 1.4M15.9 15.9l1.4 1.4M17.3 6.7l-1.4 1.4M8.1 15.9l-1.4 1.4"/></svg>'
  };

  /* ---------------------------------------------------------
     Helpers
  --------------------------------------------------------- */
  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function ratingHTML(m) {
    if (m.rating === null) return '<span class="rating none">Not rated</span>';
    return '<span class="rating">' + IC.star + m.rating.toFixed(1) + "</span>";
  }

  function photoHTML(m) {
    if (!m.photo) return "";
    // The generated gradient + emoji stay underneath as the fallback,
    // so a missing/slow file simply reveals the original thumbnail.
    return (
      '<img class="ph" src="' + m.photo + '" alt="" loading="lazy" decoding="async" ' +
      'onerror="this.remove()" />'
    );
  }

  function thumb(m, cls) {
    const kind = m.diet === "veg" ? "" : m.diet === "nonveg" ? " non" : " mix";
    const label = m.diet === "veg" ? "Veg" : m.diet === "nonveg" ? "Non-veg" : "Veg & Non-veg";
    return (
      '<div class="' + (cls || "mc-thumb") + '" style="background:' + m.grad + '">' +
      photoHTML(m) +
      '<span class="thumb-veg' + kind + '" title="' + label + '"></span>' +
      "<span>" + m.emoji + "</span></div>"
    );
  }

  function dietChip(m) {
    if (m.diet === "veg") return '<span class="chip veg">Pure Veg</span>';
    if (m.diet === "nonveg") return '<span class="chip nonveg">Non-veg</span>';
    return '<span class="chip mix">Veg &amp; Non-veg</span>';
  }

  function jainChip(m) {
    return m.jain ? '<span class="chip jain">🙏 Jain option</span>' : "";
  }

  function dietTabs(context) {
    return (
      '<div class="diet-tabs" role="tablist" aria-label="Food preference">' +
      DIET_TABS.map(function (t) {
        return (
          '<button role="tab" aria-selected="' + (state.diet === t.id) + '" class="' + (state.diet === t.id ? "is-on" : "") +
          '" data-action="set-diet" data-val="' + t.id + '" data-ctx="' + context + '">' +
          '<span class="emo">' + t.emoji + "</span>" + t.label + "</button>"
        );
      }).join("") +
      "</div>"
    );
  }

  function dietNote(pool) {
    const label = DIET_TABS.find(function (t) { return t.id === state.diet; });
    const n = pool.filter(function (m) { return dietMatch(m, state.diet); }).length;
    if (state.diet === "all") return n + " messes near you · seat reservations are always FREE";
    return "Suggested for you · " + label.label + " · " + n + " " + (n === 1 ? "mess" : "messes") + " found";
  }

  function statusChips(m) {
    return (
      (m.open
        ? '<span class="chip open">Open now</span>'
        : '<span class="chip closed">Closed</span>') +
      '<span class="chip seats">💺 ' + (m.seats > 0 ? m.seats + " seats left" : "Full right now") + "</span>"
    );
  }

  function messCard(m) {
    return (
      '<article class="mess-card" data-action="open-detail" data-id="' + m.id + '">' +
        thumb(m) +
        '<div class="mc-body">' +
          '<div class="mc-top"><h3 class="mc-name">' + esc(m.name) + "</h3>" + ratingHTML(m) + "</div>" +
          '<p class="mc-loc">' + IC.pin + "<span>" + esc(m.location) + " · " + m.distance + " km</span></p>" +
          '<div class="mc-chips">' +
            '<span class="chip price">🍽 Lunch ₹' + m.lunch + "</span>" +
            '<span class="chip price">🌙 Dinner ₹' + m.dinner + "</span>" +
            dietChip(m) + jainChip(m) +
          "</div>" +
        "</div>" +
        '<div class="mc-foot">' +
          '<span class="mc-note">' + statusChips(m) + "</span>" +
          '<button class="btn btn-ghost" data-action="open-detail" data-id="' + m.id + '">View Mess</button>' +
        "</div>" +
      "</article>"
    );
  }

  function popCard(m) {
    const dietEmoji = m.diet === "veg" ? "🌱 Veg" : m.diet === "nonveg" ? "🍗 Non-veg" : "🥗 Veg &amp; Non-veg";
    return (
      '<article class="pop-card" data-action="open-detail" data-id="' + m.id + '">' +
        '<div class="pop-thumb" style="background:' + m.grad + '">' + photoHTML(m) + ratingHTML(m) + "<span>" + m.emoji + "</span></div>" +
        '<div class="pop-body">' +
          "<h3>" + esc(m.name) + "</h3>" +
          '<p class="pop-meta">' + esc(m.area) + " · " + m.distance + " km · " + dietEmoji + (m.jain ? " · 🙏" : "") + "</p>" +
          '<div class="pop-price">' +
            '<span class="chip price">L ₹' + m.lunch + "</span>" +
            '<span class="chip price">D ₹' + m.dinner + "</span>" +
            (m.open ? '<span class="chip open">Open</span>' : '<span class="chip closed">Closed</span>') +
          "</div>" +
        "</div>" +
      "</article>"
    );
  }

  /* ---------------------------------------------------------
     State
  --------------------------------------------------------- */
  function emptyFilters() {
    return { areas: [], price: null, rating: null, distance: null, open: false, veg: false, monthly: false };
  }

  const state = {
    view: "home",
    tab: "home",
    stack: [],
    detailId: null,
    sheet: null,
    draft: emptyFilters(),
    area: "All Pune",
    diet: "all",
    exploreQuery: "",
    filters: emptyFilters(),
    sort: "recommended",
    reserve: { meal: "Dinner", seats: 1 },
    lastRes: null,
    prefs: { food: "Veg", nearby: true, under100: true, dinnerOnly: false },
    reservations: {
      upcoming: [
        { id: "R2041", messId: 15, meal: "Dinner", seats: 1, time: "7:30 PM", day: "Today", status: "Reserved" },
        { id: "R2038", messId: 80, meal: "Lunch", seats: 2, time: "12:30 PM", day: "Tomorrow", status: "Reserved" }
      ],
      past: [
        { id: "R1988", messId: 61, meal: "Lunch", seats: 2, time: "12:30 PM", day: "Yesterday", status: "Completed" },
        { id: "R1974", messId: 72, meal: "Dinner", seats: 1, time: "7:30 PM", day: "Last week", status: "Cancelled" }
      ]
    }
  };

  const SORT_LABELS = {
    recommended: "Recommended",
    rating: "Rating: high to low",
    distance: "Distance: nearest first",
    price: "Price: low to high",
    name: "Name: A to Z"
  };

  const TABS = [
    { id: "home", label: "Home", icon: IC.homeTab },
    { id: "explore", label: "Explore", icon: IC.exploreTab },
    { id: "reservations", label: "My Reservations", icon: IC.resvTab },
    { id: "profile", label: "Profile", icon: IC.profileTab }
  ];

  /* ---------------------------------------------------------
     Query / filter / sort
  --------------------------------------------------------- */
  function byQuery(list, query) {
    const q = (query || "").trim().toLowerCase();
    if (!q) return list;
    return list.filter(function (m) {
      return (
        m.name.toLowerCase().indexOf(q) > -1 ||
        m.location.toLowerCase().indexOf(q) > -1 ||
        m.areas.some(function (a) { return a.toLowerCase().indexOf(q) > -1; })
      );
    });
  }

  function passes(m, f) {
    if (f.areas.length && !m.areas.some(function (a) { return f.areas.indexOf(a) > -1; })) return false;
    if (f.price === "lt80" && m.price >= 80) return false;
    if (f.price === "80to100" && (m.price < 80 || m.price > 100)) return false;
    if (f.price === "gt100" && m.price <= 100) return false;
    if (f.rating && (m.rating === null || m.rating < f.rating)) return false;
    if (f.distance && m.distance > f.distance) return false;
    if (f.open && !m.open) return false;
    if (f.veg && !m.veg) return false;
    if (f.monthly && !m.hasMonthly) return false;
    return true;
  }

  function sortList(list, sort) {
    const a = list.slice();
    if (sort === "rating") a.sort(function (x, y) { return (y.rating || 0) - (x.rating || 0); });
    else if (sort === "distance") a.sort(function (x, y) { return x.distance - y.distance; });
    else if (sort === "price") a.sort(function (x, y) { return x.price - y.price; });
    else if (sort === "name") a.sort(function (x, y) { return x.name.localeCompare(y.name); });
    else a.sort(function (x, y) {
      return (y.open ? 1 : 0) - (x.open ? 1 : 0) || (y.rating || 0) - (x.rating || 0) || x.distance - y.distance;
    });
    return a;
  }

  function exploreList() {
    const q = state.exploreQuery;
    return sortList(
      byQuery(MESS, q).filter(function (m) {
        return dietMatch(m, state.diet) && passes(m, state.filters);
      }),
      state.sort
    );
  }

  function activeFilterCount() {
    const f = state.filters;
    return (
      f.areas.length +
      (f.price ? 1 : 0) + (f.rating ? 1 : 0) + (f.distance ? 1 : 0) +
      (f.open ? 1 : 0) + (f.veg ? 1 : 0) + (f.monthly ? 1 : 0)
    );
  }

  function inArea(m) {
    return state.area === "All Pune" || m.areas.indexOf(state.area) > -1;
  }

  /* ---------------------------------------------------------
     Views
  --------------------------------------------------------- */
  function homeView() {
    const pool = MESS.filter(inArea);
    const sug = pool.filter(function (m) { return dietMatch(m, state.diet); });
    const nearby = sortList(sug, "distance").slice(0, 5);

    const byRating = function (a, b) { return b.rating - a.rating || a.distance - b.distance; };
    let popular = sug.filter(function (m) { return m.rating !== null; }).sort(byRating).slice(0, 4);
    if (popular.length < 3) {
      popular = MESS.filter(function (m) { return m.rating !== null && dietMatch(m, state.diet); })
        .sort(byRating).slice(0, 4);
    }
    const emptyNote =
      '<div class="empty-mini"><span class="big">🍽️</span>No listed ' +
      (state.diet === "all" ? "" : DIET_TABS.find(function (t) { return t.id === state.diet; }).label + " ") +
      "messes in this area yet." +
      '<div style="margin-top:12px"><button class="btn btn-ghost" data-action="reset-diet-area">Show all messes</button></div></div>';

    return (
      '<div class="view">' +
        '<header class="home-head">' +
          '<div class="brand-row">' +
            '<div class="brand">' +
              '<img class="brand-logo" src="logo.svg" alt="Aaj Kya Khaye?" />' +
              '<p class="brand-tagline">Ghar ka Swad</p>' +
            "</div>" +
            '<button class="loc-pill" data-action="open-location">' + IC.pin +
              "<span>" + esc(state.area) + "</span>" + IC.chevDown +
            "</button>" +
          "</div>" +
          '<div class="searchbar">' + IC.search +
            '<button class="searchbar-main" data-action="go-search">Search for a mess or area</button>' +
            '<button class="icon-btn" data-action="open-filters" aria-label="Filters">' + IC.sliders + "</button>" +
          "</div>" +
          dietTabs("home") +
        "</header>" +

        '<section class="sect">' +
          '<div class="sect-head"><h2>Nearby Messes</h2>' +
            '<button class="link" data-action="see-all">See all</button></div>' +
          '<p class="sug-note">' + dietNote(pool) + "</p>" +
          (nearby.length ? nearby.map(messCard).join("") : emptyNote) +
        "</section>" +

        '<section class="sect">' +
          '<div class="sect-head"><h2>Popular Near You</h2><span class="sub">Top rated this week</span></div>' +
          (popular.length
            ? '<div class="hscroll">' + popular.map(popCard).join("") + "</div>"
            : '<div class="empty-mini"><span class="big">⭐</span>No rated ' +
              (state.diet === "all" ? "" : DIET_TABS.find(function (t) { return t.id === state.diet; }).label + " ") +
              "messes here yet.</div>") +
        "</section>" +

        '<section class="story-card">' +
          '<p class="eyebrow">Ghar jaisa khana</p>' +
          "<h3>Looking for Ghar Ka Khana?</h3>" +
          "<p>Discover affordable local messes around you — see the real sample menu, compare lunch &amp; dinner prices, " +
          "check seats, and reserve your spot for free before you leave.</p>" +
          '<button class="btn" data-action="see-all">Explore Messes</button>' +
        "</section>" +

        '<p class="footnote">Prototype sample data · ' + MESS.length +
        " mess listings from the supplied lists (names, locations, ratings).<br>" +
        "Prices, menus, timings, seat counts and veg / non-veg / Jain flags are illustrative. Reservations are always free.</p>" +
      "</div>"
    );
  }

  function exploreView() {
    const n = activeFilterCount();
    return (
      '<div class="view">' +
        '<header class="explore-head">' +
          '<div class="screen-title"><h2>Explore Messes</h2><span class="count" id="result-count"></span></div>' +
          '<div class="searchbar" style="margin-top:0">' + IC.search +
            '<input id="explore-input" type="search" placeholder="Search for a mess or area" value="' + esc(state.exploreQuery) + '" autocomplete="off" />' +
            (state.exploreQuery
              ? '<button class="icon-btn" data-action="clear-query" aria-label="Clear search">✕</button>'
              : '<button class="icon-btn" data-action="open-filters" aria-label="Filters">' + IC.sliders + "</button>") +
          "</div>" +
          '<div class="filter-row">' +
            '<button class="btn-tool' + (n ? " is-active" : "") + '" data-action="open-filters">' + IC.sliders +
              "Filters" + (n ? '<span class="count-badge" id="filter-badge">' + n + "</span>" : "") + "</button>" +
            '<button class="btn-tool" data-action="open-sort">' + IC.sort + "<span>" + SORT_LABELS[state.sort].split(":")[0] + "</span></button>" +
          "</div>" +
          dietTabs("explore") +
        "</header>" +
        '<div class="results" id="explore-results"></div>' +
        '<p class="footnote">All ' + MESS.length + " listings are searchable. Ratings marked “Not rated” are never invented.</p>" +
      "</div>"
    );
  }

  function resultsHTML(list) {
    if (!list.length) {
      return (
        '<div class="empty"><span class="big">🍽️</span><h3>No messes match yet</h3>' +
        "<p>Try clearing a filter or searching another area.</p>" +
        '<button class="btn btn-ghost" data-action="reset-all">Clear search &amp; filters</button></div>'
      );
    }
    return list.map(messCard).join("");
  }

  function detailView() {
    const m = MESS_BY_ID[state.detailId];
    if (!m) return '<div class="view"><div class="empty"><span class="big">🤔</span><h3>Mess not found</h3></div></div>';

    return (
      '<div class="view">' +
        '<div class="hero" style="background:' + m.grad + '">' +
          photoHTML(m) +
          "<span>" + m.emoji + "</span>" +
          '<button class="hero-back" data-action="back" aria-label="Back">' + IC.back + "</button>" +
          '<span class="hero-tag">Sample listing</span>' +
        "</div>" +

        '<div class="detail-body">' +
          '<div class="detail-title"><div>' +
            "<h2>" + esc(m.name) + "</h2>" +
            '<p class="detail-sub">' + IC.pin + "<span>" + esc(m.location) + "</span></p>" +
            '<p class="detail-sub" style="margin-top:5px">📍 ' + m.distance + " km away · " + esc(m.area) + "</p>" +
          "</div>" +
          '<div class="rating-side">' + ratingHTML(m) +
            (m.reviews ? '<span class="rev-count">' + m.reviews + " reviews</span>" : "") +
          "</div></div>" +

          '<div class="status-row">' +
            (m.open ? '<span class="chip open">Open now</span>' : '<span class="chip closed">Closed now</span>') +
            dietChip(m) + jainChip(m) +
            '<span class="chip seats">💺 ~' + m.seats + " seats free</span>" +
            (m.hasMonthly ? '<span class="chip price">Monthly plan</span>' : "") +
          "</div>" +

          '<div class="info-grid">' +
            '<div class="info-cell"><div class="k">🍽 Lunch</div><div class="v">₹' + m.lunch + ' <small>/ plate</small></div></div>' +
            '<div class="info-cell"><div class="k">🌙 Dinner</div><div class="v">₹' + m.dinner + ' <small>/ plate</small></div></div>' +
            '<div class="info-cell"><div class="k">📅 Monthly plan</div><div class="v">' +
              (m.hasMonthly ? "₹" + m.monthlyPrice + ' <small>/ month</small>' : '<small style="font-size:14px">Not offered</small>') +
            "</div></div>" +
            '<div class="info-cell"><div class="k">🪑 Seats (approx.)</div><div class="v">' + m.seats +
              ' <small>/ ' + m.totalSeats + "</small></div></div>" +
            '<div class="info-cell wide"><div class="k">🕐 Timings</div><div class="v" style="font-size:15px">' +
              "Lunch " + m.lunchTime + "<br>Dinner " + m.dinnerTime + "</div></div>" +
            (m.priceNote
              ? '<div class="info-cell wide"><div class="k">💰 Price info (listing)</div><div class="v" style="font-size:15px">' +
                esc(m.priceNote) + "</div></div>"
              : "") +
          "</div>" +

          '<div class="block"><h3>About this mess</h3><p class="about-text">' + esc(m.desc) + "</p></div>" +

          '<div class="block"><h3>Today\'s Menu</h3><p class="hint">Sample menu for this prototype · the real mess may vary day to day.</p>' +
            '<div class="menu-grid">' +
              '<div class="menu-card">' +
                '<div class="menu-head"><strong>Lunch</strong><span class="price">₹' + m.lunch + "</span></div>" +
                '<div class="menu-items">' + m.menu.lunch.map(function (i) { return "<span>" + i + "</span>"; }).join("") + "</div>" +
                '<div class="menu-time">🕐 ' + m.lunchTime + "</div>" +
              "</div>" +
              '<div class="menu-card dinner">' +
                '<div class="menu-head"><strong>Dinner</strong><span class="price">₹' + m.dinner + "</span></div>" +
                '<div class="menu-items">' + m.menu.dinner.map(function (i) { return "<span>" + i + "</span>"; }).join("") + "</div>" +
                '<div class="menu-time">🕐 ' + m.dinnerTime + "</div>" +
              "</div>" +
            "</div>" +
          "</div>" +

          '<div class="notice">' + IC.info +
            "<span>Menu, prices, timings, monthly plan, seat counts and veg / non-veg / Jain availability on this " +
            "screen are clearly-labelled prototype sample data — they are not verified real-world information. " +
            "Rating and review counts come from the supplied listing.</span></div>" +
        "</div>" +

        '<div class="sticky-action">' +
          '<div class="price-tag"><div class="p1">Lunch ₹' + m.lunch + " · Dinner ₹" + m.dinner + '</div><div class="p2">Free seat</div></div>' +
          '<button class="btn btn-primary" data-action="go-reserve">Reserve a Seat</button>' +
        "</div>" +
      "</div>"
    );
  }

  function reserveView() {
    const m = MESS_BY_ID[state.detailId];
    if (!m) return '<div class="view"><div class="empty"><span class="big">🤔</span></div></div>';
    const r = state.reserve;
    const maxSeats = 6;

    return (
      '<div class="view">' +
        '<div class="stack-head"><button class="back-btn" data-action="back" aria-label="Back">' + IC.back + "</button>" +
          "<h2>Reserve a Seat</h2></div>" +

        '<div class="resv-summary">' + thumb(m) +
          "<div><h3>" + esc(m.name) + "</h3><p>" + esc(m.location) + " · " + m.distance + " km · " +
            (m.open ? "Open now" : "Closed now") + "</p></div>" +
        "</div>" +

        '<div class="form-block">' +
          '<div class="form-label">Choose your meal</div>' +
          '<div class="meal-options">' +
            '<button class="meal-card' + (r.meal === "Lunch" ? " is-sel" : "") + '" data-action="select-meal" data-val="Lunch">' +
              '<div class="emoji">🍛</div><div class="m-name">Lunch</div>' +
              '<div class="m-time">' + m.lunchTime + "</div>" +
              '<div class="m-price">₹' + m.lunch + " / plate</div>" +
            "</button>" +
            '<button class="meal-card' + (r.meal === "Dinner" ? " is-sel" : "") + '" data-action="select-meal" data-val="Dinner">' +
              '<div class="emoji">🍲</div><div class="m-name">Dinner</div>' +
              '<div class="m-time">' + m.dinnerTime + "</div>" +
              '<div class="m-price">₹' + m.dinner + " / plate</div>" +
            "</button>" +
          "</div>" +
        "</div>" +

        '<div class="form-block">' +
          '<div class="form-label">Number of seats<span class="inline">Approx. ' + m.seats + " seats free right now</span></div>" +
          '<div class="stepper">' +
            '<div class="s-info"><div class="t">Seats</div><div class="s">Up to ' + maxSeats + " seats per reservation</div></div>" +
            '<div class="s-ctrl">' +
              '<button data-action="seat-dec" aria-label="Fewer seats"' + (r.seats <= 1 ? " disabled" : "") + ">−</button>" +
              '<span class="val">' + r.seats + "</span>" +
              '<button data-action="seat-inc" aria-label="More seats"' + (r.seats >= maxSeats ? " disabled" : "") + ">+</button>" +
            "</div>" +
          "</div>" +
        "</div>" +

        '<div class="form-block">' +
          '<div class="fee-box"><span class="fl">Reservation Fee</span>' +
            '<span class="fv">FREE<small>₹0 · no charges, ever</small></span></div>' +
          '<p class="fine-print">This is a free intent-to-visit reservation. No booking fee, no payment, no timers — ' +
          "you are simply letting the mess know you are coming. Mess owners continue accepting walk-in customers " +
          "depending on actual availability.</p>" +
        "</div>" +

        '<div class="resv-actions">' +
          '<button class="btn btn-primary btn-block" data-action="confirm-reserve">Reserve Seat</button>' +
          '<p class="fine-print" style="text-align:center">You can pay the mess directly for your food.</p>' +
        "</div>" +
      "</div>"
    );
  }

  function confirmedView() {
    const res = state.lastRes;
    if (!res) return '<div class="view"><div class="empty"><span class="big">🤔</span></div></div>';
    const m = MESS_BY_ID[res.messId];

    return (
      '<div class="view">' +
        '<div class="confirm-wrap">' +
          '<div class="check-badge">' + IC.check + "</div>" +
          "<h2>Reservation Confirmed</h2>" +
          '<p class="lede">Your seat is noted for ' + esc(m.name) + ".</p>" +

          '<div class="confirm-card">' +
            '<div class="confirm-row"><span class="k">Mess</span><span class="v">' + esc(m.name) + "</span></div>" +
            '<div class="confirm-row"><span class="k">Meal</span><span class="v">' + res.meal + "</span></div>" +
            '<div class="confirm-row"><span class="k">Seats</span><span class="v">' + res.seats + "</span></div>" +
            '<div class="confirm-row"><span class="k">Reservation Time</span><span class="v">' + res.time + "</span></div>" +
            '<div class="confirm-row"><span class="k">Reservation Fee</span><span class="v free">FREE</span></div>' +
          "</div>" +

          '<div class="reach-note">' + IC.alert +
            "<span>Please reach the mess soon. Reservations are subject to availability.</span></div>" +

          '<div class="confirm-actions">' +
            '<button class="btn btn-primary btn-block" data-action="tab" data-val="reservations">View My Reservations</button>' +
            '<button class="btn btn-quiet btn-block" data-action="tab" data-val="home">Back to Home</button>' +
          "</div>" +
        "</div>" +
      "</div>"
    );
  }

  function resvCard(res, done) {
    const m = MESS_BY_ID[res.messId];
    const cls = res.status.toLowerCase();
    return (
      '<article class="resv-card' + (done ? " done" : "") + '">' +
        thumb(m) +
        '<div class="resv-main">' +
          '<div class="resv-top"><h3 class="resv-name">' + esc(m.name) + "</h3>" +
            '<span class="status-pill ' + cls + '">' + res.status + "</span></div>" +
          '<p class="resv-meta">' + res.meal + " • " + res.seats + (res.seats === 1 ? " Seat" : " Seats") + "</p>" +
          '<p class="resv-when">' + IC.clock + (done ? "Was scheduled at " : "Reserved at ") + res.time + " · " + res.day + "</p>" +
        "</div>" +
        '<div class="resv-foot">' +
          '<span class="fee">Reservation fee: FREE</span>' +
          '<span class="acts">' +
            (done
              ? '<button class="btn btn-ghost" data-action="open-detail" data-id="' + m.id + '">View Mess</button>'
              : '<button class="btn btn-ghost" data-action="open-detail" data-id="' + m.id + '">View Mess</button>' +
                '<button class="btn btn-quiet" style="padding:9px 14px;font-size:13px" data-action="cancel-res" data-id="' + res.id + '">Cancel</button>') +
          "</span>" +
        "</div>" +
      "</article>"
    );
  }

  function reservationsView() {
    const up = state.reservations.upcoming;
    const past = state.reservations.past;

    return (
      '<div class="view">' +
        '<div class="stack-head" style="padding-top:14px"><h2 style="font-size:23px">My Reservations</h2></div>' +
        '<div class="sect">' +
          '<div class="section-label"><span class="dot"></span>Upcoming Reservations' +
            '<span class="n">' + up.length + "</span></div>" +
          (up.length
            ? up.map(function (r) { return resvCard(r, false); }).join("")
            : '<div class="empty-mini"><span class="big">🗓️</span>No upcoming reservations.' +
              '<div style="margin-top:12px"><button class="btn btn-ghost" data-action="tab" data-val="explore">Find a mess</button></div></div>') +

          '<div class="section-label"><span class="dot grey"></span>Past Reservations' +
            '<span class="n">' + past.length + "</span></div>" +
          (past.length
            ? past.map(function (r) { return resvCard(r, true); }).join("")
            : '<div class="empty-mini"><span class="big">🍽️</span>Your past visits will appear here.</div>') +
        "</div>" +
        '<p class="footnote">Reservations are free and are simply an intent to visit. Mess owners may still ' +
        "accept walk-ins depending on real-time availability.</p>" +
      "</div>"
    );
  }

  function profileView() {
    const p = state.prefs;
    return (
      '<div class="view">' +
        '<div class="profile-head">' +
          '<div class="profile-card">' +
            '<div class="avatar">RK</div>' +
            "<div><h2>Rohit Kulkarni</h2><p>📱 +91 98765 43210</p>" +
            '<span class="sample">Sample profile</span></div>' +
          "</div>" +
        "</div>" +

        '<div class="sect">' +
          '<div class="pref-card">' +
            "<h3>Food preference</h3>" +
            '<p class="pref-hint">Home and Explore suggest messes that match this choice.</p>' +
            '<div class="seg">' +
              DIET_TABS.map(function (t) {
                return '<button class="' + (state.diet === t.id ? "is-on" : "") +
                  '" data-action="set-food" data-val="' + t.id + '">' + t.emoji + " " + t.label + "</button>";
              }).join("") +
            "</div>" +
          "</div>" +

          '<div class="pref-card">' +
            "<h3>Saved preferences</h3>" +
            '<div class="pref-chips">' +
              '<button class="toggle-chip' + (p.nearby ? " is-on" : "") + '" data-action="toggle-pref" data-val="nearby">Near me</button>' +
              '<button class="toggle-chip' + (p.under100 ? " is-on" : "") + '" data-action="toggle-pref" data-val="under100">Under ₹100</button>' +
              '<button class="toggle-chip' + (p.dinnerOnly ? " is-on" : "") + '" data-action="toggle-pref" data-val="dinnerOnly">Dinner only</button>' +
            "</div>" +
          "</div>" +

          '<div class="list-card">' +
            '<button class="list-row" data-action="tab" data-val="reservations">' +
              '<span class="lico">' + IC.ticket + '</span><span class="grow">My Reservations</span>' +
              '<span class="val">' + state.reservations.upcoming.length + " upcoming</span>" + IC.chev + "</button>" +
            '<button class="list-row" data-action="open-help">' +
              '<span class="lico">' + IC.help + '</span><span class="grow">Help &amp; Support</span>' + IC.chev + "</button>" +
            '<button class="list-row" data-action="open-about">' +
              '<span class="lico">' + IC.heart + '</span><span class="grow">About Aaj Kya Khaye?</span>' + IC.chev + "</button>" +
          "</div>" +

          '<div class="list-card" style="margin-top:14px">' +
            '<button class="list-row danger" data-action="logout">' +
              '<span class="lico">' + IC.logout + '</span><span class="grow">Logout</span>' + IC.chev + "</button>" +
          "</div>" +

          '<p class="footnote">Aaj Kya Khaye? · Ghar ka Swad<br>MVP prototype v1.0 — sample data only.</p>' +
        "</div>" +
      "</div>"
    );
  }

  /* ---------------------------------------------------------
     Sheets
  --------------------------------------------------------- */
  function sheetHTML() {
    const s = state.sheet;

    if (s === "location") {
      const rows = [{ name: "All Pune", count: MESS.length }].concat(AREAS);
      return (
        '<div class="backdrop" data-action="close-sheet"></div>' +
        '<div class="sheet">' +
          '<div class="sheet-handle"></div>' +
          '<div class="sheet-head"><h3>Choose your area</h3>' +
            '<button class="clear" data-action="close-sheet">Close</button></div>' +
          '<div class="sheet-body">' +
            '<div class="sheet-search">' + IC.search +
              '<input id="area-search" type="text" placeholder="Search area" autocomplete="off" /></div>' +
            '<div id="area-list">' +
              rows.map(function (a) {
                return (
                  '<button class="opt-row' + (state.area === a.name ? " is-on" : "") + '" data-name="' + esc(a.name.toLowerCase()) +
                  '" data-action="set-area" data-val="' + esc(a.name) + '">' +
                  '<span class="grow">' + esc(a.name) + '<span class="sub">' + a.count + " messes</span></span>" +
                  (state.area === a.name ? '<span class="tick">✓</span>' : "") +
                  "</button>"
                );
              }).join("") +
            "</div>" +
          "</div>" +
        "</div>"
      );
    }

    if (s === "filters") {
      const d = state.draft;
      const count = byQuery(MESS, state.exploreQuery).filter(function (m) {
        return dietMatch(m, state.diet) && passes(m, d);
      }).length;
      const priceChips = [
        ["lt80", "Under ₹80"],
        ["80to100", "₹80 – ₹100"],
        ["gt100", "₹100+"]
      ];
      const ratingChips = [[4, "4.0 &amp; above"], [4.5, "4.5 &amp; above"]];
      const distChips = [[1, "Within 1 km"], [2, "Within 2 km"], [5, "Within 5 km"]];

      return (
        '<div class="backdrop" data-action="close-sheet"></div>' +
        '<div class="sheet">' +
          '<div class="sheet-handle"></div>' +
          '<div class="sheet-head"><h3>Filters</h3>' +
            '<button class="clear" data-action="reset-filters">Reset</button></div>' +
          '<div class="sheet-body">' +

            '<div class="f-group"><h4>Location</h4>' +
              '<div class="sheet-search">' + IC.search +
                '<input id="area-search" type="text" placeholder="Search area" autocomplete="off" /></div>' +
              '<div class="f-chips scroll" id="area-chips">' +
                AREAS.map(function (a) {
                  const on = d.areas.indexOf(a.name) > -1;
                  return '<button class="f-chip' + (on ? " is-on" : "") + '" data-name="' + esc(a.name.toLowerCase()) +
                    '" data-action="toggle-area" data-val="' + esc(a.name) + '">' + esc(a.name) +
                    ' <span class="c">' + a.count + "</span></button>";
                }).join("") +
              "</div>" +
            "</div>" +

            '<div class="f-group"><h4>Price per plate</h4><div class="f-chips">' +
              priceChips.map(function (c) {
                return '<button class="f-chip' + (d.price === c[0] ? " is-on" : "") + '" data-action="set-price" data-val="' + c[0] + '">' + c[1] + "</button>";
              }).join("") +
            "</div></div>" +

            '<div class="f-group"><h4>Rating</h4><div class="f-chips">' +
              ratingChips.map(function (c) {
                return '<button class="f-chip' + (d.rating === c[0] ? " is-on" : "") + '" data-action="set-rating" data-val="' + c[0] + '">' + c[1] + "</button>";
              }).join("") +
            "</div></div>" +

            '<div class="f-group"><h4>Distance</h4><div class="f-chips">' +
              distChips.map(function (c) {
                return '<button class="f-chip' + (d.distance === c[0] ? " is-on" : "") + '" data-action="set-distance" data-val="' + c[0] + '">' + c[1] + "</button>";
              }).join("") +
            "</div></div>" +

            '<div class="f-group"><h4>Quick filters</h4>' +
              '<button class="switch-row' + (d.open ? " is-on" : "") + '" data-action="toggle-open">Open Now<span class="switch"></span></button>' +
              '<button class="switch-row' + (d.veg ? " is-on" : "") + '" data-action="toggle-veg">Veg<span class="switch"></span></button>' +
              '<button class="switch-row' + (d.monthly ? " is-on" : "") + '" data-action="toggle-monthly">Monthly Plan<span class="switch"></span></button>' +
            "</div>" +
          "</div>" +
          '<div class="sheet-foot">' +
            '<button class="btn btn-quiet" data-action="reset-filters">Reset</button>' +
            '<button class="btn btn-primary" data-action="apply-filters">Show <span id="apply-count">' + count + "</span> messes</button>" +
          "</div>" +
        "</div>"
      );
    }

    if (s === "sort") {
      const opts = [
        ["recommended", "Recommended", "Open first, then top rated and nearest"],
        ["rating", "Rating: high to low", "Best rated messes on top"],
        ["distance", "Distance: nearest first", "Closest to you first"],
        ["price", "Price: low to high", "Most affordable plate first"],
        ["name", "Name: A to Z", "Alphabetical order"]
      ];
      return (
        '<div class="backdrop" data-action="close-sheet"></div>' +
        '<div class="sheet">' +
          '<div class="sheet-handle"></div>' +
          '<div class="sheet-head"><h3>Sort by</h3><button class="clear" data-action="close-sheet">Close</button></div>' +
          '<div class="sheet-body" style="padding-bottom:22px">' +
            opts.map(function (o) {
              return (
                '<button class="opt-row' + (state.sort === o[0] ? " is-on" : "") + '" data-action="set-sort" data-val="' + o[0] + '">' +
                '<span class="grow">' + o[1] + '<span class="sub">' + o[2] + "</span></span>" +
                (state.sort === o[0] ? '<span class="tick">✓</span>' : "") +
                "</button>"
              );
            }).join("") +
          "</div>" +
        "</div>"
      );
    }

    if (s === "about") {
      return (
        '<div class="backdrop" data-action="close-sheet"></div>' +
        '<div class="sheet">' +
          '<div class="sheet-handle"></div>' +
          '<div class="sheet-head"><h3>About</h3><button class="clear" data-action="close-sheet">Close</button></div>' +
          '<div class="sheet-body" style="padding-bottom:24px">' +
            '<div class="about-hero">' +
              '<img class="about-logo" src="logo.svg" alt="Aaj Kya Khaye? logo" />' +
              "<p>Ghar ka Swad</p></div>" +
            '<div class="about-body">' +
              "Made for students, bachelors and everyone staying away from home — Aaj Kya Khaye? helps you " +
              "<b>discover nearby messes</b>, <b>compare menus and prices</b>, <b>check seat availability</b> and " +
              "<b>reserve a seat for free</b> before you leave." +
              '<ul class="about-list">' +
                "<li><b>" + MESS.length + "</b> local mess listings to search, filter and compare</li>" +
                "<li>Food tabs — <b>🌱 Veg</b>, <b>🍗 Non-veg</b> and <b>🙏 Jain</b> — that suggest messes for you</li>" +
                "<li>Lunch &amp; dinner prices, monthly plans and sample menus</li>" +
                "<li>Seat reservations with <b>no reservation fee, ever</b></li>" +
                "<li>Ghar jaisa khana at affordable, student-friendly prices</li>" +
              "</ul></div>" +
            '<p class="fine-print">Prototype sample data. Menu, prices, timings and availability are illustrative ' +
            "and not verified real-world information.</p>" +
          "</div>" +
        "</div>"
      );
    }

    if (s === "help") {
      return (
        '<div class="backdrop" data-action="close-sheet"></div>' +
        '<div class="sheet">' +
          '<div class="sheet-handle"></div>' +
          '<div class="sheet-head"><h3>Help &amp; Support</h3><button class="clear" data-action="close-sheet">Close</button></div>' +
          '<div class="sheet-body" style="padding-bottom:24px">' +
            '<div class="opt-row" style="cursor:default"><span class="grow">💬 Chat with us<span class="sub">Typically replies in a few minutes</span></span></div>' +
            '<div class="opt-row" style="cursor:default"><span class="grow">📞 +91 90000 12345<span class="sub">Daily, 9 AM – 10 PM</span></span></div>' +
            '<div class="opt-row" style="cursor:default"><span class="grow">✉️ help@aajkyakhaye.app<span class="sub">We usually reply within a day</span></span></div>' +
            '<p class="fine-print">Facing an issue with a reservation? Open <b>My Reservations</b> and cancel it — ' +
            "it is free and takes one tap.</p>" +
          "</div>" +
        "</div>"
      );
    }

    return "";
  }

  /* ---------------------------------------------------------
     Tabbar
  --------------------------------------------------------- */
  function tabbarHTML() {
    return TABS.map(function (t) {
      const on = state.tab === t.id;
      return (
        '<button class="tab' + (on ? " is-active" : "") + '" data-action="tab" data-val="' + t.id + '"' +
        (on ? ' aria-current="page"' : "") + ">" +
        '<span class="tab-ico">' + t.icon + "</span>" + t.label + "</button>"
      );
    }).join("");
  }

  /* ---------------------------------------------------------
     Render
  --------------------------------------------------------- */
  const screenEl = document.getElementById("screen");
  const tabbarEl = document.getElementById("tabbar");
  const sheetLayer = document.getElementById("sheet-layer");
  const toastLayer = document.getElementById("toast-layer");

  const VIEWS = {
    home: homeView,
    explore: exploreView,
    detail: detailView,
    reserve: reserveView,
    confirmed: confirmedView,
    reservations: reservationsView,
    profile: profileView
  };

  const STACK_VIEWS = ["detail", "reserve", "confirmed"];
  let lastView = null;

  function render() {
    const isStack = STACK_VIEWS.indexOf(state.view) > -1;
    tabbarEl.classList.toggle("hidden", isStack);
    tabbarEl.innerHTML = isStack ? "" : tabbarHTML();
    screenEl.innerHTML = (VIEWS[state.view] || homeView)();
    if (state.view !== lastView) {
      screenEl.scrollTop = 0;
      lastView = state.view;
    }
    renderSheet();

    if (state.view === "explore") refreshResults();
  }

  function renderSheet() {
    if (!state.sheet) {
      sheetLayer.className = "sheet-layer";
      sheetLayer.innerHTML = "";
      return;
    }
    sheetLayer.className = "sheet-layer on";
    sheetLayer.innerHTML = sheetHTML();
  }

  function refreshResults() {
    const box = document.getElementById("explore-results");
    if (!box) return;
    const list = exploreList();
    box.innerHTML = resultsHTML(list);
    const c = document.getElementById("result-count");
    if (c) c.textContent = list.length + (list.length === 1 ? " mess" : " messes");
  }

  function updateSheetCount() {
    const el = document.getElementById("apply-count");
    if (!el) return;
    el.textContent = byQuery(MESS, state.exploreQuery).filter(function (m) {
      return dietMatch(m, state.diet) && passes(m, state.draft);
    }).length;
  }

  let toastTimer = null;
  function toast(msg) {
    toastLayer.innerHTML = '<div class="toast">' + esc(msg) + "</div>";
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastLayer.innerHTML = ""; }, 2200);
  }

  /* ---------------------------------------------------------
     Navigation
  --------------------------------------------------------- */
  function goTab(id) {
    state.tab = id;
    state.view = id;
    state.stack = [];
    state.sheet = null;
    render();
    if (id === "explore") {
      const input = document.getElementById("explore-input");
      if (input) input.focus();
    }
  }

  function push(view) {
    state.stack.push(state.view);
    state.view = view;
    state.sheet = null;
    render();
  }

  function back() {
    state.view = state.stack.pop() || state.tab;
    state.sheet = null;
    render();
  }

  /* ---------------------------------------------------------
     Actions
  --------------------------------------------------------- */
  function handleAction(action, el) {
    const val = el ? el.dataset.val : null;
    const id = el ? el.dataset.id : null;

    switch (action) {
      case "tab":
        goTab(val);
        break;

      case "see-all":
        goTab("explore");
        break;

      case "go-search":
        goTab("explore");
        break;

      case "clear-query":
        state.exploreQuery = "";
        state.view = "explore";
        render();
        {
          const input = document.getElementById("explore-input");
          if (input) input.focus();
        }
        break;

      case "reset-all":
        state.exploreQuery = "";
        state.filters = emptyFilters();
        render();
        break;

      case "open-detail":
        state.detailId = parseInt(id, 10);
        push("detail");
        break;

      case "back":
        back();
        break;

      case "go-reserve":
        state.reserve = { meal: "Dinner", seats: 1 };
        push("reserve");
        break;

      case "select-meal":
        state.reserve.meal = val;
        render();
        break;

      case "seat-inc":
        if (state.reserve.seats < 6) { state.reserve.seats++; render(); }
        break;

      case "seat-dec":
        if (state.reserve.seats > 1) { state.reserve.seats--; render(); }
        break;

      case "confirm-reserve":
        confirmReserve();
        break;

      case "cancel-res":
        cancelReservation(id);
        break;

      case "open-location":
        state.sheet = "location";
        renderSheet();
        break;

      case "set-area":
        state.area = val;
        state.sheet = null;
        render();
        break;

      case "open-filters":
        state.draft = JSON.parse(JSON.stringify(state.filters));
        state.sheet = "filters";
        renderSheet();
        break;

      case "close-sheet":
        state.sheet = null;
        renderSheet();
        break;

      case "reset-filters":
        state.draft = emptyFilters();
        renderSheet();
        break;

      case "toggle-area": {
        const arr = state.draft.areas;
        const i = arr.indexOf(val);
        if (i > -1) arr.splice(i, 1); else arr.push(val);
        el.classList.toggle("is-on", i === -1);
        updateSheetCount();
        break;
      }

      case "set-price":
        state.draft.price = state.draft.price === val ? null : val;
        toggleSiblings(el, state.draft.price !== null);
        updateSheetCount();
        break;

      case "set-rating":
        state.draft.rating = state.draft.rating === Number(val) ? null : Number(val);
        toggleSiblings(el, state.draft.rating !== null);
        updateSheetCount();
        break;

      case "set-distance":
        state.draft.distance = state.draft.distance === Number(val) ? null : Number(val);
        toggleSiblings(el, state.draft.distance !== null);
        updateSheetCount();
        break;

      case "toggle-open":
        state.draft.open = !state.draft.open;
        el.classList.toggle("is-on", state.draft.open);
        updateSheetCount();
        break;

      case "toggle-veg":
        state.draft.veg = !state.draft.veg;
        el.classList.toggle("is-on", state.draft.veg);
        updateSheetCount();
        break;

      case "toggle-monthly":
        state.draft.monthly = !state.draft.monthly;
        el.classList.toggle("is-on", state.draft.monthly);
        updateSheetCount();
        break;

      case "apply-filters":
        state.filters = JSON.parse(JSON.stringify(state.draft));
        state.sheet = null;
        state.view = "explore";
        if (state.tab !== "explore") state.tab = "explore";
        state.stack = [];
        render();
        break;

      case "open-sort":
        state.sheet = "sort";
        renderSheet();
        break;

      case "set-sort":
        state.sort = val;
        state.sheet = null;
        render();
        break;

      case "open-about":
        state.sheet = "about";
        renderSheet();
        break;

      case "open-help":
        state.sheet = "help";
        renderSheet();
        break;

      case "logout":
        toast("Logged out — demo only 🙂");
        break;

      case "set-diet":
        state.diet = val;
        render();
        break;

      case "reset-diet-area":
        state.diet = "all";
        state.area = "All Pune";
        render();
        break;

      case "set-food":
        state.diet = val;
        render();
        toast("Food preference saved · suggestions updated");
        break;

      case "toggle-pref":
        state.prefs[val] = !state.prefs[val];
        el.classList.toggle("is-on", state.prefs[val]);
        break;

      default:
        break;
    }
  }

  function toggleSiblings(el, on) {
    const parent = el.parentElement;
    if (!parent) return;
    Array.prototype.forEach.call(parent.children, function (c) { c.classList.remove("is-on"); });
    if (on) el.classList.add("is-on");
  }

  function confirmReserve() {
    const m = MESS_BY_ID[state.detailId];
    const meal = state.reserve.meal;
    const res = {
      id: "R" + Math.floor(2050 + Math.random() * 900),
      messId: m.id,
      meal: meal,
      seats: state.reserve.seats,
      time: meal === "Lunch" ? m.lunchSlot : m.dinnerSlot,
      day: "Today",
      status: "Reserved"
    };
    state.reservations.upcoming.unshift(res);
    state.lastRes = res;
    state.stack = ["home"];
    state.view = "confirmed";
    render();
  }

  function cancelReservation(rid) {
    let removed = null;
    state.reservations.upcoming = state.reservations.upcoming.filter(function (r) {
      if (r.id === rid) { removed = r; return false; }
      return true;
    });
    if (removed) {
      removed.status = "Cancelled";
      state.reservations.past.unshift(removed);
      render();
      toast("Reservation cancelled — it was free");
    }
  }

  /* ---------------------------------------------------------
     Events
  --------------------------------------------------------- */
  document.addEventListener("click", function (e) {
    const el = e.target.closest("[data-action]");
    if (!el) return;
    if (el.disabled) return;
    e.stopPropagation();
    handleAction(el.dataset.action, el);
  });

  document.addEventListener("input", function (e) {
    if (e.target.id === "explore-input") {
      state.exploreQuery = e.target.value;
      refreshResults();
    }
    if (e.target.id === "area-search") {
      const q = e.target.value.trim().toLowerCase();
      const list = document.getElementById("area-list") || document.getElementById("area-chips");
      if (!list) return;
      Array.prototype.forEach.call(list.children, function (c) {
        const name = c.dataset.name || "";
        c.style.display = !q || name.indexOf(q) > -1 ? "" : "none";
      });
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && state.sheet) {
      state.sheet = null;
      renderSheet();
    }
  });

  /* ---------------------------------------------------------
     Clock + boot
  --------------------------------------------------------- */
  function tick() {
    const el = document.getElementById("clock");
    if (!el) return;
    const d = new Date();
    let h = d.getHours();
    const mnt = String(d.getMinutes()).padStart(2, "0");
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    el.textContent = h + ":" + mnt + " " + ampm;
  }

  tick();
  setInterval(tick, 20000);
  render();
})();
