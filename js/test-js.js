// Toggle case list open/close
const toggleBtn = document.getElementById("toggleCaseList");
const caseList = document.getElementById("caseList");
if (toggleBtn && caseList) {
  toggleBtn.addEventListener("click", () => {
    caseList.classList.toggle("show");
    toggleBtn.textContent = caseList.classList.contains("show")
      ? "Hide Case Studies"
      : "View Case Studies";
  });
}

// Toggle full view (expand/collapse)
document.querySelectorAll('.toggle-full').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const list = btn.closest('.case-list');
    const fullView = list.querySelector('.full-view');
    const isActive = fullView.classList.contains('active');

    if (!isActive) {
      fullView.classList.add('active');
      list.querySelectorAll('.toggle-full').forEach(b => b.textContent = "Hide Full Case Study");
    } else {
      fullView.classList.remove('active');
      list.querySelectorAll('.toggle-full').forEach(b => b.textContent = "See Full Case Study");
    }
  });
});

// Smooth scroll for Contact Me
document.querySelectorAll('.contact-me').forEach(btn => {
  btn.addEventListener('click', e => {
    const target = document.querySelector(btn.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
