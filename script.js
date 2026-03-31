const API_KEY = "6ecc4d6938d362e905e2606fe99a3d70";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const ENDPOINTS = {
  trending: `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`,
  popular: `${BASE_URL}/movie/popular?api_key=${API_KEY}`,
  topRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`,
  search: `${BASE_URL}/search/movie?api_key=${API_KEY}&query=`,
  details: (movieId) => `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`,
  videos: (movieId) => `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`,
  discoverHindi: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=hi&sort_by=popularity.desc`,
  discoverEnglish: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=en&sort_by=popularity.desc`
};

const STORAGE_KEYS = {
  watchlist: "primeStream.watchlist",
  recentlyViewed: "primeStream.recentlyViewed",
  continueWatching: "primeStream.continueWatching",
  likes: "primeStream.likes",
  ratings: "primeStream.ratings",
  prefs: "primeStream.preferences",
  users: "primeStream.users",
  currentUser: "primeStream.currentUser"
};

const i18n = {
  en: {
    home: "Home",
    movies: "Movies",
    tv: "TV Shows",
    trending: "Trending",
    myList: "My List",
    watchTrailer: "▶ Watch Trailer",
    addWatchlist: "✚ Add to Watchlist",
    removeWatchlist: "− Remove Watchlist",
    top10: "Top 10 Today",
    searchPlaceholder: "Search movies...",
    noResults: "No results found",
    rec: "Recommended For You",
    popularity: "Popularity",
    rating: "Rating"
  },
  hi: {
    home: "होम",
    movies: "मूवीज़",
    tv: "टीवी शो",
    trending: "ट्रेंडिंग",
    myList: "मेरी सूची",
    watchTrailer: "▶ ट्रेलर देखें",
    addWatchlist: "✚ वॉचलिस्ट में जोड़ें",
    removeWatchlist: "− वॉचलिस्ट से हटाएं",
    top10: "आज का टॉप 10",
    searchPlaceholder: "मूवी खोजें...",
    noResults: "कोई परिणाम नहीं",
    rec: "आपके लिए सुझाव",
    popularity: "लोकप्रियता",
    rating: "रेटिंग"
  },
  es: {
    home: "Inicio",
    movies: "Películas",
    tv: "Series",
    trending: "Tendencias",
    myList: "Mi Lista",
    watchTrailer: "▶ Ver Tráiler",
    addWatchlist: "✚ Añadir a lista",
    removeWatchlist: "− Quitar de lista",
    top10: "Top 10 de hoy",
    searchPlaceholder: "Buscar películas...",
    noResults: "Sin resultados",
    rec: "Recomendado para ti",
    popularity: "Popularidad",
    rating: "Calificación"
  }
};

const state = {
  view: "home",
  language: "en",
  theme: "dark",
  activeGenre: "All",
  sortBy: "popularity",
  authMode: "login",
  lastScrollY: 0,
  datasets: {
    trending: [],
    popular: [],
    topRated: [],
    hindi: [],
    english: []
  },
  genreMap: {},
  searchTimer: null,
  currentHeroMovie: null,
  trailerCache: {},
  detailsCache: {}
};

const el = {
  navbar: document.getElementById("navbar"),
  navTabs: document.getElementById("navTabs"),
  searchInput: document.getElementById("searchInput"),
  searchSuggestions: document.getElementById("searchSuggestions"),
  profileBtn: document.getElementById("profileBtn"),
  profileMenu: document.getElementById("profileMenu"),
  themeToggle: document.getElementById("themeToggle"),
  languageToggle: document.getElementById("languageToggle"),
  mobileNavBtn: document.getElementById("mobileNavBtn"),
  heroBackdrop: document.getElementById("heroBackdrop"),
  heroTitle: document.getElementById("heroTitle"),
  heroMeta: document.getElementById("heroMeta"),
  heroOverview: document.getElementById("heroOverview"),
  heroTrailerBtn: document.getElementById("heroTrailerBtn"),
  heroWatchlistBtn: document.getElementById("heroWatchlistBtn"),
  heroTrailerWrap: document.getElementById("heroTrailerWrap"),
  homeRows: document.getElementById("homeRows"),
  moviesGrid: document.getElementById("moviesGrid"),
  tvRows: document.getElementById("tvRows"),
  trendingGrid: document.getElementById("trendingGrid"),
  watchlistGrid: document.getElementById("watchlistGrid"),
  genreChips: document.getElementById("genreChips"),
  sortBy: document.getElementById("sortBy"),
  scrollTopBtn: document.getElementById("scrollTopBtn"),
  toastStack: document.getElementById("toastStack"),
  movieModal: document.getElementById("movieModal"),
  movieModalBody: document.getElementById("movieModalBody"),
  trailerModal: document.getElementById("trailerModal"),
  trailerFrame: document.getElementById("trailerFrame"),
  authModal: document.getElementById("authModal"),
  authForm: document.getElementById("authForm"),
  authTitle: document.getElementById("authTitle"),
  authName: document.getElementById("authName"),
  authEmail: document.getElementById("authEmail"),
  authPassword: document.getElementById("authPassword"),
  authConfirm: document.getElementById("authConfirm"),
  nameFieldWrap: document.getElementById("nameFieldWrap"),
  confirmFieldWrap: document.getElementById("confirmFieldWrap"),
  authSubmitBtn: document.getElementById("authSubmitBtn"),
  authSwitchBtn: document.getElementById("authSwitchBtn"),
  yearText: document.getElementById("yearText")
};

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

function t(key) {
  return i18n[state.language]?.[key] || i18n.en[key] || key;
}

function toast(message) {
  const node = document.createElement("div");
  node.className = "toast";
  node.textContent = message;
  el.toastStack.appendChild(node);
  setTimeout(() => node.remove(), 2600);
}

function toPoster(path) {
  return path ? `${IMAGE_BASE}${path}` : "";
}

function toBackdrop(path) {
  return path ? `${IMAGE_BASE}${path}` : "";
}

async function fetchJSON(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json();
}

async function fetchGenres() {
  const data = await fetchJSON(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  const map = {};
  (data.genres || []).forEach((genre) => {
    map[genre.id] = genre.name;
  });
  state.genreMap = map;
}

function normalizeMovie(movie) {
  return {
    id: movie.id,
    title: movie.title || movie.name || "Untitled",
    rating: Number(movie.vote_average || 0),
    popularity: Number(movie.popularity || 0),
    overview: movie.overview || "No description available.",
    poster_path: movie.poster_path,
    backdrop_path: movie.backdrop_path,
    original_language: movie.original_language || "en",
    genre_ids: movie.genre_ids || []
  };
}

async function preloadDatasets() {
  const [trendingData, popularData, topRatedData, hindiData, englishData] = await Promise.all([
    fetchJSON(ENDPOINTS.trending),
    fetchJSON(ENDPOINTS.popular),
    fetchJSON(ENDPOINTS.topRated),
    fetchJSON(ENDPOINTS.discoverHindi),
    fetchJSON(ENDPOINTS.discoverEnglish)
  ]);

  state.datasets.trending = (trendingData.results || []).map(normalizeMovie);
  state.datasets.popular = (popularData.results || []).map(normalizeMovie);
  state.datasets.topRated = (topRatedData.results || []).map(normalizeMovie);
  state.datasets.hindi = (hindiData.results || []).map(normalizeMovie);
  state.datasets.english = (englishData.results || []).map(normalizeMovie);
}

function getWatchlist() {
  return getJSON(STORAGE_KEYS.watchlist, []);
}

function setWatchlist(ids) {
  setJSON(STORAGE_KEYS.watchlist, ids);
}

function getLikes() {
  return getJSON(STORAGE_KEYS.likes, {});
}

function setLikes(data) {
  setJSON(STORAGE_KEYS.likes, data);
}

function getRatings() {
  return getJSON(STORAGE_KEYS.ratings, {});
}

function setRatings(data) {
  setJSON(STORAGE_KEYS.ratings, data);
}

function getRecentlyViewed() {
  return getJSON(STORAGE_KEYS.recentlyViewed, []);
}

function setRecentlyViewed(ids) {
  setJSON(STORAGE_KEYS.recentlyViewed, ids.slice(0, 24));
}

function getContinueWatching() {
  return getJSON(STORAGE_KEYS.continueWatching, {});
}

function setContinueWatching(data) {
  setJSON(STORAGE_KEYS.continueWatching, data);
}

function getPrefs() {
  return getJSON(STORAGE_KEYS.prefs, {
    theme: "dark",
    language: "en",
    sortBy: "popularity"
  });
}

function setPref(key, value) {
  const prefs = getPrefs();
  prefs[key] = value;
  setJSON(STORAGE_KEYS.prefs, prefs);
}

function getUsers() {
  return getJSON(STORAGE_KEYS.users, []);
}

function setUsers(users) {
  setJSON(STORAGE_KEYS.users, users);
}

function getCurrentUser() {
  return getJSON(STORAGE_KEYS.currentUser, null);
}

function setCurrentUser(user) {
  if (user) {
    setJSON(STORAGE_KEYS.currentUser, user);
  } else {
    localStorage.removeItem(STORAGE_KEYS.currentUser);
  }
}

function getMovieFromAll(movieId) {
  const groups = Object.values(state.datasets);
  for (let i = 0; i < groups.length; i += 1) {
    const found = groups[i].find((movie) => movie.id === movieId);
    if (found) {
      return found;
    }
  }
  return null;
}

function movieGenres(movie) {
  if (Array.isArray(movie.genres) && movie.genres.length) {
    return movie.genres.map((genre) => genre.name);
  }
  return (movie.genre_ids || []).map((id) => state.genreMap[id]).filter(Boolean);
}

function stars(value) {
  const rounded = Math.max(0, Math.min(5, Math.round(value / 2)));
  return `${"★".repeat(rounded)}${"☆".repeat(5 - rounded)}`;
}

async function getMovieTrailerKey(movieId) {
  if (state.trailerCache[movieId]) {
    return state.trailerCache[movieId];
  }
  const data = await fetchJSON(ENDPOINTS.videos(movieId));
  const videos = data.results || [];
  const trailer =
    videos.find((video) => video.site === "YouTube" && video.type === "Trailer") ||
    videos.find((video) => video.site === "YouTube");
  const key = trailer?.key || null;
  state.trailerCache[movieId] = key;
  return key;
}

async function getMovieDetails(movieId) {
  if (state.detailsCache[movieId]) {
    return state.detailsCache[movieId];
  }
  const details = await fetchJSON(ENDPOINTS.details(movieId));
  state.detailsCache[movieId] = details;
  return details;
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

function renderSkeletonCards(count = 8) {
  return Array.from({ length: count })
    .map(
      () => `
      <article class="movie-card skeleton-card">
        <div class="skeleton skeleton-poster"></div>
        <div class="movie-info">
          <div class="skeleton skeleton-line"></div>
          <div class="skeleton skeleton-line short"></div>
        </div>
      </article>
    `
    )
    .join("");
}

function movieCardTemplate(movie, options = {}) {
  const watchlist = getWatchlist();
  const inList = watchlist.includes(movie.id);
  const continueMap = getContinueWatching();
  const progress = Math.min(100, continueMap[movie.id] || 0);
  return `
    <article class="movie-card" data-movie-id="${movie.id}">
      <img loading="lazy" src="${toPoster(movie.poster_path)}" alt="${movie.title}" />
      <div class="movie-info">
        <h4>${movie.title}</h4>
        <p>${stars(movie.rating)} · ${movie.rating.toFixed(1)}</p>
      </div>
      ${
        options.showProgress
          ? `
        <div class="progress-wrap">
          <div class="progress-bar" style="width:${progress}%"></div>
        </div>
      `
          : ""
      }
      <div class="movie-hover">
        <div class="hover-actions">
          <button class="mini-btn" data-action="play" data-id="${movie.id}">▶ Play</button>
          <button class="mini-btn" data-action="watchlist" data-id="${movie.id}">
            ${inList ? "− Watchlist" : "✚ Watchlist"}
          </button>
          <button class="mini-btn" data-action="like" data-id="${movie.id}">👍 Like</button>
          <button class="mini-btn" data-action="dislike" data-id="${movie.id}">👎 Dislike</button>
          <button class="mini-btn" data-action="rate" data-id="${movie.id}">⭐ Rate</button>
          <button class="mini-btn" data-action="favorite" data-id="${movie.id}">📌 Favorite</button>
        </div>
      </div>
    </article>
  `;
}

function renderRow(title, items, options = {}) {
  return `
    <section class="row-block">
      <div class="row-header">
        <h3>${title}</h3>
      </div>
      <div class="row-track">
        ${
          items.length
            ? items.map((movie) => movieCardTemplate(movie, options)).join("")
            : `<p class="empty-text">${t("noResults")}</p>`
        }
      </div>
    </section>
  `;
}

function computeRecommendations() {
  const likes = getLikes();
  const likedIds = Object.keys(likes)
    .filter((id) => likes[id] === "like")
    .map((id) => Number(id));
  const likedMovies = likedIds.map((id) => getMovieFromAll(id)).filter(Boolean);
  const preferredGenres = likedMovies.flatMap((movie) => movie.genre_ids || []);
  const source = [...state.datasets.popular, ...state.datasets.topRated];
  if (!preferredGenres.length) {
    return source.slice(0, 12);
  }
  return source
    .filter((movie) => (movie.genre_ids || []).some((genreId) => preferredGenres.includes(genreId)))
    .slice(0, 12);
}

function renderHomeView() {
  const trending = state.datasets.trending.slice(0, 12);
  const topRated = state.datasets.topRated.slice(0, 12);
  const popular = state.datasets.popular.slice(0, 12);
  const hindi = state.datasets.hindi.slice(0, 12);
  const english = state.datasets.english.slice(0, 12);
  const rec = computeRecommendations().slice(0, 12);
  const recent = getRecentlyViewed()
    .map((id) => getMovieFromAll(id))
    .filter(Boolean);
  const continueMap = getContinueWatching();
  const continueWatching = Object.keys(continueMap)
    .map((id) => getMovieFromAll(Number(id)))
    .filter(Boolean)
    .slice(0, 12);

  el.homeRows.innerHTML = [
    renderRow("Trending", trending),
    renderRow("Top Rated", topRated),
    renderRow("Popular", popular),
    renderRow("Hindi Movies", hindi),
    renderRow("English Movies", english),
    renderRow(t("rec"), rec),
    renderRow("Continue Watching", continueWatching, { showProgress: true }),
    renderRow("Recently Viewed", recent)
  ].join("");
}

function buildGenreChips() {
  const allGenres = Object.values(state.genreMap);
  const unique = ["All", ...new Set(allGenres)];
  el.genreChips.innerHTML = unique
    .map(
      (genre) => `
      <button class="chip ${state.activeGenre === genre ? "active" : ""}" data-genre="${genre}">
        ${genre}
      </button>
    `
    )
    .join("");
}

function renderMoviesView() {
  const pool = [...state.datasets.popular, ...state.datasets.topRated, ...state.datasets.trending];
  const dedupMap = {};
  const unique = [];
  pool.forEach((movie) => {
    if (!dedupMap[movie.id]) {
      dedupMap[movie.id] = true;
      unique.push(movie);
    }
  });

  let filtered = unique;
  if (state.activeGenre !== "All") {
    filtered = filtered.filter((movie) => movieGenres(movie).includes(state.activeGenre));
  }
  filtered = filtered.sort((a, b) =>
    state.sortBy === "rating" ? b.rating - a.rating : b.popularity - a.popularity
  );

  el.moviesGrid.innerHTML = filtered.length
    ? filtered.map((movie) => movieCardTemplate(movie)).join("")
    : `<p class="empty-text">${t("noResults")}</p>`;
}

function renderTVView() {
  const hybrid = [...state.datasets.topRated.slice(0, 8), ...state.datasets.english.slice(0, 8)];
  el.tvRows.innerHTML = [
    renderRow("Prime Originals", hybrid.slice(0, 10)),
    renderRow("Drama Picks", hybrid.slice(2, 12)),
    renderRow("Late Night Watch", hybrid.slice(4, 14))
  ].join("");
}

function renderTrendingView() {
  el.trendingGrid.innerHTML = state.datasets.trending.length
    ? state.datasets.trending.map((movie) => movieCardTemplate(movie)).join("")
    : renderSkeletonCards(10);
}

function renderWatchlistView() {
  const items = getWatchlist()
    .map((id) => getMovieFromAll(id))
    .filter(Boolean);
  el.watchlistGrid.innerHTML = items.length
    ? items.map((movie) => movieCardTemplate(movie)).join("")
    : `<p class="empty-text">Your watchlist is empty.</p>`;
}

function activateView(view) {
  state.view = view;
  document.querySelectorAll(".view").forEach((node) => {
    node.classList.toggle("active", node.id === `view-${view}`);
  });
  document.querySelectorAll(".nav-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.view === view);
  });
}

function renderViews() {
  renderHomeView();
  renderMoviesView();
  renderTVView();
  renderTrendingView();
  renderWatchlistView();
}

function formatMeta(movie) {
  const genres = movieGenres(movie).slice(0, 3).join(" • ");
  return `${movie.rating.toFixed(1)} ★${genres ? ` • ${genres}` : ""}`;
}

async function renderHero() {
  const heroMovie = state.datasets.trending[0] || state.datasets.popular[0] || null;
  if (!heroMovie) {
    return;
  }
  state.currentHeroMovie = heroMovie;
  el.heroBackdrop.style.backgroundImage = `url(${toBackdrop(heroMovie.backdrop_path || heroMovie.poster_path)})`;
  el.heroTitle.textContent = heroMovie.title;
  el.heroMeta.textContent = formatMeta(heroMovie);
  el.heroOverview.textContent = heroMovie.overview;
  el.heroWatchlistBtn.textContent = getWatchlist().includes(heroMovie.id)
    ? t("removeWatchlist")
    : t("addWatchlist");

  const key = await getMovieTrailerKey(heroMovie.id);
  if (key) {
    el.heroTrailerWrap.innerHTML = `
      <iframe
        title="Hero trailer preview"
        src="https://www.youtube.com/embed/${key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${key}"
        allow="autoplay; encrypted-media; picture-in-picture"
      ></iframe>
    `;
  } else {
    el.heroTrailerWrap.innerHTML = "";
  }
}

async function openTrailer(movieId) {
  const key = await getMovieTrailerKey(movieId);
  if (!key) {
    toast("Trailer unavailable");
    return;
  }
  el.trailerFrame.src = `https://www.youtube.com/embed/${key}?autoplay=1&rel=0`;
  openModal(el.trailerModal);
  incrementContinue(movieId, 7);
}

