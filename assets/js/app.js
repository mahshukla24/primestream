/* global $, PRIME_STREAM_BOOT */

const state = {
  mood: (window.PRIME_STREAM_BOOT && window.PRIME_STREAM_BOOT.mood) || "chill",
};

function toast(message, variant = "success") {
  const $toast = $("#toast");
  $toast
    .removeClass("success error")
    .addClass(variant)
    .text(message)
    .addClass("show");

  window.clearTimeout(window.__psToastTimer);
  window.__psToastTimer = window.setTimeout(() => {
    $toast.removeClass("show");
  }, 2500);
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

function renderSessionPanel(user) {
  const $panel = $("#sessionPanel");
  if (user) {
    const avatar = user.avatar_path
      ? `<img src="${esc(user.avatar_path)}" alt="avatar">`
      : "";

    $panel.html(`
      <div class="user-pill">
        <span>Welcome, ${esc(user.name)}</span>
        ${avatar}
      </div>
      <button id="logoutBtn" class="btn-secondary">Logout</button>
    `);

    $("#authTabs").addClass("hidden");
    $("#loginTab").removeClass("active");
    $("#registerTab").removeClass("active");
    $("#avatarUploadForm").removeClass("hidden");
  } else {
    $panel.html(`<p class="hint">Login to rate, review and export data.</p>`);
    $("#authTabs").removeClass("hidden");
    $("#loginTab").addClass("active");
    $("#registerTab").removeClass("active");
    $("#avatarUploadForm").addClass("hidden");
  }
}

function renderStats(stats) {
  const rows = [
    ["Users", stats.users],
    ["Titles", stats.titles],
    ["Reviews", stats.reviews],
    ["Uploaded Avatars", stats.uploaded_avatars],
    ["Exports", stats.exports_count],
    ["Audit Log (bytes)", stats.audit_log_bytes],
  ];

  const html = rows
    .map(
      ([key, value]) =>
        `<div class="stat-item"><span>${esc(key)}</span><strong>${esc(value)}</strong></div>`
    )
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

      const html = res.reviews
        .map(
          (review) => `
            <div class="review-item">
              <div><strong>${esc(review.reviewer_name)}</strong> • ⭐ ${esc(review.rating)}</div>
              <small>${esc(review.created_at)}</small>
              <p>${esc(review.review_text)}</p>
            </div>
          `
        )
        .join("");

      $target.html(html);
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
      renderCatalog(res.items || []);
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
      if (res && res.user) {
        renderSessionPanel(res.user);
      } else {
        renderSessionPanel(null);
      }
    })
    .fail(() => {
      toast("Could not load stats", "error");
      renderSessionPanel(null);
    });
}

function fetchStorageView() {
  $.getJSON("api/storage-view.php")
    .done((res) => {
      $("#usersDump").text(formatJson((res.database && res.database.users) || []));
      $("#reviewsDump").text(formatJson((res.database && res.database.reviews) || []));
      $("#exportsDump").text(
        formatJson({
          exports: (res.files && res.files.exports) || [],
          uploads: (res.files && res.files.uploads) || [],
        })
      );
      $("#auditDump").text(
        (res.files && res.files.review_audit_log_preview) || "No log entries yet."
      );
    })
    .fail(() => {
      $("#usersDump, #reviewsDump, #exportsDump, #auditDump").text(
        "Could not load live storage data."
      );
    });
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
  fetchStorageView();

  $(".mood-btn").on("click", function onMoodClick() {
    state.mood = $(this).data("mood");
    $(".mood-btn").removeClass("active");
    $(this).addClass("active");
    fetchTitles();
  });

  $("#searchInput").on("input", function onSearchInput() {
    const value = $(this).val();
    if (value.length === 0 || value.length >= 2) {
      fetchTitles();
    }
  });

  $("#refreshStats").on("click", fetchStats);
  $("#refreshStorageView").on("click", fetchStorageView);

  $("#exportTrending").on("click", function onExportTrending() {
    $.post("api/export-trending.php")
      .done((res) => {
        toast("Trending export created: " + (res.file_url || ""), "success");
        fetchStats();
        fetchStorageView();
      })
      .fail((xhr) => {
        toast((xhr.responseJSON && xhr.responseJSON.error) || "Export failed", "error");
      });
  });

  $(".tab-btn").on("click", function onTabClick() {
    switchAuthTab($(this).data("tab"));
  });

  $("#registerTab").on("submit", function onRegisterSubmit(event) {
    event.preventDefault();
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
        toast(res.message || "Registration complete", "success");
        setTimeout(() => window.location.reload(), 500);
      })
      .fail((xhr) => {
        toast((xhr.responseJSON && xhr.responseJSON.error) || "Registration failed", "error");
      });
  });

  $("#loginTab").on("submit", function onLoginSubmit(event) {
    event.preventDefault();
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
        toast(res.message || "Logged in", "success");
        setTimeout(() => window.location.reload(), 350);
      })
      .fail((xhr) => {
        toast((xhr.responseJSON && xhr.responseJSON.error) || "Login failed", "error");
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
        toast((xhr.responseJSON && xhr.responseJSON.error) || "Upload failed", "error");
      });
  });

  $("#catalog")
    .on("click", ".watch-btn", function onWatchClick() {
      openTrailer($(this).data("url"));
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
          toast(res.message || "Review saved", "success");
          loadReviews(titleId, $card.find(".reviews-list"));
          fetchTitles();
          fetchStats();
          fetchStorageView();
          $form.trigger("reset");
        })
        .fail((xhr) => {
          toast((xhr.responseJSON && xhr.responseJSON.error) || "Review failed", "error");
        });
    });

  $("#closeTrailer, #trailerModal").on("click", function onModalClose(event) {
    if (event.target.id === "trailerModal" || event.target.id === "closeTrailer") {
      closeTrailer();
    }
  });
});
