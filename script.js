const STORAGE_KEYS = {
  watchlist: "primeStream.watchlist",
  user: "primeStream.user",
  users: "primeStream.users",
  recentlyViewed: "primeStream.recentlyViewed",
  continueWatching: "primeStream.continueWatching",
  preferences: "primeStream.preferences",
  liked: "primeStream.likedMovies",
  ratings: "primeStream.userRatings"
};

const uiText = {
  en: {
    home: "Home",
    movies: "Movies",
    tvShows: "TV Shows",
    myList: "My List",
    searchPlaceholder: "Search movies...",
    top10: "Top 10 Today",
    watchTrailer: "▶ Watch Trailer",
    addWatchlist: "✚ Add to Watchlist",
    sortBy: "Sort by",
    popularity: "Popularity",
    rating: "Rating",
    tvPlaceholder:
      "Curated TV content is coming soon. Meanwhile, explore movie collections.",
    about: "About",
    contact: "Contact",
    privacy: "Privacy Policy",
    login: "Login",
    signup: "Signup",
    logout: "Logout",
    fullName: "Full Name",
    password: "Password",
    confirmPassword: "Confirm Password",
    recommendedForYou: "Recommended for You",
    noResults: "No results found",
    continueWatching: "Continue Watching",
    recentlyViewed: "Recently Viewed",
    trendingNow: "Trending Now",
    topRated: "Top Rated",
    action: "Action",
    comedy: "Comedy",
    drama: "Drama"
  },
  es: {
    home: "Inicio",
    movies: "Películas",
    tvShows: "Series",
    myList: "Mi Lista",
    searchPlaceholder: "Buscar películas...",
    top10: "Top 10 Hoy",
    watchTrailer: "▶ Ver Tráiler",
    addWatchlist: "✚ Añadir a Mi Lista",
    sortBy: "Ordenar por",
    popularity: "Popularidad",
    rating: "Calificación",
    tvPlaceholder:
      "El contenido de TV llegará pronto. Mientras tanto, explora películas.",
    about: "Acerca de",
    contact: "Contacto",
    privacy: "Privacidad",
    login: "Iniciar sesión",
    signup: "Crear cuenta",
    logout: "Cerrar sesión",
    fullName: "Nombre completo",
    password: "Contraseña",
    confirmPassword: "Confirmar contraseña",
    recommendedForYou: "Recomendado para ti",
    noResults: "No se encontraron resultados",
    continueWatching: "Seguir viendo",
    recentlyViewed: "Visto recientemente",
    trendingNow: "Tendencias",
    topRated: "Mejor valoradas",
    action: "Acción",
    comedy: "Comedia",
    drama: "Drama"
  },
  hi: {
    home: "होम",
    movies: "मूवीज़",
    tvShows: "टीवी शो",
    myList: "मेरी सूची",
    searchPlaceholder: "मूवी खोजें...",
    top10: "आज का टॉप 10",
    watchTrailer: "▶ ट्रेलर देखें",
    addWatchlist: "✚ वॉचलिस्ट में जोड़ें",
    sortBy: "क्रमबद्ध करें",
    popularity: "लोकप्रियता",
    rating: "रेटिंग",
    tvPlaceholder: "टीवी सामग्री जल्द आएगी। अभी मूवी कलेक्शन देखें।",
    about: "हमारे बारे में",
    contact: "संपर्क",
    privacy: "गोपनीयता नीति",
    login: "लॉगिन",
    signup: "साइन अप",
    logout: "लॉगआउट",
    fullName: "पूरा नाम",
    password: "पासवर्ड",
    confirmPassword: "पासवर्ड पुष्टि करें",
    recommendedForYou: "आपके लिए सुझाव",
    noResults: "कोई परिणाम नहीं मिला",
    continueWatching: "देखना जारी रखें",
    recentlyViewed: "हाल ही में देखा गया",
    trendingNow: "ट्रेंडिंग",
    topRated: "टॉप रेटेड",
    action: "एक्शन",
    comedy: "कॉमेडी",
    drama: "ड्रामा"
  }
};

