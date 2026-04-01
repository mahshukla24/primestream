const NEWS_API_KEY = "89e2055d344e11518febbae8a42b5b44";
const NEWS_URL = `https://gnews.io/api/v4/top-headlines?lang=en&topic=world&max=25&apikey=${NEWS_API_KEY}`;

const YOUTUBE_API_KEY = "AIzaSyA0glsPFgjtnx2dJCCxn-xeRvKSHweDaXA";
const YOUTUBE_BASE = "https://www.googleapis.com/youtube/v3/search";
const CORS_PROXIES = ["https://api.allorigins.win/raw?url=", "https://corsproxy.io/?"];
const ALLORIGINS_GET = "https://api.allorigins.win/get?url=";

const TMDB_API_KEY = "6ecc4d6938d362e905e2606fe99a3d70";
const TMDB_BASE = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/original";

const API_CACHE_PREFIX = "primeStream.apiCache.";
const API_CACHE_TTL_MS = 1000 * 60 * 30;
const FETCH_TIMEOUT_MS = 12000;
const MOVIE_PLACEHOLDER = "https://via.placeholder.com/600x900/141b2f/ffffff?text=Prime+Stream";
const NEWS_PLACEHOLDER = "https://via.placeholder.com/900x520/11192d/ffffff?text=World+News";
const SPORTS_PLACEHOLDER = "https://via.placeholder.com/900x520/11192d/ffffff?text=Sports+Highlights";
const ADULT_KEYWORDS_RE =
  /\b(nude|nudity|porn|xxx|sex|erotic|hot scene|18\+|adult movie|uncut|sensual|intimate|bed scene)\b/i;
const NO_ROMANCE_RE = /\b(romance|romantic|love story|erotic|sensual)\b/i;
const ROMANCE_KEYWORDS_RE =
  /\b(romance|romantic|kiss|kissing|love story|love affair|dating|passion|seduction|sensual)\b/i;
const ALLOWED_MOVIE_LANGS = new Set(["en", "hi"]);
const NON_ALLOWED_LANG_KEYWORDS_RE =
  /\b(tamil|telugu|malayalam|kannada|marathi|bengali|punjabi|gujarati|spanish|espanol|portuguese|bahasa|indonesian|turkish|thai|korean|japanese|russian|urdu)\b/i;
const NON_ALLOWED_SCRIPT_RE =
  /[\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F\u0980-\u09FF\u0900-\u097F\u0600-\u06FF\u3040-\u30FF\u4E00-\u9FFF]/;
const ENGLISH_TRAILER_SIGNAL_RE = /\b(official|trailer|movie|film|teaser|english|hindi|hd)\b/i;
const HINDI_TRAILER_SIGNAL_RE = /ट्रेलर|हिंदी|हिन्दी/i;
const SPORTS_KEYWORD_RE =
  /\b(highlight|highlights|cricket|football|soccer|chess|badminton|goal|wicket|inning|checkmate|tournament|cup|league|final|semi|match)\b/i;
const BLOCKED_SPORTS_LATIN_RE =
  /\b(resumen|partido|golazo|bahasa|naik|dunia|pertandingan|liga indonesia|turkiye)\b/i;
const TRUSTED_SPORTS_CHANNEL_RE =
  /\b(star sports|icc|bcci|cricket australia|england cricket|blackcaps|new zealand cricket|cricbuzz|espncricinfo|sky sports|sony sports|supersport|uefa|fifa|premier league|fide|bwf)\b/i;
const IMPORTANT_SPORTS_RE =
  /\b(world cup|icc|champions trophy|ipl|ashes|bgt|euro|ucl|champions league|premier league|final|semi final|knockout|grandmaster|fide|olympics)\b/i;
const NEWS_TOPIC_KEYWORDS = {
  tech: /\b(tech|technology|ai|artificial intelligence|software|app|startup|chip|cyber|google|microsoft|apple|meta)\b/i,
  business: /\b(business|market|stock|stocks|finance|economy|bank|trade|investment|company|earnings|ipo)\b/i,
  science: /\b(science|research|space|nasa|physics|biology|climate|astronomy|laboratory|innovation)\b/i
};

const MOVIES = [
  {
    title: "Spider-Man: Far From Home",
    poster: "https://image.tmdb.org/t/p/original/4q2NNj4S5dG2RLF9CpXsej7yXl.jpg",
    trailer: "https://www.youtube.com/embed/aBlsrtxuwss",
    rating: 7.4,
    category: "Marvel",
    moods: ["Action", "Mind-blowing"],
    tags: ["Action", "Top10"],
    description: "Peter Parker faces global threats while balancing hero duties with teenage life."
  },
  {
    title: "Spider-Man: Homecoming",
    poster: "https://image.tmdb.org/t/p/original/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg",
    trailer: "https://www.youtube.com/embed/rk-dF1lIbIg",
    rating: 7.4,
    category: "Marvel",
    moods: ["Action", "Fun"],
    tags: ["Action", "Top10"],
    description: "A young Peter Parker trains under Tony Stark while proving himself as Spider-Man."
  },
  {
    title: "Avengers: Endgame",
    poster: "https://image.tmdb.org/t/p/original/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    trailer: "https://www.youtube.com/embed/TcMBFSGVi1c",
    rating: 8.4,
    category: "Marvel",
    moods: ["Action", "Mind-blowing"],
    tags: ["Action", "Top10"],
    description: "The Avengers assemble one last time to restore what was lost."
  },
  {
    title: "Avengers: Infinity War",
    poster: "https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    trailer: "https://www.youtube.com/embed/6ZfuNTqbHE8",
    rating: 8.4,
    category: "Marvel",
    moods: ["Action", "Mind-blowing"],
    tags: ["Action", "Top10"],
    description: "Heroes unite across the universe against Thanos and his Infinity Stone mission."
  },
  {
    title: "Iron Man",
    poster: "https://image.tmdb.org/t/p/original/78lPtwv72eTNqFW9COBYI0dWDJa.jpg",
    trailer: "https://www.youtube.com/embed/8hYlB38asDY",
    rating: 7.9,
    category: "Marvel",
    moods: ["Action", "Fun"],
    tags: ["Top10"],
    description: "Tony Stark builds the first Iron Man suit and changes superhero history."
  },
  {
    title: "Doctor Strange",
    poster: "https://image.tmdb.org/t/p/original/uGBVj3bEbCoZbDjjl9wTxcygko1.jpg",
    trailer: "https://www.youtube.com/embed/HSzx-zryEgM",
    rating: 7.5,
    category: "Marvel",
    moods: ["Mind-blowing"],
    tags: ["Mind", "Top10"],
    description: "A gifted surgeon discovers the mystic arts and multiverse-level threats."
  },
  {
    title: "Thor: Ragnarok",
    poster: "https://image.tmdb.org/t/p/original/kaIfm5ryEOwYg8mLbq8HkPuM1Fo.jpg",
    trailer: "https://www.youtube.com/embed/ue80QwXMRHg",
    rating: 7.9,
    category: "Marvel",
    moods: ["Action", "Fun"],
    tags: ["Action"],
    description: "Thor battles to save Asgard and stop Hela in a cosmic adventure."
  },
  {
    title: "Black Panther",
    poster: "https://image.tmdb.org/t/p/original/uxzzxijgPIY7slzFvMotPv8wjKA.jpg",
    trailer: "https://www.youtube.com/embed/xjDjIWPwcPU",
    rating: 7.3,
    category: "Marvel",
    moods: ["Action"],
    tags: ["Action"],
    description: "T'Challa returns to Wakanda and rises as a king and protector."
  },
  {
    title: "Jawan",
    poster: "https://image.tmdb.org/t/p/original/jFt1gS4BGHlK8xt76Y81Alp4dbt.jpg",
    trailer: "https://www.youtube.com/embed/MWOlnZSnXJo",
    rating: 7.0,
    category: "Bollywood",
    moods: ["Action", "Fun"],
    tags: ["Action", "Top10"],
    description: "A gripping action thriller blending emotion, justice, and big-screen spectacle."
  },
  {
    title: "Pathaan",
    poster: "https://image.tmdb.org/t/p/original/vqu4z0I8b4g3I9fJ4cM0A8Qj7J7.jpg",
    trailer: "https://www.youtube.com/embed/vqu4z34wENw",
    rating: 5.8,
    category: "Bollywood",
    moods: ["Action"],
    tags: ["Action"],
    description: "An elite operative returns for a high-risk mission with global stakes."
  },
  {
    title: "12th Fail",
    poster: "https://image.tmdb.org/t/p/original/6eM4lR5G2fY5D8yP4K8fS7vQd3W.jpg",
    trailer: "https://www.youtube.com/embed/WeMjo701Ni8",
    rating: 8.7,
    category: "Bollywood",
    moods: ["Mind-blowing", "Fun"],
    tags: ["Top10", "Mind"],
    description: "An inspiring story of perseverance, ambition, and education against all odds."
  },
  {
    title: "Shershaah",
    poster: "https://image.tmdb.org/t/p/original/52SgH0kLiSpWdJDOZvhAyy34uhe.jpg",
    trailer: "https://www.youtube.com/embed/Q0FTXnefVBA",
    rating: 8.4,
    category: "Bollywood",
    moods: ["Action"],
    tags: ["Top10"],
    description: "A patriotic war drama honoring the courage of Captain Vikram Batra."
  },
  {
    title: "RRR",
    poster: "https://image.tmdb.org/t/p/original/lrWj4MV7h9f8hYvJQvP8H4fR5xR.jpg",
    trailer: "https://www.youtube.com/embed/f_vbAtFSEc0",
    rating: 7.8,
    category: "Bollywood",
    moods: ["Action", "Fun"],
    tags: ["Action", "Top10"],
    description: "A high-energy epic about friendship, resistance, and larger-than-life action."
  },
  {
    title: "KGF: Chapter 2",
    poster: "https://image.tmdb.org/t/p/original/khNVygolU0TxLIDWff5tQlAhZ23.jpg",
    trailer: "https://www.youtube.com/embed/JKa05nyUmuQ",
    rating: 8.3,
    category: "Bollywood",
    moods: ["Action"],
    tags: ["Action", "Top10"],
    description: "Rocky’s rise continues in a gritty power saga filled with style and intensity."
  },
  {
    title: "Inception",
    poster: "https://image.tmdb.org/t/p/original/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    trailer: "https://www.youtube.com/embed/YoHD9XEInc0",
    rating: 8.8,
    category: "Hollywood",
    moods: ["Mind-blowing", "Action"],
    tags: ["Mind", "Top10"],
    description: "A dream-heist thriller where reality bends across layered subconscious worlds."
  },
  {
    title: "Interstellar",
    poster: "https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    trailer: "https://www.youtube.com/embed/zSWdZVtXT7E",
    rating: 8.7,
    category: "Hollywood",
    moods: ["Mind-blowing"],
    tags: ["Mind", "Top10"],
    description: "A space odyssey about survival, time, and humanity’s search for a new home."
  },
  {
    title: "The Dark Knight",
    poster: "https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    trailer: "https://www.youtube.com/embed/EXeTwQWrcwY",
    rating: 9.0,
    category: "Hollywood",
    moods: ["Action", "Mind-blowing"],
    tags: ["Action", "Top10"],
    description: "Batman faces the Joker in a tense, iconic crime thriller."
  },
  {
    title: "The Matrix",
    poster: "https://image.tmdb.org/t/p/original/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    trailer: "https://www.youtube.com/embed/vKQi3bBA1y8",
    rating: 8.7,
    category: "Hollywood",
    moods: ["Mind-blowing", "Action"],
    tags: ["Mind", "Top10"],
    description: "A hacker uncovers a shocking reality and joins a rebellion for freedom."
  },
  {
    title: "Forrest Gump",
    poster: "https://image.tmdb.org/t/p/original/saHP97rTPS5eLmrLQEcANmKrsFl.jpg",
    trailer: "https://www.youtube.com/embed/bLvqoHBptjg",
    rating: 8.8,
    category: "Hollywood",
    moods: ["Fun"],
    tags: ["Top10"],
    description: "An uplifting journey through life, love, and history with Forrest Gump."
  },
  {
    title: "John Wick",
    poster: "https://image.tmdb.org/t/p/original/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg",
    trailer: "https://www.youtube.com/embed/2AUmvWm5ZDQ",
    rating: 7.4,
    category: "Hollywood",
    moods: ["Action"],
    tags: ["Action"],
    description: "A legendary assassin returns for a relentless revenge mission."
  },
  {
    title: "Mad Max: Fury Road",
    poster: "https://image.tmdb.org/t/p/original/hA2ple9q4qnwxp3hKVNhroipsir.jpg",
    trailer: "https://www.youtube.com/embed/hEJnMQG9ev8",
    rating: 8.1,
    category: "Hollywood",
    moods: ["Action", "Mind-blowing"],
    tags: ["Action"],
    description: "A high-octane chase across a post-apocalyptic wasteland."
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    poster: "https://image.tmdb.org/t/p/original/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg",
    trailer: "https://www.youtube.com/embed/VyHV0BRtdxo",
    rating: 7.6,
    category: "Hollywood",
    moods: ["Fun", "Mind-blowing"],
    tags: ["Mind", "Fantasy"],
    description: "A young wizard discovers Hogwarts and begins a magical journey."
  },
  {
    title: "Harry Potter and the Deathly Hallows: Part 2",
    poster: "https://image.tmdb.org/t/p/original/c54HpQmuwXjHq2C9wmoACjxoom3.jpg",
    trailer: "https://www.youtube.com/embed/mObK5XD8udk",
    rating: 8.1,
    category: "Hollywood",
    moods: ["Action", "Mind-blowing"],
    tags: ["Action", "Mind", "Fantasy"],
    description: "The final battle at Hogwarts decides the fate of the wizarding world."
  },
  {
    title: "The Chronicles of Narnia: The Lion, the Witch and the Wardrobe",
    poster: "https://image.tmdb.org/t/p/original/iREd0rNCjYdf5Ar0vfaW32yrkm.jpg",
    trailer: "https://www.youtube.com/embed/usEkWtuNn-w",
    rating: 6.9,
    category: "Hollywood",
    moods: ["Fun", "Mind-blowing"],
    tags: ["Fantasy"],
    description: "Four siblings enter Narnia and join a legendary battle against dark magic."
  },
  {
    title: "Pirates of the Caribbean: The Curse of the Black Pearl",
    poster: "https://image.tmdb.org/t/p/original/z8onk7LV9Mmw6zKz4hT6pzzvmvl.jpg",
    trailer: "https://www.youtube.com/embed/naQr0uTrH_s",
    rating: 8.1,
    category: "Hollywood",
    moods: ["Action", "Fun"],
    tags: ["Action", "Fantasy"],
    description: "Captain Jack Sparrow races to break a cursed pirate legend."
  },
  {
    title: "Frozen II",
    poster: "https://image.tmdb.org/t/p/original/mINJaa34MtknCYl5AjtNJzWj8cD.jpg",
    trailer: "https://www.youtube.com/embed/Zi4LMpSDccc",
    rating: 6.8,
    category: "Hollywood",
    moods: ["Fun"],
    tags: ["Fantasy"],
    description: "Elsa and Anna journey beyond Arendelle to uncover ancient truths."
  },
  {
    title: "Moana",
    poster: "https://image.tmdb.org/t/p/original/9tzN8sPbyod2dsa0lwuvrwBDWra.jpg",
    trailer: "https://www.youtube.com/embed/LKFuXETZUsI",
    rating: 7.6,
    category: "Hollywood",
    moods: ["Fun", "Mind-blowing"],
    tags: ["Fantasy"],
    description: "A fearless voyager sails with Maui to restore the heart of Te Fiti."
  },
  {
    title: "Aladdin",
    poster: "https://image.tmdb.org/t/p/original/3iYQTLGoy7QnjcUYRJy4YrAgGvp.jpg",
    trailer: "https://www.youtube.com/embed/foyufD52aog",
    rating: 7.0,
    category: "Hollywood",
    moods: ["Fun"],
    tags: ["Fantasy"],
    description: "A street-smart dreamer discovers a magic lamp and a whole new world."
  }
];

