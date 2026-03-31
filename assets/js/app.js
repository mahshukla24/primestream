/* global $, PRIME_STREAM_BOOT */

const state = {
  mood: (window.PRIME_STREAM_BOOT && window.PRIME_STREAM_BOOT.mood) || "chill",
  loggedIn: Boolean(window.PRIME_STREAM_BOOT && window.PRIME_STREAM_BOOT.loggedIn),
  titles: [],
  watchlistIds: new Set(),
  surprisePick: null,
};

function toast(message, variant = "success") {
  const $toast = $("#toast");
  $toast.removeClass("success error").addClass(variant).text(message).addClass("show");
  window.clearTimeout(window.__psToastTimer);
  window.__psToastTimer = window.setTimeout(() => $toast.removeClass("show"), 2600);
}

function esc(text) {
  return String(text == null ? "" : text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatJson(value) {
  return JSON.stringify(value, null, 2);
}

function setGuestUi() {
  if (state.loggedIn) {
    return;
  }
  $("#watchlistPanel").addClass("hidden");
  $("#moodJournalPanel").addClass("hidden");
  $("#vibePanel").addClass("hidden");
}

function renderStats(stats) {
  const rows = [
    ["Users", stats.users],
    ["Titles", stats.titles],
    ["Reviews", stats.reviews],
    ["Watchlist Entries", stats.watchlist],
    ["Mood Journal Entries", stats.mood_journal_entries],
    ["Exports", stats.exports_count],
  ];

  $("#statsPanel .stats-list").html(
    rows
      .map(
        ([k, v]) => `<div class="stat-item"><span>${esc(k)}</span><strong>${esc(v)}</strong></div>`
      )
      .join("")
  );
}

function openTrailer(url) {
  $("#trailerFrame").attr("src", url);
  $("#trailerModal").addClass("open");
}

function closeTrailer() {
  $("#trailerFrame").attr("src", "");
  $("#trailerModal").removeClass("open");
}

function fetchTitles() {
  $.getJSON("api/titles.php", { mood: state.mood, q: $("#searchInput").val() })
    .done((res) => {
      state.titles = Array.isArray(res.items) ? res.items : [];
      renderCatalog();
    })
    .fail((xhr) => {
      toast(
        (xhr.responseJSON && (xhr.responseJSON.message || xhr.responseJSON.error)) ||
          "Could not load titles",
        "error"
      );
    });
}

function renderCatalog() {
  const $catalog = $("#catalog");
  if (!state.titles.length) {
    $catalog.html('<div class="glass empty">No titles found for this mood/search.</div>');
    return;
  }

  const cards = state.titles
    .map((item) => {
      const inWatchlist = state.watchlistIds.has(Number(item.id));
      return `
      <article class="title-card glass" data-id="${item.id}">
        <img src="${esc(item.thumbnail_url)}" alt="${esc(item.title)} poster">
        <div class="title-body">
          <h3>${esc(item.title)}</h3>
          <p class="meta">${esc(item.genre)} • ${esc(item.release_year)} • ${esc(
        item.duration_min
      )} min • mood: ${esc(item.mood)}</p>
          <p class="desc">${esc(item.description)}</p>
          <div class="scores">
            <span>IMDb: ${esc(item.imdb_rating)}</span>
            <span>Community: ${esc(item.community_rating)}</span>
            <span class="prime-score">Prime Score: ${esc(item.prime_score)}</span>
          </div>
          <div class="actions">
            <button class="btn-secondary watch-btn" data-url="${esc(
              item.trailer_url
            )}">Watch Trailer</button>
            <button class="btn-secondary review-toggle-btn">Reviews</button>
            <button class="btn-primary watchlist-btn">${inWatchlist ? "Remove Watchlist" : "Add Watchlist"}</button>
          </div>
          <section class="review-box" hidden>
            <div class="reviews-list"></div>
            <form class="review-form">
              <label>Rating (1-10)</label>
              <input type="number" step="0.1" min="1" max="10" name="rating" required>
              <label>Your review</label>
              <textarea name="review_text" rows="2" required></textarea>
              <button type="submit" class="btn-primary">Submit Review</button>
            </form>
          </section>
        </div>
      </article>`;
    })
    .join("");

  $catalog.html(cards);
}

function loadReviews(titleId, $target) {
  $.getJSON("api/reviews.php", { title_id: titleId })
    .done((res) => {
      if (!Array.isArray(res.reviews) || !res.reviews.length) {
        $target.html('<p class="hint">No reviews yet.</p>');
        return;
      }
      $target.html(
        res.reviews
          .map(
            (r) =>
              `<div class="review-item"><div><strong>${esc(r.reviewer_name)}</strong> • ⭐ ${esc(
                r.rating
              )}</div><small>${esc(r.created_at)}</small><p>${esc(r.review_text)}</p></div>`
          )
          .join("")
      );
    })
    .fail(() => $target.html('<p class="hint">Could not load reviews.</p>'));
}

function fetchStats() {
  $.getJSON("api/stats.php")
    .done((res) => {
      if (res && res.stats) {
        renderStats(res.stats);
      }
      if (res && res.user) {
        state.loggedIn = true;
      }
    })
    .fail(() => toast("Could not load stats", "error"));
}

function fetchStorageView() {
  $.getJSON("api/storage-view.php")
    .done((res) => {
      $("#usersDump").text(formatJson((res.database && res.database.users) || []));
      $("#watchlistDump").text(formatJson((res.database && res.database.watchlist) || []));
      $("#journalDump").text(formatJson((res.database && res.database.mood_journal) || []));
      $("#exportsDump").text(
        formatJson({
          exports: (res.files && res.files.exports) || [],
          uploads: (res.files && res.files.uploads) || [],
        })
      );
      $("#auditDump").text((res.files && res.files.review_audit_log_preview) || "No log entries yet.");
    })
    .fail(() => {
      $("#usersDump, #watchlistDump, #journalDump, #exportsDump, #auditDump").text(
        "Could not load live storage data."
      );
    });
}

function fetchWatchlist() {
  if (!state.loggedIn) {
    return;
  }
  $.getJSON("api/watchlist.php")
    .done((res) => {
      const items = Array.isArray(res.items) ? res.items : [];
      state.watchlistIds = new Set(items.map((x) => Number(x.id)));
      renderWatchlist(items);
      renderCatalog();
    })
    .fail((xhr) => {
      toast(
        (xhr.responseJSON && (xhr.responseJSON.message || xhr.responseJSON.error)) ||
          "Could not load watchlist",
        "error"
      );
    });
}

function renderWatchlist(items) {
  const $box = $("#watchlist");
  if (!items.length) {
    $box.html('<p class="hint">Your watchlist is empty.</p>');
    return;
  }
  $box.html(
    items
      .map(
        (item) => `
          <div class="list-item mini-row" data-id="${item.id}">
            <strong>${esc(item.title)}</strong>
            <div class="small">${esc(item.genre)} • ${esc(item.mood)}</div>
            <button class="tiny-btn remove-watchlist">Remove</button>
          </div>
        `
      )
      .join("")
  );
}

function toggleWatchlist(titleId) {
  if (!state.loggedIn) {
    toast("Login first to use watchlist", "error");
    return;
  }
  const inList = state.watchlistIds.has(Number(titleId));
  $.ajax({
    url: "api/watchlist.php",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      action: inList ? "remove" : "add",
      title_id: Number(titleId),
    }),
  })
    .done((res) => {
      toast(res.message || "Watchlist updated", "success");
      fetchWatchlist();
      fetchStats();
      fetchStorageView();
    })
    .fail((xhr) => {
      toast(
        (xhr.responseJSON && (xhr.responseJSON.message || xhr.responseJSON.error)) ||
          "Watchlist update failed",
        "error"
      );
    });
}