const movies = [
  {
    id: 1,
    title: "Eclipse Protocol",
    image:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=900&q=80",
    rating: 4.8,
    genre: ["Action", "Thriller"],
    trailerURL: "https://www.youtube.com/embed/8ugaeA-nMTc",
    description:
      "A rogue agent races to stop a global blackout before civilization collapses.",
    progress: 62,
    liked: true,
    popularity: 98,
    cast: ["Ronan Blake", "Mia Vale", "Theo Cain"]
  },
  {
    id: 2,
    title: "Velvet Echo",
    image:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=900&q=80",
    rating: 4.4,
    genre: ["Drama", "Romance"],
    trailerURL: "https://www.youtube.com/embed/TcMBFSGVi1c",
    description:
      "Two artists find love and loss while chasing a sound that changed their lives.",
    progress: 26,
    liked: false,
    popularity: 80,
    cast: ["Avery Lane", "Jade Miller", "Noah Reid"]
  },
  {
    id: 3,
    title: "Quantum Drift",
    image:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=80",
    rating: 4.9,
    genre: ["Sci-Fi", "Action"],
    trailerURL: "https://www.youtube.com/embed/zSWdZVtXT7E",
    description:
      "A physicist discovers parallel timelines and must choose which reality survives.",
    progress: 77,
    liked: true,
    popularity: 96,
    cast: ["Nina Cole", "Arjun Hayes", "Leo Hart"]
  },
  {
    id: 4,
    title: "Laugh Loop",
    image:
      "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?auto=format&fit=crop&w=900&q=80",
    rating: 4.1,
    genre: ["Comedy"],
    trailerURL: "https://www.youtube.com/embed/KwgWWR6P0fM",
    description:
      "A stand-up comic relives the same disastrous show night until he gets it right.",
    progress: 12,
    liked: false,
    popularity: 72,
    cast: ["Chris Nolan", "Pia Ford", "Mason Key"]
  },
  {
    id: 5,
    title: "Iron Harbor",
    image:
      "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=900&q=80",
    rating: 4.6,
    genre: ["Action", "Drama"],
    trailerURL: "https://www.youtube.com/embed/6ZfuNTqbHE8",
    description:
      "In a lawless port city, a former marine protects a family from cartel warfare.",
    progress: 48,
    liked: true,
    popularity: 90,
    cast: ["Gabe Stone", "Alina Cruz", "Victor Poe"]
  },
  {
    id: 6,
    title: "Crown of Ash",
    image:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=900&q=80",
    rating: 4.7,
    genre: ["Drama", "Thriller"],
    trailerURL: "https://www.youtube.com/embed/EXeTwQWrcwY",
    description:
      "A grieving queen navigates betrayal and rebellion in a kingdom built on secrets.",
    progress: 35,
    liked: false,
    popularity: 88,
    cast: ["Elena Ward", "Damien Holt", "Sera Quinn"]
  },
  {
    id: 7,
    title: "Pixel Hearts",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80",
    rating: 4.0,
    genre: ["Comedy", "Drama"],
    trailerURL: "https://www.youtube.com/embed/t433PEQGErc",
    description:
      "An indie game studio fights deadlines, drama, and unexpected romance.",
    progress: 18,
    liked: false,
    popularity: 68,
    cast: ["Ryan Fox", "Isha Malik", "Ben Cruz"]
  },
  {
    id: 8,
    title: "Redline Skies",
    image:
      "https://images.unsplash.com/photo-1460881680858-30d872d5b530?auto=format&fit=crop&w=900&q=80",
    rating: 4.5,
    genre: ["Action", "Sci-Fi"],
    trailerURL: "https://www.youtube.com/embed/8Qn_spdM5Zg",
    description:
      "A daring pilot joins a rebellion where racing machines decide planetary freedom.",
    progress: 58,
    liked: true,
    popularity: 92,
    cast: ["Kai Rios", "Nora Shin", "Pax Morgan"]
  },
  {
    id: 9,
    title: "The Silent Case",
    image:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=900&q=80",
    rating: 4.3,
    genre: ["Drama", "Mystery"],
    trailerURL: "https://www.youtube.com/embed/2LqzF5WauAw",
    description:
      "A detective with hearing loss unravels a conspiracy hidden inside cold cases.",
    progress: 41,
    liked: true,
    popularity: 84,
    cast: ["Mila Frost", "Andre Lin", "Jules Park"]
  },
  {
    id: 10,
    title: "Weekend Heist",
    image:
      "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=900&q=80",
    rating: 3.9,
    genre: ["Comedy", "Action"],
    trailerURL: "https://www.youtube.com/embed/9ix7TUGVYIo",
    description:
      "Three friends attempt one impossible robbery and accidentally become heroes.",
    progress: 8,
    liked: false,
    popularity: 65,
    cast: ["Danny Clive", "Rita Nova", "Sam Bricks"]
  },
  {
    id: 11,
    title: "Nocturne Code",
    image:
      "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=900&q=80",
    rating: 4.2,
    genre: ["Thriller", "Action"],
    trailerURL: "https://www.youtube.com/embed/s7EdQ4FqbhY",
    description:
      "A cybersecurity prodigy is pulled into a midnight hunt for a ghost hacker.",
    progress: 69,
    liked: true,
    popularity: 86,
    cast: ["Ivy North", "Cole Vega", "Marta Li"]
  },
  {
    id: 12,
    title: "Monsoon Letters",
    image:
      "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?auto=format&fit=crop&w=900&q=80",
    rating: 4.6,
    genre: ["Drama"],
    trailerURL: "https://www.youtube.com/embed/4UDxK6r67x4",
    description:
      "Old letters reunite a fractured family during one unforgettable rainy season.",
    progress: 31,
    liked: false,
    popularity: 83,
    cast: ["Neel Rao", "Tara Sen", "Kian Das"]
  }
];