const SPORTS_QUERIES = {
  cricket: "star sports cricket highlights english t20 odi world cup ipl",
  football: "official football highlights english commentary ucl premier league",
  chess: "chess championship highlights english commentary",
  badminton: "badminton highlights world tour english commentary official"
};

const SPORTS_QUERY_POOL = {
  cricket: [
    "star sports cricket highlights english t20 odi world cup ipl",
    "rcb vs csk highlights english commentary",
    "india vs australia t20 highlights english",
    "india vs south africa odi highlights english",
    "new zealand vs south africa highlights english",
    "australia vs new zealand highlights english",
    "icc t20 world cup highlights english",
    "one day international cricket highlights english",
    "cricket test match highlights english commentary official",
    "ipl full match highlights english official"
  ],
  football: [
    "official football highlights english commentary ucl premier league",
    "uefa champions league highlights english official",
    "premier league match highlights english official",
    "la liga highlights english commentary",
    "serie a highlights english commentary",
    "fifa world cup qualifiers highlights english official"
  ],
  chess: [
    "chess championship highlights english commentary",
    "fide candidates highlights english",
    "chess world cup highlights english",
    "world chess championship game recap english",
    "chess tactical highlights english"
  ],
  badminton: [
    "badminton highlights world tour english commentary",
    "bwf world championships highlights english",
    "bwf super series highlights english",
    "badminton finals highlights english commentary",
    "all england badminton highlights english"
  ]
};

const DISCOVER_ENDPOINTS = [
  `${TMDB_BASE}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=`,
  `${TMDB_BASE}/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-US&page=`,
  `${TMDB_BASE}/trending/movie/week?api_key=${TMDB_API_KEY}&page=`,
  `${TMDB_BASE}/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=`,
  `${TMDB_BASE}/movie/upcoming?api_key=${TMDB_API_KEY}&language=en-US&page=`
];

const STORAGE = {
  users: "primeStream.users",
  user: "primeStream.user",
  fallbackRecent: "primeStream.guest.recent",
  fallbackContinue: "primeStream.guest.continue",
  movieAssets: "primeStream.movieAssets",
  discoverCache: "primeStream.discoverCache"
};

const state = {
  section: "home",
  mood: "Action",
  newsFilter: "all",
  sportsTab: "cricket",
  pendingAction: null,
  news: [],
  sportsVideos: [],
  discoverMovies: [],
  movieSearchResults: [],
  dynamicMovies: {},
  newsCache: {},
  sportsCache: {},
  trailerCache: {},
  movieAssetCache: getJSON(STORAGE.movieAssets, {}),
  hoverTimers: {},
  heroMovie: MOVIES.find((movie) => movie.title.includes("Spider-Man")) || MOVIES[0],
  newsDisplayCount: 24,
  sportsDisplayCount: 36,
  discoverPage: 1,
  newsFetchSeed: 0,
  movieQueryIndex: 0,
  sportsQueryIndex: {
    cricket: 0,
    football: 0,
    chess: 0,
    badminton: 0
  },
  sportsLoadToken: 0,
  reviewApiCache: {},
  lastScrollY: 0,
  currentSearchTerm: "",
  searchDebounceTimer: null,
  reviewSearchTerm: "",
  newsLoadToken: 0
};

const el = {
  navbar: document.getElementById("navbar"),
  homeBtn: document.getElementById("homeBtn"),
  sectionBtn: document.getElementById("sectionBtn"),
  myListBtn: document.getElementById("myListBtn"),
  globalSearch: document.getElementById("globalSearch"),
  searchSuggestions: document.getElementById("searchSuggestions"),
  themeToggle: document.getElementById("themeToggle"),
  profileBtn: document.getElementById("profileBtn"),
  profileMenu: document.getElementById("profileMenu"),
  profileName: document.getElementById("profileName"),

  landingView: document.getElementById("landingView"),
  categoryCards: Array.from(document.querySelectorAll(".category-card, .landing-enter-btn")),
  landingMovieCount: document.getElementById("landingMovieCount"),
  landingNewsCount: document.getElementById("landingNewsCount"),
  landingSportsCount: document.getElementById("landingSportsCount"),
  landingNewsBadge: document.getElementById("landingNewsBadge"),
  landingSportsBadge: document.getElementById("landingSportsBadge"),

  moviesView: document.getElementById("moviesView"),
  movieHeroBackdrop: document.getElementById("movieHeroBackdrop"),
  movieHeroTitle: document.getElementById("movieHeroTitle"),
  movieHeroMeta: document.getElementById("movieHeroMeta"),
  movieHeroDescription: document.getElementById("movieHeroDescription"),
  movieHeroTrailer: document.getElementById("movieHeroTrailer"),
  heroTrailerBtn: document.getElementById("heroTrailerBtn"),
  heroWatchlistBtn: document.getElementById("heroWatchlistBtn"),
  quickPlayBtn: document.getElementById("quickPlayBtn"),
  loadMoreMoviesBtn: document.getElementById("loadMoreMoviesBtn"),
  moodButtons: Array.from(document.querySelectorAll("[data-mood]")),
  moodGrid: document.getElementById("moodGrid"),
  smartPicksGrid: document.getElementById("smartPicksGrid"),
  topPicksGrid: document.getElementById("topPicksGrid"),
  reviewsGrid: document.getElementById("reviewsGrid"),
  reviewSearchInput: document.getElementById("reviewSearchInput"),
  reviewSearchMeta: document.getElementById("reviewSearchMeta"),
  continueGrid: document.getElementById("continueGrid"),
  mcuGrid: document.getElementById("mcuGrid"),
  bollyGrid: document.getElementById("bollyGrid"),
  hollyGrid: document.getElementById("hollyGrid"),
  fantasyGrid: document.getElementById("fantasyGrid"),
  actionGrid: document.getElementById("actionGrid"),
  mindGrid: document.getElementById("mindGrid"),
  discoverGrid: document.getElementById("discoverGrid"),

  myListView: document.getElementById("myListView"),
  myListStats: document.getElementById("myListStats"),
  myListGrid: document.getElementById("myListGrid"),
  myRecentGrid: document.getElementById("myRecentGrid"),

  newsView: document.getElementById("newsView"),
  newsFilterButtons: Array.from(document.querySelectorAll("[data-news-filter]")),
  refreshNewsBtn: document.getElementById("refreshNewsBtn"),
  loadMoreNewsBtn: document.getElementById("loadMoreNewsBtn"),
  newsGrid: document.getElementById("newsGrid"),
  newsStatusBadge: document.getElementById("newsStatusBadge"),

  sportsView: document.getElementById("sportsView"),
  sportsFilterButtons: Array.from(document.querySelectorAll("[data-sports-filter]")),
  loadMoreSportsBtn: document.getElementById("loadMoreSportsBtn"),
  sportsTopGrid: document.getElementById("sportsTopGrid"),
  sportsPlayerGrid: document.getElementById("sportsPlayerGrid"),
  sportsStatusBadge: document.getElementById("sportsStatusBadge"),

  scrollTopBtn: document.getElementById("scrollTopBtn"),
  toastStack: document.getElementById("toastStack"),

  trailerModal: document.getElementById("trailerModal"),
  trailerFrame: document.getElementById("trailerFrame"),
  movieModal: document.getElementById("movieModal"),
  movieModalBody: document.getElementById("movieModalBody"),
  videoModal: document.getElementById("videoModal"),
  videoFrame: document.getElementById("videoFrame"),
  authModal: document.getElementById("authModal"),
  authTitle: document.getElementById("authTitle"),
  authForm: document.getElementById("authForm"),
  nameFieldWrap: document.getElementById("nameFieldWrap"),
  confirmFieldWrap: document.getElementById("confirmFieldWrap"),
  authName: document.getElementById("authName"),
  authEmail: document.getElementById("authEmail"),
  authPassword: document.getElementById("authPassword"),
  authConfirm: document.getElementById("authConfirm"),
  authSubmitBtn: document.getElementById("authSubmitBtn"),
  authSwitchBtn: document.getElementById("authSwitchBtn")
};

let authMode = "login";

function getJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (_error) {
    return fallback;
  }
}

function setJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function toCacheKey(key) {
  return `${API_CACHE_PREFIX}${encodeURIComponent(key).slice(0, 180)}`;
}

function readApiCache(key, ttl = API_CACHE_TTL_MS) {
  const payload = getJSON(toCacheKey(key), null);
  if (!payload || !payload.time || payload.data === undefined) {
    return { hit: false, data: null };
  }
  if (Date.now() - payload.time > ttl) {
    return { hit: false, data: payload.data };
  }
  return { hit: true, data: payload.data };
}

function writeApiCache(key, data) {
  setJSON(toCacheKey(key), { time: Date.now(), data });
}

async function withTimeout(promise, timeoutMs = FETCH_TIMEOUT_MS) {
  let timeoutHandle = null;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutHandle = setTimeout(() => reject(new Error("Request timeout")), timeoutMs);
  });
  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    clearTimeout(timeoutHandle);
  }
}

async function parseCandidateResponse(response, parser) {
  if (parser === "alloriginsGet") {
    const payload = await response.json();
    const contents = payload?.contents || "{}";
    return JSON.parse(contents);
  }
  return response.json();
}