function pushRecent(movieId) {
  const current = getRecentlyViewed().filter((id) => id !== movieId);
  current.unshift(movieId);
  setRecentlyViewed(current);
}

function incrementContinue(movieId, amount = 6) {
  const map = getContinueWatching();
  map[movieId] = Math.min(100, (map[movieId] || 0) + amount);
  setContinueWatching(map);
}

async function openMovieDetails(movieId) {
  const basic = getMovieFromAll(movieId);
  if (!basic) {
    return;
  }

  const [details, trailerKey] = await Promise.all([
    getMovieDetails(movieId),
    getMovieTrailerKey(movieId)
  ]);

  pushRecent(movieId);
  incrementContinue(movieId, 5);

  const ratings = getRatings();
  const myRating = Number(ratings[movieId] || 0);
  const inList = getWatchlist().includes(movieId);
  const genres = (details.genres || []).map((genre) => genre.name).join(" • ");

  el.movieModalBody.innerHTML = `
    <div class="details-hero" style="background-image:url(${toBackdrop(
      details.backdrop_path || details.poster_path
    )})"></div>
    <div class="details-content">
      <img class="details-poster" src="${toPoster(details.poster_path)}" alt="${details.title}" />
      <div>
        <h2>${details.title}</h2>
        <p class="details-meta">${details.vote_average.toFixed(1)} ★ • ${genres || "Unknown genre"}</p>
        <p class="details-overview">${details.overview || "No overview available."}</p>
        <div class="details-actions">
          <button class="primary-btn" data-action="play" data-id="${movieId}">▶ Play</button>
          <button class="ghost-btn" data-action="watchlist" data-id="${movieId}">
            ${inList ? t("removeWatchlist") : t("addWatchlist")}
          </button>
        </div>
        <div class="rating-inline">
          ${[1, 2, 3, 4, 5]
            .map(
              (star) =>
                `<button class="rate-btn ${myRating >= star ? "active" : ""}" data-rate-star="${star}" data-rate-id="${movieId}">★</button>`
            )
            .join("")}
        </div>
        ${
          trailerKey
            ? `<div class="details-trailer">
                <iframe
                  title="Details trailer"
                  src="https://www.youtube.com/embed/${trailerKey}"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>`
            : ""
        }
      </div>
    </div>
  `;

  openModal(el.movieModal);
  renderViews();
}