let activeGenre = "All";
let searchTerm = "";
let authMode = "login";

const el = {
  rowsContainer: document.getElementById("rowsContainer"),
  myListGrid: document.getElementById("myListGrid"),
  genreChips: document.getElementById("genreChips"),
  sortSelect: document.getElementById("sortSelect"),
  recommendSection: document.getElementById("recommendSection"),
  heroTitle: document.getElementById("heroTitle"),
  heroMeta: document.getElementById("heroMeta"),
  heroDescription: document.getElementById("heroDescription"),
  heroTrailerBtn: document.getElementById("heroTrailerBtn"),
  heroWatchlistBtn: document.getElementById("heroWatchlistBtn"),
  trailerModal: document.getElementById("trailerModal"),
  detailsModal: document.getElementById("detailsModal"),
  authModal: document.getElementById("authModal"),
  trailerFrame: document.getElementById("trailerFrame"),
  detailsBody: document.getElementById("detailsBody"),
  toastContainer: document.getElementById("toastContainer"),
  searchInput: document.getElementById("searchInput"),
  searchResults: document.getElementById("searchResults"),
  profileDropdown: document.getElementById("profileDropdown"),
  profileButton: document.getElementById("profileButton"),
  languageToggle: document.getElementById("languageToggle"),
  themeToggle: document.getElementById("themeToggle"),
  scrollTopButton: document.getElementById("scrollTopButton"),
  navLinks: document.getElementById("navLinks"),
  hamburgerButton: document.getElementById("hamburgerButton"),
  authForm: document.getElementById("authForm"),
  nameField: document.getElementById("nameField"),
  authName: document.getElementById("authName"),
  authEmail: document.getElementById("authEmail"),
  authPassword: document.getElementById("authPassword"),
  confirmPasswordField: document.getElementById("confirmPasswordField"),
  authConfirmPassword: document.getElementById("authConfirmPassword"),
  authSubmitBtn: document.getElementById("authSubmitBtn"),
  yearNow: document.getElementById("yearNow")
};

function getJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (_error) {
    return fallback;
  }
}

function setJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getPreferences() {
  return getJson(STORAGE_KEYS.preferences, {
    theme: "dark",
    language: "en",
    sortBy: "popularity"
  });
}

function setPreference(key, value) {
  const prefs = getPreferences();
  prefs[key] = value;
  setJson(STORAGE_KEYS.preferences, prefs);
}

function getCurrentLanguage() {
  return getPreferences().language || "en";
}

function t(key) {
  const lang = getCurrentLanguage();
  return uiText[lang]?.[key] || uiText.en[key] || key;
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  el.toastContainer.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("show"));
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 2200);
}

function getWatchlist() {
  return getJson(STORAGE_KEYS.watchlist, []);
}

function setWatchlist(ids) {
  setJson(STORAGE_KEYS.watchlist, ids);
}

function getUser() {
  return getJson(STORAGE_KEYS.user, null);
}

function getUsers() {
  return getJson(STORAGE_KEYS.users, []);
}

function setUsers(users) {
  setJson(STORAGE_KEYS.users, users);
}

function getLikedMap() {
  return getJson(STORAGE_KEYS.liked, {});
}

function setLikedMap(map) {
  setJson(STORAGE_KEYS.liked, map);
}

function getRatingsMap() {
  return getJson(STORAGE_KEYS.ratings, {});
}

function setRatingsMap(map) {
  setJson(STORAGE_KEYS.ratings, map);
}

function getContinueWatchingMap() {
  const fallback = {};
  movies.forEach((m) => {
    fallback[m.id] = m.progress;
  });
  return getJson(STORAGE_KEYS.continueWatching, fallback);
}

function setContinueWatchingMap(map) {
  setJson(STORAGE_KEYS.continueWatching, map);
}

function getRecentlyViewed() {
  return getJson(STORAGE_KEYS.recentlyViewed, []);
}

function setRecentlyViewed(ids) {
  setJson(STORAGE_KEYS.recentlyViewed, ids.slice(0, 20));
}

function applyI18n() {
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.placeholder = t(node.dataset.i18nPlaceholder);
  });
}

function applyTheme(theme) {
  document.body.dataset.theme = theme;
  el.themeToggle.textContent = theme === "dark" ? "🌙" : "☀️";
}

function setupPreferences() {
  const prefs = getPreferences();
  applyTheme(prefs.theme);
  el.languageToggle.value = prefs.language;
  el.sortSelect.value = prefs.sortBy;
  applyI18n();
}

function starsFromRating(value) {
  const rounded = Math.round(value);
  return `${"★".repeat(rounded)}${"☆".repeat(5 - rounded)}`;
}

function movieById(id) {
  return movies.find((m) => m.id === id);
}

function currentMovieList() {
  const sortBy = el.sortSelect.value;
  const filtered = movies.filter((movie) => {
    const genrePass = activeGenre === "All" || movie.genre.includes(activeGenre);
    const searchPass = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    return genrePass && searchPass;
  });

  filtered.sort((a, b) =>
    sortBy === "rating" ? b.rating - a.rating : b.popularity - a.popularity
  );
  return filtered;
}

function createSkeletonRow() {
  const row = document.createElement("section");
  row.className = "movie-row";
  row.innerHTML = `
    <div class="section-header">
      <h2 class="skeleton skeleton-text"></h2>
    </div>
    <div class="movie-track">
      ${Array.from({ length: 6 })
        .map(
          () =>
            `<article class="movie-card skeleton-card">
              <div class="skeleton skeleton-img"></div>
              <div class="movie-info">
                <div class="skeleton skeleton-text short"></div>
                <div class="skeleton skeleton-text tiny"></div>
              </div>
            </article>`
        )
        .join("")}
    </div>
  `;
  return row;
}

