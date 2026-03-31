/* global $, PRIME_STREAM_BOOT */

const state = {
  mood: (window.PRIME_STREAM_BOOT && window.PRIME_STREAM_BOOT.mood) || "chill",
  selectedTitleId: null,
  titles: [],
};

function toast(message, variant = "ok") {
  const $toast = $("#toast");
  $toast.removeClass("error ok").addClass(variant).text(message).fadeIn(160);
  window.clearTimeout(window.__primeToastTimer);
  window.__primeToastTimer = window.setTimeout(() => $toast.fadeOut(240), 2500);
}

function esc(text) {
  return String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderStats(stats) {
  const rows = [
    ["Users", stats.users],
    ["Titles", stats.titles],
    ["Reviews", stats.reviews],
    ["Uploaded Avatars", stats.uploaded_avatars],
    ["Exports", stats.exports],
    ["Audit Log (bytes)", stats.audit_log_bytes],
  ];

  const html = rows
    .map(([k, v]) => `<div class="stat-row"><span>${esc(k)}</span><strong>${esc(v)}</strong></div>`)
    .join("");
  $("#statsPanel .stats-list").html(html);
}

function openTrailer(url) {
  $("#trailerFrame").attr("src", url);
  $("#trailerModal").addClass("open");
}

function closeTrailer() {
  $("#trailerFrame").attr("src", "");
  $("#trailerModal").removeClass("open");
}

function loadReviews(titleId, $target) {
  $.getJSON("api/reviews.php", { title_id: titleId })
    .done((res) => {
      if (!Array.isArray(res.reviews) || res.reviews.length === 0) {
        $target.html('<p class="hint">No reviews yet. Be the first to review.</p>');
        return;
      }

      const reviewHtml = res.reviews
        .map(
          (r) => `
            <div class="review-item">
              <div><strong>${esc(r.name)}</strong> • ⭐ ${esc(r.rating)}</div>
              <small>${esc(r.created_at)}</small>
              <p>${esc(r.review_text)}</p>
            </div>
          `
        )
        .join("");
      $target.html(reviewHtml);
    })
    .fail(() => {
      $target.html('<p class="hint">Could not load reviews.</p>');
    });
}

function renderCatalog(items) {
  const $catalog = $("#catalog");
  if (!Array.isArray(items) || items.length === 0) {
    $catalog.html('<div class="glass empty">No titles found for this mood/search.</div>');
    return;
  }

  const cards = items
    .map(
      (item) => `
      <article class="title-card glass" data-id="${item.id}">
        <img src="${esc(item.thumbnail_url)}" alt="${esc(item.title)} poster">
        <div class="title-body">
          <h3>${esc(item.title)}</h3>
          <p class="meta">${esc(item.genre)} • ${esc(item.release_year)} • ${esc(item.duration_min)} min</p>
          <p class="desc">${esc(item.description)}</p>
          <div class="scores">
            <span>IMDb: ${esc(item.imdb_rating)}</span>
            <span>Community: ${esc(item.community_rating)}</span>
            <span class="prime-score">Prime Score: ${esc(item.prime_score)}</span>
          </div>
          <div class="actions">
            <button class="btn-secondary watch-btn" data-url="${esc(item.trailer_url)}">Watch Trailer</button>
            <button class="btn-primary review-toggle-btn">Reviews</button>
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
      </article>
    `
    )
    .join("");

  $catalog.html(cards);
}

function fetchTitles() {
  $.getJSON("api/titles.php", { mood: state.mood, q: $("#searchInput").val() })
    .done((res) => {
      state.titles = res.items || [];
      renderCatalog(state.titles);
    })
    .fail((xhr) => {
      toast((xhr.responseJSON && xhr.responseJSON.error) || "Could not load titles", "error");
    });
}

function fetchStats() {
  $.getJSON("api/stats.php")
    .done((res) => {
      if (res && res.stats) {
        renderStats(res.stats);
      }
    })
    .fail(() => toast("Could not load stats", "error"));
}

function switchAuthTab(tabId) {
  $(".tab-btn").removeClass("active");
  $(`.tab-btn[data-tab="${tabId}"]`).addClass("active");
  $(".auth-form").removeClass("active");
  $("#" + tabId).addClass("active");
}

$(function init() {
  fetchTitles();
  fetchStats();

  $(".mood-btn").on("click", function onMood() {
    const mood = $(this).data("mood");
    state.mood = mood;
    $(".mood-btn").removeClass("active");
    $(this).addClass("active");
    fetchTitles();
  });

  $("#searchInput").on("input", function onSearch() {
    if ($(this).val().length === 0 || $(this).val().length >= 2) {
      fetchTitles();
    }
  });

  $("#refreshStats").on("click", fetchStats);

  $("#exportTrending").on("click", function onExport() {
    $.post("api/export-trending.php")
      .done((res) => {
        toast("Trending export created: " + res.file, "ok");
        fetchStats();
      })
      .fail((xhr) => {
        toast((xhr.responseJSON && xhr.responseJSON.error) || "Export failed", "error");
      });
  });

  $(".tab-btn").on("click", function onTab() {
    switchAuthTab($(this).data("tab"));
  });

  $("#registerTab").on("submit", function onRegister(ev) {
    ev.preventDefault();
    const payload = {
      name: $(this).find('[name="name"]').val(),
      email: $(this).find('[name="email"]').val(),
      password: $(this).find('[name="password"]').val(),
    };

    $.ajax({
      url: "api/register.php",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(payload),
    })
      .done((res) => {
        toast(res.message || "Registration complete", "ok");
        setTimeout(() => window.location.reload(), 600);
      })
      .fail((xhr) => {
        toast((xhr.responseJSON && xhr.responseJSON.error) || "Registration failed", "error");
      });
  });

  $("#loginTab").on("submit", function onLogin(ev) {
    ev.preventDefault();
    const payload = {
      identity: $(this).find('[name="email"]').val(),
      password: $(this).find('[name="password"]').val(),
    };

    $.ajax({
      url: "api/login.php",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(payload),
    })
      .done((res) => {
        toast(res.message || "Logged in", "ok");
        setTimeout(() => window.location.reload(), 450);
      })
      .fail((xhr) => {
        toast((xhr.responseJSON && xhr.responseJSON.error) || "Login failed", "error");
      });
  });

  $("#logoutBtn").on("click", function onLogout() {
    $.post("api/logout.php").done(() => window.location.reload());
  });

  $("#avatarUploadForm").on("submit", function onAvatarUpload(ev) {
    ev.preventDefault();
    const formData = new FormData(this);
    $.ajax({
      url: "api/profile-upload.php",
      method: "POST",
      data: formData,
      processData: false,
      contentType: false,
    })
      .done((res) => {
        toast(res.message || "Avatar uploaded", "ok");
        setTimeout(() => window.location.reload(), 450);
      })
      .fail((xhr) => {
        toast((xhr.responseJSON && xhr.responseJSON.error) || "Upload failed", "error");
      });
  });

  $("#catalog")
    .on("click", ".watch-btn", function onWatch() {
      openTrailer($(this).data("url"));
    })
    .on("click", ".review-toggle-btn", function onReviewToggle() {
      const $card = $(this).closest(".title-card");
      const titleId = Number($card.data("id"));
      const $box = $card.find(".review-box");
      $box.prop("hidden", !$box.prop("hidden"));
      if (!$box.prop("hidden")) {
        loadReviews(titleId, $card.find(".reviews-list"));
      }
    })
    .on("submit", ".review-form", function onReviewSubmit(ev) {
      ev.preventDefault();
      const $form = $(this);
      const $card = $form.closest(".title-card");
      const titleId = Number($card.data("id"));
      const payload = {
        title_id: titleId,
        rating: Number($form.find('[name="rating"]').val()),
        review_text: $form.find('[name="review_text"]').val(),
      };

      $.ajax({
        url: "api/reviews.php",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(payload),
      })
        .done((res) => {
          toast(res.message || "Review saved", "ok");
          loadReviews(titleId, $card.find(".reviews-list"));
          fetchTitles();
          fetchStats();
          $form.trigger("reset");
        })
        .fail((xhr) => {
          toast((xhr.responseJSON && xhr.responseJSON.error) || "Review failed", "error");
        });
    });

  $("#closeTrailer, #trailerModal").on("click", function onCloseTrailer(ev) {
    if (ev.target.id === "trailerModal" || ev.target.id === "closeTrailer") {
      closeTrailer();
    }
  });
});