async function fetchJSONWithFallback(url, options = {}) {
  const key = options.cacheKey || url;
  const ttl = options.ttl ?? API_CACHE_TTL_MS;
  const cached = readApiCache(key, ttl);
  if (cached.hit) {
    return cached.data;
  }

  const candidates = [
    { url, parser: "json" },
    ...CORS_PROXIES.map((prefix) => ({ url: `${prefix}${encodeURIComponent(url)}`, parser: "json" })),
    { url: `${ALLORIGINS_GET}${encodeURIComponent(url)}`, parser: "alloriginsGet" }
  ];

  let lastError = null;
  for (const candidate of candidates) {
    try {
      const response = await withTimeout(fetch(candidate.url));
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }
      const data = await parseCandidateResponse(response, candidate.parser);
      writeApiCache(key, data);
      return data;
    } catch (error) {
      lastError = error;
    }
  }

  if (cached.data) {
    return cached.data;
  }
  throw lastError || new Error("Request failed");
}

function getUsers() {
  return getJSON(STORAGE.users, []);
}

function setUsers(users) {
  setJSON(STORAGE.users, users);
}

function getCurrentUser() {
  return getJSON(STORAGE.user, null);
}

function setCurrentUser(user) {
  if (user) {
    setJSON(STORAGE.user, user);
    return;
  }
  localStorage.removeItem(STORAGE.user);
}

function userScopedKey(scope) {
  const user = getCurrentUser();
  return user ? `primeStream.${scope}.${user.id}` : null;
}

function getWatchlist() {
  const key = userScopedKey("watchlist");
  return key ? getJSON(key, []) : [];
}

function setWatchlist(watchlist) {
  const key = userScopedKey("watchlist");
  if (key) {
    setJSON(key, watchlist);
  }
}

function getLikes() {
  const key = userScopedKey("likes");
  return key ? getJSON(key, {}) : {};
}

function setLikes(map) {
  const key = userScopedKey("likes");
  if (key) {
    setJSON(key, map);
  }
}

function getRatings() {
  const key = userScopedKey("ratings");
  return key ? getJSON(key, {}) : {};
}

function setRatings(map) {
  const key = userScopedKey("ratings");
  if (key) {
    setJSON(key, map);
  }
}

function getContinueWatching() {
  const key = userScopedKey("continue");
  return key ? getJSON(key, {}) : getJSON(STORAGE.fallbackContinue, {});
}

function setContinueWatching(map) {
  const key = userScopedKey("continue");
  if (key) {
    setJSON(key, map);
    return;
  }
  setJSON(STORAGE.fallbackContinue, map);
}

function getRecentlyViewed() {
  const key = userScopedKey("recent");
  return key ? getJSON(key, []) : getJSON(STORAGE.fallbackRecent, []);
}

function setRecentlyViewed(list) {
  const trimmed = list.slice(0, 50);
  const key = userScopedKey("recent");
  if (key) {
    setJSON(key, trimmed);
    return;
  }
  setJSON(STORAGE.fallbackRecent, trimmed);
}

function toast(message) {
  const node = document.createElement("div");
  node.className = "toast";
  node.textContent = message;
  el.toastStack.appendChild(node);
  setTimeout(() => node.remove(), 2600);
}

function openModal(modal) {
  modal.classList.add("open");
}

function closeModal(modal) {
  modal.classList.remove("open");
  if (modal === el.trailerModal) {
    el.trailerFrame.src = "";
  }
  if (modal === el.videoModal) {
    el.videoFrame.src = "";
  }
}

function ensureAuth(action) {
  if (getCurrentUser()) {
    return true;
  }
  state.pendingAction = action;
  toast("Login required");
  openModal(el.authModal);
  return false;
}

function runPendingAction() {
  if (!state.pendingAction) {
    return;
  }
  const action = state.pendingAction;
  state.pendingAction = null;
  action();
}

