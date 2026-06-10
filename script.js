/* ==========================================
   PUTHIYON TECHNOLOGIES — script.js
   ========================================== */


/* ── LIVE DATE & TIME IN NAVBAR ── */
function updateDateTime() {
  const now = new Date();

  const days   = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const dateStr = ${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]}, ${now.getFullYear()};

  let hours   = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  const ampm  = hours >= 12 ? 'pm' : 'am';

  hours = hours % 12 || 12;

  const timeStr = ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${ampm};

  const el = document.getElementById('nav-datetime');
  if (el) el.textContent = ${dateStr} | ${timeStr};
}

updateDateTime();
setInterval(updateDateTime, 1000);


/* ── SMOOTH SCROLL TO CONTACT (used by pricing buttons) ── */
function scrollToContact() {
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
}


/* ── CONTACT FORM SUBMISSION ── */
function handleFormSubmit() {
  const name        = document.getElementById('name').value.trim();
  const email       = document.getElementById('email').value.trim();
  const phone       = document.getElementById('phone').value.trim();
  const projectType = document.getElementById('project-type').value;
  const message     = document.getElementById('message').value.trim();

  // Basic validation
  if (!name) {
    alert('Please enter your name.');
    return;
  }
  if (!email || !email.includes('@')) {
    alert('Please enter a valid email address.');
    return;
  }
  if (!message) {
    alert('Please tell us about your project.');
    return;
  }

  // Success — in a real project, send this data to a backend or email service
  console.log('Form submitted:', { name, email, phone, projectType, message });

  alert(Thank you, ${name}! We have received your message and will get back to you within 24 hours.);

  // Clear the form
  document.getElementById('name').value        = '';
  document.getElementById('email').value       = '';
  document.getElementById('phone').value       = '';
  document.getElementById('project-type').value = '';
  document.getElementById('message').value     = '';
}


/* ── SCROLL ANIMATION: fade-in cards on scroll ── */
function initScrollAnimations() {
  const cards = document.querySelectorAll(
    '.service-card, .project-card, .team-card, .price-card, .testi-card, .tech-pill'
  );

  // Set initial state
  cards.forEach(card => {
    card.style.opacity    = '0';
    card.style.transform  = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger the animation slightly for each card
        setTimeout(() => {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => observer.observe(card));
}

// Run after DOM loads
document.addEventListener('DOMContentLoaded', initScrollAnimations);


/* ── ACTIVE NAV LINK HIGHLIGHT ON SCROLL ── */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === #${id}
            ? 'var(--blue)'
            : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(sec => observer.observe(sec));
}

document.addEventListener('DOMContentLoaded', initActiveNav);


/* ── MOBILE: hamburger menu toggle (optional, if you add a hamburger button) ──
   Uncomment this block and add <button class="hamburger">☰</button> to your nav HTML

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }
});
*/