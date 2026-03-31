const API_KEY = "6ecc4d6938d362e905e2606fe99a3d70";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

const ENDPOINTS = {
  trending: `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`,
  topRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`,
  popularIndia: `${BASE_URL}/movie/popular?api_key=${API_KEY}&region=IN`,
  discoverEnglish: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=en&sort_by=popularity.desc`,
  discoverHindi: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=hi&sort_by=popularity.desc`,
  search: `${BASE_URL}/search/movie?api_key=${API_KEY}&query=`,
  details: (id) => `${BASE_URL}/movie/${id}?api_key=${API_KEY}`,
  videos: (id) => `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`,
  genres: `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`,
  spiderMan: `${BASE_URL}/search/movie?api_key=${API_KEY}&query=spiderman`
};

const STORAGE_KEYS = {
  users: "primeStream.users",
  currentUser: "primeStream.currentUser",
  prefs: "primeStream.prefs",
  fallbackRecent: "primeStream.recentlyViewed",
  fallbackContinue: "primeStream.continueWatching"
};

const state = {
  view: "home",
  theme: "dark",
  language: "en",
  lastScrollY: 0,
  authMode: "login",
  pendingAction: null,
  searchTimer: null,
  hoverTimers: {},
  trailerCache: {},
  detailsCache: {},
  genreMap: {},
  heroMovie: null,
  datasets: {
    trending: [],
    topRated: [],
    english: [],
    hindi: [],
    popularIndia: []
  }
};

const el = {
  navbar: document.getElementById("navbar"),
  navTabs: document.getElementById("navTabs"),
  searchInput: document.getElementById("searchInput"),
  searchSuggestions: document.getElementById("searchSuggestions"),
  profileBtn: document.getElementById("profileBtn"),
  profileName: document.getElementById("profileName"),
  profileMenu: document.getElementById("profileMenu"),
  mobileNavBtn: document.getElementById("mobileNavBtn"),
  themeToggle: document.getElementById("themeToggle"),
  languageToggle: document.getElementById("languageToggle"),
  heroBackdrop: document.getElementById("heroBackdrop"),
  heroTitle: document.getElementById("heroTitle"),
  heroMeta: document.getElementById("heroMeta"),
  heroOverview: document.getElementById("heroOverview"),
  heroTrailerBtn: document.getElementById("heroTrailerBtn"),
  heroWatchlistBtn: document.getElementById("heroWatchlistBtn"),
  heroTrailerWrap: document.getElementById("heroTrailerWrap"),
  homeRows: document.getElementById("homeRows"),
  moviesGrid: document.getElementById("moviesGrid"),
  trendingGrid: document.getElementById("trendingGrid"),
  indiaGrid: document.getElementById("indiaGrid"),
  myListGrid: document.getElementById("myListGrid"),
  genreChips: document.getElementById("genreChips"),
  sortBy: document.getElementById("sortBy"),
  movieModal: document.getElementById("movieModal"),
  movieModalBody: document.getElementById("movieModalBody"),
  trailerModal: document.getElementById("trailerModal"),
  trailerFrame: document.getElementById("trailerFrame"),
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
  authSwitchBtn: document.getElementById("authSwitchBtn"),
  toastStack: document.getElementById("toastStack"),
  scrollTopBtn: document.getElementById("scrollTopBtn"),
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

function getPrefs() {
  return getJSON(STORAGE_KEYS.prefs, { theme: "dark", language: "en", sortBy: "popularity" });
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

function userStoreKey(name) {
  const userId = getCurrentUser()?.id;
  return userId ? `primeStream.${name}.${userId}` : null;
}

function getWatchlist() {
  const key = userStoreKey("watchlist");
  return key ? getJSON(key, []) : [];
}

function setWatchlist(ids) {
  const key = userStoreKey("watchlist");
  if (key) {
    setJSON(key, ids);
  }
}

function getLikes() {
  const key = userStoreKey("likes");
  return key ? getJSON(key, {}) : {};
}

function setLikes(map) {
  const key = userStoreKey("likes");
  if (key) {
    setJSON(key, map);
  }
}

function getRatings() {
  const key = userStoreKey("ratings");
  return key ? getJSON(key, {}) : {};
}

function setRatings(map) {
  const key = userStoreKey("ratings");
  if (key) {
    setJSON(key, map);
  }
}

function getRecentlyViewed() {
  const key = userStoreKey("recent");
  return key ? getJSON(key, []) : getJSON(STORAGE_KEYS.fallbackRecent, []);
}

function setRecentlyViewed(ids) {
  const key = userStoreKey("recent");
  if (key) {
    setJSON(key, ids.slice(0, 30));
  } else {
    setJSON(STORAGE_KEYS.fallbackRecent, ids.slice(0, 30));
  }
}

function getContinueWatching() {
  const key = userStoreKey("continue");
  return key ? getJSON(key, {}) : getJSON(STORAGE_KEYS.fallbackContinue, {});
}

function setContinueWatching(map) {
  const key = userStoreKey("continue");
  if (key) {
    setJSON(key, map);
  } else {
    setJSON(STORAGE_KEYS.fallbackContinue, map);
  }
}

function toast(message) {
  const node = document.createElement("div");
  node.className = "toast";
  node.textContent = message;
  el.toastStack.appendChild(node);
  setTimeout(() => node.remove(), 2400);
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

function applyTheme(theme) {
  state.theme = theme;
  document.body.dataset.theme = theme;
  el.themeToggle.textContent = theme === "dark" ? "🌙" : "☀️";
}

function applyLanguage(language) {
  state.language = language;
}

function toImage(path) {
  return path ? `${IMAGE_BASE}${path}` : "";
}

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Fetch failed: ${res.status}`);
  }
  return res.json();
}

