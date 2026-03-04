const header = document.querySelector('.site-header');
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links a');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    nav?.classList.remove('open');
  });
});

window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('page-ready');

  const revealTargets = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealTargets.forEach((item) => revealObserver.observe(item));

  const sectionMap = new Map();
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      const section = document.querySelector(href);
      if (section) {
        sectionMap.set(section, link);
      }
    }
  });

  if (sectionMap.size > 0) {
    const activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((item) => item.classList.remove('active'));
            const activeLink = sectionMap.get(entry.target);
            activeLink?.classList.add('active');
          }
        });
      },
      { rootMargin: '-40% 0px -45% 0px', threshold: 0.01 }
    );

    sectionMap.forEach((_value, key) => activeObserver.observe(key));
  }

  const parallaxItems = document.querySelectorAll('[data-parallax]');
  const runParallax = () => {
    const scrollY = window.scrollY;
    parallaxItems.forEach((item) => {
      const speed = Number(item.getAttribute('data-parallax')) || 0.12;
      item.style.transform = `translateY(${scrollY * speed}px)`;
    });
  };

  runParallax();
  window.addEventListener('scroll', runParallax, { passive: true });
});

window.addEventListener('scroll', () => {
  if (!header) {
    return;
  }

  if (window.scrollY > 16) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
