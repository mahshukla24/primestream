/* global $ */
(function () {
  "use strict";

  const state = {
    user: null,
    items: [],
    topRated: [],
    activeTab: "all",
    search: "",
    watchlistSet: new Set(),
    ratingMap: {},
  };

  function showAuthMessage(message, isError) {
    $("#authMessage")
      .text(message)
      .css("color", isError ? "#f43f5e" : "#2dd4bf");
  }

  function safeText(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function cardHtml(item) {
    const id = Number(item.id);
    const inWatchlist = state.watchlistSet.has(id);
    const myRating = state.ratingMap[id] || 0;

    return `
      <article class="media-card">
        <img src="${safeText(item.poster_url)}" alt="${safeText(item.title)}">
        <div class="inner">
          <h3>${safeText(item.title)}</h3>
          <p>${safeText(item.description)}</p>
          <div class="meta">${safeText(item.type)} • ${safeText(item.genre)} • ${safeText(item.runtime_minutes)} min • ${safeText(item.age_rating)} • ${safeText(item.release_year)}</div>
          <span class="feature-tag">${safeText(item.exclusive_feature_tag || "PrimeStream+ Exclusive")}</span>

          <div class="rating-line">
            <span>Avg: ${safeText(item.avg_rating)} (${safeText(item.rating_count)} votes)</span>
            <select class="ratingSelect" data-id="${id}">
              <option value="0" ${myRating === 0 ? "selected" : ""}>Your rating</option>
              <option value="1" ${myRating === 1 ? "selected" : ""}>1★</option>
              <option value="2" ${myRating === 2 ? "selected" : ""}>2★</option>
              <option value="3" ${myRating === 3 ? "selected" : ""}>3★</option>
              <option value="4" ${myRating === 4 ? "selected" : ""}>4★</option>
              <option value="5" ${myRating === 5 ? "selected" : ""}>5★</option>
            </select>
          </div>

          <div class="actions">
            <button class="btn ghost trailerBtn" data-title="${safeText(item.title)}" data-url="${safeText(item.trailer_url)}">Watch Trailer</button>
            <button class="btn primary watchlistBtn" data-id="${id}">${inWatchlist ? "Remove Watchlist" : "Add Watchlist"}</button>
            <button class="btn ghost viewedBtn" data-id="${id}" data-title="${safeText(item.title)}">Mark Viewed</button>
          </div>
        </div>
      </article>
    `;
  }

  function filteredItems() {
    let list = [...state.items];

    if (state.activeTab === "movie" || state.activeTab === "tv_show" || state.activeTab === "cartoon") {
      list = list.filter((x) => x.type === state.activeTab);
    }

    if (state.activeTab === "watchlist") {
      list = list.filter((x) => state.watchlistSet.has(Number(x.id)));
    }

    if (state.activeTab === "ratings") {
      list = [...state.topRated];
    }

    if (state.search) {
      const q = state.search.toLowerCase();
      list = list.filter((x) =>
        String(x.title).toLowerCase().includes(q) || String(x.genre).toLowerCase().includes(q)
      );
    }

    return list;
  }

  function renderGrid() {
    const list = filteredItems();
    const sectionMap = {
      all: "Trending Now",
      movie: "Movies",
      tv_show: "TV Shows",
      cartoon: "Cartoons",
      watchlist: "My Watchlist",
      ratings: "Top Rated",
    };

    $("#sectionTitle").text(sectionMap[state.activeTab] || "PrimeStream+");

    if (!list.length) {
      $("#contentGrid").html("<p class='empty'>No content found for this view.</p>");
      return;
    }

    $("#contentGrid").html(list.map(cardHtml).join(""));
  }

  function renderHeader() {
    if (state.user) {
      $("#sessionInfo").text(`Signed in as ${state.user.name}`);
      $("#openAuth").addClass("hidden");
      $("#logoutBtn").removeClass("hidden");
    } else {
      $("#sessionInfo").text("Guest mode");
      $("#openAuth").removeClass("hidden");
      $("#logoutBtn").addClass("hidden");
    }
  }

  function loadSession() {
    return $.getJSON("api/session.php").then((res) => {
      state.user = res.user || null;
      const theme = res.theme || "dark";
      $("body").attr("data-theme", theme);
      renderHeader();
    });
  }

  function loadContent() {
    return $.getJSON("api/content.php").then((res) => {
      state.items = Array.isArray(res.items) ? res.items : [];
      state.topRated = Array.isArray(res.top_rated) ? res.top_rated : [];
      renderGrid();
    });
  }

  function loadWatchlist() {
    if (!state.user) {
      state.watchlistSet = new Set();
      renderGrid();
      return $.Deferred().resolve();
    }

    return $.getJSON("api/watchlist.php").then((res) => {
      const raw = Array.isArray(res.watchlist) ? res.watchlist : [];
      state.watchlistSet = new Set(raw.map((x) => Number(x.content_id)));
      renderGrid();
    });
  }

  function loadRatings() {
    if (!state.user) {
      state.ratingMap = {};
      renderGrid();
      return $.Deferred().resolve();
    }

    return $.getJSON("api/rating.php").then((res) => {
      state.ratingMap = {};
      const rows = Array.isArray(res.ratings) ? res.ratings : [];
      rows.forEach((row) => {
        state.ratingMap[Number(row.content_id)] = Number(row.rating);
      });
      renderGrid();
    });
  }

  function refreshAll() {
    return loadSession()
      .then(loadContent)
      .then(loadWatchlist)
      .then(loadRatings)
      .catch(() => {
        $("#sessionInfo").text("Could not connect backend. Check XAMPP/PHP setup.");
      });
  }

  function openTrailer(title, url) {
    $("#trailerTitle").text(title);
    $("#trailerFrame").attr("src", `${url}?autoplay=1`);
    $("#trailerModal").removeClass("hidden");
  }

  function closeTrailer() {
    $("#trailerModal").addClass("hidden");
    $("#trailerFrame").attr("src", "");
  }

  function refreshStorage() {
    $.getJSON("api/storage-inspector.php")
      .done((res) => {
        $("#storageOutput").text(JSON.stringify(res, null, 2));
      })
      .fail((xhr) => {
        const msg = xhr.responseJSON?.message || "Sign in required or backend error.";
        $("#storageOutput").text(msg);
      });
  }

  // Auth modal
  $("#openAuth").on("click", function () {
    $("#authModal").removeClass("hidden");
    showAuthMessage("", false);
  });

  $("#closeAuth").on("click", function () {
    $("#authModal").addClass("hidden");
  });

  $(".auth-tab").on("click", function () {
    const form = $(this).data("form");
    $(".auth-tab").removeClass("active");
    $(this).addClass("active");
    $(".auth-form").addClass("hidden");
    $(`#${form}`).removeClass("hidden");
    showAuthMessage("", false);
  });

  $("#registerForm").on("submit", function (e) {
    e.preventDefault();
    const payload = {
      name: $("#registerName").val(),
      email: $("#registerEmail").val(),
      password: $("#registerPassword").val(),
    };

    $.ajax({
      url: "api/register.php",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(payload),
    })
      .done((res) => {
        showAuthMessage(res.message || "Registered successfully.", false);
        $("#registerForm")[0].reset();
      })
      .fail((xhr) => {
        showAuthMessage(xhr.responseJSON?.message || "Registration failed.", true);
      });
  });

  $("#loginForm").on("submit", function (e) {
    e.preventDefault();
    const payload = {
      email: $("#loginEmail").val(),
      password: $("#loginPassword").val(),
    };

    $.ajax({
      url: "api/login.php",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(payload),
    })
      .done((res) => {
        showAuthMessage(res.message || "Login success.", false);
        $("#authModal").addClass("hidden");
        $("#loginForm")[0].reset();
        refreshAll();
      })
      .fail((xhr) => {
        showAuthMessage(xhr.responseJSON?.message || "Login failed.", true);
      });
  });

  $("#logoutBtn").on("click", function () {
    $.post("api/logout.php")
      .done(() => refreshAll())
      .fail(() => {
        $("#sessionInfo").text("Could not logout.");
      });
  });

  // Theme and tabs
  $("#themeToggle").on("click", function () {
    const current = $("body").attr("data-theme") === "light" ? "light" : "dark";
    const next = current === "dark" ? "light" : "dark";

    $.ajax({
      url: "api/cookie-theme.php",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ theme: next }),
    }).always(() => {
      $("body").attr("data-theme", next);
    });
  });

  $(".tab").on("click", function () {
    $(".tab").removeClass("active");
    $(this).addClass("active");
    state.activeTab = String($(this).data("tab"));
    renderGrid();
  });

  $("#searchInput").on("input", function () {
    state.search = String($(this).val() || "").trim();
    renderGrid();
  });

  // Card actions (delegated)
  $(document).on("click", ".trailerBtn", function () {
    const title = String($(this).data("title"));
    const url = String($(this).data("url"));
    openTrailer(title, url);
  });

  $("#closeTrailer").on("click", closeTrailer);
  $("#trailerModal").on("click", function (e) {
    if (e.target === this) {
      closeTrailer();
    }
  });

  $(document).on("click", ".watchlistBtn", function () {
    if (!state.user) {
      $("#sessionInfo").text("Sign in to use watchlist.");
      return;
    }

    const contentId = Number($(this).data("id"));
    $.ajax({
      url: "api/watchlist.php",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ content_id: contentId }),
    })
      .done((res) => {
        if (res.in_watchlist) {
          state.watchlistSet.add(contentId);
        } else {
          state.watchlistSet.delete(contentId);
        }
        renderGrid();
      })
      .fail(() => {
        $("#sessionInfo").text("Could not update watchlist.");
      });
  });

  $(document).on("change", ".ratingSelect", function () {
    if (!state.user) {
      $(this).val("0");
      $("#sessionInfo").text("Sign in to rate content.");
      return;
    }

    const contentId = Number($(this).data("id"));
    const rating = Number($(this).val());
    if (rating < 1 || rating > 5) {
      return;
    }

    $.ajax({
      url: "api/rating.php",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ content_id: contentId, rating }),
    })
      .done(() => {
        state.ratingMap[contentId] = rating;
        loadContent().then(renderGrid);
      })
      .fail(() => {
        $("#sessionInfo").text("Could not save rating.");
      });
  });

  $(document).on("click", ".viewedBtn", function () {
    if (!state.user) {
      $("#sessionInfo").text("Sign in to save viewed history.");
      return;
    }

    const contentId = Number($(this).data("id"));
    const title = String($(this).data("title"));

    $.ajax({
      url: "api/recently-viewed.php",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ content_id: contentId, title }),
    }).done(() => {
      $("#sessionInfo").text(`Saved viewed history for ${title}.`);
    });
  });

  $("#refreshStorage").on("click", refreshStorage);

  refreshAll();
})();