function normalizeMovie(movie) {
  return {
    id: movie.id,
    title: movie.title || movie.name || "Untitled",
    rating: Number(movie.vote_average || 0),
    popularity: Number(movie.popularity || 0),
    overview: movie.overview || "Overview unavailable.",
    poster_path: movie.poster_path,
    backdrop_path: movie.backdrop_path,
    genre_ids: movie.genre_ids || [],
    original_language: movie.original_language || "en"
  };
}

function movieById(id) {
  const lists = Object.values(state.datasets);
  for (let i = 0; i < lists.length; i += 1) {
    const found = lists[i].find((movie) => movie.id === id);
    if (found) {
      return found;
    }
  }
  return null;
}

function genreNames(movie) {
  if (Array.isArray(movie.genres)) {
    return movie.genres.map((g) => g.name);
  }
  return (movie.genre_ids || []).map((id) => state.genreMap[id]).filter(Boolean);
}

function formatRating(value) {
  return `⭐ ${Number(value || 0).toFixed(1)}/10`;
}

function youtubeSearchEmbed(title) {
  return `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(
    `${title} official trailer`
  )}`;
}

async function fetchTrailer(movieId, movieTitle = "") {
  if (state.trailerCache[movieId]) {
    return state.trailerCache[movieId];
  }
  const data = await fetchJSON(ENDPOINTS.videos(movieId));
  const trailer = (data.results || []).find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );
  const embed = trailer
    ? `https://www.youtube.com/embed/${trailer.key}`
    : youtubeSearchEmbed(movieTitle || "movie trailer");
  state.trailerCache[movieId] = embed;
  return embed;
}

