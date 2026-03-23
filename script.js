// Navbar scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Add animation classes and observe elements
document.querySelectorAll(
  '.about-text, .about-image, .amenity-card, .location-info, .location-map, ' +
  '.gallery-item, .highlight-card, .booking-card'
).forEach(el => {
  el.classList.add('animate-on-scroll');
  observer.observe(el);
});

// Add CSS for animations dynamically
const style = document.createElement('style');
style.textContent = `
  .animate-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
  .animate-on-scroll.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .amenity-card.animate-on-scroll { transition-delay: calc(var(--i, 0) * 0.08s); }
  .gallery-item.animate-on-scroll { transition-delay: calc(var(--i, 0) * 0.08s); }
  .highlight-card.animate-on-scroll { transition-delay: calc(var(--i, 0) * 0.1s); }
`;
document.head.appendChild(style);

// Stagger animations for grid items
document.querySelectorAll('.amenity-card').forEach((el, i) => el.style.setProperty('--i', i));
document.querySelectorAll('.gallery-item').forEach((el, i) => el.style.setProperty('--i', i));
document.querySelectorAll('.highlight-card').forEach((el, i) => el.style.setProperty('--i', i));

// Smooth scroll for anchor links (fallback for browsers without CSS scroll-behavior)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