function fetchJournal() {
  if (!state.loggedIn) {
    return;
  }
  $.getJSON("api/mood-journal.php")
    .done((res) => {
      const entries = Array.isArray(res.entries) ? res.entries : [];
      const $box = $("#moodJournalList");
      if (!entries.length) {
        $box.html('<p class="hint">No mood notes yet.</p>');
        return;
      }
      $box.html(
        entries
          .map(
            (e) =>
              `<div class="list-item"><strong>${esc(e.mood)}</strong> <span class="small">${esc(
                e.created_at
              )}</span><p>${esc(e.note)}</p></div>`
          )
          .join("")
      );
    })
    .fail(() => toast("Could not load mood journal", "error"));
}

function postJournal() {
  if (!state.loggedIn) {
    toast("Login first to add mood journal", "error");
    return;
  }
  const payload = {
    mood: $("#moodJournalForm [name='mood']").val(),
    note: $("#moodJournalForm [name='note']").val().trim(),
  };
  $.ajax({
    url: "api/mood-journal.php",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(payload),
  })
    .done((res) => {
      toast(res.message || "Mood note saved", "success");
      $("#moodJournalForm [name='note']").val("");
      fetchJournal();
      fetchStats();
      fetchStorageView();
      fetchRecommendations();
    })
    .fail((xhr) => {
      toast(
        (xhr.responseJSON && (xhr.responseJSON.message || xhr.responseJSON.error)) ||
          "Could not save mood note",
        "error"
      );
    });
}