function toggleWatchlist(movieId) {
  const watchlist = getWatchlist();
  const has = watchlist.includes(movieId);
  const next = has ? watchlist.filter((id) => id !== movieId) : [...watchlist, movieId];
  setWatchlist(next);
  toast(has ? "Removed from watchlist" : "Added to watchlist");
  if (state.currentHeroMovie?.id === movieId) {
    el.heroWatchlistBtn.textContent = has ? t("addWatchlist") : t("removeWatchlist");
  }
  renderViews();
}

function setLike(movieId, value) {
  const likes = getLikes();
  likes[movieId] = value;
  setLikes(likes);
  toast(value === "like" ? "Marked as liked" : "Marked as disliked");
  renderViews();
}

function setRating(movieId, rating) {
  const ratings = getRatings();
  ratings[movieId] = rating;
  setRatings(ratings);
  toast("Rating saved");
  openMovieDetails(movieId);
}

function profileMenuTemplate() {
  const user = getCurrentUser();
  if (user) {
    return `
      <div class="profile-head">
        <strong>${user.name || user.email}</strong>
        <small>${user.email}</small>
      </div>
      <button data-profile-action="settings">Settings</button>
      <button data-profile-action="logout">Logout</button>
    `;
  }
  return `
    <button data-profile-action="login">Login</button>
    <button data-profile-action="signup">Signup</button>
  `;
}