function escapeHtml(input) {
  return String(input || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function encodeTitle(title) {
  return encodeURIComponent(title || "");
}

function decodeTitle(token) {
  try {
    return decodeURIComponent(token || "");
  } catch (_error) {
    return token || "";
  }
}

function uniqueBy(list, keyFn) {
  const seen = new Set();
  const output = [];
  for (const item of list) {
    const key = keyFn(item);
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    output.push(item);
  }
  return output;
}

function normText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function updateStatusBadge(node, label, type = "neutral") {
  if (!node) {
    return;
  }
  node.textContent = label;
  node.classList.remove("neutral", "success", "error", "warn");
  node.classList.add(type);
}

function updateLandingStats() {
  if (el.landingMovieCount) {
    const movieCount = MOVIES.length + state.discoverMovies.length;
    el.landingMovieCount.textContent = `${movieCount}+`;
  }
  if (el.landingNewsCount) {
    el.landingNewsCount.textContent = `${state.news.length || 0}+`;
  }
  if (el.landingSportsCount) {
    el.landingSportsCount.textContent = `${state.sportsVideos.length || 0}+`;
  }
}

function cycleNewsUrls(filter, includeGlobalFallback = false) {
  const primary = newsUrlsByFilter(filter);
  const urls = includeGlobalFallback
    ? uniqueBy([...primary, ...newsUrlsByFilter("all")], (item) => item)
    : primary;
  if (!urls.length) {
    return [];
  }
  const seed = state.newsFetchSeed % urls.length;
  state.newsFetchSeed = (state.newsFetchSeed + 1) % urls.length;
  return [...urls.slice(seed), ...urls.slice(0, seed)];
}

function cycleMovieSourceUrl() {
  const endpoint = DISCOVER_ENDPOINTS[state.movieQueryIndex % DISCOVER_ENDPOINTS.length];
  state.movieQueryIndex = (state.movieQueryIndex + 1) % DISCOVER_ENDPOINTS.length;
  return `${endpoint}${state.discoverPage}`;
}

function cycleSportsQuery(tab) {
  const pool = SPORTS_QUERY_POOL[tab] || [SPORTS_QUERIES[tab] || SPORTS_QUERIES.cricket];
  const index = state.sportsQueryIndex[tab] || 0;
  state.sportsQueryIndex[tab] = (index + 1) % pool.length;
  return [...pool.slice(index), ...pool.slice(0, index)];
}

function sportsImportanceScore(item) {
  const text = `${item.snippet?.title || ""} ${item.snippet?.description || ""}`.toLowerCase();
  let score = 0;
  if (IMPORTANT_SPORTS_RE.test(text)) score += 40;
  if (text.includes("highlights")) score += 20;
  if (text.includes("final")) score += 15;
  if (text.includes("india")) score += 8;
  if (text.includes("live")) score -= 20;
  if (text.includes("shorts")) score -= 25;
  return score;
}

const PRIORITY_SPORTS_RE = {
  cricket:
    /\b(india|ind vs|vs|test|odi|t20|world cup|champions trophy|final|semi final|super over|last over|wicket|century|ipl|bbl|psl|icc)\b/i,
  football:
    /\b(uefa|ucl|champions league|premier league|la liga|serie a|bundesliga|world cup|final|semi final|goal|hat-trick|derby)\b/i,
  chess: /\b(fide|world championship|candidates|grandmaster|gm|final|tiebreak|blitz|rapid)\b/i,
  badminton: /\b(bwf|super series|world championship|all england|final|semi final|olympics)\b/i
};

function sportsPriorityScore(item, tab = state.sportsTab || "cricket") {
  const text = `${item.snippet?.title || ""} ${item.snippet?.description || ""}`.toLowerCase();
  let score = 0;
  if (PRIORITY_SPORTS_RE[tab]?.test(text)) score += 35;
  if (text.includes("highlights")) score += 25;
  if (text.includes("official")) score += 15;
  if (text.includes("full match")) score += 10;
  if (text.includes("live")) score -= 20;
  if (SPORTS_SPAM_RE.test(text)) score -= 60;
  return score;
}

function trailerFromVideoId(videoId) {
  return `https://www.youtube.com/embed/${videoId}`;
}

function videoIdFromEmbed(embedUrl) {
  const match = String(embedUrl || "").match(/embed\/([^?&]+)/);
  return match ? match[1] : null;
}

function movieCatalog() {
  return uniqueBy([...MOVIES, ...Object.values(state.dynamicMovies)], (movie) =>
    normText(movie.title || "")
  );
}

function movieByTitle(title) {
  const match = movieCatalog().find((movie) => movie.title === title);
  return match || null;
}

function registerDynamicMovies(movies) {
  movies.forEach((movie) => {
    state.dynamicMovies[movie.title] = movie;
  });
}

function isSafeMovieResult(item) {
  if (!item) {
    return false;
  }
  if (item.adult) {
    return false;
  }
  const text = `${item.title || item.name || ""} ${item.overview || ""}`.toLowerCase();
  if (ADULT_KEYWORDS_RE.test(text)) {
    return false;
  }
  const lang = String(item.original_language || "").toLowerCase();
  if (!ALLOWED_MOVIE_LANGS.has(lang)) {
    return false;
  }
  const genreIds = Array.isArray(item.genre_ids) ? item.genre_ids : [];
  // TMDB romance genre id is 10749; keep feed action/fantasy oriented.
  if (genreIds.includes(10749) || NO_ROMANCE_RE.test(text) || ROMANCE_KEYWORDS_RE.test(text)) {
    return false;
  }
  if (!item.poster_path && !item.backdrop_path) {
    return false;
  }
  return true;
}

function tmdbToMovie(item) {
  if (!isSafeMovieResult(item)) {
    return null;
  }
  const title = item.title || item.name || "Untitled Movie";
  const poster = item.poster_path ? `${TMDB_IMAGE_BASE}${item.poster_path}` : MOVIE_PLACEHOLDER;
  const backdrop = item.backdrop_path ? `${TMDB_IMAGE_BASE}${item.backdrop_path}` : poster;
  const language = String(item.original_language || "").toLowerCase();
  const category =
    language === "hi"
      ? "Bollywood"
      : item.title?.includes("Avengers") || item.title?.includes("Spider-Man")
      ? "Marvel"
      : "Hollywood";
  const rating = Number(item.vote_average || 0);
  return {
    title,
    poster,
    backdrop,
    trailer: "",
    rating: rating > 0 ? rating : 7,
    category,
    moods: [rating >= 7.8 ? "Mind-blowing" : "Action", rating >= 6.5 ? "Fun" : "Action"],
    tags: [
      rating >= 7 ? "Top10" : "Action",
      category === "Marvel" ? "Action" : rating >= 7.8 ? "Mind" : "Action"
    ],
    description: item.overview || "Description unavailable.",
    tmdbId: item.id
  };
}

function candidateTrailerScore(item) {
  const text = `${item.snippet?.title || ""} ${item.snippet?.description || ""}`.toLowerCase();
  let score = 0;
  if (text.includes("official")) score += 40;
  if (text.includes("trailer")) score += 35;
  if (text.includes("english trailer") || text.includes("hindi trailer")) score += 25;
  if (text.includes("final trailer")) score += 15;
  if (text.includes("4k") || text.includes("hd")) score += 16;
  if (text.includes("teaser")) score -= 35;
  if (text.includes("promo") || text.includes("clip")) score -= 25;
  if (text.includes("fan made") || text.includes("reaction")) score -= 60;
  if (NON_ALLOWED_LANG_KEYWORDS_RE.test(text)) score -= 90;
  if (NON_ALLOWED_SCRIPT_RE.test(text)) score -= 100;
  if (
    text.includes("sony pictures") ||
    text.includes("marvel") ||
    text.includes("warner bros") ||
    text.includes("official")
  )
    score += 20;
  if ((item.snippet?.title || "").split(" ").length < 2) score -= 10;
  return score;
}

function isAllowedTrailerCandidate(item) {
  if (!item?.id?.videoId) {
    return false;
  }
  const text = `${item.snippet?.title || ""} ${item.snippet?.description || ""} ${
    item.snippet?.channelTitle || ""
  }`;
  if (ADULT_KEYWORDS_RE.test(text)) {
    return false;
  }
  const lower = text.toLowerCase();
  if (NON_ALLOWED_SCRIPT_RE.test(text)) {
    return false;
  }
  if (NON_ALLOWED_LANG_KEYWORDS_RE.test(lower) && !lower.includes("hindi")) {
    return false;
  }
  return ENGLISH_TRAILER_SIGNAL_RE.test(text) || HINDI_TRAILER_SIGNAL_RE.test(text);
}

async function resolveMovieTrailer(movie) {
  if (state.trailerCache[movie.title]) {
    return state.trailerCache[movie.title];
  }
  // Keep the hero Spider-Man trailer exactly as requested by user.
  if (normText(movie.title).includes("spider-man: far from home")) {
    const pinnedVideoId = videoIdFromEmbed(movie.trailer);
    const pinned = pinnedVideoId ? trailerFromVideoId(pinnedVideoId) : movie.trailer;
    state.trailerCache[movie.title] = pinned;
    return pinned;
  }
  const queries = [
    `${movie.title} official trailer english`,
    `${movie.title} official trailer hindi`,
    `${movie.title} official trailer hd`,
    `${movie.title} trailer english`
  ];
  for (const query of queries) {
    const url = `${YOUTUBE_BASE}?part=snippet&type=video&videoEmbeddable=true&safeSearch=strict&relevanceLanguage=en&maxResults=12&q=${encodeURIComponent(
      query
    )}&key=${YOUTUBE_API_KEY}`;
    try {
      const data = await fetchJSONWithFallback(url, { cacheKey: `yt.trailer.${query}` });
      const items = (data.items || [])
        .filter((item) => isAllowedTrailerCandidate(item))
        .sort((a, b) => candidateTrailerScore(b) - candidateTrailerScore(a));
      const selected = items[0];
      if (selected?.id?.videoId) {
        const embed = trailerFromVideoId(selected.id.videoId);
        state.trailerCache[movie.title] = embed;
        return embed;
      }
    } catch (_error) {
      // continue with next query
    }
  }
  const fallbackVideoId = videoIdFromEmbed(movie.trailer);
  const fallback = fallbackVideoId ? trailerFromVideoId(fallbackVideoId) : movie.trailer;
  state.trailerCache[movie.title] = fallback;
  return fallback;
}

async function enrichMovieAssets(movie) {
  const cached = state.movieAssetCache[movie.title];
  if (cached?.poster) {
    movie.poster = cached.poster;
    movie.backdrop = cached.backdrop || cached.poster;
    return;
  }
  try {
    const url = `${TMDB_BASE}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
      movie.title
    )}&include_adult=false`;
    const data = await fetchJSONWithFallback(url, { cacheKey: `tmdb.search.${movie.title}` });
    const results = data.results || [];
    const titleNorm = normText(movie.title);
    const best = results
      .map((result) => {
        const exact = normText(result.title) === titleNorm ? 40 : 0;
        const popularity = Math.min((result.popularity || 0) / 5, 20);
        const votes = Math.min((result.vote_count || 0) / 150, 20);
        return { result, score: exact + popularity + votes };
      })
      .sort((a, b) => b.score - a.score)[0]?.result;
    if (best?.poster_path) {
      const poster = `${TMDB_IMAGE_BASE}${best.poster_path}`;
      const backdrop = best.backdrop_path ? `${TMDB_IMAGE_BASE}${best.backdrop_path}` : poster;
      movie.poster = poster;
      movie.backdrop = backdrop;
      state.movieAssetCache[movie.title] = { poster, backdrop };
      setJSON(STORAGE.movieAssets, state.movieAssetCache);
    }
  } catch (_error) {
    // keep original curated assets if enrichment fails
  }
}

async function hydrateMovieAssets() {
  MOVIES.forEach((movie) => {
    const cached = state.movieAssetCache[movie.title];
    if (cached?.poster) {
      movie.poster = cached.poster;
      movie.backdrop = cached.backdrop || cached.poster;
    }
  });
  await Promise.allSettled(MOVIES.map((movie) => enrichMovieAssets(movie)));
  updateHero(state.heroMovie);
  renderMovieRows();
  renderMoodResults(state.mood);
  renderCommunityReviews();
  renderSmartPicks();
  renderTopPicks();
  renderContinueWatching();
  renderMyList();
}

function applySection(section) {
  state.section = section;
  const allViews = [el.landingView, el.moviesView, el.newsView, el.sportsView, el.myListView];
  allViews.forEach((node) => {
    node.classList.add("hidden");
    node.classList.remove("active");
  });

  if (section === "home") {
    el.landingView.classList.remove("hidden");
    el.landingView.classList.add("active");
    el.navbar.classList.add("hidden");
    return;
  }

  el.navbar.classList.remove("hidden");
  el.sectionBtn.textContent =
    section === "movies"
      ? "Movies"
      : section === "news"
      ? "World News"
      : section === "sports"
      ? "Sports Highlights"
      : "My List";
  el.myListBtn.classList.toggle("hidden", !(section === "movies" || section === "mylist"));

  if (section === "movies") {
    el.moviesView.classList.remove("hidden");
    el.moviesView.classList.add("active");
  } else if (section === "news") {
    el.newsView.classList.remove("hidden");
    el.newsView.classList.add("active");
  } else if (section === "sports") {
    el.sportsView.classList.remove("hidden");
    el.sportsView.classList.add("active");
  } else if (section === "mylist") {
    el.myListView.classList.remove("hidden");
    el.myListView.classList.add("active");
  }
}

function updateHero(movie) {
  state.heroMovie = movie;
  const inList = getWatchlist().includes(movie.title);
  el.movieHeroTitle.textContent = movie.title;
  el.movieHeroMeta.textContent = `${movie.category} • ⭐ ${Number(movie.rating || 0).toFixed(1)}/10`;
  el.movieHeroDescription.textContent = movie.description;
  el.heroWatchlistBtn.textContent = inList ? "− In Watchlist" : "+ Add to Watchlist";
  const heroImage = movie.backdrop || movie.poster || MOVIE_PLACEHOLDER;
  el.movieHeroBackdrop.style.backgroundImage = `url(${heroImage})`;
  resolveMovieTrailer(movie).then((embed) => {
    const sep = embed.includes("?") ? "&" : "?";
    el.movieHeroTrailer.innerHTML = `
      <iframe
        title="Hero trailer preview"
        src="${embed}${sep}autoplay=1&mute=1&controls=0&loop=1"
        allow="autoplay; encrypted-media; picture-in-picture"
      ></iframe>
    `;
  });
}

function movieCardTemplate(movie, options = {}) {
  const inList = getWatchlist().includes(movie.title);
  const progress = getContinueWatching()[movie.title] || 0;
  const token = encodeTitle(movie.title);
  return `
    <article class="movie-card reveal" data-movie-title="${token}">
      <img loading="lazy" src="${movie.poster || MOVIE_PLACEHOLDER}" alt="${escapeHtml(
    movie.title
  )}" onerror="this.src='${MOVIE_PLACEHOLDER}'" />
      <div class="movie-card-info">
        <h4>${escapeHtml(movie.title)}</h4>
        <p>⭐ ${Number(movie.rating || 0).toFixed(1)}</p>
      </div>
      ${
        options.showProgress
          ? `<div class="progress-wrap"><div class="progress-bar" style="width:${Math.min(
              progress,
              100
            )}%"></div></div>`
          : ""
      }
      <div class="movie-hover">
        <div class="movie-actions">
          <button class="mini-btn" data-action="play-movie" data-title="${token}">▶ Trailer</button>
          <button class="mini-btn" data-action="watchlist" data-title="${token}">
            ${inList ? "− Watchlist" : "+ Watchlist"}
          </button>
          <button class="mini-btn" data-action="rate" data-title="${token}">⭐ Rate</button>
          <button class="mini-btn" data-action="like" data-title="${token}">👍 Like</button>
        </div>
        <div class="hover-preview" data-preview-title="${token}"></div>
      </div>
    </article>
  `;
}

function renderMovieSkeletons() {
  const skeleton = Array.from({ length: 8 })
    .map(() => `<div class="skeleton-card"></div>`)
    .join("");
  [
    el.moodGrid,
    el.smartPicksGrid,
    el.topPicksGrid,
    el.continueGrid,
    el.mcuGrid,
    el.bollyGrid,
    el.hollyGrid,
    el.actionGrid,
    el.mindGrid,
    el.discoverGrid,
    el.myListGrid,
    el.myRecentGrid
  ].forEach((node) => {
    if (node) {
      node.innerHTML = skeleton;
    }
  });
}

function reviewStateMap() {
  return getJSON(userScopedKey("reviews") || "primeStream.guest.reviews", {});
}

function setReviewStateMap(map) {
  const key = userScopedKey("reviews") || "primeStream.guest.reviews";
  setJSON(key, map);
}

function reviewVotesMap() {
  return getJSON("primeStream.reviewVotes", {});
}

function setReviewVotesMap(map) {
  setJSON("primeStream.reviewVotes", map);
}

function reviewSeedForMovie(movie) {
  const t = normText(movie.title).replace(/\s+/g, "");
  let hash = 0;
  for (let i = 0; i < t.length; i += 1) {
    hash = (hash * 31 + t.charCodeAt(i)) % 100000;
  }
  return hash;
}

async function fetchMovieReviewsFromTmdb(movie) {
  try {
    const url = `${TMDB_BASE}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
      movie.title
    )}&include_adult=false`;
    const data = await fetchJSONWithFallback(url, { cacheKey: `tmdb.review.search.${movie.title}` });
    const results = data.results || [];
    const titleNorm = normText(movie.title);
    const best = results
      .map((item) => {
        const exact = normText(item.title || "") === titleNorm ? 50 : 0;
        const pop = Math.min((item.popularity || 0) / 5, 20);
        const votes = Math.min((item.vote_count || 0) / 120, 20);
        return { item, score: exact + pop + votes };
      })
      .sort((a, b) => b.score - a.score)[0]?.item;
    if (!best?.id) {
      return [];
    }
    const reviewsUrl = `${TMDB_BASE}/movie/${best.id}/reviews?api_key=${TMDB_API_KEY}&language=en-US&page=1`;
    const reviewsData = await fetchJSONWithFallback(reviewsUrl, { cacheKey: `tmdb.review.list.${best.id}` });
    const list = (reviewsData.results || []).slice(0, 4).map((item) => ({
      user: item.author || "Viewer",
      text: String(item.content || "").slice(0, 260),
      rating: Number(item.author_details?.rating || best.vote_average || movie.rating || 7),
      isReal: true
    }));
    return list.filter((item) => item.text.trim().length >= 18);
  } catch (_error) {
    return [];
  }
}

function generatedFallbackReview(movie) {
  const profile = ["Alex", "Sam", "Jordan", "Taylor", "Casey"][reviewSeedForMovie(movie) % 5];
  return [
    {
      user: profile,
      text: `Review data for ${movie.title} is loading from sources. This title has strong audience interest and good replay value.`,
      rating: Number(Math.max(6.5, Number(movie.rating || 7)).toFixed(1)),
      isFallback: true
    }
  ];
}

async function renderCommunityReviews() {
  if (!el.reviewsGrid) {
    return;
  }
  const query = (state.reviewSearchTerm || "").trim().toLowerCase();
  const allMovies = [...movieCatalog()].filter((movie) => Number(movie.rating || 0) >= 7);
  const preferredReviewPool = allMovies.filter((movie) => {
    const title = normText(movie.title);
    return (
      movie.category === "Marvel" ||
      title.includes("harry potter") ||
      (movie.tags || []).includes("Fantasy")
    );
  });
  const basePool = (preferredReviewPool.length ? preferredReviewPool : allMovies)
    .sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0))
    .slice(0, 18);
  const pool = query
    ? basePool.filter((movie) => {
        const hay = `${movie.title} ${movie.category} ${(movie.tags || []).join(" ")} ${movie.description || ""}`.toLowerCase();
        return hay.includes(query);
      })
    : basePool;
  const myReviews = reviewStateMap();
  const votes = reviewVotesMap();
  if (el.reviewSearchMeta) {
    el.reviewSearchMeta.textContent = query
      ? `${pool.length} match${pool.length === 1 ? "" : "es"}`
      : "Showing top reviews";
    el.reviewSearchMeta.className = `status-badge ${query ? "success" : "neutral"}`;
  }
  if (!pool.length) {
    el.reviewsGrid.innerHTML = `<p class="empty-text">No reviews found for "${escapeHtml(state.reviewSearchTerm)}".</p>`;
    return;
  }
  const cards = await Promise.all(
    pool.map(async (movie) => {
      const token = encodeTitle(movie.title);
      const real = await fetchMovieReviewsFromTmdb(movie);
      const generated = real.length ? real : generatedFallbackReview(movie);
      const myReview = myReviews[movie.title];
      const all = myReview
        ? [...generated, { user: "You", text: myReview.text, rating: myReview.rating, isUser: true }]
        : generated;
      const avg = all.reduce((acc, review) => acc + Number(review.rating || 0), 0) / Math.max(1, all.length);
      const vote = votes[movie.title] || {};
      const likes = generated.length * 11 + (vote.likes || 0);
      const dislikes = generated.length * 2 + (vote.dislikes || 0);
      const reviewMarkup = all
        .slice(0, 4)
        .map(
          (review) => `
            <article class="review-item ${review.isUser ? "mine" : ""}">
              <div class="review-user">${escapeHtml(review.user)} • ⭐ ${Number(review.rating).toFixed(1)}</div>
              <p>${escapeHtml(review.text)}</p>
            </article>
          `
        )
        .join("");
      return `
        <article class="review-card reveal">
          <div class="review-head">
            <h4>${escapeHtml(movie.title)}</h4>
            <span>Community ⭐ ${avg.toFixed(1)}</span>
          </div>
          <div class="review-list">${reviewMarkup}</div>
          <form class="review-form" data-movie="${token}">
            <label>Rate it</label>
            <input type="range" min="1" max="10" step="0.1" value="${myReview?.rating || Math.max(
              6,
              Number(movie.rating || 7)
            )}" data-review-range="${token}" />
            <textarea rows="2" maxlength="240" placeholder="Share your quick review..." data-review-text="${token}">${
              myReview?.text ? escapeHtml(myReview.text) : ""
            }</textarea>
            <div class="review-actions">
              <button type="submit" class="mini-btn">Submit Review</button>
              <button type="button" class="mini-btn review-like-btn" data-review-like="${token}">👍 ${likes}</button>
              <button type="button" class="mini-btn review-dislike-btn" data-review-dislike="${token}">👎 ${dislikes}</button>
            </div>
          </form>
        </article>
      `;
    })
  );
  el.reviewsGrid.innerHTML = cards.join("");
  revealOnScroll();
}

function renderMovieRows() {
  const allMovies = movieCatalog();
  const marvel = allMovies.filter((movie) => movie.category === "Marvel");
  const bolly = allMovies.filter((movie) => movie.category === "Bollywood");
  const holly = allMovies.filter((movie) => movie.category === "Hollywood");
  const fantasy = allMovies.filter((movie) => movie.tags?.includes("Fantasy"));
  const action = allMovies.filter((movie) => movie.tags?.includes("Action"));
  const mind = allMovies.filter((movie) => movie.tags?.includes("Mind"));

  el.mcuGrid.innerHTML = marvel.map((movie) => movieCardTemplate(movie)).join("");
  if (el.fantasyGrid) {
    el.fantasyGrid.innerHTML = fantasy.map((movie) => movieCardTemplate(movie)).join("");
  }
  el.bollyGrid.innerHTML = bolly.map((movie) => movieCardTemplate(movie)).join("");
  el.hollyGrid.innerHTML = holly.map((movie) => movieCardTemplate(movie)).join("");
  el.actionGrid.innerHTML = action.map((movie) => movieCardTemplate(movie)).join("");
  el.mindGrid.innerHTML = mind.map((movie) => movieCardTemplate(movie)).join("");
}

function renderDiscoverGrid(list = state.discoverMovies) {
  if (!el.discoverGrid) {
    return;
  }
  el.discoverGrid.innerHTML = list.length
    ? list.map((movie) => movieCardTemplate(movie)).join("")
    : `<p class="empty-text">Discover feed loading...</p>`;
}

function renderMyList() {
  const user = getCurrentUser();
  const list = getWatchlist()
    .map(movieByTitle)
    .filter(Boolean);
  const recent = getRecentlyViewed()
    .map(movieByTitle)
    .filter(Boolean)
    .slice(0, 12);

  if (el.myListStats) {
    if (!user) {
      el.myListStats.textContent = "Login required to maintain personal watchlist.";
    } else {
      el.myListStats.textContent = `${list.length} saved in My List • ${recent.length} recently viewed`;
    }
  }

  el.myListGrid.innerHTML = list.length
    ? list.map((movie) => movieCardTemplate(movie)).join("")
    : `<p class="empty-text">${user ? "No movies in your list yet." : "Login and add movies to your watchlist."}</p>`;

  if (el.myRecentGrid) {
    el.myRecentGrid.innerHTML = recent.length
      ? recent.map((movie) => movieCardTemplate(movie, { showProgress: true })).join("")
      : `<p class="empty-text">Recently watched movies will appear here.</p>`;
  }
}

function renderContinueWatching() {
  const map = getContinueWatching();
  const list = Object.keys(map)
    .map(movieByTitle)
    .filter(Boolean)
    .slice(0, 12);
  el.continueGrid.innerHTML = list.length
    ? list.map((movie) => movieCardTemplate(movie, { showProgress: true })).join("")
    : `<p class="empty-text">Start watching to build progress.</p>`;
}

function renderTopPicks() {
  const likes = getLikes();
  const list = Object.keys(likes)
    .filter((title) => likes[title])
    .map(movieByTitle)
    .filter(Boolean);
  el.topPicksGrid.innerHTML = list.length
    ? list.map((movie) => movieCardTemplate(movie)).join("")
    : `<p class="empty-text">Like movies to see Top Picks by You.</p>`;
}

function renderSmartPicks() {
  const likes = getLikes();
  const likedMovies = Object.keys(likes)
    .filter((title) => likes[title])
    .map(movieByTitle)
    .filter(Boolean);

  if (!likedMovies.length) {
    el.smartPicksGrid.innerHTML = movieCatalog()
      .slice(0, 12)
      .map((movie) => movieCardTemplate(movie))
      .join("");
    return;
  }

  const categories = new Set(likedMovies.map((movie) => movie.category));
  const moods = new Set(likedMovies.flatMap((movie) => movie.moods || []));
  const picks = movieCatalog()
    .filter(
      (movie) =>
        !likes[movie.title] &&
        (categories.has(movie.category) || (movie.moods || []).some((mood) => moods.has(mood)))
    )
    .slice(0, 12);

  el.smartPicksGrid.innerHTML = picks.length
    ? picks.map((movie) => movieCardTemplate(movie)).join("")
    : `<p class="empty-text">No more smart picks available.</p>`;
}

function renderMoodResults(mood) {
  state.mood = mood;
  const list = movieCatalog().filter((movie) => (movie.moods || []).includes(mood));
  el.moodGrid.innerHTML = list.length
    ? list.map((movie) => movieCardTemplate(movie)).join("")
    : `<p class="empty-text">No movies for this mood.</p>`;
}

function trackRecent(title) {
  const list = getRecentlyViewed().filter((item) => item !== title);
  list.unshift(title);
  setRecentlyViewed(list);
}

function updateContinue(title, amount = 8) {
  const map = getContinueWatching();
  map[title] = Math.min(100, (map[title] || 0) + amount);
  setContinueWatching(map);
}

async function openTrailer(title) {
  const movie = movieByTitle(title);
  if (!movie) {
    toast("Trailer unavailable");
    return;
  }
  const embed = await resolveMovieTrailer(movie);
  const sep = embed.includes("?") ? "&" : "?";
  el.trailerFrame.src = `${embed}${sep}autoplay=1`;
  openModal(el.trailerModal);
  updateContinue(title, 10);
  trackRecent(title);
  renderContinueWatching();
  renderMyList();
}

async function openMovieModal(title) {
  const movie = movieByTitle(title);
  if (!movie) {
    toast("Movie details unavailable");
    return;
  }
  const inList = getWatchlist().includes(title);
  const selected = Number(getRatings()[title] || 0);
  const embed = await resolveMovieTrailer(movie);
  el.movieModalBody.innerHTML = `
    <div class="details-hero" style="background-image:url('${movie.backdrop || movie.poster || MOVIE_PLACEHOLDER}')"></div>
    <div class="details-content">
      <img class="details-poster" src="${movie.poster || MOVIE_PLACEHOLDER}" alt="${escapeHtml(
    movie.title
  )}" onerror="this.src='${MOVIE_PLACEHOLDER}'" />
      <div>
        <h2>${escapeHtml(movie.title)}</h2>
        <p class="details-meta">${escapeHtml(movie.category)} • ⭐ ${Number(movie.rating || 0).toFixed(1)}</p>
        <p>${escapeHtml(movie.description || "No description available.")}</p>
        <div class="details-actions">
          <button class="primary-btn" data-action="play-movie" data-title="${encodeTitle(movie.title)}">▶ Play</button>
          <button class="ghost-btn" data-action="watchlist" data-title="${encodeTitle(movie.title)}">
            ${inList ? "− Remove Watchlist" : "+ Add Watchlist"}
          </button>
        </div>
        <div class="rating-inline">
          ${[1, 2, 3, 4, 5]
            .map(
              (star) =>
                `<button class="rate-btn ${selected >= star ? "active" : ""}" data-rate="${star}" data-title="${encodeTitle(
                  movie.title
                )}">★</button>`
            )
            .join("")}
        </div>
        <div class="details-trailer">
          <iframe title="Movie trailer" src="${embed}" allowfullscreen></iframe>
        </div>
      </div>
    </div>
  `;
  openModal(el.movieModal);
  trackRecent(title);
  updateContinue(title, 4);
  renderContinueWatching();
  renderMyList();
}

function toggleWatchlist(title) {
  if (
    !ensureAuth(() => {
      toggleWatchlist(title);
    })
  ) {
    return;
  }
  const list = getWatchlist();
  const exists = list.includes(title);
  const next = exists ? list.filter((item) => item !== title) : [...list, title];
  setWatchlist(next);
  toast(exists ? "Removed from Watchlist" : "Added to Watchlist");
  renderMyList();
  renderMovieRows();
  renderSmartPicks();
  renderDiscoverGrid();
  updateHero(state.heroMovie);
}

function likeMovie(title) {
  if (
    !ensureAuth(() => {
      likeMovie(title);
    })
  ) {
    return;
  }
  const likes = getLikes();
  likes[title] = true;
  setLikes(likes);
  toast("Added to Top Picks");
  renderTopPicks();
  renderSmartPicks();
}

function rateMovie(title, rating) {
  if (
    !ensureAuth(() => {
      rateMovie(title, rating);
    })
  ) {
    return;
  }
  const ratings = getRatings();
  ratings[title] = rating;
  setRatings(ratings);
  toast("Rating saved");
  openMovieModal(title).catch(() => toast("Failed to open movie"));
}

function quickPlay() {
  const allMovies = movieCatalog();
  const random = allMovies[Math.floor(Math.random() * allMovies.length)];
  if (!random) {
    return;
  }
  if (
    !ensureAuth(() => {
      openTrailer(random.title).catch(() => toast("Trailer unavailable"));
    })
  ) {
    return;
  }
  openTrailer(random.title).catch(() => toast("Trailer unavailable"));
}

function newsUrlsByFilter(filter) {
  const base = `https://gnews.io/api/v4/top-headlines?lang=en&max=40&apikey=${NEWS_API_KEY}`;
  if (filter === "tech") {
    return [
      `${base}&topic=technology`,
      `${base}&topic=technology&country=us`,
      `${base}&topic=technology&country=gb`,
      `${base}&topic=technology&country=ca`,
      `${base}&topic=technology&country=au`
    ];
  }
  if (filter === "business") {
    return [
      `${base}&topic=business`,
      `${base}&topic=business&country=us`,
      `${base}&topic=business&country=gb`,
      `${base}&topic=business&country=ca`,
      `${base}&topic=business&country=au`
    ];
  }
  if (filter === "science") {
    return [
      `${base}&topic=science`,
      `${base}&topic=science&country=us`,
      `${base}&topic=science&country=gb`,
      `${base}&topic=science&country=ca`,
      `${base}&topic=science&country=au`
    ];
  }
  return [NEWS_URL, `${base}&country=us`, `${base}&country=gb`, `${base}&country=ca`, `${base}&country=au`];
}

