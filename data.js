/* =============================================================
   Aaj Kya Khaye? — prototype sample database
   -------------------------------------------------------------
   Rows 1-120 : the supplied mess list (name / location / rating).
   Added rows : the supplied non-veg & mixed mess listing
                (with review counts and price notes where given).
   Ratings marked "Not rated" / "—" stay null (never invented).
   Prices, menus, timings, distance, seats, monthly plans and
   veg / non-veg / Jain flags are GENERATED SAMPLE data for this
   MVP prototype and are labelled as such inside the app.
   ============================================================= */

const RAW = [
  ["Siddhivinayak Mess", "Mohan Nagar", 4.4],
  ["Varad Canteen", "Dhankawadi", 4.2],
  ["Madhura Mess & Caterers", "Trimurti Chowk, Dhankawadi", 4.2],
  ["Khopde Mess", "Kashinath Patil Nagar, Bibwewadi", 4.5],
  ["Rasmadhuri Canning & Foods", "Swami Vivekanand Road, Bibwewadi", 3.9],
  ["Rangoli Canteen", "SVCP Building, Vadgaon Budruk", 3.7],
  ["Dipali Mess", "Sinhgad College Road, Vadgaon Budruk", 4.1],
  ["Graduate Meswala & Dabewala", "Dhankawadi/Katraj", 4.7],
  ["S K Dining", "Chandrabhaga Nagar", 4.7],
  ["Ashwini Girls Mess", "Gangadhar S Walse Patil Road, Dhayari", 3.3],
  ["Vikas Rasoi", "Bharati Vidyapeeth Road, Katraj", 4.5],
  ["Kunal Bhosale Mess", "Chalis Bari Park, Market Yard", 4.2],
  ["Navruchi Mess", "Dhankawadi", 3.6],
  ["Vikas Rasoi", "Shani Mandir Road, Ambegaon Budruk", 4.6],
  ["Annapurna Mess", "Pune-Satara Road, Dhankawadi", 4.2],
  ["Bhabhi Mess", "Dhankawadi", 3.8],
  ["Tanvi Mess", "Sinhgad College Road, Ambegaon Pathar", 3.4],
  ["Amrapali Mess", "10/1 Ambegaon BK, Dhayari", 2.9],
  ["Chintamani Kerala Mess", "Ganesh Park, Chaitanya Nagar, Dhankawadi", 4.1],
  ["Swami Samarth Mess & Tiffin", "Katraj", 4.7],
  ["Bharati Vidyapeeth College Medical Canteen", "Bharati Vidyapeeth, Katraj", 4.5],
  ["Dnyanganga Canteen & Catering Services", "Dhankawadi", 4.7],
  ["Annapurna Mess", "Sinhgad College Road, Ambegaon Budruk", 3.7],
  ["Nadabrahm Messlow College", "Ambegaon Budruk/Vadgaon Dhayari", 4.8],
  ["Govinda Mess & Snacks", "Dhankawadi", 3.7],
  ["Shri Swami Samartha Mess", "Santosh Nagar Road, Katraj", 5.0],
  ["Reddy Auntie's Mess", "Subhash Terraces, Katraj", 3.6],
  ["Samarth Mess", "Narhe Gaon Road, Ambegaon Budruk", 4.8],
  ["Jijau Mess", "Mokarwadi, Narhe", 4.1],
  ["Shivshree Mess", "Ambegaon BK", 3.9],
  ["JSCOE Canteen", "Satar Nagar, Hadapsar", 3.4],
  ["Durga Mess", "Pune-Solapur Road, Hadapsar", 3.7],
  ["Jai Bhavani Bhojanalay", "Pune-Solapur Road, Hadapsar", 3.9],
  ["Akshay Patra Bhojanalay", "Seurm Company Road, Hadapsar", null],
  ["Annapurna Mess", "Bhekrai Nagar/Phursungi", null],
  ["Andhra Mess", "Pune-Saswad Road, Bhekrai Nagar", null],
  ["Om Sai Basaveshwar Mess", "Kalepadal, Hadapsar", null],
  ["Mitra Enterprises Mitrajeet Cafe", "Magarpatta Road, Hadapsar", null],
  ["Roji Roti Mess", "Bhekrai Nagar/Phursungi", null],
  ["Sai Samarth Mess", "Bhekrai Nagar/Phursungi", null],
  ["Garva Veg Non Veg Hotel & Mess", "Satav Nagar, Undri", null],
  ["Shriman Mess", "Bhekrai Nagar", null],
  ["Kaki's Kitchen", "Handewadi Road, Hadapsar", null],
  ["Piyush Mess", "Kalepadal, Hadapsar", 4.5],
  ["Mule Family Mess", "Malwadi, Tupe Patil Road, Hadapsar", null],
  ["Annapurna Foods", "Magarpatta City, Hadapsar", 4.1],
  ["Janseva Bhojanalay", "Pune-Solapur Road, Hadapsar", 4.7],
  ["Khushi Mess", "Saswad Road, Hadapsar", 3.5],
  ["Balaji Canteen", "Hadapsar", 4.5],
  ["Shriya Mess", "Laxmi Colony, Hadapsar", null],
  ["Swami's Mess", "Fursungi", null],
  ["Swami's Mess", "Handewadi Road, Hadapsar", null],
  ["Panchatattva Foods", "Papade Vasti, Hadapsar", null],
  ["Khajinder Snacks & Mess", "Papade Vasti, Hadapsar", null],
  ["Sahyadri Bhojanalay", "Kalepadal Road, Hadapsar", 4.5],
  ["Sadguru Mess", "Bhekrai Nagar, Hadapsar", 4.5],
  ["Annapurna Mess Center", "Shiv Shakti Chowk, Fursungi", 4.3],
  ["Bhakti Hotel & Mess", "Yashraj Green Crystal, Hadapsar", 3.7],
  ["Shailesh Mess", "Subhash Nagar, Gondhalenagar, Hadapsar", 5.0],
  ["Sahil Mess", "Manjari Road, Hadapsar", null],
  ["Mane Mess", "Karvenagar", 4.7],
  ["Prachi's Kitchen - Homemade Food and Tiffin Service", "Navipeth/Sadashiv Peth", 4.8],
  ["Student Cooperative Mess, Boys Hostel, COAP", "Agriculture College, Shivajinagar", 4.5],
  ["Sairam Mess (South)", "Dhanori", 4.9],
  ["Hare Krishna Mess", "Kothrud", 5.0],
  ["Magic Meals", "Deccan Gymkhana", 4.1],
  ["Suvernarekha Mess", "Shivajinagar", 4.7],
  ["Chatur Bhojanalay / Aaditya Mess", "Karvenagar", 4.4],
  ["Ammachi Mess", "Viman Nagar", 3.9],
  ["Joshi Mess", "Wadgaon Sheri", 3.9],
  ["Kalyani Tiffin Room", "Kalyani Nagar", 3.9],
  ["Madras Tiffin Room", "Koregaon Park", 4.3],
  ["Shivshambhu Tiffiin Mess", "Hadapsar/Magarpatta", 4.7],
  ["Mera Bharat Mess", "Kondhwa Budruk", 5.0],
  ["Gurudatta Mess", "Baner", 4.4],
  ["Jayesh Mess & Snacks Center", "Mahalunge/Balewadi Road", 5.0],
  ["Shree Mankeshwar Bhojnalay and Nashta Center", "Wakad", 4.6],
  ["Shree Kamakshi Hotel And Snacks (Monthly Mess)", "Karvenagar/Kothrud", 4.9],
  ["Swami Om Mess", "Karvenagar", 4.7],
  ["Sujata Mess – Home Style Veg Meals", "Karvenagar", 4.6],
  ["Laxmi Mess Services", "Bavdhan", 5.0],
  ["Annapurna Snacks and Mess", "Erandwane", 4.2],
  ["Baride Mess", "Navi Peth/Sadashiv Peth", 4.0],
  ["Avadhut Monthly Mess", "Navi/Sadashiv Peth", 5.0],
  ["Chitra di Mess", "Wadgaon Sheri", 4.3],
  ["SWAD MESS", "Chandan Nagar/Kharadi", 4.9],
  ["Deepa's Mess", "Hadapsar", 4.6],
  ["Annapurna Center | Mess Service", "Keshav Nagar/Mundhwa", 4.5],
  ["Food Home Tiffin Service", "Keshav Nagar/Manjari", 4.9],
  ["Bhuleshwar Mess", "Bhekrai Nagar/Phursungi", 4.1],
  ["Wagheshwari Mess", "Bhekrai Nagar/Tukai Darshan", 5.0],
  ["Riwayat Tiffins by A T Foods (Mess & Catering Service)", "Kausar Baugh/Kondhwa", 4.9],
  ["S.S Caterers", "Fatima Nagar/Wanowrie", 4.5],
  ["Ruchira Food Services Catering & Mess", "Kondhwa", 3.5],
  ["Narendra Mauli Lunch Home Mess", "Wagholi", 4.5],
  ["Shree Sai Mess", "Lohegaon", 4.8],
  ["Mauli Mess", "Dhanori", 5.0],
  ["Aaswad Kitchen", "Vishrantwadi", 4.8],
  ["Foodorko", "Pimple Saudagar", 4.8],
  ["Jai Malhar Mess", "Pimple Nilakh", 4.7],
  ["Sri Saai Mess", "Pimple Gurav/New Sangavi", 4.2],
  ["Hotel Shree Krishna Mess & Snack Centre", "Navi Sangvi", 5.0],
  ["Gharguti Mess & Tiffin", "Moshi", 5.0],
  ["Ghar Ka Khana", "Vishrantwadi", 4.7],
  ["South Indian Mess", "Rasta Peth", 4.3],
  ["AKASH PUNJABI MESS (APM)", "Katraj", 4.7],
  ["Renuka Monthly Mess & Caterers", "Dhankawadi", 4.9],
  ["Green Souls Kitchens - Tiffin Services", "Sinhagad Road/Hingne Khurd", 4.0],
  ["Fergusson College Mess A", "Shivajinagar", 4.1],
  ["Varad Ruchi Boys Hostel & Mess", "Tingre Nagar/Vishrantwadi", 4.7],
  ["Aai Mess (Pure Veg)", "Dhankawadi", 4.9],
  ["SWAD Snacks Centre and Mess", "Hingne Khurd/Sahakar Nagar", 4.8],
  ["Maheshvari Mess", "Kondhwa", 4.3],
  ["Sadhana Shinde Monthly Mess", "Market Yard/Maharshi Nagar", 3.1],
  ["Gujar Mess, The Canteen", "Kasba Peth", 4.5],
  ["Sai Bhojnalay (Monthly Mess)", "Moshi", 4.6],
  ["Anna Mess", "Bhosari", 4.2],
  ["Seema's Tiffin", "Dighi", 4.8],
  ["Gokul Mess and Catering", "Alandi/Dehu-Alandi Road", 4.1],
  ["PRERANA MONTHLY MESS", "Talegaon Dabhade", 5.0]
];