function renderProfileMenu() {
  el.profileMenu.innerHTML = profileMenuTemplate();
}

function switchAuthMode(mode) {
  state.authMode = mode;
  const isSignup = mode === "signup";
  el.authTitle.textContent = isSignup ? "Signup" : "Login";
  el.nameFieldWrap.classList.toggle("hidden", !isSignup);
  el.confirmFieldWrap.classList.toggle("hidden", !isSignup);
  el.authSubmitBtn.textContent = isSignup ? "Signup" : "Login";
  el.authSwitchBtn.textContent = isSignup ? "Have an account? Login" : "Create account";
}

function handleAuthSubmit(event) {
  event.preventDefault();
  const email = el.authEmail.value.trim().toLowerCase();
  const password = el.authPassword.value;
  const name = el.authName.value.trim();
  const confirm = el.authConfirm.value;
  const users = getUsers();

  if (!email || !password) {
    toast("Please fill required fields");
    return;
  }

  if (state.authMode === "signup") {
    if (!name) {
      toast("Name is required");
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
    const newUser = { name, email, password };
    users.push(newUser);
    setUsers(users);
    setCurrentUser(newUser);
    toast("Signup successful");
  } else {
    const user = users.find((item) => item.email === email && item.password === password);
    if (!user) {
      toast("Invalid credentials");
      return;
    }
    setCurrentUser(user);
    toast("Login successful");
  }

  el.authForm.reset();
  closeModal(el.authModal);
  renderProfileMenu();
}

async function handleSearchInput() {
  const query = el.searchInput.value.trim();
  if (!query) {
    el.searchSuggestions.classList.remove("open");
    el.searchSuggestions.innerHTML = "";
    return;
  }

  const data = await fetchJSON(`${ENDPOINTS.search}${encodeURIComponent(query)}`);
  const results = (data.results || []).slice(0, 7).map(normalizeMovie);
  if (!results.length) {
    el.searchSuggestions.innerHTML = `<p class="suggestion-empty">${t("noResults")}</p>`;
    el.searchSuggestions.classList.add("open");
    return;
  }

  el.searchSuggestions.innerHTML = results
    .map(
      (movie) => `
      <button class="suggestion-item" data-suggest-id="${movie.id}">
        <img src="${toPoster(movie.poster_path)}" alt="${movie.title}" />
        <div>
          <strong>${movie.title}</strong>
          <small>${movie.rating.toFixed(1)} ★</small>
        </div>
      </button>
    `
    )
    .join("");
  el.searchSuggestions.classList.add("open");
}

function queueSearch() {
  clearTimeout(state.searchTimer);
  state.searchTimer = setTimeout(() => {
    handleSearchInput().catch(() => {
      el.searchSuggestions.innerHTML = `<p class="suggestion-empty">Search failed</p>`;
      el.searchSuggestions.classList.add("open");
    });
  }, 320);
}

function applyTheme(theme) {
  state.theme = theme;
  document.body.dataset.theme = theme;
  el.themeToggle.textContent = theme === "dark" ? "🌙" : "☀️";
}

function applyLanguage(lang) {
  state.language = lang;
  el.searchInput.placeholder = t("searchPlaceholder");
  document.querySelector('.nav-tab[data-view="home"]').textContent = t("home");
  document.querySelector('.nav-tab[data-view="movies"]').textContent = t("movies");
  document.querySelector('.nav-tab[data-view="tv"]').textContent = t("tv");
  document.querySelector('.nav-tab[data-view="trending"]').textContent = t("trending");
  document.querySelector('.nav-tab[data-view="mylist"]').textContent = t("myList");
}

function detectNavbarScroll() {
  const y = window.scrollY;
  el.navbar.classList.toggle("scrolled", y > 15);
  el.scrollTopBtn.classList.toggle("show", y > 500);
  if (y > state.lastScrollY && y > 160) {
    el.navbar.classList.add("hide");
  } else {
    el.navbar.classList.remove("hide");
  }
  state.lastScrollY = y;
}

function handleGlobalClick(event) {
  const closeBtn = event.target.closest("[data-close-modal]");
  if (closeBtn) {
    closeModal(document.getElementById(closeBtn.dataset.closeModal));
  }

  if (event.target.classList.contains("modal")) {
    closeModal(event.target);
  }

  const tab = event.target.closest(".nav-tab");
  if (tab) {
    activateView(tab.dataset.view);
  }

  const movieCard = event.target.closest(".movie-card");
  if (movieCard && !event.target.closest(".hover-actions")) {
    openMovieDetails(Number(movieCard.dataset.movieId)).catch(() => toast("Failed to load details"));
  }

  const action = event.target.closest("[data-action]");
  if (action) {
    const movieId = Number(action.dataset.id);
    const type = action.dataset.action;
    if (type === "play") {
      openTrailer(movieId).catch(() => toast("Failed to play trailer"));
    } else if (type === "watchlist" || type === "favorite") {
      toggleWatchlist(movieId);
    } else if (type === "like") {
      setLike(movieId, "like");
    } else if (type === "dislike") {
      setLike(movieId, "dislike");
    } else if (type === "rate") {
      openMovieDetails(movieId).catch(() => toast("Failed to open rating"));
    }
  }

  const suggest = event.target.closest("[data-suggest-id]");
  if (suggest) {
    const movieId = Number(suggest.dataset.suggestId);
    openMovieDetails(movieId).catch(() => toast("Failed to open movie"));
    el.searchInput.value = "";
    el.searchSuggestions.classList.remove("open");
  }

  const chip = event.target.closest("[data-genre]");
  if (chip) {
    state.activeGenre = chip.dataset.genre;
    buildGenreChips();
    renderMoviesView();
  }

  const profileAction = event.target.closest("[data-profile-action]");
  if (profileAction) {
    const actionType = profileAction.dataset.profileAction;
    if (actionType === "login" || actionType === "signup") {
      switchAuthMode(actionType === "signup" ? "signup" : "login");
      openModal(el.authModal);
    } else if (actionType === "logout") {
      setCurrentUser(null);
      toast("Logged out");
      renderProfileMenu();
    } else if (actionType === "settings") {
      toast("Settings panel coming soon");
    }
    el.profileMenu.classList.remove("open");
  }

  const rateBtn = event.target.closest("[data-rate-star]");
  if (rateBtn) {
    const movieId = Number(rateBtn.dataset.rateId);
    const rating = Number(rateBtn.dataset.rateStar);
    setRating(movieId, rating);
  }

  if (!event.target.closest(".search-wrap")) {
    el.searchSuggestions.classList.remove("open");
  }

  if (!event.target.closest(".profile-wrap")) {
    el.profileMenu.classList.remove("open");
  }
}

function bindEvents() {
  document.addEventListener("click", handleGlobalClick);

  el.mobileNavBtn.addEventListener("click", () => {
    el.navTabs.classList.toggle("open");
  });

  el.profileBtn.addEventListener("click", () => {
    el.profileMenu.classList.toggle("open");
  });

  el.searchInput.addEventListener("input", () => {
    queueSearch();
  });

  el.themeToggle.addEventListener("click", () => {
    const next = state.theme === "dark" ? "light" : "dark";
    applyTheme(next);
    setPref("theme", next);
  });

  el.languageToggle.addEventListener("change", () => {
    applyLanguage(el.languageToggle.value);
    setPref("language", el.languageToggle.value);
    renderViews();
    renderHero().catch(() => {
      /* no-op */
    });
  });

  el.sortBy.addEventListener("change", () => {
    state.sortBy = el.sortBy.value;
    setPref("sortBy", state.sortBy);
    renderMoviesView();
  });

  el.heroTrailerBtn.addEventListener("click", () => {
    if (state.currentHeroMovie) {
      openTrailer(state.currentHeroMovie.id).catch(() => toast("Failed to play trailer"));
    }
  });

  el.heroWatchlistBtn.addEventListener("click", () => {
    if (state.currentHeroMovie) {
      toggleWatchlist(state.currentHeroMovie.id);
    }
  });

  el.authForm.addEventListener("submit", handleAuthSubmit);

  el.authSwitchBtn.addEventListener("click", () => {
    switchAuthMode(state.authMode === "login" ? "signup" : "login");
  });

  window.addEventListener("scroll", detectNavbarScroll);

  el.scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "/") {
      event.preventDefault();
      el.searchInput.focus();
    } else if (event.key === "Escape") {
      closeModal(el.movieModal);
      closeModal(el.trailerModal);
      closeModal(el.authModal);
      el.searchSuggestions.classList.remove("open");
      el.profileMenu.classList.remove("open");
    }
  });
}

function applySavedPreferences() {
  const prefs = getPrefs();
  applyTheme(prefs.theme || "dark");
  state.sortBy = prefs.sortBy || "popularity";
  el.sortBy.value = state.sortBy;
  state.language = prefs.language || "en";
  el.languageToggle.value = state.language;
  applyLanguage(state.language);
}

function initialSkeletons() {
  el.homeRows.innerHTML = renderRow("Trending", [], {}) + renderRow("Loading", [], {});
  el.moviesGrid.innerHTML = renderSkeletonCards(12);
  el.trendingGrid.innerHTML = renderSkeletonCards(10);
  el.watchlistGrid.innerHTML = renderSkeletonCards(8);
}

async function init() {
  el.yearText.textContent = String(new Date().getFullYear());
  applySavedPreferences();
  renderProfileMenu();
  bindEvents();
  initialSkeletons();

  try {
    await fetchGenres();
    await preloadDatasets();
    buildGenreChips();
    renderViews();
    await renderHero();
  } catch (error) {
    toast("Failed to load TMDb data");
    console.error(error);
  }
}

init();