function fetchRecommendations() {
  $.getJSON("api/recommendations.php", { mood: state.mood })
    .done((res) => {
      const items = Array.isArray(res.recommendations) ? res.recommendations : [];
      state.surprisePick = res.surprise_pick || null;
      const $box = $("#recommendations");
      if (!items.length) {
        $box.html('<p class="hint">No personalized picks yet.</p>');
        return;
      }
      $box.html(
        items
          .map(
            (item) => `
              <div class="list-item">
                <strong>${esc(item.title)}</strong>
                <div class="small">${esc(item.genre)} • ${esc(item.mood)}</div>
                <div class="feature-actions">
                  <button class="tiny-btn play-vibe" data-url="${esc(item.trailer_url)}">Trailer</button>
                  <button class="tiny-btn add-vibe-watchlist" data-id="${item.id}">Watchlist</button>
                </div>
              </div>
            `
          )
          .join("")
      );
    })
    .fail(() => {
      $("#recommendations").html('<p class="hint">Recommendations unavailable right now.</p>');
    });
}

function surpriseMe() {
  if (state.surprisePick) {
    toast(`Surprise pick: ${state.surprisePick.title}`, "success");
    openTrailer(state.surprisePick.trailer_url);
    return;
  }
  if (!state.titles.length) {
    toast("No titles loaded", "error");
    return;
  }
  const pick = state.titles[Math.floor(Math.random() * state.titles.length)];
  toast(`Surprise pick: ${pick.title}`, "success");
  openTrailer(pick.trailer_url);
}

function switchAuthTab(tabId) {
  $(".tab-btn").removeClass("active");
  $(`.tab-btn[data-tab="${tabId}"]`).addClass("active");
  $(".auth-form").removeClass("active");
  $("#" + tabId).addClass("active");
}

