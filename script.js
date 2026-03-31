const NEWS_API_KEY = "89e2055d344e11518febbae8a42b5b44";
const NEWS_URL = `https://gnews.io/api/v4/top-headlines?lang=en&country=in&max=12&apikey=${NEWS_API_KEY}`;

const YOUTUBE_API_KEY = "AIzaSyA0glsPFgjtnx2dJCCxn-xeRvKSHweDaXA";
const YOUTUBE_BASE = "https://www.googleapis.com/youtube/v3/search";

const MOVIES = [
  {
    title: "Spider-Man: Far From Home",
    poster: "https://image.tmdb.org/t/p/original/4q2NNj4S5dG2RLF9CpXsej7yXl.jpg",
    trailer: "https://www.youtube.com/embed/Nt9L1jCKGnE",
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
    title: "The Shawshank Redemption",
    poster: "https://image.tmdb.org/t/p/original/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    trailer: "https://www.youtube.com/embed/PLl99DlL6b4",
    rating: 9.3,
    category: "Hollywood",
    moods: ["Mind-blowing"],
    tags: ["Top10"],
    description: "A timeless story of hope and resilience inside a prison system."
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
  }
];

const SPORTS_QUERIES = {
  cricket: "IPL highlights 2025",
  football: "football highlights UCL",
  chess: "chess championship highlights",
  badminton: "badminton highlights"
};

const STORAGE = {
  users: "primeStream.users",
  user: "primeStream.user",
  fallbackRecent: "primeStream.guest.recent",
  fallbackContinue: "primeStream.guest.continue"
};

const state = {
  section: "home",
  mood: "Action",
  newsFilter: "all",
  sportsTab: "cricket",
  pendingAction: null,
  news: [],
  sportsVideos: [],
  hoverTimers: {},
  heroMovie: MOVIES.find((movie) => movie.title.includes("Spider-Man")) || MOVIES[0],
  lastScrollY: 0
};

const el = {
  navbar: document.getElementById("navbar"),
  homeBtn: document.getElementById("homeBtn"),
  sectionBtn: document.getElementById("sectionBtn"),
  myListBtn: document.getElementById("myListBtn"),
  globalSearch: document.getElementById("globalSearch"),
  themeToggle: document.getElementById("themeToggle"),
  profileBtn: document.getElementById("profileBtn"),
  profileMenu: document.getElementById("profileMenu"),

  landingView: document.getElementById("landingView"),
  categoryCards: Array.from(document.querySelectorAll(".category-card")),

  moviesView: document.getElementById("moviesView"),
  movieHeroBackdrop: document.getElementById("movieHeroBackdrop"),
  movieHeroTitle: document.getElementById("movieHeroTitle"),
  movieHeroMeta: document.getElementById("movieHeroMeta"),
  movieHeroDescription: document.getElementById("movieHeroDescription"),
  movieHeroTrailer: document.getElementById("movieHeroTrailer"),
  heroTrailerBtn: document.getElementById("heroTrailerBtn"),
  heroWatchlistBtn: document.getElementById("heroWatchlistBtn"),
  quickPlayBtn: document.getElementById("quickPlayBtn"),
  moodButtons: Array.from(document.querySelectorAll("[data-mood]")),
  moodGrid: document.getElementById("moodGrid"),
  smartPicksGrid: document.getElementById("smartPicksGrid"),
  topPicksGrid: document.getElementById("topPicksGrid"),
  top10List: document.getElementById("top10List"),
  continueGrid: document.getElementById("continueGrid"),
  mcuGrid: document.getElementById("mcuGrid"),
  bollyGrid: document.getElementById("bollyGrid"),
  hollyGrid: document.getElementById("hollyGrid"),
  actionGrid: document.getElementById("actionGrid"),
  mindGrid: document.getElementById("mindGrid"),
  myListView: document.getElementById("myListView"),
  myListGrid: document.getElementById("myListGrid"),

  newsView: document.getElementById("newsView"),
  newsFilterButtons: Array.from(document.querySelectorAll("[data-news-filter]")),
  refreshNewsBtn: document.getElementById("refreshNewsBtn"),
  newsGrid: document.getElementById("newsGrid"),

  sportsView: document.getElementById("sportsView"),
  sportsFilterButtons: Array.from(document.querySelectorAll("[data-sports-filter]")),
  sportsTopGrid: document.getElementById("sportsTopGrid"),
  sportsPlayerGrid: document.getElementById("sportsPlayerGrid"),

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
  } else {
    localStorage.removeItem(STORAGE.user);
  }
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
  } else {
    setJSON(STORAGE.fallbackContinue, map);
  }
}