function isLikelyEnglish(text) {
  const value = String(text || "").trim();
  if (!value) {
    return false;
  }
  const nonLatin = (value.match(/[^\u0000-\u00ff]/g) || []).length;
  return nonLatin / value.length < 0.18;
}

function filterNewsByTopic(articles, filter) {
  if (filter === "all") {
    return articles;
  }
  const re = NEWS_TOPIC_KEYWORDS[filter];
  if (!re) {
    return articles;
  }
  const topical = articles.filter((article) => re.test(`${article.title || ""} ${article.description || ""}`));
  return topical.length ? topical : articles;
}

function toNewsCardShape(article) {
  return {
    title: article.title || "Untitled",
    description: article.description || "",
    image: article.image || NEWS_PLACEHOLDER,
    url: article.url || "#",
    source: article.source || { name: "Unknown Source" },
    publishedAt: article.publishedAt || new Date().toISOString()
  };
}

async function fetchReutersBackupNews() {
  try {
    const encoded = encodeURIComponent("world news english latest");
    const rssUrl = `https://news.google.com/rss/search?q=${encoded}&hl=en-US&gl=US&ceid=US:en`;
    const proxyUrl = `${ALLORIGINS_GET}${encodeURIComponent(rssUrl)}`;
    const rss = await fetchJSONWithFallback(proxyUrl, { cacheKey: "news.rss.google.world" });
    const raw = String(rss?.contents || "");
    if (!raw) {
      return [];
    }
    const items = [...raw.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((match) => match[1]);
    const parsed = items
      .map((item) => {
        const title = item.match(/<title>([\s\S]*?)<\/title>/)?.[1] || "";
        const link = item.match(/<link>([\s\S]*?)<\/link>/)?.[1] || "";
        const pubDate = item.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] || "";
        const cleanTitle = title.replace(/<!\[CDATA\[|\]\]>/g, "").trim();
        return {
          title: cleanTitle,
          description: cleanTitle,
          image: NEWS_PLACEHOLDER,
          url: link.trim(),
          source: { name: "Google News" },
          publishedAt: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString()
        };
      })
      .filter((article) => article.url && article.title && isLikelyEnglish(article.title))
      .slice(0, 120);
    return parsed;
  } catch (_error) {
    return [];
  }
}

