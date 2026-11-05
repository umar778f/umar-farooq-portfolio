/**
 * Umar Farooq — Modern Glassmorphism Portfolio
 * Interactive Client Engine
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initCustomCursor();
  initNavbar();
  initParallaxTilt();
  initContactForm();
  loadProfileData();
});

/* ─── 1. TYPEWRITER EFFECT ───────────────────────────────────────────────── */
function initTypewriter() {
  const subtitleEl = document.getElementById('animated-subtitle');
  if (!subtitleEl) return;

  const roles = [
    'Full Stack Developer',
    'Software Engineer',
    'AI & ML Developer'
  ];

  let roleIndex = 0;
  let charIndex = roles[0].length;
  let isDeleting = true;

  function tick() {
    if (document.hidden) {
      setTimeout(tick, 400);
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const currentWord = roles[roleIndex];
    charIndex += isDeleting ? -1 : 1;
    subtitleEl.textContent = currentWord.slice(0, charIndex);

    let speed = isDeleting ? 45 : 85;

    if (charIndex === 0 && isDeleting) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 280;
    } else if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      speed = 1900;
    }

    setTimeout(tick, speed);
  }

  // Start after brief initial delay
  setTimeout(tick, 1800);

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) tick();
  });
}

/* ─── 2. CUSTOM INTERACTIVE CURSOR ───────────────────────────────────────── */
function initCustomCursor() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  if (window.matchMedia('(pointer: coarse)').matches) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  }, { passive: true });

  function renderRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    requestAnimationFrame(renderRing);
  }
  requestAnimationFrame(renderRing);

  // Hover states on interactive components
  const hoverTargets = 'a, button, .project-card, .skill-pill, .contact-item, .social-icon';
  document.querySelectorAll(hoverTargets).forEach((el) => {
    el.addEventListener('mouseenter', () => {
      dot.classList.add('big');
      ring.classList.add('vis');
    });
    el.addEventListener('mouseleave', () => {
      dot.classList.remove('big');
      ring.classList.remove('vis');
    });
  });
}

/* ─── 3. NAVBAR, MOBILE MENU & SCROLL SPY ────────────────────────────────── */
function initNavbar() {
  const header = document.getElementById('nav');
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll Header Shadow
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY || document.documentElement.scrollTop || 0;
    if (scrollPos > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Scroll Spy
    let currentSection = '';
    const spyPos = scrollPos + 180;

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (spyPos >= top && spyPos < top + height) {
        currentSection = sec.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // Mobile Menu Toggle
  function toggleMobileMenu(isOpen) {
    if (!menuBtn || !mobileMenu) return;
    const open = typeof isOpen === 'boolean' ? isOpen : !mobileMenu.classList.contains('open');
    mobileMenu.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    mobileMenu.setAttribute('aria-hidden', String(!open));
    mobileMenu.inert = !open;
    menuBtn.innerHTML = open ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
  }

  menuBtn?.addEventListener('click', () => toggleMobileMenu());

  mobileMenu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => toggleMobileMenu(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu?.classList.contains('open')) {
      toggleMobileMenu(false);
      menuBtn?.focus();
    }
  });
}