/* Added listing — non-veg / mixed messes
   [name, location, rating, reviews, price note, diet]           */
const EXTRA = [
  ["Khandekar Mess", "Gokhalenagar", 3.7, 108, null, "nonveg"],
  ["Kshatriya Khanawal", "Khadki", 4.5, 24, null, "nonveg"],
  ["Parth Restaurant", "Kothrud", 4.1, 475, "₹550 for two", "nonveg"],
  ["Sugras Foods", "Wakad", 3.9, 39, "₹350 for two", "nonveg"],
  ["MR Sanjay", "Budhwar Peth / Shivajinagar Road", 4.1, 12, null, "nonveg"],
  ["Mejwani Veg Non-Veg", "Kirkatwadi / Kolhewadi", 4.0, 482, "Under ₹500 dining listing", "both"],
  ["Hotel Bhushan Veg Nonveg", "Pune", 5.0, null, null, "both"],
  ["Gayatri Mess", "Shaniwar Peth", 4.0, 4, null, "nonveg"],
  ["Eklavya Mess", "Warje", 4.5, null, null, "nonveg"],
  ["Shri Mhasoba Khanaval", "Pune", 4.5, null, null, "nonveg"],
  ["Hotel Padmavati And Dhanve Mess", "Pune", 5.0, null, null, "nonveg"],
  ["Balaji Mess And Hotel", "Moje Chal, Lohegaon", 5.0, null, null, "nonveg"],
  ["Akash Punjabi Mess (APM)", "Katraj", 4.7, 20, null, "nonveg"],
  ["Durga Mess", "Pune", null, null, null, "nonveg"],
  ["Jagtap Mess", "Pune", null, null, null, "nonveg"],
  ["Vidarbha Snacks Center", "Pune", null, null, null, "nonveg"],
  ["Sagar Mess", "Pune", null, null, null, "nonveg"],
  ["Hotel Konkan Swad", "Pune", null, null, null, "nonveg"],
  ["Annapurna Mess (Jadhav's)", "Karve Road / Deccan", 5.0, null, null, "nonveg"],
  ["Kanik's Mess", "Pune", 5.0, null, null, "nonveg"],
  ["Hotel Andhra Mess", "Yerawada", null, null, "Chicken/non-veg menu", "nonveg"],
  ["Gurudatta Mess", "Baner", 4.4, 298, "Chicken/egg dishes; prices vary", "both"],
  ["Kerala Mess", "Dehu Road", 4.2, 91, "₹200 for two", "nonveg"]
];