async function fetchNewsCollection(filter = "all") {
  const urls = cycleNewsUrls(filter, true);
  const collected = [];
  for (const url of urls) {
    try {
      const data = await fetchJSONWithFallback(url, { cacheKey: `news.${filter}.${url}` });
      const filtered = (data.articles || [])
        .filter((article) => article.url && article.title)
        .filter((article) => isLikelyEnglish(`${article.title} ${article.description || ""}`))
        .map(toNewsCardShape);
      collected.push(...filtered);
      if (collected.length >= 120) {
        break;
      }
    } catch (_error) {
      // continue next fallback endpoint
    }
  }

  // Extra fallback for topic filters: derive category set from global feed if API topic is sparse.
  if (filter !== "all" && collected.length < 24) {
    const globalUrls = cycleNewsUrls("all", true);
    for (const url of globalUrls) {
      try {
        const data = await fetchJSONWithFallback(url, { cacheKey: `news.seed.${filter}.${url}` });
        const filtered = (data.articles || [])
          .filter((article) => article.url && article.title)
          .filter((article) => isLikelyEnglish(`${article.title} ${article.description || ""}`))
          .map(toNewsCardShape);
        collected.push(...filtered);
        if (collected.length >= 170) {
          break;
        }
      } catch (_error) {
        // keep trying other seeds
      }
    }
  }

  if (!collected.length) {
    const backup = await fetchReutersBackupNews();
    collected.push(...backup);
  }

  let uniqueNews = uniqueBy(collected, (article) => `${article.title}-${article.url}`).slice(0, 320);
  uniqueNews = filterNewsByTopic(uniqueNews, filter);
  return uniqueNews;
}

async function fetchNews(filter = "all", options = {}) {
  const append = Boolean(options.append);
  const keepDisplay = Boolean(options.keepDisplay);
  const requestToken = options.requestToken ?? state.newsLoadToken;
  const isCurrentRequest = () => requestToken === state.newsLoadToken;
  updateStatusBadge(el.newsStatusBadge, "Loading", "neutral");
  updateStatusBadge(el.landingNewsBadge, "Loading", "neutral");
  const collected = await fetchNewsCollection(filter);
  const merged = append ? [...state.news, ...collected] : collected;
  const uniqueNews = uniqueBy(merged, (article) => `${article.title}-${article.url}`).slice(0, 320);
  if (!isCurrentRequest()) {
    return;
  }
  if (!uniqueNews.length) {
    updateStatusBadge(el.newsStatusBadge, "No Feed", "error");
    updateStatusBadge(el.landingNewsBadge, "No Feed", "error");
    state.news = [];
    return;
  }

  state.news = uniqueNews;
  if (!keepDisplay) {
    state.newsDisplayCount = 24;
  }
  updateStatusBadge(el.newsStatusBadge, "Live Global Feed", "success");
  updateStatusBadge(el.landingNewsBadge, "Live", "success");
  updateLandingStats();
}

function formatDate(dateStr) {
  try {
    return new Date(dateStr).toLocaleString();
  } catch (_error) {
    return "";
  }
}

function renderNews(list = state.news) {
  const visible = list.slice(0, state.newsDisplayCount);
  el.newsGrid.innerHTML = visible.length
    ? visible
        .map(
          (article) => `
      <article class="news-card reveal">
        <img loading="lazy" src="${article.image || NEWS_PLACEHOLDER}" alt="${escapeHtml(
            article.title || "News"
          )}" onerror="this.src='${NEWS_PLACEHOLDER}'" />
        <div class="news-card-content">
          <h3>${escapeHtml(article.title || "Untitled")}</h3>
          <div class="news-meta">
            <span>${escapeHtml(article.source?.name || "Unknown Source")}</span>
            <span>${formatDate(article.publishedAt)}</span>
          </div>
          <a class="read-btn" href="${article.url}" target="_blank" rel="noopener noreferrer">Read Full Story</a>
        </div>
      </article>
    `
        )
        .join("")
    : `<p class="empty-text">No global English news found.</p>`;
  revealOnScroll();
}

function filterNewsByTerm(term) {
  const filtered = state.news.filter((article) => {
    const text = `${article.title || ""} ${article.description || ""}`.toLowerCase();
    return text.includes(term.toLowerCase());
  });
  renderNews(filtered);
  return filtered;
}

function renderNewsSkeletons() {
  el.newsGrid.innerHTML = Array.from({ length: 8 })
    .map(() => `<div class="skeleton-card"></div>`)
    .join("");
}

const NON_ENGLISH_VIDEO_RE =
  /தமிழ்|తెలుగు|ಕನ್ನಡ|മലയാളം|বাংলা|اردو|हाइलाइट्स|हाइलाइट/i;
const SPORTS_SPAM_RE = /prediction|dream11|fantasy|live stream|match live now|betting|reaction/i;
const HINDI_TRAIL_RE = /[\u0900-\u097F]|हिंदी|हाइलाइट|हाइलाइट्स|हिन्दी|भारत|इंग्लैंड|विश्व कप|मैच/i;
const SPORTS_TITLE_BLOCKLIST_RE =
  /\b(hindi|tamil|telugu|malayalam|kannada|marathi|bengali|urdu|বাংলা|தமிழ்|తెలుగు|ಕನ್ನಡ)\b/i;
const YOUTUBE_SHORTS_RE = /\/shorts\/|#shorts|\bshorts\b/i;
const SPORTS_EDITORIAL_RE = /\b(reaction|debate|analysis|news|press conference|preview)\b/i;

function isEnglishSportsItem(item) {
  const title = item.snippet?.title || "";
  const description = item.snippet?.description || "";
  const text = `${title} ${description}`;
  const lowerTitle = title.toLowerCase();
  const channel = String(item.snippet?.channelTitle || "").toLowerCase();
  if (!item.id?.videoId) {
    return false;
  }
  if (SPORTS_TITLE_BLOCKLIST_RE.test(lowerTitle) || HINDI_TRAIL_RE.test(title)) {
    return false;
  }
  if (YOUTUBE_SHORTS_RE.test(text) || SPORTS_EDITORIAL_RE.test(text.toLowerCase())) {
    return false;
  }
  if (NON_ENGLISH_VIDEO_RE.test(text) || SPORTS_SPAM_RE.test(text.toLowerCase())) {
    return false;
  }
  if (!/(star sports|icc|bcci|ipl|sony sports|tnt sports|sky sports|premier league|uefa|fifa|bwf|fide|chesscom|chess\.com)/i.test(channel)) {
    return false;
  }
  if (BLOCKED_SPORTS_LATIN_RE.test(text.toLowerCase())) {
    return false;
  }
  if (!SPORTS_KEYWORD_RE.test(text.toLowerCase())) {
    return false;
  }
  return isLikelyEnglish(text);
}

function isStrictSportsItem(item) {
  if (!isEnglishSportsItem(item)) {
    return false;
  }
  const text = `${item.snippet?.title || ""} ${item.snippet?.description || ""} ${item.snippet?.channelTitle || ""}`;
  const lower = text.toLowerCase();
  if (NON_ALLOWED_LANG_KEYWORDS_RE.test(lower)) {
    return false;
  }
  if (NON_ALLOWED_SCRIPT_RE.test(text)) {
    return false;
  }
  if (HINDI_TRAIL_RE.test(text) || SPORTS_TITLE_BLOCKLIST_RE.test(lower)) {
    return false;
  }
  if (YOUTUBE_SHORTS_RE.test(text) || SPORTS_EDITORIAL_RE.test(lower)) {
    return false;
  }
  return true;
}