function getRecentlyViewed() {
  const key = userScopedKey("recent");
  return key ? getJSON(key, []) : getJSON(STORAGE.fallbackRecent, []);
}

function setRecentlyViewed(list) {
  const key = userScopedKey("recent");
  if (key) {
    setJSON(key, list.slice(0, 40));
  } else {
    setJSON(STORAGE.fallbackRecent, list.slice(0, 40));
  }
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

function movieByTitle(title) {
  return MOVIES.find((movie) => movie.title === title);
}

function applySection(section) {
  state.section = section;
  const allViews = [el.landingView, el.moviesView, el.newsView, el.sportsView, el.myListView];
  allViews.forEach((node) => node.classList.add("hidden"));

  if (section === "home") {
    el.landingView.classList.remove("hidden");
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
  el.myListBtn.classList.toggle("hidden", section !== "movies");

  if (section === "movies") {
    el.moviesView.classList.remove("hidden");
  } else if (section === "news") {
    el.newsView.classList.remove("hidden");
  } else if (section === "sports") {
    el.sportsView.classList.remove("hidden");
  } else if (section === "mylist") {
    el.myListView.classList.remove("hidden");
  }
}

function updateHero(movie) {
  state.heroMovie = movie;
  el.movieHeroTitle.textContent = movie.title;
  el.movieHeroMeta.textContent = `${movie.category} • ⭐ ${movie.rating.toFixed(1)}/10`;
  el.movieHeroDescription.textContent = movie.description;
  el.movieHeroBackdrop.style.backgroundImage = `url(${movie.poster})`;
  const sep = movie.trailer.includes("?") ? "&" : "?";
  el.movieHeroTrailer.innerHTML = `
    <iframe
      title="Hero trailer preview"
      src="${movie.trailer}${sep}autoplay=1&mute=1&controls=0&loop=1"
      allow="autoplay; encrypted-media; picture-in-picture"
    ></iframe>
  `;
}

function movieCardTemplate(movie, options = {}) {
  const inList = getWatchlist().includes(movie.title);
  const progress = getContinueWatching()[movie.title] || 0;
  return `
    <article class="movie-card reveal" data-movie-title="${movie.title}">
      <img loading="lazy" src="${movie.poster}" alt="${movie.title}" />
      <div class="movie-card-info">
        <h4>${movie.title}</h4>
        <p>⭐ ${movie.rating.toFixed(1)}</p>
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
          <button class="mini-btn" data-action="play-movie" data-title="${movie.title}">▶ Trailer</button>
          <button class="mini-btn" data-action="watchlist" data-title="${movie.title}">
            ${inList ? "− Watchlist" : "+ Watchlist"}
          </button>
          <button class="mini-btn" data-action="rate" data-title="${movie.title}">⭐ Rate</button>
          <button class="mini-btn" data-action="like" data-title="${movie.title}">👍 Like</button>
        </div>
        <div class="hover-preview" data-preview-title="${movie.title}"></div>
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
    el.myListGrid
  ].forEach((node) => {
    node.innerHTML = skeleton;
  });
}

function renderTop10() {
  const top = [...MOVIES].sort((a, b) => b.rating - a.rating).slice(0, 10);
  el.top10List.innerHTML = top
    .map(
      (movie, idx) => `
      <li>
        <span>#${idx + 1}</span>
        <button data-action="open-movie" data-title="${movie.title}">${movie.title}</button>
      </li>
    `
    )
    .join("");
}

function renderMovieRows() {
  const marvel = MOVIES.filter((movie) => movie.category === "Marvel");
  const bolly = MOVIES.filter((movie) => movie.category === "Bollywood");
  const holly = MOVIES.filter((movie) => movie.category === "Hollywood");
  const action = MOVIES.filter((movie) => movie.tags.includes("Action"));
  const mind = MOVIES.filter((movie) => movie.tags.includes("Mind"));
  el.mcuGrid.innerHTML = marvel.map((movie) => movieCardTemplate(movie)).join("");
  el.bollyGrid.innerHTML = bolly.map((movie) => movieCardTemplate(movie)).join("");
  el.hollyGrid.innerHTML = holly.map((movie) => movieCardTemplate(movie)).join("");
  el.actionGrid.innerHTML = action.map((movie) => movieCardTemplate(movie)).join("");
  el.mindGrid.innerHTML = mind.map((movie) => movieCardTemplate(movie)).join("");
}

function renderMyList() {
  const list = getWatchlist()
    .map(movieByTitle)
    .filter(Boolean);
  el.myListGrid.innerHTML = list.length
    ? list.map((movie) => movieCardTemplate(movie)).join("")
    : `<p class="empty-text">Login and add movies to your watchlist.</p>`;
}

function renderContinueWatching() {
  const map = getContinueWatching();
  const list = Object.keys(map)
    .map(movieByTitle)
    .filter(Boolean)
    .slice(0, 8);
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
    el.smartPicksGrid.innerHTML = MOVIES.slice(0, 8).map((movie) => movieCardTemplate(movie)).join("");
    return;
  }

  const categories = new Set(likedMovies.map((movie) => movie.category));
  const moods = new Set(likedMovies.flatMap((movie) => movie.moods));
  const picks = MOVIES.filter(
    (movie) =>
      !likes[movie.title] &&
      (categories.has(movie.category) || movie.moods.some((mood) => moods.has(mood)))
  ).slice(0, 10);

  el.smartPicksGrid.innerHTML = picks.length
    ? picks.map((movie) => movieCardTemplate(movie)).join("")
    : `<p class="empty-text">No more smart picks available.</p>`;
}

function renderMoodResults(mood) {
  state.mood = mood;
  const list = MOVIES.filter((movie) => movie.moods.includes(mood));
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

function openTrailer(title) {
  const movie = movieByTitle(title);
  if (!movie) {
    return;
  }
  const sep = movie.trailer.includes("?") ? "&" : "?";
  el.trailerFrame.src = `${movie.trailer}${sep}autoplay=1`;
  openModal(el.trailerModal);
  updateContinue(title, 10);
  trackRecent(title);
  renderContinueWatching();
}

function openMovieModal(title) {
  const movie = movieByTitle(title);
  if (!movie) {
    return;
  }
  const inList = getWatchlist().includes(title);
  const selected = Number(getRatings()[title] || 0);
  el.movieModalBody.innerHTML = `
    <div class="details-hero" style="background-image:url('${movie.poster}')"></div>
    <div class="details-content">
      <img class="details-poster" src="${movie.poster}" alt="${movie.title}" />
      <div>
        <h2>${movie.title}</h2>
        <p class="details-meta">${movie.category} • ⭐ ${movie.rating.toFixed(1)}</p>
        <p>${movie.description}</p>
        <div class="details-actions">
          <button class="primary-btn" data-action="play-movie" data-title="${movie.title}">▶ Play</button>
          <button class="ghost-btn" data-action="watchlist" data-title="${movie.title}">
            ${inList ? "− Remove Watchlist" : "+ Add Watchlist"}
          </button>
        </div>
        <div class="rating-inline">
          ${[1, 2, 3, 4, 5]
            .map(
              (star) =>
                `<button class="rate-btn ${selected >= star ? "active" : ""}" data-rate="${star}" data-title="${
                  movie.title
                }">★</button>`
            )
            .join("")}
        </div>
        <div class="details-trailer">
          <iframe title="Movie trailer" src="${movie.trailer}" allowfullscreen></iframe>
        </div>
      </div>
    </div>
  `;
  openModal(el.movieModal);
  trackRecent(title);
  updateContinue(title, 4);
  renderContinueWatching();
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
  openMovieModal(title);
}

function quickPlay() {
  const random = MOVIES[Math.floor(Math.random() * MOVIES.length)];
  if (
    !ensureAuth(() => {
      openTrailer(random.title);
    })
  ) {
    return;
  }
  openTrailer(random.title);
}

async function fetchNews() {
  const response = await fetch(NEWS_URL);
  if (!response.ok) {
    throw new Error("News API failed");
  }
  const data = await response.json();
  state.news = data.articles || [];
}

function formatDate(dateStr) {
  try {
    return new Date(dateStr).toLocaleString();
  } catch (_error) {
    return "";
  }
}

function renderNews(list = state.news) {
  el.newsGrid.innerHTML = list.length
    ? list
        .map(
          (article) => `
      <article class="news-card reveal">
        <img loading="lazy" src="${article.image || "https://via.placeholder.com/800x450?text=News"}" alt="${
            article.title || "News"
          }" />
        <div class="news-card-content">
          <h3>${article.title || "Untitled"}</h3>
          <div class="news-meta">
            <span>${article.source?.name || "Unknown Source"}</span>
            <span>${formatDate(article.publishedAt)}</span>
          </div>
          <a class="read-btn" href="${article.url}" target="_blank" rel="noopener noreferrer">Read Full Story</a>
        </div>
      </article>
    `
        )
        .join("")
    : `<p class="empty-text">No news found.</p>`;
}

function filterNews(category) {
  state.newsFilter = category;
  if (category === "all") {
    renderNews(state.news);
    return;
  }
  const filtered = state.news.filter((article) => {
    const text = `${article.title || ""} ${article.description || ""}`.toLowerCase();
    return text.includes(category);
  });
  renderNews(filtered);
}

function renderNewsSkeletons() {
  el.newsGrid.innerHTML = Array.from({ length: 8 })
    .map(() => `<div class="skeleton-card"></div>`)
    .join("");
}

async function fetchSports(query) {
  const url = `${YOUTUBE_BASE}?part=snippet&q=${encodeURIComponent(
    query
  )}&maxResults=12&key=${YOUTUBE_API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("YouTube API failed");
  }
  const data = await response.json();
  state.sportsVideos = (data.items || []).filter((item) => item.id?.videoId);
}

function sportsCardTemplate(item) {
  const thumb =
    item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url || "";
  const videoId = item.id.videoId;
  return `
    <article class="sports-card reveal">
      <img loading="lazy" src="${thumb}" alt="${item.snippet.title}" />
      <div class="sports-card-content">
        <h3>${item.snippet.title}</h3>
        <button class="read-btn" data-action="play-sport" data-video-id="${videoId}">▶ Play</button>
      </div>
    </article>
  `;
}

function renderSports() {
  el.sportsTopGrid.innerHTML = state.sportsVideos.slice(0, 6).map(sportsCardTemplate).join("");
  el.sportsPlayerGrid.innerHTML = state.sportsVideos.slice(6, 12).map(sportsCardTemplate).join("");
  if (!state.sportsVideos.length) {
    el.sportsTopGrid.innerHTML = `<p class="empty-text">No highlights found.</p>`;
    el.sportsPlayerGrid.innerHTML = `<p class="empty-text">No highlights found.</p>`;
  }
}

function renderSportsSkeletons() {
  const skeleton = Array.from({ length: 6 })
    .map(() => `<div class="skeleton-card"></div>`)
    .join("");
  el.sportsTopGrid.innerHTML = skeleton;
  el.sportsPlayerGrid.innerHTML = skeleton;
}

function runSearch(raw) {
  const term = raw.trim().toLowerCase();
  if (!term) {
    if (state.section === "movies" || state.section === "mylist") {
      renderMovieRows();
      renderMoodResults(state.mood);
      renderSmartPicks();
      renderTopPicks();
      renderContinueWatching();
      renderMyList();
    } else if (state.section === "news") {
      filterNews(state.newsFilter);
    } else if (state.section === "sports") {
      loadSports(state.sportsTab).catch(() => toast("Sports refresh failed"));
    }
    return;
  }

  if (state.section === "movies" || state.section === "mylist") {
    const filtered = MOVIES.filter(
      (movie) =>
        movie.title.toLowerCase().includes(term) ||
        movie.category.toLowerCase().includes(term) ||
        movie.tags.join(" ").toLowerCase().includes(term)
    );
    const html = filtered.length
      ? filtered.map((movie) => movieCardTemplate(movie)).join("")
      : `<p class="empty-text">No movie match found.</p>`;
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
      el.myListGrid
    ].forEach((node) => {
      node.innerHTML = html;
    });
    return;
  }

  if (state.section === "news") {
    const filtered = state.news.filter((article) => {
      const text = `${article.title || ""} ${article.description || ""}`.toLowerCase();
      return text.includes(term);
    });
    renderNews(filtered);
    return;
  }

  if (state.section === "sports") {
    fetchSports(term)
      .then(renderSports)
      .catch(() => toast("Sports search failed"));
  }
}