/* deterministic pseudo-random so every reload looks identical */
function seeded(n, salt) {
  const x = Math.sin(n * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function areasOf(location) {
  const tail = location.split(",").pop().trim();
  return tail.split("/").map((s) => s.trim()).filter(Boolean);
}

/* ---------------- menus (sample) ---------------- */
const VEG_MENUS = [
  {
    style: "Maharashtrian ghar ka khana",
    lunch: ["Roti", "Dal", "Rice", "Sabzi", "Salad"],
    dinner: ["Roti", "Dal", "Rice", "Sabzi", "Dessert"]
  },
  {
    style: "homely dal-chawal style meals",
    lunch: ["Chapati", "Amti", "Rice", "Bhaji", "Papad"],
    dinner: ["Chapati", "Amti", "Rice", "Kosambari", "Sheera"]
  },
  {
    style: "simple rotating veg thali",
    lunch: ["Roti", "Kadhi", "Rice", "Seasonal Sabzi", "Onion Salad"],
    dinner: ["Roti", "Kadhi", "Rice", "Seasonal Sabzi", "Kheer"]
  },
  {
    style: "Bhakri-thalipeeth style meals",
    lunch: ["Bhakri", "Pithla", "Rice", "Thecha", "Salad"],
    dinner: ["Bhakri", "Pithla", "Rice", "Sabzi", "Sweet"]
  },
  {
    style: "North Indian style home food",
    lunch: ["Paratha", "Dal Tadka", "Rice", "Sabzi", "Curd"],
    dinner: ["Paratha", "Dal Tadka", "Rice", "Sabzi", "Sweet Dish"]
  },
  {
    style: "South Indian style meals",
    lunch: ["Idli", "Sambar", "Rice", "Rasam", "Poriyal"],
    dinner: ["Dosai", "Sambar", "Rice", "Rasam", "Payasam"]
  }
];

const NONVEG_MENUS = [
  {
    style: "non-veg ghar ka khana",
    lunch: ["Chapati", "Chicken Masala", "Rice", "Dal", "Salad"],
    dinner: ["Chapati", "Chicken Curry", "Rice", "Sabzi", "Dessert"]
  },
  {
    style: "egg and chicken style meals",
    lunch: ["Roti", "Egg Bhurji", "Rice", "Rasam", "Onion Salad"],
    dinner: ["Roti", "Chicken Sukka", "Rice", "Dal", "Sweet"]
  },
  {
    style: "Maharashtrian non-veg meals",
    lunch: ["Bhakri", "Kanda Chicken", "Rice", "Thecha", "Salad"],
    dinner: ["Chapati", "Malvani Rassa", "Rice", "Sabzi", "Sheera"]
  }
];

const GRADS = [
  "linear-gradient(135deg,#FFB25E,#F2711C)",
  "linear-gradient(135deg,#FFD98D,#F0A33A)",
  "linear-gradient(135deg,#FF9A6B,#E2542C)",
  "linear-gradient(135deg,#FFE1A8,#EF8C2B)",
  "linear-gradient(135deg,#F9C46B,#D9631F)",
  "linear-gradient(135deg,#FFC58A,#E9661D)"
];

const EMOJIS = ["🍛", "🍲", "🥘", "🍚", "🍜"];

/* ---------------- derived helpers ---------------- */

function dietOf(name, n) {
  const low = name.toLowerCase();
  if (low.indexOf("non veg") > -1 || low.indexOf("non-veg") > -1 || low.indexOf("nonveg") > -1) return "both";
  if (low.indexOf("veg") > -1) return "veg";
  return seeded(n, 9) < 0.5 ? "veg" : "both";
}

function pickMenu(diet, n) {
  const vi = Math.floor(seeded(n, 10) * VEG_MENUS.length);
  const ni = Math.floor(seeded(n, 15) * NONVEG_MENUS.length);
  if (diet === "veg") return VEG_MENUS[vi];
  if (diet === "nonveg") return NONVEG_MENUS[ni];
  return seeded(n, 14) < 0.45 ? NONVEG_MENUS[ni] : VEG_MENUS[vi];
}

function sampleFields(n, areas) {
  const lunch = 60 + Math.round(seeded(n, 1) * 6) * 10;
  const dinner = 70 + Math.round(seeded(n, 2) * 6) * 10;
  const totalSeats = 10 + Math.round(seeded(n, 8) * 20);
  return {
    lunch: lunch,
    dinner: dinner,
    price: Math.min(lunch, dinner),
    hasMonthly: seeded(n, 3) < 0.45,
    monthlyPrice: 2600 + Math.round(seeded(n, 7) * 10) * 100,
    distance: Math.round((0.3 + seeded(n, 4) * 5.4) * 10) / 10,
    totalSeats: totalSeats,
    seats: Math.round(seeded(n, 5) * totalSeats),
    open: seeded(n, 6) < 0.72,
    lunchTime: "12:00 PM – 3:00 PM",
    dinnerTime: "7:30 PM – 10:30 PM",
    lunchSlot: "12:30 PM",
    dinnerSlot: "7:30 PM",
    grad: GRADS[Math.floor(seeded(n, 11) * GRADS.length)],
    emoji: EMOJIS[Math.floor(seeded(n, 12) * EMOJIS.length)],
    areas: areas,
    area: areas[0]
  };
}

function descFor(areas, diet, style) {
  const head = diet === "veg" ? "Pure veg " : diet === "nonveg" ? "Non-veg " : "Homely ";
  return (
    head + style + " served fresh every day near " + areas[0] +
    ". Simple, filling and affordable — made for students, bachelors and anyone staying away from home."
  );
}

function buildMess(row, n, extra) {
  const name = row[0];
  const location = row[1];
  const rating = row[2];
  const areas = areasOf(location);
  const s = sampleFields(n, areas);
  const diet = (extra && extra.diet) || dietOf(name, n);
  const menu = pickMenu(diet, n);
  const out = Object.assign({
    id: n,
    name: name,
    location: location,
    rating: rating,
    reviews: extra ? extra.reviews : null,
    priceNote: extra ? extra.priceNote : null,
    diet: diet,
    jain: extra ? false : diet === "veg" && seeded(n, 13) < 0.32,
    menuStyle: menu.style,
    menu: menu,
    desc: descFor(areas, diet, menu.style),
    veg: diet === "veg"
  }, s);
  out.hasMonthly = out.hasMonthly || name.toLowerCase().indexOf("monthly") > -1;
  return out;
}

const MESS = RAW.map((row, i) => buildMess(row, i + 1));

/* merge the added non-veg / mixed listing (or append it) */
EXTRA.forEach((x, i) => {
  const n = 121 + i;
  const name = x[0];
  const location = x[1];
  const rating = x[2];
  const reviews = x[3];
  const priceNote = x[4];
  const diet = x[5];

  const found = MESS.find((m) => m.name.toLowerCase() === name.toLowerCase());
  if (found) {
    found.diet = diet;
    found.veg = diet === "veg";
    found.jain = false;
    if (found.rating === null && rating !== null) found.rating = rating;
    found.reviews = reviews;
    found.priceNote = priceNote;
    found.menu = pickMenu(diet, found.id);
    found.menuStyle = found.menu.style;
    found.desc = descFor(found.areas, diet, found.menu.style);
    return;
  }

  MESS.push(buildMess([name, location, rating], n, { diet: diet, reviews: reviews, priceNote: priceNote }));
});

MESS.sort((a, b) => a.id - b.id);

const MESS_BY_ID = {};
MESS.forEach((m) => { MESS_BY_ID[m.id] = m; });

const AREA_COUNTS = {};
MESS.forEach((m) => m.areas.forEach((a) => { AREA_COUNTS[a] = (AREA_COUNTS[a] || 0) + 1; }));

const AREAS = Object.keys(AREA_COUNTS)
  .map((name) => ({ name: name, count: AREA_COUNTS[name] }))
  .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

const DIET_TABS = [
  { id: "all", label: "All", emoji: "🍽️" },
  { id: "veg", label: "Veg", emoji: "🌱" },
  { id: "nonveg", label: "Non-veg", emoji: "🍗" },
  { id: "jain", label: "Jain", emoji: "🙏" }
];

function dietMatch(m, diet) {
  if (diet === "veg") return m.diet === "veg";
  if (diet === "nonveg") return m.diet !== "veg";
  if (diet === "jain") return !!m.jain;
  return true;
}

/* ------------------------------------------------------------------
   MESS PHOTOGRAPHS - every listing gets its own real, high-resolution
   food photograph. All files sit in the SAME flat folder as index.html
   (no subfolders), e.g.  veg-01.jpg / food-01.jpg
   (author, licence and source page for each file:
    CREDITS.txt  /  sources.csv)

     veg-NN.jpg   used by pure-veg messes
     food-NN.jpg  used by messes that serve non-veg

   Source: Wikimedia Commons (free / open-licensed content only).
   Assignment runs in listing order, so each mess gets a unique file and
   a vegetarian mess never shows a non-veg photograph. If a file is ever
   missing it simply falls back to the generated gradient thumbnail.
   ------------------------------------------------------------------ */

function photoPool(prefix, total, missing) {
  const out = [];
  for (let i = 1; i <= total; i++) {
    if (missing.indexOf(i) > -1) continue;
    out.push(prefix + "-" + (i < 10 ? "0" + i : i) + ".jpg");
  }
  return out;
}

/* gaps = files Wikimedia rate-limited (429) on the last fetch */
const PHOTO_VEG = photoPool("veg", 65, [1, 3, 17, 44, 49]);
const PHOTO_FOOD = photoPool("food", 95, [7]);

(function assignPhotos() {
  let v = 0;
  let f = 0;
  MESS.forEach(function (m) {
    if (m.diet === "veg") {
      m.photo = PHOTO_VEG[v % PHOTO_VEG.length];
      v++;
    } else {
      m.photo = PHOTO_FOOD[f % PHOTO_FOOD.length];
      f++;
    }
  });
})();