$(function init() {
  setGuestUi();
  fetchTitles();
  fetchStats();
  fetchStorageView();
  fetchWatchlist();
  fetchJournal();
  fetchRecommendations();

  $(".mood-btn").on("click", function onMoodClick() {
    state.mood = $(this).data("mood");
    $(".mood-btn").removeClass("active");
    $(this).addClass("active");
    fetchTitles();
    fetchRecommendations();
  });

  $("#searchInput").on("input", function onSearchInput() {
    const value = $(this).val();
    if (value.length === 0 || value.length >= 2) {
      fetchTitles();
    }
  });

  $("#refreshStats").on("click", fetchStats);
  $("#refreshStorageView").on("click", fetchStorageView);
  $("#surpriseBtn").on("click", surpriseMe);
  $("#refreshAllBtn").on("click", function onRefreshAll() {
    fetchTitles();
    fetchStats();
    fetchWatchlist();
    fetchJournal();
    fetchRecommendations();
    fetchStorageView();
  });

  $("#exportTrending").on("click", function onExportTrending() {
    $.post("api/export-trending.php")
      .done((res) => {
        toast("Trending export created: " + (res.file_url || ""), "success");
        fetchStats();
        fetchStorageView();
      })
      .fail((xhr) => {
        toast(
          (xhr.responseJSON && (xhr.responseJSON.message || xhr.responseJSON.error)) ||
            "Export failed",
          "error"
        );
      });
  });

  $(".tab-btn").on("click", function onTabClick() {
    switchAuthTab($(this).data("tab"));
  });

  $("#registerTab").on("submit", function onRegisterSubmit(event) {
    event.preventDefault();
    const payload = {
      name: $(this).find("[name='name']").val(),
      email: $(this).find("[name='email']").val(),
      password: $(this).find("[name='password']").val(),
    };
    $.ajax({
      url: "api/register.php",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(payload),
    })
      .done((res) => {
        toast(res.message || "Registration complete", "success");
        setTimeout(() => window.location.reload(), 450);
      })
      .fail((xhr) => {
        toast(
          (xhr.responseJSON && (xhr.responseJSON.message || xhr.responseJSON.error)) ||
            "Registration failed",
          "error"
        );
      });
  });

  $("#loginTab").on("submit", function onLoginSubmit(event) {
    event.preventDefault();
    const payload = {
      identity: $(this).find("[name='identity']").val(),
      password: $(this).find("[name='password']").val(),
    };
    $.ajax({
      url: "api/login.php",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(payload),
    })
      .done((res) => {
        toast(res.message || "Logged in", "success");
        setTimeout(() => window.location.reload(), 350);
      })
      .fail((xhr) => {
        toast(
          (xhr.responseJSON && (xhr.responseJSON.message || xhr.responseJSON.error)) ||
            "Login failed",
          "error"
        );
      });
  });

  $(document).on("click", "#logoutBtn", function onLogoutClick() {
    $.post("api/logout.php").always(() => window.location.reload());
  });

  $("#avatarUploadForm").on("submit", function onAvatarUpload(event) {
    event.preventDefault();
    const formData = new FormData(this);
    $.ajax({
      url: "api/profile-upload.php",
      method: "POST",
      data: formData,
      processData: false,
      contentType: false,
    })
      .done((res) => {
        toast(res.message || "Avatar uploaded", "success");
        setTimeout(() => window.location.reload(), 350);
      })
      .fail((xhr) => {
        toast(
          (xhr.responseJSON && (xhr.responseJSON.message || xhr.responseJSON.error)) ||
            "Upload failed",
          "error"
        );
      });
  });

  $("#catalog")
    .on("click", ".watch-btn", function onWatchClick() {
      openTrailer($(this).data("url"));
    })
    .on("click", ".watchlist-btn", function onWatchlistClick() {
      const titleId = Number($(this).closest(".title-card").data("id"));
      toggleWatchlist(titleId);
    })
    .on("click", ".review-toggle-btn", function onReviewToggle() {
      const $card = $(this).closest(".title-card");
      const titleId = Number($card.data("id"));
      const $box = $card.find(".review-box");
      const isHidden = $box.prop("hidden");
      $box.prop("hidden", !isHidden);
      if (isHidden) {
        loadReviews(titleId, $card.find(".reviews-list"));
      }
    })
    .on("submit", ".review-form", function onReviewSubmit(event) {
      event.preventDefault();
      const $form = $(this);
      const $card = $form.closest(".title-card");
      const titleId = Number($card.data("id"));
      const payload = {
        title_id: titleId,
        rating: Number($form.find("[name='rating']").val()),
        review_text: $form.find("[name='review_text']").val(),
      };
      $.ajax({
        url: "api/reviews.php",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(payload),
      })
        .done((res) => {
          toast(res.message || "Review saved", "success");
          loadReviews(titleId, $card.find(".reviews-list"));
          fetchTitles();
          fetchStats();
          fetchStorageView();
          fetchRecommendations();
          $form.trigger("reset");
        })
        .fail((xhr) => {
          toast(
            (xhr.responseJSON && (xhr.responseJSON.message || xhr.responseJSON.error)) ||
              "Review failed",
            "error"
          );
        });
    });

  $("#watchlist").on("click", ".remove-watchlist", function onRemoveWatchlist() {
    const titleId = Number($(this).closest(".mini-row").data("id"));
    toggleWatchlist(titleId);
  });

  $("#moodJournalForm").on("submit", function onJournalSubmit(event) {
    event.preventDefault();
    postJournal();
  });

  $("#recommendations")
    .on("click", ".play-vibe", function onPlayVibe() {
      openTrailer($(this).data("url"));
    })
    .on("click", ".add-vibe-watchlist", function onAddVibeWatchlist() {
      toggleWatchlist(Number($(this).data("id")));
    });

  $("#closeTrailer, #trailerModal").on("click", function onModalClose(event) {
    if (event.target.id === "trailerModal" || event.target.id === "closeTrailer") {
      closeTrailer();
    }
  });
});
