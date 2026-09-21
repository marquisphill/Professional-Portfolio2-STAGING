// main.js (full replacement)
document.addEventListener("DOMContentLoaded", () => {
  /* ===============================
     Helpers
  =============================== */
  const smoothScrollTo = (el, yOffset = -80, duration = 600) => {
    if (!el) return;
    const startY = window.pageYOffset;
    const targetY = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    const diff = targetY - startY;
    let start;

    const step = (ts) => {
      if (!start) start = ts;
      const time = ts - start;
      const pct = Math.min(time / duration, 1);
      window.scrollTo(0, startY + diff * pct);
      if (time < duration) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ===============================
     Case Studies (Index page)
  =============================== */
  const casesSection   = qs("#cases");
  const toggleCaseBtn  = qs("#toggleCaseList");
  const caseListEl     = qs("#caseList");
  const impactLinks    = qsa('a[href="#cases"], .impact-btn');

  const syncCaseBtn = () => {
    if (!toggleCaseBtn || !caseListEl) return;
    const isOpen = caseListEl.classList.contains("show");
    toggleCaseBtn.textContent = isOpen ? "Hide Case Studies" : "View Case Studies";
    toggleCaseBtn.setAttribute("aria-expanded", String(isOpen));
  };

  // Toggle button (open/close)
  if (toggleCaseBtn && caseListEl) {
    toggleCaseBtn.addEventListener("click", () => {
      caseListEl.classList.toggle("show");
      syncCaseBtn();
    });
    // ensure correct label on load
    syncCaseBtn();
  }

  // Open + scroll from hero / nav "See My Impact"
  if (impactLinks.length && caseListEl) {
    impactLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        caseListEl.classList.add("show");
        syncCaseBtn();
        if (casesSection) {
          // slight delay to let CSS apply .show
          setTimeout(() => smoothScrollTo(casesSection, -80, 700), 50);
        }
      });
    });
  }

  // Auto-open if URL loaded with #cases
  if (window.location.hash && window.location.hash.split("?")[0] === "#cases" && caseListEl) {
    caseListEl.classList.add("show");
    syncCaseBtn();
  }

  // ----- Case study accordion: "Read" / "Hide Case Study" -----
const getCaseIndex = (previewEl) => {
  const all = qsa(".case-preview");
  return Math.max(0, all.indexOf(previewEl));
};

