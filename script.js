// Scroll-based navbar hide/show
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  const whyChooseUsElement = document.querySelector('h2.section-title');
  if (!whyChooseUsElement) return;

  const scrollPosition = window.scrollY;
  const whyChooseUsTop = whyChooseUsElement.offsetTop;

  if (scrollPosition > whyChooseUsTop) {
    // Hide navbar when scrolled past "Why Choose Us"
    nav.style.transform = 'translateY(-100%)';
    nav.style.transition = 'transform 0.3s ease-in-out';
  } else {
    // Show navbar when before "Why Choose Us"
    nav.style.transform = 'translateY(0)';
    nav.style.transition = 'transform 0.3s ease-in-out';
  }
});

// Mobile scroll animation for feature cards
if (window.innerWidth <= 768) {
  const featureCards = document.querySelectorAll('.feature-card');
  let hasAnimated = false;

  window.addEventListener('scroll', () => {
    if (hasAnimated) return;

    const firstCard = featureCards[0];
    if (!firstCard) return;

    const cardRect = firstCard.getBoundingClientRect();
    const triggerPoint = window.innerHeight * 0.75;

    if (cardRect.top < triggerPoint) {
      hasAnimated = true;
      featureCards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('scroll-animate');
        }, index * 150);
      });
    }
  });
}

// Testimonials Carousel
let currentTestimonial = 0;
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const totalTestimonials = testimonialSlides.length;
let autoRotateInterval;

function initTestimonialDots() {
  const dotsContainer = document.getElementById('dotsContainer');
  dotsContainer.innerHTML = '';
  for (let i = 0; i < totalTestimonials; i++) {
    const dot = document.createElement('button');
    dot.className = `testimonial-dot ${i === 0 ? 'active' : ''}`;
    dot.onclick = () => goToTestimonial(i);
    dotsContainer.appendChild(dot);
  }
}

function updateTestimonial() {
  const wrapper = document.getElementById('testimonialsWrapper');
  wrapper.style.transform = `translateX(-${currentTestimonial * 100}%)`;
  
  document.querySelectorAll('.testimonial-dot').forEach((dot, index) => {
    dot.classList.toggle('active', index === currentTestimonial);
  });
}

function moveTestimonial(direction) {
  currentTestimonial = (currentTestimonial + direction + totalTestimonials) % totalTestimonials;
  updateTestimonial();
  resetAutoRotate();
}

function goToTestimonial(index) {
  currentTestimonial = index;
  updateTestimonial();
  resetAutoRotate();
}

function autoRotateTestimonials() {
  autoRotateInterval = setInterval(() => {
    moveTestimonial(1);
  }, 5000);
}

function resetAutoRotate() {
  clearInterval(autoRotateInterval);
  autoRotateTestimonials();
}

// Initialize testimonials
initTestimonialDots();
autoRotateTestimonials();

// Stop auto-rotate on interaction
document.getElementById('prevBtn').addEventListener('mouseenter', () => clearInterval(autoRotateInterval));
document.getElementById('nextBtn').addEventListener('mouseenter', () => clearInterval(autoRotateInterval));
document.getElementById('prevBtn').addEventListener('mouseleave', resetAutoRotate);
document.getElementById('nextBtn').addEventListener('mouseleave', resetAutoRotate);

// Animate process slabs on scroll
const processSlabs = document.querySelectorAll('.process-slab');
const slabObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

processSlabs.forEach(slab => {
  slabObserver.observe(slab);
});


function navigateTo(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  
  document.getElementById(`${page}-page`).classList.add('active');
  document.querySelector(`[data-page="${page}"]`).classList.add('active');
  
  window.location.hash = page;
}

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const page = e.target.getAttribute('data-page');
    navigateTo(page);
  });
});