/* ─── 4. AMBIENT 3D PARALLAX TILT ────────────────────────────────────────── */
function initParallaxTilt() {
  if (!window.matchMedia('(pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const container = document.querySelector('.image-container');
  const visualArea = document.querySelector('.home-image');
  if (!container || !visualArea) return;

  visualArea.addEventListener('pointermove', (e) => {
    const rect = visualArea.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const tiltX = (-y * 14).toFixed(2);
    const tiltY = (x * 14).toFixed(2);
    container.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  visualArea.addEventListener('pointerleave', () => {
    container.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });
}

/* ─── 5. CONTACT FORM & DIRECT EMAIL FALLBACK ────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  // Set configurable endpoint here if desired, e.g. "https://formspree.io/f/YOUR_ID"
  const FORM_ENDPOINT = '';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById('form-submit-btn');
    const nameVal = document.getElementById('name')?.value.trim();
    const emailVal = document.getElementById('email')?.value.trim();
    const subjectVal = document.getElementById('subject')?.value.trim();
    const msgVal = document.getElementById('message')?.value.trim();

    if (!nameVal || !emailVal || !msgVal) {
      showToast('Please fill in all required fields.', 'err');
      return;
    }

    if (FORM_ENDPOINT && FORM_ENDPOINT.startsWith('https://')) {
      // Live submission
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending…</span>';
      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          showToast("Message sent successfully! 🚀");
          form.reset();
        } else {
          showToast("Submission failed. Opening email client...", 'err');
          window.location.href = `mailto:25005376088@skt.umt.edu.pk?subject=${encodeURIComponent(subjectVal || 'Contact Request')}&body=${encodeURIComponent(`From: ${nameVal} (${emailVal})\n\n${msgVal}`)}`;
        }
      } catch {
        showToast("Network error. Opening email client...", 'err');
        window.location.href = `mailto:25005376088@skt.umt.edu.pk?subject=${encodeURIComponent(subjectVal || 'Contact Request')}&body=${encodeURIComponent(`From: ${nameVal} (${emailVal})\n\n${msgVal}`)}`;
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Send Message</span>';
      }
    } else {
      // Fallback: Clear honest behavior (no pretending to send when endpoint not configured)
      showToast("Opening your email client to send message...");
      window.location.href = `mailto:25005376088@skt.umt.edu.pk?subject=${encodeURIComponent(subjectVal || 'Portfolio Inquiry from ' + nameVal)}&body=${encodeURIComponent(`From: ${nameVal} (${emailVal})\n\n${msgVal}`)}`;
      form.reset();
    }
  });
}

/* ─── 6. PROFILE DATA HYDRATION ──────────────────────────────────────────── */
async function loadProfileData() {
  try {
    const res = await fetch('data/profile.json');
    if (!res.ok) return;
    const data = await res.json();
    renderSkills(data.skills);
    renderCurrently(data.currently);
  } catch {
    // Graceful fallback to pre-rendered HTML markup
  }
}

function renderSkills(skills) {
  const container = document.getElementById('skills-render-container');
  if (!container || !skills) return;

  const categoryNames = {
    programming: 'Programming Languages',
    ai_ml: 'AI & Machine Learning',
    frameworks: 'Frameworks & GenAI',
    tools: 'Tools & Infrastructure'
  };

  const categoryIcons = {
    programming: 'fa-code',
    ai_ml: 'fa-brain',
    frameworks: 'fa-layer-group',
    tools: 'fa-tools'
  };

  let html = '';
  for (const [catKey, skillList] of Object.entries(skills)) {
    if (!skillList || !skillList.length) continue;
    const title = categoryNames[catKey] || catKey.toUpperCase();
    const icon = categoryIcons[catKey] || 'fa-check';

    html += `
      <div class="skill-category">
        <h4 class="skill-category-title"><i class="fas ${icon}"></i> ${escapeHtml(title)}</h4>
        <div class="skills-pills">
          ${skillList.map(s => `
            <span class="skill-pill" title="${escapeHtml(s.level || '')}">
              <i class="fas fa-check-circle"></i> ${escapeHtml(s.name)}
            </span>
          `).join('')}
        </div>
      </div>
    `;
  }

  container.innerHTML = html;
}

function renderCurrently(items) {
  const listEl = document.getElementById('currently-list');
  if (!listEl || !items || !items.length) return;

  listEl.innerHTML = items.map(item => `
    <div class="currently-item">${escapeHtml(item)}</div>
  `).join('');
}

/* ─── 7. RESUME ACTION ───────────────────────────────────────────────────── */
window.downloadResume = function() {
  showToast('Resume available upon request: 25005376088@skt.umt.edu.pk');
  setTimeout(() => {
    window.location.href = 'mailto:25005376088@skt.umt.edu.pk?subject=Resume%20Request%20-%20Umar%20Farooq';
  }, 1000);
};

/* ─── 8. TOAST SYSTEM ────────────────────────────────────────────────────── */
let toastTimeoutId = null;
function showToast(message, type = '') {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.className = `show ${type}`.trim();

  clearTimeout(toastTimeoutId);
  toastTimeoutId = setTimeout(() => {
    toast.className = '';
  }, 4200);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