document.addEventListener("click", (e) => {
  // "Read" button (open)
  if (e.target && e.target.classList.contains("read-btn")) {
    const btn = e.target;
    const targetId = btn.dataset.target;
    const target = qs(`#${CSS.escape(targetId)}`);
    if (!target) return;

    const previewCard = btn.closest(".case-preview");

    // Ensure Case Studies section is open
    if (caseListEl && !caseListEl.classList.contains("show")) {
      caseListEl.classList.add("show");
      syncCaseBtn();
    }

    // Close any other open case studies
    qsa(".case-details.open").forEach((openD) => {
      if (openD !== target) {
        openD.classList.remove("open");
        const otherPreview = openD.closest(".case-preview");
        if (otherPreview) {
          const labelEl = otherPreview.querySelector(".case-label");
          if (labelEl) {
            const newBtn = document.createElement("button");
            newBtn.className = "btn btn-outline-dark read-btn";
            newBtn.textContent = "Read";
            newBtn.dataset.target = openD.id;
            labelEl.replaceWith(newBtn);
          }
        }
      }
    });

    // Toggle target case study open/close
    const willOpen = !target.classList.contains("open");
    target.classList.toggle("open", willOpen);

    // Replace button with label when opening
    if (willOpen && previewCard) {
      const label = document.createElement("span");
      label.className = "case-label";
      label.textContent = `Case Study ${getCaseIndex(previewCard) + 1}`;
      btn.replaceWith(label);

      // 🔹 GA4 tracking for Read
      gtag("event", "case_study_read_click", {
        case_id: targetId,
        case_number: getCaseIndex(previewCard) + 1,
        page: window.location.pathname,
      });
      console.log("DEBUG tracked case study read:", targetId);
    }

    // Smooth scroll to the opened case
    setTimeout(() => smoothScrollTo(previewCard, -80, 800), 350);
  }

  // "Hide Case Study" button (close)
  if (e.target && e.target.classList.contains("hide-btn")) {
    const caseDetails = e.target.closest(".case-details");
    const previewCard = e.target.closest(".case-preview");
    if (!caseDetails || !previewCard) return;

    caseDetails.classList.remove("open");

    // Restore "Read" button if label exists
    const oldLabel = previewCard.querySelector(".case-label");
    if (oldLabel) {
      const newBtn = document.createElement("button");
      newBtn.className = "btn btn-outline-dark read-btn";
      newBtn.textContent = "Read";
      newBtn.dataset.target = caseDetails.id;
      oldLabel.replaceWith(newBtn);
    }

    // 🔹 GA4 tracking for Hide
    gtag("event", "case_study_hide_click", {
      case_id: caseDetails.id,
      case_number: getCaseIndex(previewCard) + 1,
      page: window.location.pathname,
    });
    console.log("DEBUG tracked case study hide:", caseDetails.id);

    // Smooth scroll back to preview
    setTimeout(() => smoothScrollTo(previewCard, -80, 700), 300);
  }
});


  /* ===============================
     "Contact Me" buttons
  =============================== */
  const contactSection = qs("#contact");
  qsa(".contact-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" });
    });
  });

  /* ===============================
     Recommendations Toggle
  =============================== */
  const toggleRecBtn = qs("#toggleRecommendations");
  const recList = qs("#recommendationsList");

  const syncRecBtn = () => {
    if (!toggleRecBtn || !recList) return;
    const isOpen = recList.classList.contains("show");
    toggleRecBtn.textContent = isOpen ? "Hide Recommendations" : "View Recommendations";
    toggleRecBtn.setAttribute("aria-expanded", String(isOpen));
  };

  if (toggleRecBtn && recList) {
    toggleRecBtn.addEventListener("click", () => {
      recList.classList.toggle("show");
      syncRecBtn();
      if (recList.classList.contains("show")) {
        const firstCard = qs(".recommendation-card", recList);
        if (firstCard) setTimeout(() => smoothScrollTo(firstCard, -80, 700), 250);
      }
    });

    // Open via URL like "#recommendations?open=recommendations"
    const hash = window.location.hash || "";
    const qIndex = hash.indexOf("?");
    const base = qIndex === -1 ? hash : hash.slice(0, qIndex);
    const params = new URLSearchParams(qIndex === -1 ? "" : hash.slice(qIndex + 1));
    if (base === "#recommendations" && params.get("open") === "recommendations") {
      recList.classList.add("show");
      syncRecBtn();
      const firstCard = qs(".recommendation-card", recList);
      if (firstCard) setTimeout(() => smoothScrollTo(firstCard, -80, 700), 250);
    } else {
      syncRecBtn();
    }
  }

  /* ===============================
     Navbar: auto-close on link click (mobile)
  =============================== */
  qsa(".navbar-nav .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      const navbarCollapse = qs(".navbar-collapse");
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });

  /* ===============================
     Index: Hero "Preview Resume" (overlay box)
     (IDs specific to index.html)
  =============================== */
  const idxPreviewBtn  = qs("#resumePreviewBtnIndex");
  const idxAccordion   = qs("#resumePreviewAccordionIndex");
  const idxCloseLink   = qs("#closeResumePreviewIndex");

  if (idxPreviewBtn && idxAccordion && idxCloseLink) {
    idxPreviewBtn.addEventListener("click", () => {
      idxAccordion.classList.add("show");
      // keep button visible on desktop; reduce confusion on mobile
      // If you prefer to hide, switch to: idxPreviewBtn.style.visibility = "hidden";
    });

    idxCloseLink.addEventListener("click", (e) => {
      e.preventDefault();
      idxAccordion.classList.remove("show");
      // idxPreviewBtn.style.visibility = "visible";
    });
  }

  // If you are using the old bootstrap collapse version in index (#resumePreview), keep smooth scroll
  const legacyPreviewTrigger = qs('.hero-preview-btn [data-bs-toggle="collapse"]');
  const legacyPreviewTarget  = qs("#resumePreview");
  if (legacyPreviewTrigger && legacyPreviewTarget) {
    legacyPreviewTrigger.addEventListener("click", () => {
      setTimeout(() => {
        const y = legacyPreviewTarget.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }, 400); // wait for collapse animation
    });
  }

  /* ===============================
     Experience: Floating/Sticky Resume Preview
     (IDs specific to experience.html)
  =============================== */
  const expPreviewBtn = qs("#resumePreviewBtn");            // sticky button
  const expAccordion  = qs("#resumePreviewAccordion");      // overlay box
  const expCloseLink  = qs("#closeResumePreview");

  if (expPreviewBtn && expAccordion && expCloseLink) {
    expPreviewBtn.addEventListener("click", () => {
      expAccordion.classList.add("show");
      // keep the button visible; if you must hide:
      // expPreviewBtn.style.visibility = "hidden";
    });

    expCloseLink.addEventListener("click", (e) => {
      e.preventDefault();
      expAccordion.classList.remove("show");
      // expPreviewBtn.style.visibility = "visible";
    });
  }

  /* ===============================
     Optional: Nav link to #cases also opens section
  =============================== */
  qsa('.nav-link[href="#cases"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      if (caseListEl) caseListEl.classList.add("show");
      syncCaseBtn();
      if (casesSection) smoothScrollTo(casesSection, -80, 700);
    });
  });

