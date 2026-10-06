const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.documentElement;
const header = document.querySelector('.site-header');
const progress = document.querySelector('.progress span');
const glow = document.querySelector('.cursor-glow');
const heroWords = [...document.querySelectorAll('.hero-title .word')];
const contactWords = [...document.querySelectorAll('.contact-title .line span')];
const year = document.getElementById('year');
year.textContent = new Date().getFullYear();

function intro() {
  if (prefersReduced) {
    heroWords.forEach(el => el.style.transform = 'none');
    return;
  }
  heroWords.forEach((el, i) => {
    el.animate([
      { transform: 'translateY(115%)' },
      { transform: 'translateY(0)' }
    ], {
      duration: 1050,
      delay: 140 + i * 115,
      easing: 'cubic-bezier(.22,.8,.2,1)',
      fill: 'forwards'
    });
  });
}

window.addEventListener('load', intro, { once: true });

const observer = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  }
}, { threshold: .16 });

document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));

const contactObserver = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (!entry.isIntersecting || prefersReduced) continue;
    contactWords.forEach((el, i) => {
      el.animate([
        { transform: 'translateY(115%)' },
        { transform: 'translateY(0)' }
      ], {
        duration: 950,
        delay: i * 110,
        easing: 'cubic-bezier(.22,.8,.2,1)',
        fill: 'forwards'
      });
    });
    contactObserver.disconnect();
  }
}, { threshold: .35 });
const contactTitle = document.querySelector('.contact-title');
contactObserver.observe(contactTitle);

function onScroll() {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  header.classList.toggle('scrolled', y > 40);

  if (!prefersReduced) {
    const orbit = document.querySelector('.hero-orbit');
    if (orbit) orbit.style.transform = `translate3d(0, ${Math.min(y * .12, 90)}px, 0) rotate(${y * .025}deg)`;

    document.querySelectorAll('.project-card').forEach(card => {
      const r = card.getBoundingClientRect();
      const visual = card.querySelector('.project-visual');
      const centerDelta = (r.top + r.height * .5 - window.innerHeight * .5) / window.innerHeight;
      if (visual) visual.style.transform = `translateY(${centerDelta * -12}px)`;
    });

    const scrub = document.querySelector('[data-scrub]');
    if (scrub) {
      const r = scrub.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, 1 - r.top / window.innerHeight));
      scrub.style.transform = `translateX(${(1 - p) * -18}px)`;
      scrub.style.opacity = `${.55 + p * .45}`;
    }
  }
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

window.addEventListener('pointermove', e => {
  if (!glow) return;
  glow.style.opacity = '1';
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
}, { passive: true });

if (!prefersReduced && window.matchMedia('(hover:hover)').matches) {
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('pointermove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - .5;
      const y = (e.clientY - rect.top) / rect.height - .5;
      const visual = card.querySelector('.project-visual');
      if (visual) visual.style.transform = `rotateX(${y * -1.7}deg) rotateY(${x * 2.2}deg)`;
    });
    card.addEventListener('pointerleave', () => {
      const visual = card.querySelector('.project-visual');
      if (visual) visual.style.transform = '';
    });
  });

  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('pointermove', e => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate(${x * .10}px, ${y * .10}px)`;
    });
    el.addEventListener('pointerleave', () => {
      el.style.transform = '';
    });
  });
}

// Keep anchor jumps aligned beneath the floating navigation.
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top, behavior: prefersReduced ? 'auto' : 'smooth' });
  });
});