async function fetchDetails(movieId) {
  if (state.detailsCache[movieId]) {
    return state.detailsCache[movieId];
  }
  const data = await fetchJSON(ENDPOINTS.details(movieId));
  state.detailsCache[movieId] = data;
  return data;
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

function performPendingAction() {
  if (!state.pendingAction) {
    return;
  }
  const action = state.pendingAction;
  state.pendingAction = null;
  action();
}

function updateProfileHeader() {
  const user = getCurrentUser();
  el.profileName.textContent = user?.name || "Guest";
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

function profileMenuHTML() {
  const user = getCurrentUser();
  if (!user) {
    return `
      <button data-profile-action="login">Login</button>
      <button data-profile-action="signup">Signup</button>
    `;
  }
  return `
    <div class="profile-head">
      <strong>${user.name || user.email}</strong>
      <small>${user.email}</small>
    </div>
    <button data-profile-action="profile">Profile</button>
    <button data-profile-action="logout">Logout</button>
  `;
}

function renderProfileMenu() {
  el.profileMenu.innerHTML = profileMenuHTML();
  updateProfileHeader();
}

function incrementContinue(movieId, amount = 6) {
  const map = getContinueWatching();
  map[movieId] = Math.min(100, (map[movieId] || 0) + amount);
  setContinueWatching(map);
}

function pushRecentlyViewed(movieId) {
  const ids = getRecentlyViewed().filter((id) => id !== movieId);
  ids.unshift(movieId);
  setRecentlyViewed(ids);
}

function movieCardTemplate(movie, options = {}) {
  const inList = getWatchlist().includes(movie.id);
  const progress = getContinueWatching()[movie.id] || 0;
  return `
    <article class="movie-card" data-movie-id="${movie.id}">
      <img loading="lazy" src="${toImage(movie.poster_path)}" alt="${movie.title}" />
      <div class="movie-info">
        <h4>${movie.title}</h4>
        <p>${formatRating(movie.rating)}</p>
      </div>
      ${
        options.showProgress
          ? `<div class="progress-wrap"><div class="progress-bar" style="width:${Math.min(
              100,
              progress
            )}%"></div></div>`
          : ""
      }
      <div class="movie-hover">
        <div class="hover-actions">
          <button class="mini-btn" data-action="play" data-id="${movie.id}">▶ Play Trailer</button>
          <button class="mini-btn" data-action="watchlist" data-id="${movie.id}">
            ${inList ? "− Watchlist" : "✚ Watchlist"}
          </button>
          <button class="mini-btn" data-action="like" data-id="${movie.id}">👍 Like</button>
          <button class="mini-btn" data-action="dislike" data-id="${movie.id}">👎 Dislike</button>
          <button class="mini-btn" data-action="rate" data-id="${movie.id}">⭐ Rating</button>
        </div>
        <div class="hover-preview" data-preview="${movie.id}"></div>
      </div>
    </article>
  `;
}

function rowTemplate(title, movies, options = {}) {
  return `
    <section class="row-block">
      <div class="row-header"><h3>${title}</h3></div>
      <div class="row-track">
        ${
          movies.length
            ? movies.map((movie) => movieCardTemplate(movie, options)).join("")
            : `<p class="empty-text">No movies found</p>`
        }
      </div>
    </section>
  `;
}

function getRecommended() {
  const likes = getLikes();
  const likedIds = Object.keys(likes)
    .filter((id) => likes[id] === "like")
    .map((id) => Number(id));
  const liked = likedIds.map((id) => movieById(id)).filter(Boolean);
  const likedGenres = liked.flatMap((movie) => movie.genre_ids || []);
  const source = [...state.datasets.topRated, ...state.datasets.trending];
  if (!likedGenres.length) {
    return source.slice(0, 12);
  }
  return source
    .filter((movie) => (movie.genre_ids || []).some((id) => likedGenres.includes(id)))
    .slice(0, 12);
}

function renderHomeRows() {
  const recent = getRecentlyViewed()
    .map((id) => movieById(id))
    .filter(Boolean)
    .slice(0, 12);
  const continueItems = Object.keys(getContinueWatching())
    .map((id) => movieById(Number(id)))
    .filter(Boolean)
    .slice(0, 12);
  el.homeRows.innerHTML = [
    rowTemplate("Trending", state.datasets.trending.slice(0, 12)),
    rowTemplate("Top Rated", state.datasets.topRated.slice(0, 12)),
    rowTemplate("English Movies", state.datasets.english.slice(0, 12)),
    rowTemplate("Hindi Movies", state.datasets.hindi.slice(0, 12)),
    rowTemplate("Popular in India", state.datasets.popularIndia.slice(0, 12)),
    rowTemplate("Recommended For You", getRecommended()),
    rowTemplate("Continue Watching", continueItems, { showProgress: true }),
    rowTemplate("Recently Viewed", recent)
  ].join("");
}

function renderGenreChips() {
  const active = el.genreChips.dataset.active || "All";
  const names = ["All", ...new Set(Object.values(state.genreMap))];
  el.genreChips.innerHTML = names
    .map((name) => `<button class="chip ${name === active ? "active" : ""}" data-genre="${name}">${name}</button>`)
    .join("");
}

function renderMoviesGrid() {
  const pool = [...state.datasets.trending, ...state.datasets.topRated, ...state.datasets.english];
  const dedup = {};
  const list = [];
  pool.forEach((movie) => {
    if (!dedup[movie.id]) {
      dedup[movie.id] = true;
      list.push(movie);
    }
  });

  const activeGenre = el.genreChips.dataset.active || "All";
  let filtered = list;
  if (activeGenre !== "All") {
    filtered = filtered.filter((movie) => genreNames(movie).includes(activeGenre));
  }
  filtered.sort((a, b) =>
    el.sortBy.value === "rating" ? b.rating - a.rating : b.popularity - a.popularity
  );
  el.moviesGrid.innerHTML = filtered.length
    ? filtered.map((movie) => movieCardTemplate(movie)).join("")
    : `<p class="empty-text">No movies found</p>`;
}

function renderTrendingGrid() {
  el.trendingGrid.innerHTML = state.datasets.trending
    .map((movie) => movieCardTemplate(movie))
    .join("");
}

function renderIndiaGrid() {
  el.indiaGrid.innerHTML = state.datasets.popularIndia
    .map((movie) => movieCardTemplate(movie))
    .join("");
}

function renderMyList() {
  const movies = getWatchlist()
    .map((id) => movieById(id))
    .filter(Boolean);
  el.myListGrid.innerHTML = movies.length
    ? movies.map((movie) => movieCardTemplate(movie)).join("")
    : `<p class="empty-text">Your watchlist is empty</p>`;
}

function renderAllViews() {
  renderHomeRows();
  renderMoviesGrid();
  renderTrendingGrid();
  renderIndiaGrid();
  renderMyList();
}

async function setupHero() {
  const data = await fetchJSON(ENDPOINTS.spiderMan);
  const spider = (data.results || [])
    .map(normalizeMovie)
    .find((movie) => /spider[- ]?man/i.test(movie.title));
  if (!spider) {
    return;
  }
  state.heroMovie = spider;
  el.heroBackdrop.style.backgroundImage = `url(${toImage(spider.backdrop_path || spider.poster_path)})`;
  el.heroTitle.textContent = spider.title;
  el.heroMeta.textContent = formatRating(spider.rating);
  el.heroOverview.textContent = spider.overview;

  const trailer = await fetchTrailer(spider.id, spider.title);
  const sep = trailer.includes("?") ? "&" : "?";
  el.heroTrailerWrap.innerHTML = `
    <iframe
      title="Hero trailer preview"
      src="${trailer}${sep}autoplay=1&mute=1&controls=0&loop=1"
      allow="autoplay; encrypted-media; picture-in-picture"
    ></iframe>
  `;
  el.heroTrailerWrap.classList.add("show");
}

async function openTrailerModal(movieId) {
  const movie = movieById(movieId) || state.heroMovie;
  const trailer = await fetchTrailer(movieId, movie?.title || "movie trailer");
  const sep = trailer.includes("?") ? "&" : "?";
  el.trailerFrame.src = `${trailer}${sep}autoplay=1`;
  openModal(el.trailerModal);
  incrementContinue(movieId, 8);
}

async function openMovieModal(movieId) {
  const [details, trailer] = await Promise.all([fetchDetails(movieId), fetchTrailer(movieId)]);
  pushRecentlyViewed(movieId);
  incrementContinue(movieId, 4);
  const inList = getWatchlist().includes(movieId);
  const selected = Number(getRatings()[movieId] || 0);
  el.movieModalBody.innerHTML = `
    <div class="details-hero" style="background-image:url(${toImage(
      details.backdrop_path || details.poster_path
    )})"></div>
    <div class="details-content">
      <img class="details-poster" src="${toImage(details.poster_path)}" alt="${details.title}" />
      <div>
        <h2>${details.title}</h2>
        <p class="details-meta">${formatRating(details.vote_average)} • ${(details.genres || [])
          .map((g) => g.name)
          .join(" • ")}</p>
        <p class="details-overview">${details.overview || "Overview unavailable."}</p>
        <div class="details-actions">
          <button class="primary-btn" data-action="play" data-id="${movieId}">▶ Play</button>
          <button class="ghost-btn" data-action="watchlist" data-id="${movieId}">
            ${inList ? "− Remove from Watchlist" : "✚ Add to Watchlist"}
          </button>
        </div>
        <div class="rating-inline">
          ${[1, 2, 3, 4, 5]
            .map(
              (s) =>
                `<button class="rate-btn ${selected >= s ? "active" : ""}" data-rate-id="${movieId}" data-rate="${s}">★</button>`
            )
            .join("")}
        </div>
        <div class="details-trailer">
          <iframe
            title="Movie trailer"
            src="${trailer}"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  `;
  openModal(el.movieModal);
  renderAllViews();
}

function toggleWatchlist(movieId) {
  if (
    !ensureAuth(() => {
      toggleWatchlist(movieId);
    })
  ) {
    return;
  }
  const watchlist = getWatchlist();
  const inList = watchlist.includes(movieId);
  const next = inList ? watchlist.filter((id) => id !== movieId) : [...watchlist, movieId];
  setWatchlist(next);
  toast(inList ? "Removed from Watchlist" : "Added to Watchlist");
  renderAllViews();
}

function setLike(movieId, value) {
  if (
    !ensureAuth(() => {
      setLike(movieId, value);
    })
  ) {
    return;
  }
  const likes = getLikes();
  likes[movieId] = value;
  setLikes(likes);
  toast(value === "like" ? "Liked movie" : "Disliked movie");
  renderAllViews();
}

function setRating(movieId, rating) {
  if (
    !ensureAuth(() => {
      setRating(movieId, rating);
    })
  ) {
    return;
  }
  const ratings = getRatings();
  ratings[movieId] = rating;
  setRatings(ratings);
  toast("Rating saved");
  openMovieModal(movieId).catch(() => {
    /* ignore */
  });
}

function switchAuthMode(mode) {
  state.authMode = mode;
  const signup = mode === "signup";
  el.authTitle.textContent = signup ? "Signup" : "Login";
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

  if (state.authMode === "signup") {
    if (!name) {
      toast("Username required");
      return;
    }
    if (password.length < 6) {
      toast("Password should be at least 6 characters");
      return;
    }
    if (password !== confirm) {
      toast("Passwords do not match");
      return;
    }
    if (users.some((u) => u.email === email)) {
      toast("Email already exists");
      return;
    }
    const user = { id: crypto.randomUUID(), name, email, password };
    users.push(user);
    setUsers(users);
    setCurrentUser(user);
    toast("Signup successful");
  } else {
    const found = users.find((u) => u.email === email && u.password === password);
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
  renderAllViews();
  performPendingAction();
}

async function searchLive() {
  const query = el.searchInput.value.trim();
  if (!query) {
    el.searchSuggestions.classList.remove("open");
    el.searchSuggestions.innerHTML = "";
    return;
  }
  const data = await fetchJSON(`${ENDPOINTS.search}${encodeURIComponent(query)}`);
  const results = (data.results || []).map(normalizeMovie).slice(0, 8);
  if (!results.length) {
    el.searchSuggestions.innerHTML = `<p class="suggestion-empty">No results</p>`;
    el.searchSuggestions.classList.add("open");
    return;
  }
  el.searchSuggestions.innerHTML = results
    .map(
      (movie) => `
      <button class="suggestion-item" data-suggest-id="${movie.id}">
        <img src="${toImage(movie.poster_path)}" alt="${movie.title}" />
        <div>
          <strong>${movie.title}</strong>
          <small>${formatRating(movie.rating)}</small>
        </div>
      </button>
    `
    )
    .join("");
  el.searchSuggestions.classList.add("open");
}

function debounceSearch() {
  clearTimeout(state.searchTimer);
  state.searchTimer = setTimeout(() => {
    searchLive().catch(() => {
      el.searchSuggestions.innerHTML = `<p class="suggestion-empty">Search failed</p>`;
      el.searchSuggestions.classList.add("open");
    });
  }, 280);
}

function renderSkeletons() {
  const row = `
    <div class="row-block">
      <div class="row-header"><h3>Loading...</h3></div>
      <div class="row-track">
        ${Array.from({ length: 8 }).map(() => `<div class="skeleton skeleton-card"></div>`).join("")}
      </div>
    </div>
  `;
  el.homeRows.innerHTML = row + row;
  const gridSkeleton = Array.from({ length: 12 })
    .map(() => `<div class="skeleton skeleton-card"></div>`)
    .join("");
  el.moviesGrid.innerHTML = gridSkeleton;
  el.trendingGrid.innerHTML = gridSkeleton;
  el.indiaGrid.innerHTML = gridSkeleton;
  el.myListGrid.innerHTML = gridSkeleton;
}

async function preloadData() {
  const [genresData, trendingData, topRatedData, englishData, hindiData, indiaData] =
    await Promise.all([
      fetchJSON(ENDPOINTS.genres),
      fetchJSON(ENDPOINTS.trending),
      fetchJSON(ENDPOINTS.topRated),
      fetchJSON(ENDPOINTS.discoverEnglish),
      fetchJSON(ENDPOINTS.discoverHindi),
      fetchJSON(ENDPOINTS.popularIndia)
    ]);

  const genreMap = {};
  (genresData.genres || []).forEach((genre) => {
    genreMap[genre.id] = genre.name;
  });
  state.genreMap = genreMap;
  state.datasets.trending = (trendingData.results || []).map(normalizeMovie);
  state.datasets.topRated = (topRatedData.results || []).map(normalizeMovie);
  state.datasets.english = (englishData.results || []).map(normalizeMovie);
  state.datasets.hindi = (hindiData.results || []).map(normalizeMovie);
  state.datasets.popularIndia = (indiaData.results || []).map(normalizeMovie);
}

function startHoverPreview(card) {
  const movieId = Number(card.dataset.movieId);
  clearTimeout(state.hoverTimers[movieId]);
  state.hoverTimers[movieId] = setTimeout(async () => {
    const target = card.querySelector(`[data-preview="${movieId}"]`);
    const movie = movieById(movieId);
    if (!target || !movie) {
      return;
    }
    try {
      const trailer = await fetchTrailer(movieId, movie.title);
      const sep = trailer.includes("?") ? "&" : "?";
      target.innerHTML = `<iframe title="Hover trailer preview" src="${trailer}${sep}autoplay=1&mute=1&controls=0" allow="autoplay; encrypted-media"></iframe>`;
      target.classList.add("show");
    } catch (_error) {
      /* ignore preview errors */
    }
  }, 1000);
}

function stopHoverPreview(card) {
  const movieId = Number(card.dataset.movieId);
  clearTimeout(state.hoverTimers[movieId]);
  const target = card.querySelector(`[data-preview="${movieId}"]`);
  if (target) {
    target.classList.remove("show");
    target.innerHTML = "";
  }
}

function onMouseOver(event) {
  const card = event.target.closest(".movie-card");
  if (!card) {
    return;
  }
  startHoverPreview(card);
}

function onMouseOut(event) {
  const card = event.target.closest(".movie-card");
  if (!card) {
    return;
  }
  if (!card.contains(event.relatedTarget)) {
    stopHoverPreview(card);
  }
}

function onGlobalClick(event) {
  const tab = event.target.closest(".nav-tab");
  if (tab) {
    activateView(tab.dataset.view);
    el.navTabs.classList.remove("open");
  }

  const closeBtn = event.target.closest("[data-close-modal]");
  if (closeBtn) {
    closeModal(document.getElementById(closeBtn.dataset.closeModal));
  }
  if (event.target.classList.contains("modal")) {
    closeModal(event.target);
  }

  const profileAction = event.target.closest("[data-profile-action]");
  if (profileAction) {
    const action = profileAction.dataset.profileAction;
    if (action === "login" || action === "signup") {
      switchAuthMode(action === "signup" ? "signup" : "login");
      openModal(el.authModal);
    } else if (action === "logout") {
      setCurrentUser(null);
      toast("Logged out");
      renderProfileMenu();
      renderAllViews();
    } else if (action === "profile") {
      toast("Profile panel coming soon");
    }
    el.profileMenu.classList.remove("open");
  }

  const actionBtn = event.target.closest("[data-action]");
  if (actionBtn) {
    const movieId = Number(actionBtn.dataset.id);
    const type = actionBtn.dataset.action;
    if (type === "play") {
      if (
        !ensureAuth(() => {
          openTrailerModal(movieId).catch(() => toast("Trailer unavailable"));
        })
      ) {
        return;
      }
      openTrailerModal(movieId).catch(() => toast("Trailer unavailable"));
    } else if (type === "watchlist") {
      toggleWatchlist(movieId);
    } else if (type === "like") {
      setLike(movieId, "like");
    } else if (type === "dislike") {
      setLike(movieId, "dislike");
    } else if (type === "rate") {
      openMovieModal(movieId).catch(() => toast("Unable to open movie"));
    }
  }

  const rateBtn = event.target.closest("[data-rate-id]");
  if (rateBtn) {
    setRating(Number(rateBtn.dataset.rateId), Number(rateBtn.dataset.rate));
  }

  const suggestion = event.target.closest("[data-suggest-id]");
  if (suggestion) {
    openMovieModal(Number(suggestion.dataset.suggestId)).catch(() => toast("Unable to open movie"));
    el.searchInput.value = "";
    el.searchSuggestions.classList.remove("open");
  }

  const card = event.target.closest(".movie-card");
  if (card && !event.target.closest(".hover-actions")) {
    openMovieModal(Number(card.dataset.movieId)).catch(() => toast("Unable to open movie"));
  }

  const chip = event.target.closest("[data-genre]");
  if (chip) {
    el.genreChips.dataset.active = chip.dataset.genre;
    renderGenreChips();
    renderMoviesGrid();
  }

  if (!event.target.closest(".profile-wrap")) {
    el.profileMenu.classList.remove("open");
  }
  if (!event.target.closest(".search-wrap")) {
    el.searchSuggestions.classList.remove("open");
  }
}

function bindEvents() {
  document.addEventListener("click", onGlobalClick);
  document.addEventListener("mouseover", onMouseOver);
  document.addEventListener("mouseout", onMouseOut);

  el.mobileNavBtn.addEventListener("click", () => {
    el.navTabs.classList.toggle("open");
  });

  el.profileBtn.addEventListener("click", () => {
    el.profileMenu.classList.toggle("open");
  });

  el.searchInput.addEventListener("input", debounceSearch);

  el.themeToggle.addEventListener("click", () => {
    const next = state.theme === "dark" ? "light" : "dark";
    applyTheme(next);
    setPref("theme", next);
  });

  el.languageToggle.addEventListener("change", () => {
    applyLanguage(el.languageToggle.value);
    setPref("language", state.language);
  });

  el.sortBy.addEventListener("change", () => {
    setPref("sortBy", el.sortBy.value);
    renderMoviesGrid();
  });

  el.heroTrailerBtn.addEventListener("click", () => {
    if (!state.heroMovie) {
      return;
    }
    if (
      !ensureAuth(() => {
        openTrailerModal(state.heroMovie.id).catch(() => toast("Trailer unavailable"));
      })
    ) {
      return;
    }
    openTrailerModal(state.heroMovie.id).catch(() => toast("Trailer unavailable"));
  });

  el.heroWatchlistBtn.addEventListener("click", () => {
    if (!state.heroMovie) {
      return;
    }
    toggleWatchlist(state.heroMovie.id);
  });

  el.authForm.addEventListener("submit", handleAuthSubmit);
  el.authSwitchBtn.addEventListener("click", () => {
    switchAuthMode(state.authMode === "login" ? "signup" : "login");
  });

  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    el.navbar.classList.toggle("scrolled", y > 10);
    el.scrollTopBtn.classList.toggle("show", y > 420);
    if (y > state.lastScrollY && y > 180) {
      el.navbar.classList.add("hidden-up");
    } else {
      el.navbar.classList.remove("hidden-up");
    }
    state.lastScrollY = y;
  });

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

function applySavedPrefs() {
  const prefs = getPrefs();
  applyTheme(prefs.theme || "dark");
  applyLanguage(prefs.language || "en");
  el.languageToggle.value = state.language;
  el.sortBy.value = prefs.sortBy || "popularity";
}

async function init() {
  el.yearText.textContent = String(new Date().getFullYear());
  applySavedPrefs();
  renderProfileMenu();
  bindEvents();
  renderSkeletons();
  try {
    await preloadData();
    renderGenreChips();
    renderAllViews();
    await setupHero();
  } catch (error) {
    console.error(error);
    toast("Failed to load movie data");
  }
}

init();
