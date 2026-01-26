// ============================================
// Navigation
// ============================================
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navLinksItems = document.querySelectorAll(".nav-links a");

// Toggle mobile menu
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close mobile menu when clicking on a link
navLinksItems.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// Navbar scroll effect
const navbar = document.querySelector(".navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.style.background = "rgba(10, 10, 15, 0.95)";
    navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.3)";
  } else {
    navbar.style.background = "rgba(10, 10, 15, 0.8)";
    navbar.style.boxShadow = "none";
  }

  lastScroll = currentScroll;
});

// Active link highlighting
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinksItems.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === current) {
      link.style.color = "#ffffff";
    } else {
      link.style.color = "";
    }
  });
});

// ============================================
// Scroll Reveal Animation
// ============================================
const revealElements = document.querySelectorAll(
  ".section-title, .skill-category, .timeline-item, .certificate-card, .cert-card, .project-card, .org-card, .about-content",
);

const revealOnScroll = () => {
  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100) {
      element.classList.add("reveal", "active");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// ============================================
// Certificate Modal Functions
// ============================================
function openCertModal(title, filePath, fileType) {
  const modal = document.getElementById("certModal");
  const modalTitle = document.getElementById("certModalTitle");
  const modalBody = document.getElementById("certModalBody");
  const downloadBtn = document.getElementById("certDownloadBtn");

  modalTitle.textContent = title;
  downloadBtn.href = filePath;

  if (fileType === "pdf") {
    modalBody.innerHTML = `
      <iframe src="${filePath}#toolbar=0&navpanes=0" title="${title}"></iframe>
    `;
  } else {
    modalBody.innerHTML = `
      <img src="${filePath}" alt="${title}" />
    `;
  }

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCertModal() {
  const modal = document.getElementById("certModal");
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

// Close modal when clicking outside
document.addEventListener("click", (e) => {
  const modal = document.getElementById("certModal");
  if (e.target === modal) {
    closeCertModal();
  }
});

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeCertModal();
  }
});

// ============================================
// Skills Progress Animation
// ============================================
const skillBars = document.querySelectorAll(".skill-progress");

const animateSkillBars = () => {
  skillBars.forEach((bar) => {
    const barTop = bar.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (barTop < windowHeight - 50) {
      const progress = bar.getAttribute("data-progress");
      bar.style.width = `${progress}%`;
    }
  });
};

window.addEventListener("scroll", animateSkillBars);
window.addEventListener("load", animateSkillBars);

// ============================================
// Smooth Scroll for Safari
// ============================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ============================================
// Stats Counter Animation
// ============================================
const statNumbers = document.querySelectorAll(".stat-number");

const animateStats = () => {
  statNumbers.forEach((stat) => {
    const statTop = stat.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (statTop < windowHeight - 50 && !stat.classList.contains("animated")) {
      stat.classList.add("animated");
      const target = parseInt(stat.textContent);
      let count = 0;
      const increment = target / 30;

      const updateCount = () => {
        if (count < target) {
          count += increment;
          stat.textContent = Math.ceil(count);
          requestAnimationFrame(updateCount);
        } else {
          stat.textContent = target;
        }
      };

      updateCount();
    }
  });
};

window.addEventListener("scroll", animateStats);
window.addEventListener("load", animateStats);

// ============================================
// Parallax Effect for Hero Section
// ============================================
const heroShape = document.querySelector(".hero-shape");

window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  if (heroShape) {
    heroShape.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

// ============================================
// Mouse Move Effect on Hero
// ============================================
const hero = document.querySelector(".hero");
const heroVisual = document.querySelector(".hero-visual");

if (hero && heroVisual) {
  hero.addEventListener("mousemove", (e) => {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 50;

    heroVisual.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
  });

  hero.addEventListener("mouseleave", () => {
    heroVisual.style.transform = "rotateY(0deg) rotateX(0deg)";
  });
}

// ============================================
// Typing Effect for Tagline (Optional)
// ============================================
const tagline = document.querySelector(".tagline");
const taglineText = tagline ? tagline.textContent : "";

const typeWriter = (element, text, speed = 100) => {
  let i = 0;
  element.textContent = "";

  const type = () => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  };

  type();
};

// Uncomment to enable typing effect
// if (tagline) {
//     setTimeout(() => typeWriter(tagline, taglineText, 80), 1000);
// }

// ============================================
// Card Tilt Effect
// ============================================
const cards = document.querySelectorAll(
  ".project-card, .certificate-card, .org-card",
);

cards.forEach((card) => {
  card.addEventListener("mouseenter", function (e) {
    this.style.transition = "transform 0.1s ease";
  });

  card.addEventListener("mousemove", function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });

  card.addEventListener("mouseleave", function () {
    this.style.transition = "transform 0.5s ease";
    this.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
  });
});

// ============================================
// Intersection Observer for Animations
// ============================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
    }
  });
}, observerOptions);

document
  .querySelectorAll(
    ".skill-category, .timeline-item, .certificate-card, .project-card, .org-card",
  )
  .forEach((el) => {
    observer.observe(el);
  });

// ============================================
// Preloader (Optional)
// ============================================
window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");

  // Trigger initial animations
  setTimeout(() => {
    revealOnScroll();
    animateSkillBars();
    animateStats();
  }, 300);
});

// ============================================
// Theme Toggle
// ============================================
const themeToggle = document.getElementById("themeToggle");
const themeOverlay = document.getElementById("themeOverlay");
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  body.classList.add("light-mode");
}

themeToggle.addEventListener("click", (e) => {
  // Get click position for radial animation
  const rect = themeToggle.getBoundingClientRect();
  const x = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
  const y = ((rect.top + rect.height / 2) / window.innerHeight) * 100;

  themeOverlay.style.setProperty("--click-x", `${x}%`);
  themeOverlay.style.setProperty("--click-y", `${y}%`);

  // Determine transition direction
  const isCurrentlyDark = !body.classList.contains("light-mode");

  // Remove previous classes
  themeOverlay.classList.remove("active", "to-light", "to-dark");

  // Add appropriate classes
  themeOverlay.classList.add(isCurrentlyDark ? "to-light" : "to-dark");

  // Trigger reflow
  void themeOverlay.offsetWidth;

  // Start animation
  themeOverlay.classList.add("active");

  // Toggle theme after a short delay for smooth transition
  setTimeout(() => {
    body.classList.toggle("light-mode");

    // Save preference
    const newTheme = body.classList.contains("light-mode") ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
  }, 150);
});

// ============================================
// Go to Top Button
// ============================================
const goToTopBtn = document.getElementById("goToTop");

// Show/hide button based on scroll position
window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const scrollProgress = (scrollTop / scrollHeight) * 100;

  // Show button after scrolling 300px
  if (scrollTop > 300) {
    goToTopBtn.classList.add("visible");
  } else {
    goToTopBtn.classList.remove("visible");
  }

  // Update progress indicator
  goToTopBtn.style.setProperty("--scroll-progress", `${scrollProgress}%`);
});

// Smooth scroll to top
goToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ============================================
// Console Easter Egg
// ============================================
console.log(
  "%c👋 Hello there, curious developer!",
  "font-size: 20px; font-weight: bold; color: #4361ee;",
);
console.log(
  "%c✨ Thanks for checking out my portfolio!",
  "font-size: 14px; color: #7209b7;",
);
console.log(
  "%c📧 Feel free to reach out if you want to connect!",
  "font-size: 14px; color: #9d4edd;",
);