function cleanSportsTitle(text) {
  return String(text || "")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/Ind\s+vs\s+Eng/gi, "India vs England")
    .replace(/\s+\|\s+.*$/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function scoreSportsImportance(item) {
  const text = `${item.snippet?.title || ""} ${item.snippet?.description || ""}`.toLowerCase();
  let score = 0;
  if (text.includes("highlights")) score += 35;
  if (text.includes("final")) score += 22;
  if (text.includes("semi final") || text.includes("semi-final")) score += 18;
  if (text.includes("world cup")) score += 30;
  if (text.includes("champions trophy") || text.includes("championship")) score += 20;
  if (text.includes("india")) score += 12;
  if (text.includes("vs")) score += 10;
  if (text.includes("full match")) score -= 12;
  if (text.includes("live")) score -= 26;
  return score;
}

async function fetchSportsFastBatch(queries, cacheKey, append = false) {
  const firstQueries = uniqueBy((queries || []).slice(0, 2), (item) => item);
  if (!firstQueries.length) {
    return;
  }
  const responses = await Promise.allSettled(
    firstQueries.map((q) => {
      const url = `${YOUTUBE_BASE}?part=snippet&type=video&videoEmbeddable=true&safeSearch=strict&relevanceLanguage=en&maxResults=50&order=date&q=${encodeURIComponent(
        q
      )}&key=${YOUTUBE_API_KEY}`;
      return fetchJSONWithFallback(url, { cacheKey: `sports.fast.${cacheKey}.${q}`, ttl: 1000 * 60 * 60 * 6 });
    })
  );
  const collected = [];
  responses.forEach((result) => {
    if (result.status !== "fulfilled") {
      return;
    }
    const filtered = (result.value.items || []).filter(isStrictSportsItem);
    collected.push(...filtered);
  });
  const merged = append ? [...state.sportsVideos, ...collected] : collected;
  state.sportsVideos = uniqueBy(merged, (item) => item.id?.videoId)
    .sort((a, b) => scoreSportsImportance(b) - scoreSportsImportance(a))
    .slice(0, 620);
}

async function fetchSportsBackfill(queries, cacheKey) {
  const backlog = uniqueBy((queries || []).slice(2), (item) => item);
  if (!backlog.length) {
    return;
  }
  const responses = await Promise.allSettled(
    backlog.map((q) => {
      const url = `${YOUTUBE_BASE}?part=snippet&type=video&videoEmbeddable=true&safeSearch=strict&relevanceLanguage=en&maxResults=50&order=date&q=${encodeURIComponent(
        q
      )}&key=${YOUTUBE_API_KEY}`;
      return fetchJSONWithFallback(url, { cacheKey: `sports.backfill.${cacheKey}.${q}`, ttl: 1000 * 60 * 60 * 6 });
    })
  );
  const extras = [];
  responses.forEach((result) => {
    if (result.status !== "fulfilled") {
      return;
    }
    const filtered = (result.value.items || []).filter(isStrictSportsItem);
    extras.push(...filtered);
  });
  const merged = uniqueBy([...state.sportsVideos, ...extras], (item) => item.id?.videoId)
    .sort((a, b) => scoreSportsImportance(b) - scoreSportsImportance(a))
    .slice(0, 620);
  state.sportsVideos = merged;
  state.sportsCache[state.sportsTab || "cricket"] = merged;
  renderSports();
  updateLandingStats();
}

async function fetchSports(query, cacheKey = query, options = {}) {
  const append = Boolean(options.append);
  const resetDisplay = options.resetDisplay !== false;
  const extraQueries = options.extraQueries || [];
  state.sportsLoadToken += 1;
  const requestToken = state.sportsLoadToken;
  state.sportsLoadToken = requestToken;
  updateStatusBadge(el.sportsStatusBadge, "Loading fast feed", "neutral");
  updateStatusBadge(el.landingSportsBadge, "Loading", "neutral");

  const queries = uniqueBy([query, ...extraQueries], (item) => item);
  await fetchSportsFastBatch(queries, cacheKey, append);
  if (requestToken !== state.sportsLoadToken) {
    return;
  }
  if (resetDisplay) {
    state.sportsDisplayCount = 72;
  }
  renderSports();

  const hasFeed = state.sportsVideos.length > 0;
  updateStatusBadge(el.sportsStatusBadge, hasFeed ? "Live Highlights (EN)" : "No Feed", hasFeed ? "success" : "warn");
  updateStatusBadge(el.landingSportsBadge, hasFeed ? "Live" : "No Feed", hasFeed ? "success" : "warn");
  updateLandingStats();
  fetchSportsBackfill(queries, cacheKey).catch(() => {});
}

function sportsCardTemplate(item) {
  const thumb =
    item.snippet?.thumbnails?.high?.url ||
    item.snippet?.thumbnails?.medium?.url ||
    SPORTS_PLACEHOLDER;
  const videoId = item.id.videoId;
  const cleanTitle = cleanSportsTitle(item.snippet?.title || "Sports video");
  return `
    <article class="sports-card reveal">
      <img loading="lazy" src="${thumb}" alt="${escapeHtml(
    cleanTitle
  )}" onerror="this.src='${SPORTS_PLACEHOLDER}'" />
      <div class="sports-card-content">
        <h3>${escapeHtml(cleanTitle)}</h3>
        <button class="read-btn" data-action="play-sport" data-video-id="${videoId}">▶ Play</button>
      </div>
    </article>
  `;
}

function renderSports(list = state.sportsVideos) {
  const visible = list.slice(0, state.sportsDisplayCount);
  const split = Math.ceil(visible.length / 2);
  const top = visible.slice(0, split);
  const player = visible.slice(split);
  el.sportsTopGrid.innerHTML = top.length
    ? top.map(sportsCardTemplate).join("")
    : `<p class="empty-text">No highlights found.</p>`;
  el.sportsPlayerGrid.innerHTML = player.length
    ? player.map(sportsCardTemplate).join("")
    : `<p class="empty-text">No additional highlights found.</p>`;
  revealOnScroll();
}

function renderSportsSkeletons() {
  const skeleton = Array.from({ length: 6 })
    .map(() => `<div class="skeleton-card"></div>`)
    .join("");
  el.sportsTopGrid.innerHTML = skeleton;
  el.sportsPlayerGrid.innerHTML = skeleton;
}

async function loadMoreDiscoverMovies() {
  if (!el.discoverGrid) {
    return;
  }
  const sourceUrl = cycleMovieSourceUrl();

  try {
    const data = await fetchJSONWithFallback(sourceUrl, { cacheKey: `discover.page.${sourceUrl}` });
    const mapped = (data.results || [])
      .filter((movie) => isSafeMovieResult(movie))
      .map(tmdbToMovie)
      .filter(Boolean)
      .slice(0, 120);
    registerDynamicMovies(mapped);
    state.discoverMovies = uniqueBy([...state.discoverMovies, ...mapped], (movie) =>
      normText(movie.title)
    );
    state.discoverPage += 1;
    renderDiscoverGrid();
    renderCommunityReviews();
    updateLandingStats();
  } catch (_error) {
    toast("Movie discovery refresh failed");
  }
}

async function searchMoviesRemote(term) {
  const trimmed = term.trim();
  if (trimmed.length < 2) {
    state.movieSearchResults = [];
    renderSearchSuggestions([]);
    return;
  }
  const url = `${TMDB_BASE}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
    trimmed
  )}&include_adult=false`;
  try {
    const data = await fetchJSONWithFallback(url, { cacheKey: `tmdb.search.live.${trimmed}` });
    const remoteMovies = (data.results || [])
      .filter((movie) => isSafeMovieResult(movie))
      .map(tmdbToMovie)
      .filter(Boolean)
      .slice(0, 80);
    registerDynamicMovies(remoteMovies);
    state.movieSearchResults = remoteMovies;
    if ((state.section === "movies" || state.section === "mylist") && state.currentSearchTerm.trim()) {
      renderMovieSearchResults(state.currentSearchTerm);
    }
    renderSuggestionsForTerm(trimmed);
  } catch (_error) {
    renderSuggestionsForTerm(trimmed);
  }
}

function renderMovieSearchResults(term) {
  const query = term.trim().toLowerCase();
  const pool = uniqueBy([...movieCatalog(), ...state.discoverMovies, ...state.movieSearchResults], (movie) =>
    normText(movie.title)
  );
  const filtered = pool
    .filter((movie) => {
      const hay = `${movie.title} ${movie.category} ${(movie.tags || []).join(" ")} ${(movie.description || "").slice(0, 120)}`.toLowerCase();
      return hay.includes(query);
    })
    .slice(0, 120);

  if (state.section === "mylist") {
    const wl = new Set(getWatchlist());
    const scoped = filtered.filter((movie) => wl.has(movie.title));
    el.myListGrid.innerHTML = scoped.length
      ? scoped.map((movie) => movieCardTemplate(movie)).join("")
      : `<p class="empty-text">No watchlist matches for "${escapeHtml(term)}".</p>`;
    return;
  }

  if (state.section === "movies") {
    el.discoverGrid.innerHTML = filtered.length
      ? filtered.map((movie) => movieCardTemplate(movie)).join("")
      : `<p class="empty-text">No movie match found for "${escapeHtml(term)}".</p>`;
  }
}

function renderSearchSuggestions(items) {
  if (!el.searchSuggestions) {
    return;
  }
  if (!items.length) {
    el.searchSuggestions.classList.add("hidden");
    el.searchSuggestions.innerHTML = "";
    return;
  }
  el.searchSuggestions.innerHTML = items
    .slice(0, 8)
    .map((item) => {
      const type = item.type || "movie";
      if (type === "news") {
        return `
          <button class="suggestion-item" data-suggestion="news" data-url="${encodeURIComponent(
            item.url
          )}">
            <strong>🌍 ${escapeHtml(item.title)}</strong>
            <small>${escapeHtml(item.subtitle || "World News")}</small>
          </button>
        `;
      }
      if (type === "sports") {
        return `
          <button class="suggestion-item" data-suggestion="sports" data-video-id="${escapeHtml(
            item.videoId
          )}">
            <strong>⚽ ${escapeHtml(item.title)}</strong>
            <small>${escapeHtml(item.subtitle || "Sports Highlight")}</small>
          </button>
        `;
      }
      return `
        <button class="suggestion-item" data-suggestion="movie" data-title="${encodeTitle(item.title)}">
          <strong>🎬 ${escapeHtml(item.title)}</strong>
          <small>${escapeHtml(item.subtitle || item.category || "Movie")}</small>
        </button>
      `;
    })
    .join("");
  el.searchSuggestions.classList.remove("hidden");
}

function renderSuggestionsForTerm(term) {
  const query = term.trim().toLowerCase();
  if (!query) {
    renderSearchSuggestions([]);
    return;
  }
  if (state.section === "news") {
    const items = filterNewsByTerm(query).slice(0, 8).map((article) => ({
      type: "news",
      title: article.title,
      subtitle: article.source?.name || "World News",
      url: article.url
    }));
    renderSearchSuggestions(items);
    return;
  }
  if (state.section === "sports") {
    const items = state.sportsVideos
      .filter((item) => (item.snippet?.title || "").toLowerCase().includes(query))
      .slice(0, 8)
      .map((item) => ({
        type: "sports",
        title: item.snippet?.title || "Sports video",
        subtitle: item.snippet?.channelTitle || "YouTube",
        videoId: item.id?.videoId
      }));
    renderSearchSuggestions(items);
    return;
  }
  const localMovies = uniqueBy([...movieCatalog(), ...state.movieSearchResults], (movie) => normText(movie.title))
    .filter((movie) => movie.title.toLowerCase().includes(query))
    .slice(0, 8)
    .map((movie) => ({ type: "movie", title: movie.title, subtitle: movie.category }));
  renderSearchSuggestions(localMovies);
}

function runSearch(raw) {
  const term = raw.trim();
  state.currentSearchTerm = term;
  if (!term) {
    if (state.section === "movies" || state.section === "mylist") {
      renderMovieRows();
      renderMoodResults(state.mood);
      renderSmartPicks();
      renderTopPicks();
      renderContinueWatching();
      renderMyList();
      renderDiscoverGrid();
    } else if (state.section === "news") {
      renderNews(state.news);
    } else if (state.section === "sports") {
      renderSports(state.sportsVideos);
    }
    renderSearchSuggestions([]);
    return;
  }

  if (state.section === "movies" || state.section === "mylist") {
    renderMovieSearchResults(term);
  } else if (state.section === "news") {
    filterNewsByTerm(term);
  } else if (state.section === "sports") {
    const filtered = state.sportsVideos.filter((item) =>
      (item.snippet?.title || "").toLowerCase().includes(term.toLowerCase())
    );
    renderSports(filtered);
  }
  renderSuggestionsForTerm(term);
}

function startHoverPreview(card) {
  const token = card.dataset.movieTitle;
  if (!token) {
    return;
  }
  const title = decodeTitle(token);
  clearTimeout(state.hoverTimers[title]);
  state.hoverTimers[title] = setTimeout(() => {
    const movie = movieByTitle(title);
    const node = card.querySelector(`[data-preview-title="${token}"]`);
    if (!movie || !node) {
      return;
    }
    resolveMovieTrailer(movie).then((embed) => {
      node.innerHTML = `
        <iframe
          title="Trailer preview"
          src="${embed}?autoplay=1&mute=1&controls=0"
          allow="autoplay; encrypted-media"
        ></iframe>
      `;
      node.classList.add("show");
    });
  }, 1000);
}

function stopHoverPreview(card) {
  const token = card.dataset.movieTitle;
  const title = decodeTitle(token);
  clearTimeout(state.hoverTimers[title]);
  const node = card.querySelector(`[data-preview-title="${token}"]`);
  if (node) {
    node.classList.remove("show");
    node.innerHTML = "";
  }
}

function renderProfileMenu() {
  const user = getCurrentUser();
  el.profileName.textContent = user?.name || "Guest";
  if (!user) {
    el.profileMenu.innerHTML = `
      <button data-profile-action="login">Login</button>
      <button data-profile-action="signup">Signup</button>
    `;
    return;
  }
  el.profileMenu.innerHTML = `
    <div class="profile-head">
      <strong>${escapeHtml(user.name)}</strong>
      <small>${escapeHtml(user.email)}</small>
    </div>
    <button data-profile-action="profile">Profile</button>
    <button data-profile-action="logout">Logout</button>
  `;
}

function switchAuthMode(mode) {
  authMode = mode;
  const signup = mode === "signup";
  el.authTitle.textContent = signup ? "Create Account" : "Login";
  el.nameFieldWrap.classList.toggle("hidden", !signup);
  el.confirmFieldWrap.classList.toggle("hidden", !signup);
  el.authSubmitBtn.textContent = signup ? "Signup" : "Login";
  el.authSwitchBtn.textContent = signup ? "Already have an account? Login" : "Create account";
}

function handleAuthSubmit(event) {
  event.preventDefault();
  const users = getUsers();
  const email = el.authEmail.value.trim().toLowerCase();
  const password = el.authPassword.value;
  const name = el.authName.value.trim();
  const confirm = el.authConfirm.value;

  if (!email || !password) {
    toast("Please fill required fields");
    return;
  }

  if (authMode === "signup") {
    if (!name) {
      toast("Username is required");
      return;
    }
    if (password.length < 6) {
      toast("Password must be at least 6 characters");
      return;
    }
    if (password !== confirm) {
      toast("Passwords do not match");
      return;
    }
    if (users.some((user) => user.email === email)) {
      toast("Email already exists");
      return;
    }
    const newUser = { id: crypto.randomUUID(), name, email, password };
    users.push(newUser);
    setUsers(users);
    setCurrentUser(newUser);
    toast("Signup successful");
  } else {
    const found = users.find((user) => user.email === email && user.password === password);
    if (!found) {
      toast("Invalid credentials");
      return;
    }
    setCurrentUser(found);
    toast("Login successful");
  }

  el.authForm.reset();
  closeModal(el.authModal);
  renderProfileMenu();
  renderMyList();
  renderSmartPicks();
  renderTopPicks();
  updateHero(state.heroMovie);
  runPendingAction();
}

function revealOnScroll() {
  document.querySelectorAll(".reveal").forEach((node) => {
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      node.classList.add("visible");
    }
  });
}

async function loadNews() {
  state.newsLoadToken += 1;
  const requestToken = state.newsLoadToken;
  renderNewsSkeletons();
  const filter = state.newsFilter || "all";
  if (state.newsCache[filter]) {
    if (requestToken !== state.newsLoadToken) {
      return;
    }
    state.news = state.newsCache[filter];
    renderNews(state.news);
    updateLandingStats();
    return;
  }
  await fetchNews(filter, { append: false, keepDisplay: false, requestToken });
  if (requestToken !== state.newsLoadToken) {
    return;
  }
  state.newsCache[filter] = state.news;
  renderNews(state.news);
}

async function loadSports(tab) {
  state.sportsTab = tab;
  renderSportsSkeletons();
  if (SPORTS_QUERIES[tab] && state.sportsCache[tab]) {
    state.sportsVideos = state.sportsCache[tab];
    renderSports();
    updateLandingStats();
    return;
  }
  const queries = cycleSportsQuery(tab);
  await fetchSports(queries[0] || SPORTS_QUERIES[tab] || SPORTS_QUERIES.cricket, tab, {
    append: false,
    resetDisplay: true,
    extraQueries: queries.slice(1)
  });
  if (SPORTS_QUERIES[tab]) {
    state.sportsCache[tab] = state.sportsVideos;
  }
  renderSports();
}