function startHoverPreview(card) {
  const title = card.dataset.movieTitle;
  if (!title) {
    return;
  }
  clearTimeout(state.hoverTimers[title]);
  state.hoverTimers[title] = setTimeout(() => {
    const movie = movieByTitle(title);
    const node = card.querySelector(`[data-preview-title="${title}"]`);
    if (!movie || !node) {
      return;
    }
    node.innerHTML = `
      <iframe
        title="Trailer preview"
        src="${movie.trailer}?autoplay=1&mute=1&controls=0"
        allow="autoplay; encrypted-media"
      ></iframe>
    `;
    node.classList.add("show");
  }, 1000);
}

function stopHoverPreview(card) {
  const title = card.dataset.movieTitle;
  clearTimeout(state.hoverTimers[title]);
  const node = card.querySelector(`[data-preview-title="${title}"]`);
  if (node) {
    node.classList.remove("show");
    node.innerHTML = "";
  }
}

function renderProfileMenu() {
  const user = getCurrentUser();
  if (!user) {
    el.profileMenu.innerHTML = `
      <button data-profile-action="login">Login</button>
      <button data-profile-action="signup">Signup</button>
    `;
    return;
  }
  el.profileMenu.innerHTML = `
    <div class="profile-head">
      <strong>${user.name}</strong>
      <small>${user.email}</small>
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
  renderNewsSkeletons();
  await fetchNews();
  filterNews(state.newsFilter);
}

async function loadSports(tab) {
  state.sportsTab = tab;
  renderSportsSkeletons();
  await fetchSports(SPORTS_QUERIES[tab] || SPORTS_QUERIES.cricket);
  renderSports();
}

function bindEvents() {
  el.categoryCards.forEach((card) => {
    card.addEventListener("click", () => {
      const section = card.dataset.category;
      applySection(section);
      if (section === "news" && !state.news.length) {
        loadNews().catch(() => toast("News fetch failed"));
      }
      if (section === "sports" && !state.sportsVideos.length) {
        loadSports("cricket").catch(() => toast("Sports fetch failed"));
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

    const actionBtn = event.target.closest("[data-action]");
    if (actionBtn) {
      const action = actionBtn.dataset.action;
      const title = actionBtn.dataset.title;
      const videoId = actionBtn.dataset.videoId;
      if (action === "play-movie") {
        if (!ensureAuth(() => openTrailer(title))) {
          return;
        }
        openTrailer(title);
      } else if (action === "watchlist") {
        toggleWatchlist(title);
      } else if (action === "like") {
        likeMovie(title);
      } else if (action === "rate") {
        openMovieModal(title);
      } else if (action === "open-movie") {
        openMovieModal(title);
      } else if (action === "play-sport") {
        el.videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        openModal(el.videoModal);
      }
    }

    const rateBtn = event.target.closest("[data-rate]");
    if (rateBtn) {
      rateMovie(rateBtn.dataset.title, Number(rateBtn.dataset.rate));
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
        toast("Logged out");
      } else {
        toast("Profile settings coming soon");
      }
      el.profileMenu.classList.remove("open");
    }

    if (!event.target.closest(".profile-wrap")) {
      el.profileMenu.classList.remove("open");
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
    runSearch(event.target.value);
  });

  el.heroTrailerBtn.addEventListener("click", () => {
    if (!ensureAuth(() => openTrailer(state.heroMovie.title))) {
      return;
    }
    openTrailer(state.heroMovie.title);
  });

  el.heroWatchlistBtn.addEventListener("click", () => {
    toggleWatchlist(state.heroMovie.title);
  });

  el.quickPlayBtn.addEventListener("click", quickPlay);

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
      filterNews(button.dataset.newsFilter);
    });
  });

  el.refreshNewsBtn.addEventListener("click", () => {
    loadNews().catch(() => toast("News refresh failed"));
  });

  el.sportsFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      el.sportsFilterButtons.forEach((node) => node.classList.remove("active"));
      button.classList.add("active");
      loadSports(button.dataset.sportsFilter).catch(() => toast("Sports load failed"));
    });
  });

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
    renderTop10();
    renderMovieRows();
    renderMoodResults(state.mood);
    renderSmartPicks();
    renderTopPicks();
    renderContinueWatching();
    renderMyList();
    revealOnScroll();
  }, 350);
}

function init() {
  renderProfileMenu();
  switchAuthMode("login");
  initMovies();
  bindEvents();
  applySection("home");
}

init();