function getRowData(list) {
  const continueMap = getContinueWatchingMap();
  const recent = getRecentlyViewed()
    .map(movieById)
    .filter(Boolean);
  return [
    { title: t("trendingNow"), items: list.slice(0, 10) },
    {
      title: t("topRated"),
      items: [...list].sort((a, b) => b.rating - a.rating).slice(0, 10)
    },
    {
      title: t("action"),
      items: list.filter((m) => m.genre.includes("Action")).slice(0, 10)
    },
    {
      title: t("comedy"),
      items: list.filter((m) => m.genre.includes("Comedy")).slice(0, 10)
    },
    {
      title: t("drama"),
      items: list.filter((m) => m.genre.includes("Drama")).slice(0, 10)
    },
    {
      title: t("continueWatching"),
      items: list
        .filter((m) => (continueMap[m.id] || m.progress) > 5)
        .sort((a, b) => (continueMap[b.id] || b.progress) - (continueMap[a.id] || a.progress))
        .slice(0, 10),
      showProgress: true
    },
    {
      title: t("recentlyViewed"),
      items: recent
    }
  ];
}

function renderMovieCard(movie, options = {}) {
  const watchlist = getWatchlist();
  const isInList = watchlist.includes(movie.id);
  const continueMap = getContinueWatchingMap();
  const progress = continueMap[movie.id] || movie.progress || 0;
  return `
    <article class="movie-card" data-movie-id="${movie.id}">
      <img loading="lazy" src="${movie.image}" alt="${movie.title}" />
      <div class="movie-info">
        <h3>${movie.title}</h3>
        <p>${starsFromRating(movie.rating)} · ${movie.rating.toFixed(1)}</p>
      </div>
      ${
        options.showProgress
          ? `<div class="progress-wrap"><div class="progress-bar" style="width:${Math.min(
              progress,
              100
            )}%"></div></div>`
          : ""
      }
      <div class="card-overlay">
        <button data-action="play" data-id="${movie.id}">▶ Play Trailer</button>
        <button data-action="watchlist" data-id="${movie.id}">
          ${isInList ? "− Remove Watchlist" : "✚ Add to Watchlist"}
        </button>
        <button data-action="like" data-id="${movie.id}">👍 Like</button>
        <button data-action="dislike" data-id="${movie.id}">👎 Dislike</button>
        <button data-action="rate" data-id="${movie.id}">⭐ Rate</button>
        <button data-action="pin" data-id="${movie.id}">📌 Favorite</button>
      </div>
    </article>
  `;
}

function renderRows() {
  el.rowsContainer.innerHTML = "";
  const list = currentMovieList();
  const rows = getRowData(list);
  rows.forEach((row) => {
    const section = document.createElement("section");
    section.className = "movie-row";
    section.innerHTML = `
      <div class="section-header">
        <h2>${row.title}</h2>
      </div>
      <div class="movie-track">
        ${
          row.items.length
            ? row.items.map((item) => renderMovieCard(item, row)).join("")
            : `<p class="empty-row">${t("noResults")}</p>`
        }
      </div>
    `;
    el.rowsContainer.appendChild(section);
  });
}

function renderWatchlist() {
  const watchlist = getWatchlist()
    .map(movieById)
    .filter(Boolean);

  if (!watchlist.length) {
    el.myListGrid.innerHTML = `<p class="empty-row">Your watchlist is empty.</p>`;
    return;
  }
  el.myListGrid.innerHTML = watchlist.map((movie) => renderMovieCard(movie)).join("");
}

function renderGenreChips() {
  const genres = ["All", ...new Set(movies.flatMap((movie) => movie.genre))];
  el.genreChips.innerHTML = genres
    .map(
      (genre) =>
        `<button class="chip ${activeGenre === genre ? "active" : ""}" data-genre="${genre}">
          ${genre}
        </button>`
    )
    .join("");
}

function renderRecommendation() {
  const likedMap = getLikedMap();
  const likedIds = Object.keys(likedMap)
    .filter((id) => likedMap[id])
    .map((id) => Number(id));
  const likedMovies = likedIds.map(movieById).filter(Boolean);

  const preferredGenres =
    likedMovies.length > 0
      ? [...new Set(likedMovies.flatMap((movie) => movie.genre))]
      : ["Action", "Drama"];

  const recommendations = movies
    .filter((movie) => preferredGenres.some((genre) => movie.genre.includes(genre)))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  el.recommendSection.innerHTML = `
    <h2>${t("recommendedForYou")}</h2>
    <div class="recommend-grid">
      ${recommendations.map((movie) => renderMovieCard(movie)).join("")}
    </div>
  `;
}

function setHero(movie) {
  el.heroTitle.textContent = movie.title;
  el.heroMeta.textContent = `${movie.genre.join(" • ")} • ${movie.rating.toFixed(1)} ★`;
  el.heroDescription.textContent = movie.description;
  el.heroTrailerBtn.dataset.id = String(movie.id);
  el.heroWatchlistBtn.dataset.id = String(movie.id);
}

function openTrailer(movie) {
  const autoplayUrl = `${movie.trailerURL}?autoplay=1&mute=1&rel=0`;
  el.trailerFrame.src = autoplayUrl;
  openModal(el.trailerModal);
  incrementContinueProgress(movie.id);
}

function incrementContinueProgress(movieId) {
  const map = getContinueWatchingMap();
  const current = map[movieId] || movies.find((m) => m.id === movieId)?.progress || 0;
  map[movieId] = Math.min(current + 5, 100);
  setContinueWatchingMap(map);
}

function openModal(modal) {
  modal.classList.add("open");
}

function closeModal(modal) {
  modal.classList.remove("open");
  if (modal === el.trailerModal) {
    el.trailerFrame.src = "";
  }
}

function toggleWatchlist(movieId) {
  const watchlist = getWatchlist();
  const hasMovie = watchlist.includes(movieId);
  const next = hasMovie
    ? watchlist.filter((id) => id !== movieId)
    : [...watchlist, movieId];
  setWatchlist(next);
  showToast(hasMovie ? "Removed from Watchlist" : "Added to Watchlist");
  renderRows();
  renderWatchlist();
}

function trackRecentlyViewed(movieId) {
  const previous = getRecentlyViewed().filter((id) => id !== movieId);
  previous.unshift(movieId);
  setRecentlyViewed(previous);
}

function renderDetails(movie) {
  const reviews = [
    "Stunning visuals and gripping storytelling.",
    "A fresh experience with fantastic performances.",
    "Great pacing and a memorable soundtrack."
  ];
  const userRatings = getRatingsMap();
  const selectedRating = Number(userRatings[movie.id] || 0);
  el.detailsBody.innerHTML = `
    <div class="details-grid">
      <img src="${movie.image}" alt="${movie.title}" />
      <div>
        <h2>${movie.title}</h2>
        <p>${movie.genre.join(", ")} · ${movie.rating.toFixed(1)} ★</p>
        <p>${movie.description}</p>
        <h4>Cast</h4>
        <p>${movie.cast.join(", ")}</p>
        <h4>Reviews</h4>
        <ul class="review-list">
          ${reviews.map((review) => `<li>“${review}”</li>`).join("")}
        </ul>
        <div class="details-buttons">
          <button class="primary-btn" data-action="play" data-id="${movie.id}">
            ${t("watchTrailer")}
          </button>
          <button class="ghost-btn" data-action="watchlist" data-id="${movie.id}">
            ${t("addWatchlist")}
          </button>
        </div>
        <div class="rate-stars" data-rate-for="${movie.id}">
          ${[1, 2, 3, 4, 5]
            .map(
              (star) =>
                `<button class="${star <= selectedRating ? "active" : ""}" data-rate="${star}">★</button>`
            )
            .join("")}
        </div>
      </div>
    </div>
  `;
}

function openDetails(movie) {
  renderDetails(movie);
  openModal(el.detailsModal);
  trackRecentlyViewed(movie.id);
  incrementContinueProgress(movie.id);
  renderRows();
}

function renderSearchResults() {
  const term = el.searchInput.value.trim().toLowerCase();
  if (!term) {
    el.searchResults.classList.remove("open");
    el.searchResults.innerHTML = "";
    return;
  }
  const results = movies.filter((movie) => movie.title.toLowerCase().includes(term)).slice(0, 6);
  el.searchResults.innerHTML = results.length
    ? results
        .map(
          (movie) =>
            `<button class="search-item" data-search-id="${movie.id}">
              <img src="${movie.image}" alt="${movie.title}" />
              <span>${movie.title}</span>
            </button>`
        )
        .join("")
    : `<p class="search-empty">${t("noResults")}</p>`;
  el.searchResults.classList.add("open");
}

function renderProfileDropdown() {
  const user = getUser();
  if (user) {
    el.profileDropdown.innerHTML = `
      <div class="profile-meta">
        <strong>${user.name || user.email}</strong>
        <small>${user.email}</small>
      </div>
      <button data-profile-action="logout">${t("logout")}</button>
    `;
    return;
  }
  el.profileDropdown.innerHTML = `
    <button data-profile-action="login">${t("login")}</button>
    <button data-profile-action="signup">${t("signup")}</button>
  `;
}

function switchAuthMode(mode) {
  authMode = mode;
  document.querySelectorAll(".auth-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.mode === mode);
  });
  const isSignup = mode === "signup";
  el.nameField.classList.toggle("hidden", !isSignup);
  el.confirmPasswordField.classList.toggle("hidden", !isSignup);
  el.authSubmitBtn.textContent = t(mode);
}

function submitAuth(event) {
  event.preventDefault();
  const email = el.authEmail.value.trim().toLowerCase();
  const password = el.authPassword.value;
  const name = el.authName.value.trim();
  const confirmPassword = el.authConfirmPassword.value;
  const users = getUsers();

  if (!email || !password) {
    showToast("Please fill required fields");
    return;
  }

  if (authMode === "signup") {
    if (!name) {
      showToast("Name is required");
      return;
    }
    if (password.length < 6) {
      showToast("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      showToast("Passwords do not match");
      return;
    }
    if (users.some((user) => user.email === email)) {
      showToast("Email already registered");
      return;
    }
    const newUser = { name, email, password };
    users.push(newUser);
    setUsers(users);
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(newUser));
    showToast("Signup successful");
  } else {
    const found = users.find((user) => user.email === email && user.password === password);
    if (!found) {
      showToast("Invalid credentials");
      return;
    }
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(found));
    showToast("Logged in successfully");
  }

  renderProfileDropdown();
  closeModal(el.authModal);
  el.authForm.reset();
}

function handleCardAction(action, movieId) {
  const movie = movieById(movieId);
  if (!movie) {
    return;
  }

  if (action === "play") {
    openTrailer(movie);
    return;
  }
  if (action === "watchlist" || action === "pin") {
    toggleWatchlist(movie.id);
    return;
  }

  if (action === "like" || action === "dislike") {
    const liked = getLikedMap();
    liked[movie.id] = action === "like";
    setLikedMap(liked);
    showToast(action === "like" ? "Marked as liked" : "Marked as disliked");
    renderRecommendation();
    return;
  }

  if (action === "rate") {
    openDetails(movie);
    return;
  }
}

function bindEvents() {
  document.addEventListener("click", (event) => {
    const closeTarget = event.target.closest("[data-close]");
    if (closeTarget) {
      const modal = document.getElementById(closeTarget.dataset.close);
      if (modal) {
        closeModal(modal);
      }
    }

    const actionBtn = event.target.closest("[data-action]");
    if (actionBtn) {
      handleCardAction(actionBtn.dataset.action, Number(actionBtn.dataset.id));
    }

    const card = event.target.closest(".movie-card");
    if (card && !event.target.closest(".card-overlay")) {
      const movieId = Number(card.dataset.movieId);
      const movie = movieById(movieId);
      if (movie) {
        openDetails(movie);
      }
    }

    const chip = event.target.closest(".chip");
    if (chip) {
      activeGenre = chip.dataset.genre;
      renderGenreChips();
      renderRows();
    }

    const searchResult = event.target.closest("[data-search-id]");
    if (searchResult) {
      const movie = movieById(Number(searchResult.dataset.searchId));
      if (movie) {
        openDetails(movie);
      }
      el.searchResults.classList.remove("open");
      el.searchInput.value = "";
    }

    const profileAction = event.target.closest("[data-profile-action]");
    if (profileAction) {
      if (profileAction.dataset.profileAction === "logout") {
        localStorage.removeItem(STORAGE_KEYS.user);
        renderProfileDropdown();
        showToast("Logged out");
      } else {
        switchAuthMode(profileAction.dataset.profileAction);
        openModal(el.authModal);
      }
      el.profileDropdown.classList.remove("open");
    }

    const authTab = event.target.closest(".auth-tab");
    if (authTab) {
      switchAuthMode(authTab.dataset.mode);
    }

    const ratingButton = event.target.closest("[data-rate]");
    if (ratingButton) {
      const wrapper = ratingButton.closest("[data-rate-for]");
      const movieId = Number(wrapper.dataset.rateFor);
      const rating = Number(ratingButton.dataset.rate);
      const ratingsMap = getRatingsMap();
      ratingsMap[movieId] = rating;
      setRatingsMap(ratingsMap);
      renderDetails(movieById(movieId));
      showToast("Rating saved");
    }
  });

  window.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal")) {
      closeModal(event.target);
    }
    if (!event.target.closest(".search-wrap")) {
      el.searchResults.classList.remove("open");
    }
    if (!event.target.closest(".profile-wrap")) {
      el.profileDropdown.classList.remove("open");
    }
  });

  el.searchInput.addEventListener("input", (event) => {
    searchTerm = event.target.value;
    renderRows();
    renderSearchResults();
  });

  el.sortSelect.addEventListener("change", () => {
    setPreference("sortBy", el.sortSelect.value);
    renderRows();
  });

  el.profileButton.addEventListener("click", () => {
    el.profileDropdown.classList.toggle("open");
  });

  el.languageToggle.addEventListener("change", () => {
    setPreference("language", el.languageToggle.value);
    applyI18n();
    renderRows();
    renderRecommendation();
    renderProfileDropdown();
  });

  el.themeToggle.addEventListener("click", () => {
    const next = document.body.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next);
    setPreference("theme", next);
  });

  el.hamburgerButton.addEventListener("click", () => {
    el.navLinks.classList.toggle("open");
  });

  el.heroTrailerBtn.addEventListener("click", () => {
    const movie = movieById(Number(el.heroTrailerBtn.dataset.id));
    if (movie) {
      openTrailer(movie);
    }
  });

  el.heroWatchlistBtn.addEventListener("click", () => {
    toggleWatchlist(Number(el.heroWatchlistBtn.dataset.id));
  });

  el.authForm.addEventListener("submit", submitAuth);

  window.addEventListener("scroll", () => {
    el.scrollTopButton.classList.toggle("show", window.scrollY > 480);
  });

  el.scrollTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function simulateLoadingAndRender() {
  el.rowsContainer.innerHTML = "";
  for (let i = 0; i < 3; i += 1) {
    el.rowsContainer.appendChild(createSkeletonRow());
  }
  setTimeout(() => {
    renderRows();
    renderWatchlist();
    renderRecommendation();
  }, 850);
}

function initializeApp() {
  el.yearNow.textContent = String(new Date().getFullYear());
  setupPreferences();
  renderGenreChips();
  renderProfileDropdown();
  setHero(movies[0]);
  bindEvents();
  switchAuthMode("login");
  simulateLoadingAndRender();
}

initializeApp();