// Tab switching functionality
document.querySelectorAll('.tab-button').forEach(button => {
  button.addEventListener('click', (e) => {
    const category = e.target.getAttribute('data-category');
    
    // Update active tab button
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    // Show corresponding content
    document.querySelectorAll('.category-content').forEach(content => content.classList.remove('active'));
    document.getElementById(category).classList.add('active');
    
  });
});

document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById('success-message').style.display = 'block';
  e.target.reset();
  setTimeout(() => {
    document.getElementById('success-message').style.display = 'none';
  }, 5000);
});

/*
  Dynamic Showcase Loader
  - Expects optional manifests at `/<category>/index.json` containing an array of tile names, e.g. ["Carrara White","Nero Marquina"]
  - If a manifest exists the script will render tiles using `<category>/<tileName>.webp` as the image path (URL-encoded).
  - If no manifest is found, the script leaves the static HTML examples intact.
  - Create folders `granite`, `indian`, `imported` at the project root and place `.webp` files named exactly after tile names.
*/

async function fetchManifest(category) {
  try {
    const res = await fetch(`./${category}/index.json`, { cache: 'no-cache' });
    if (!res.ok) throw new Error('manifest missing');
    const data = await res.json();
    if (!Array.isArray(data)) throw new Error('invalid manifest');
    return data;
  } catch (err) {
    return null;
  }
}

const badgeTypes = ['Premium', 'Luxury', 'Signature', 'Classic', 'Exclusive', 'Modern', 'Popular'];
let badgeIndex = 0;

function capitalizeWords(str) {
  return str
    .split(/[\s-]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function buildTileElement(category, tileName) {
  const wrapper = document.createElement('div');
  wrapper.className = 'tile-showcase';

  const badge = document.createElement('span');
  badge.className = 'tile-badge';
  badge.textContent = badgeTypes[badgeIndex % badgeTypes.length];
  badgeIndex++;
  wrapper.appendChild(badge);

  const pattern = document.createElement('div');
  pattern.className = 'tile-pattern';
  // set a light placeholder background while we preload the real image
  pattern.style.background = 'linear-gradient(135deg, #E5E5E5 0%, #CCCCCC 100%)';
  wrapper.appendChild(pattern);

  const capitalizedName = capitalizeWords(tileName);
  const overlay = document.createElement('div');
  overlay.className = 'tile-overlay';
  const h3 = document.createElement('h3');
  h3.className = 'tile-showcase-name';
  h3.textContent = capitalizedName;
  const p = document.createElement('p');
  p.className = 'tile-showcase-desc';
  p.textContent = capitalizedName;
  overlay.appendChild(h3);
  overlay.appendChild(p);
  wrapper.appendChild(overlay);

  // Preload actual image and apply if available
  const imgPath = `./${category}/${encodeURIComponent(tileName)}.webp`;
  const img = new Image();
  img.onload = () => {
    pattern.style.backgroundImage = `url('${imgPath}')`;
    pattern.style.backgroundSize = 'cover';
    pattern.style.backgroundPosition = 'center';
  };
  img.onerror = () => {
    // keep placeholder; optionally mark as missing
    badge.textContent = 'Preview';
  };
  img.src = imgPath;

  return wrapper;
}

async function renderCategory(category, containerSelector) {
  const manifest = await fetchManifest(category);
  const container = document.querySelector(`#${containerSelector} .masonry-grid`);
  if (!container) return;

  if (!manifest) {
    // no manifest found — do not remove static examples but log for developer
    console.info(`No manifest for ${category} — leaving static showcase in place.`);
    return;
  }

  // Clear existing static tiles
  container.innerHTML = '';

  manifest.forEach(name => {
    const tileEl = buildTileElement(category, name);
    container.appendChild(tileEl);
  });
}

// Initialize dynamic loading for all three categories
document.addEventListener('DOMContentLoaded', () => {
  renderCategory('indian marble', 'indian');
  renderCategory('imported marble', 'imported');
  renderCategory('granite', 'granite');
});
