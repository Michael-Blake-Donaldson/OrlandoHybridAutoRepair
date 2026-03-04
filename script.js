const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav-links');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

document.querySelectorAll('.nav-links a, a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    nav?.classList.remove('open');
  });
});

window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('page-ready');

  const revealTargets = document.querySelectorAll('.hero, .section, .card, .service-card, .testimonial, .contact-card');
  revealTargets.forEach((item) => item.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealTargets.forEach((item) => observer.observe(item));
});