/* ===============================
   GA4: Track ALL button clicks
=============================== */
document.addEventListener("click", (e) => {
  const clickable = e.target.closest(
    'button, a.btn, .hero-cta, .career-goals-btn, .praise-btn, .floating-contact-btn'
  );
  if (!clickable) return;

  // Label: prefer aria-label, fallback to text content
  const label =
    clickable.getAttribute("aria-label") ||
    (clickable.innerText || "").trim().slice(0, 100);

  const id = clickable.id || "";
  const href = clickable.getAttribute("href") || "";
  const section = clickable.closest("section")?.id || "";

  // General button click tracking
  gtag("event", "button_click", {
    button_id: id,
    button_text: label,
    link_url: href,
    section: section,
  });

    // Debug logging
  console.log("DEBUG button clicked:", {
    label,
    id,
    href,
    section
  });

  if (href && href.toLowerCase().endsWith(".pdf")) {
    console.log("DEBUG resume download detected:", href);
  }


// 🔹 Special case: Resume download
if (href && href.toLowerCase().endsWith(".pdf")) {
  console.log("DEBUG resume download detected:", href);

  // Pause default navigation so GA has time to fire
  e.preventDefault();

  gtag("event", "resume_download", {
    button_text: label,
    section: section,
  });

  // Force the PDF to download after short delay
  setTimeout(() => {
    const link = document.createElement("a");
    link.href = href;
    link.download = "Phillip_Marquis_2025_Resume.pdf"; // this forces a download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, 500);
}

});

// ===== GA4: Time spent on the Experience page (visible time only) =====
(function () {
  // Adjust this test if your filename/path differs
  const isExperience = location.pathname.toLowerCase().includes('experience');

  if (!isExperience) return;

  let lastVisibleTs = document.visibilityState === 'visible' ? Date.now() : 0;
  let totalVisibleMs = 0;
  let sent = false;

  function onVisibilityChange() {
    const now = Date.now();
    if (document.visibilityState === 'visible') {
      lastVisibleTs = now;
    } else {
      if (lastVisibleTs) {
        totalVisibleMs += now - lastVisibleTs;
        lastVisibleTs = 0;
      }
    }
  }

  function sendTimeSpent() {
    if (sent) return;
    const now = Date.now();
    if (document.visibilityState === 'visible' && lastVisibleTs) {
      totalVisibleMs += now - lastVisibleTs;
      lastVisibleTs = 0;
    }
    const seconds = Math.round(totalVisibleMs / 1000);
    if (seconds > 0) {
      gtag('event', 'experience_time_spent', {
        duration_seconds: seconds
      });
    }
    sent = true;
  }

  document.addEventListener('visibilitychange', onVisibilityChange);
  window.addEventListener('pagehide', sendTimeSpent);
})();

// ===============================
// GA4: Track Preview Resume buttons
// ===============================
["resumePreviewBtnIndex", "resumePreviewBtn"].forEach((id) => {
  const btn = document.getElementById(id);
  if (btn) {
    btn.addEventListener("click", () => {
      gtag("event", "resume_preview_open", {
        button_id: id,
        page: window.location.pathname,
      });
      console.log("DEBUG resume preview tracked:", id);
    });
  }
});

// ===============================
// GA4: Track specific key buttons
// ===============================
const trackedButtons = [
  // Index Hero
  { sel: '.hero-cta-1', event: 'track_my_path_click' },
  { sel: '.hero-cta-2', event: 'resume_download_click' }, // resume hero
  { sel: '.hero-cta-3', event: 'see_my_impact_click' },

  // Index Page
  { sel: '#toggleCaseList', event: 'view_case_studies_click' },
  { sel: 'a[href="experience.html"].btn', event: 'view_experience_click' },
  { sel: '#toggleRecommendations', event: 'view_recommendations_click' },
  { sel: 'a[href="experience.html#career-goals"].career-goals-btn', event: 'see_career_goals_click' },

  // Experience Page
  { sel: 'a.btn.btn-dark[download]', event: 'experience_resume_download_click' },
  { sel: 'a[href="#career-goals"].btn.btn-primary', event: 'experience_view_career_goals_click' },
  { sel: '.praise-btn', event: 'see_colleague_praise_click' },
  { sel: 'a[href="experience.html#experience-list"].career-goals-btn', event: 'see_my_experience_click' }
];

trackedButtons.forEach(({ sel, event }) => {
  document.querySelectorAll(sel).forEach((btn) => {
    btn.addEventListener('click', () => {
      gtag('event', event, {
        button_text: btn.innerText.trim(),
        button_selector: sel,
        page: window.location.pathname
      });
      console.log(`DEBUG tracked: ${event}`);
    });
  });
});



});