function bindEvents() {
  el.categoryCards.forEach((card) => {
    card.addEventListener("click", () => {
      const section = card.dataset.category;
      applySection(section);
      if (section === "news" && !state.news.length) {
        loadNews().catch(() => {
          updateStatusBadge(el.newsStatusBadge, "Error", "error");
          updateStatusBadge(el.landingNewsBadge, "Error", "error");
          toast("News fetch failed");
        });
      }
      if (section === "sports" && !state.sportsVideos.length) {
        loadSports("cricket").catch(() => {
          updateStatusBadge(el.sportsStatusBadge, "Error", "error");
          updateStatusBadge(el.landingSportsBadge, "Error", "error");
          toast("Sports fetch failed");
        });
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-modal]")) {
      const id = event.target.closest("[data-close-modal]").dataset.closeModal;
      closeModal(document.getElementById(id));
    }
    if (event.target.classList.contains("modal")) {
      closeModal(event.target);
    }

    const suggestionBtn = event.target.closest("[data-suggestion]");
    if (suggestionBtn) {
      const type = suggestionBtn.dataset.suggestion;
      if (type === "movie") {
        const title = decodeTitle(suggestionBtn.dataset.title);
        openMovieModal(title).catch(() => toast("Movie unavailable"));
      } else if (type === "news") {
        const url = decodeURIComponent(suggestionBtn.dataset.url || "");
        if (url) {
          window.open(url, "_blank", "noopener,noreferrer");
        }
      } else if (type === "sports") {
        const videoId = suggestionBtn.dataset.videoId;
        if (videoId) {
          el.videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
          openModal(el.videoModal);
        }
      }
      renderSearchSuggestions([]);
      return;
    }

    const actionBtn = event.target.closest("[data-action]");
    if (actionBtn) {
      const action = actionBtn.dataset.action;
      const title = decodeTitle(actionBtn.dataset.title);
      const videoId = actionBtn.dataset.videoId;
      if (action === "play-movie") {
        if (
          !ensureAuth(() => {
            openTrailer(title).catch(() => toast("Trailer unavailable"));
          })
        ) {
          return;
        }
        openTrailer(title).catch(() => toast("Trailer unavailable"));
      } else if (action === "watchlist") {
        toggleWatchlist(title);
      } else if (action === "like") {
        likeMovie(title);
      } else if (action === "rate") {
        openMovieModal(title).catch(() => toast("Failed to open movie"));
      } else if (action === "open-movie") {
        openMovieModal(title).catch(() => toast("Failed to open movie"));
      } else if (action === "play-sport") {
        el.videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        openModal(el.videoModal);
      }
    }

    const rateBtn = event.target.closest("[data-rate]");
    if (rateBtn) {
      rateMovie(decodeTitle(rateBtn.dataset.title), Number(rateBtn.dataset.rate));
    }

    const reviewLikeBtn = event.target.closest("[data-review-like]");
    if (reviewLikeBtn) {
      const title = decodeTitle(reviewLikeBtn.dataset.reviewLike);
      const votes = reviewVotesMap();
      const current = votes[title] || { likes: 0, dislikes: 0 };
      votes[title] = { likes: Number(current.likes || 0) + 1, dislikes: Number(current.dislikes || 0) };
      setReviewVotesMap(votes);
      renderCommunityReviews();
      toast("Review liked");
      return;
    }

    const reviewDislikeBtn = event.target.closest("[data-review-dislike]");
    if (reviewDislikeBtn) {
      const title = decodeTitle(reviewDislikeBtn.dataset.reviewDislike);
      const votes = reviewVotesMap();
      const current = votes[title] || { likes: 0, dislikes: 0 };
      votes[title] = { likes: Number(current.likes || 0), dislikes: Number(current.dislikes || 0) + 1 };
      setReviewVotesMap(votes);
      renderCommunityReviews();
      toast("Review disliked");
      return;
    }

    const profileAction = event.target.closest("[data-profile-action]");
    if (profileAction) {
      const action = profileAction.dataset.profileAction;
      if (action === "login" || action === "signup") {
        switchAuthMode(action);
        openModal(el.authModal);
      } else if (action === "logout") {
        setCurrentUser(null);
        renderProfileMenu();
        renderMyList();
        updateHero(state.heroMovie);
        toast("Logged out");
      } else {
        toast("Profile settings coming soon");
      }
      el.profileMenu.classList.remove("open");
    }

    if (!event.target.closest(".profile-wrap")) {
      el.profileMenu.classList.remove("open");
    }

    if (!event.target.closest(".search-wrap")) {
      renderSearchSuggestions([]);
    }
  });

  document.addEventListener("mouseover", (event) => {
    const card = event.target.closest(".movie-card");
    if (card) {
      startHoverPreview(card);
    }
  });

  document.addEventListener("mouseout", (event) => {
    const card = event.target.closest(".movie-card");
    if (card && !card.contains(event.relatedTarget)) {
      stopHoverPreview(card);
    }
  });

  el.homeBtn.addEventListener("click", () => {
    applySection("home");
  });

  el.sectionBtn.addEventListener("click", () => {
    if (state.section !== "home") {
      applySection(state.section);
    }
  });

  el.myListBtn.addEventListener("click", () => {
    applySection("mylist");
    renderMyList();
  });

  el.profileBtn.addEventListener("click", () => {
    el.profileMenu.classList.toggle("open");
  });

  el.themeToggle.addEventListener("click", () => {
    const next = document.body.dataset.theme === "dark" ? "light" : "dark";
    document.body.dataset.theme = next;
    el.themeToggle.textContent = next === "dark" ? "🌙" : "☀️";
  });

  el.globalSearch.addEventListener("input", (event) => {
    const term = event.target.value || "";
    runSearch(term);
    clearTimeout(state.searchDebounceTimer);
    state.searchDebounceTimer = setTimeout(() => {
      if (term.trim().length >= 2 && (state.section === "movies" || state.section === "mylist" || state.section === "home")) {
        searchMoviesRemote(term);
      } else if (term.trim().length >= 3 && state.section === "sports") {
        fetchSports(term, `sports.search.${term}`, {
          append: false,
          resetDisplay: true,
          extraQueries: [`${term} english commentary`, `${term} highlights`]
        })
          .then(() => renderSports())
          .catch(() => toast("Sports search failed"));
      } else {
        renderSuggestionsForTerm(term);
      }
    }, 320);
  });

  el.globalSearch.addEventListener("focus", () => {
    renderSuggestionsForTerm(el.globalSearch.value || "");
  });

  el.heroTrailerBtn.addEventListener("click", () => {
    if (
      !ensureAuth(() => {
        openTrailer(state.heroMovie.title).catch(() => toast("Trailer unavailable"));
      })
    ) {
      return;
    }
    openTrailer(state.heroMovie.title).catch(() => toast("Trailer unavailable"));
  });

  el.heroWatchlistBtn.addEventListener("click", () => {
    toggleWatchlist(state.heroMovie.title);
  });

  el.quickPlayBtn.addEventListener("click", quickPlay);

  if (el.loadMoreMoviesBtn) {
    el.loadMoreMoviesBtn.addEventListener("click", () => {
      loadMoreDiscoverMovies();
    });
  }

  el.moodButtons.forEach((button) => {
    button.addEventListener("click", () => {
      el.moodButtons.forEach((node) => node.classList.remove("active"));
      button.classList.add("active");
      renderMoodResults(button.dataset.mood);
    });
  });

  el.newsFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      el.newsFilterButtons.forEach((node) => node.classList.remove("active"));
      button.classList.add("active");
      state.newsFilter = button.dataset.newsFilter;
      state.newsDisplayCount = 24;
      state.newsFetchSeed += 1;
      loadNews().catch(() => {
        updateStatusBadge(el.newsStatusBadge, "Error", "error");
        updateStatusBadge(el.landingNewsBadge, "Error", "error");
        toast("News fetch failed");
      });
    });
  });

  el.refreshNewsBtn.addEventListener("click", () => {
    delete state.newsCache[state.newsFilter];
    loadNews().catch(() => {
      updateStatusBadge(el.newsStatusBadge, "Error", "error");
      updateStatusBadge(el.landingNewsBadge, "Error", "error");
      toast("News refresh failed");
    });
  });

  if (el.loadMoreNewsBtn) {
    el.loadMoreNewsBtn.addEventListener("click", () => {
      state.newsDisplayCount += 24;
      const needMore = state.news.length - state.newsDisplayCount < 20;
      if (!needMore) {
        renderNews(state.news);
        return;
      }
      fetchNews(state.newsFilter, { append: true, keepDisplay: true })
        .then(() => renderNews(state.news))
        .catch(() => renderNews(state.news));
    });
  }

  el.sportsFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      el.sportsFilterButtons.forEach((node) => node.classList.remove("active"));
      button.classList.add("active");
      state.sportsDisplayCount = 72;
      loadSports(button.dataset.sportsFilter).catch(() => {
        updateStatusBadge(el.sportsStatusBadge, "Error", "error");
        updateStatusBadge(el.landingSportsBadge, "Error", "error");
        toast("Sports load failed");
      });
    });
  });

  if (el.loadMoreSportsBtn) {
    el.loadMoreSportsBtn.addEventListener("click", () => {
      state.sportsDisplayCount += 40;
      const needMore = state.sportsVideos.length - state.sportsDisplayCount < 40;
      if (!needMore) {
        renderSports();
        return;
      }
      const tab = state.sportsTab || "cricket";
      const queries = cycleSportsQuery(tab);
      fetchSports(queries[0] || SPORTS_QUERIES[tab] || SPORTS_QUERIES.cricket, `${tab}.more.${Date.now()}`, {
        append: true,
        resetDisplay: false,
        extraQueries: queries.slice(1)
      })
        .then(() => renderSports())
        .catch(() => renderSports());
    });
  }

  document.addEventListener("submit", (event) => {
    const form = event.target.closest(".review-form");
    if (!form) {
      return;
    }
    event.preventDefault();
    const token = form.dataset.movie;
    const title = decodeTitle(token);
    if (
      !ensureAuth(() => {
        const range = form.querySelector(`[data-review-range="${token}"]`);
        const textNode = form.querySelector(`[data-review-text="${token}"]`);
        const pendingRating = Number(range?.value || 7);
        const pendingText = String(textNode?.value || "").trim();
        if (!pendingText) {
          toast("Please write a quick review");
          return;
        }
        const map = reviewStateMap();
        map[title] = { rating: Number(Math.min(10, Math.max(1, pendingRating)).toFixed(1)), text: pendingText };
        setReviewStateMap(map);
        renderCommunityReviews();
        toast("Review submitted");
      })
    ) {
      return;
    }
    const range = form.querySelector(`[data-review-range="${token}"]`);
    const textNode = form.querySelector(`[data-review-text="${token}"]`);
    const rating = Number(range?.value || 7);
    const text = String(textNode?.value || "").trim();
    if (!text) {
      toast("Please write a quick review");
      return;
    }
    const map = reviewStateMap();
    map[title] = { rating: Number(Math.min(10, Math.max(1, rating)).toFixed(1)), text };
    setReviewStateMap(map);
    renderCommunityReviews();
    toast("Review submitted");
  });

  if (el.reviewSearchInput) {
    el.reviewSearchInput.addEventListener("input", (event) => {
      state.reviewSearchTerm = String(event.target.value || "").trim();
      renderCommunityReviews();
    });
  }

  el.authForm.addEventListener("submit", handleAuthSubmit);
  el.authSwitchBtn.addEventListener("click", () => {
    switchAuthMode(authMode === "login" ? "signup" : "login");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "/") {
      event.preventDefault();
      el.globalSearch.focus();
    } else if (event.key === "Escape") {
      closeModal(el.trailerModal);
      closeModal(el.movieModal);
      closeModal(el.videoModal);
      closeModal(el.authModal);
      el.profileMenu.classList.remove("open");
      renderSearchSuggestions([]);
    }
  });

  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    el.navbar.classList.toggle("scrolled", y > 10);
    el.scrollTopBtn.classList.toggle("show", y > 400);
    if (y > state.lastScrollY && y > 200) {
      el.navbar.classList.add("hidden-up");
    } else {
      el.navbar.classList.remove("hidden-up");
    }
    state.lastScrollY = y;
    revealOnScroll();
  });

  el.scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

}

function initMovies() {
  renderMovieSkeletons();
  setTimeout(() => {
    updateHero(state.heroMovie);
    renderMovieRows();
    renderMoodResults(state.mood);
    renderSmartPicks();
    renderTopPicks();
    renderCommunityReviews();
    renderContinueWatching();
    renderMyList();
    renderDiscoverGrid();
    revealOnScroll();
  }, 250);
}

async function bootLiveFeeds() {
  try {
    await loadNews();
  } catch (_error) {
    updateStatusBadge(el.newsStatusBadge, "Error", "error");
    updateStatusBadge(el.landingNewsBadge, "Error", "error");
  }
  try {
    await loadSports("cricket");
  } catch (_error) {
    updateStatusBadge(el.sportsStatusBadge, "Error", "error");
    updateStatusBadge(el.landingSportsBadge, "Error", "error");
  }
}

async function init() {
  renderProfileMenu();
  switchAuthMode("login");
  initMovies();
  bindEvents();
  applySection("home");
  updateLandingStats();
  await Promise.allSettled([hydrateMovieAssets(), loadMoreDiscoverMovies(), bootLiveFeeds()]);
  revealOnScroll();
}

init();
