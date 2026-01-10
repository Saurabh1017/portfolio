// ==========================================
// PORTFOLIO WEBSITE - BEGINNER DEVELOPER
// JavaScript for Interactive Features
// ==========================================

// ==========================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Close mobile menu if open
      const navMenu = document.querySelector(".nav-menu");
      if (navMenu && navMenu.style.display === "flex") {
        navMenu.style.display = "none";
      }
    }
  });
});

// ==========================================
// SCROLL REVEAL ANIMATION
// ==========================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, observerOptions);

// Observe all reveal items
document.querySelectorAll(".reveal-item").forEach((el) => {
  observer.observe(el);
});

// ==========================================
// HAMBURGER MENU TOGGLE
// ==========================================

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

if (hamburger) {
  hamburger.addEventListener("click", function () {
    if (navMenu.style.display === "flex") {
      navMenu.style.display = "none";
      document.body.style.overflow = "auto";
    } else {
      navMenu.style.display = "flex";
      navMenu.style.position = "fixed";
      navMenu.style.top = "60px";
      navMenu.style.left = "0";
      navMenu.style.right = "0";
      navMenu.style.width = "100%";
      navMenu.style.flexDirection = "column";
      navMenu.style.gap = "0";
      navMenu.style.background = "rgba(10, 14, 39, 0.99)";
      navMenu.style.borderTop = "1px solid var(--border-color)";
      navMenu.style.zIndex = "998";
      navMenu.style.maxHeight = "calc(100vh - 60px)";
      navMenu.style.overflowY = "auto";
      document.body.style.overflow = "hidden";
    }
  });

  // Close menu when a link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.style.display = "none";
      document.body.style.overflow = "auto";
    });
  });
}

// ==========================================
// ACTIVE NAVIGATION LINK HIGHLIGHTING
// ==========================================

window.addEventListener("scroll", function () {
  let current = "";
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active");
      link.style.color = "var(--primary-color)";
    } else {
      link.style.color = "var(--text-secondary)";
    }
  });
});

// ==========================================
// CONTACT FORM HANDLING
// ==========================================

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const formInputs = this.querySelectorAll(".form-input");
    const name = formInputs[0].value.trim();
    const email = formInputs[1].value.trim();
    const message = formInputs[2].value.trim();

    // Simple validation
    if (!name || !email || !message) {
      showFormFeedback("Please fill in all fields.", "error");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFormFeedback("Please enter a valid email address.", "error");
      return;
    }

    // Success message
    showFormFeedback(
      "Thank you for your message! I'll get back to you soon.",
      "success"
    );

    // Clear form
    this.reset();
  });
}

// ==========================================
// FORM FEEDBACK MESSAGE
// ==========================================

function showFormFeedback(message, type) {
  // Remove existing feedback if any
  const existingFeedback = document.querySelector(".form-feedback");
  if (existingFeedback) {
    existingFeedback.remove();
  }

  // Create feedback element
  const feedback = document.createElement("div");
  feedback.className = "form-feedback";
  feedback.textContent = message;
  feedback.style.cssText = `
        padding: 12px 16px;
        margin-bottom: 16px;
        border-radius: 8px;
        font-size: 0.875rem;
        font-weight: 500;
        animation: slideDown 300ms ease-out;
        ${
          type === "success"
            ? "background: rgba(76, 175, 80, 0.1); border: 1px solid #4CAF50; color: #4CAF50;"
            : "background: rgba(244, 67, 54, 0.1); border: 1px solid #f44336; color: #f44336;"
        }
    `;

  // Add feedback before form
  const form = document.getElementById("contactForm");
  form.parentNode.insertBefore(feedback, form);

  // Remove feedback after 4 seconds
  setTimeout(() => {
    feedback.style.animation = "slideUp 300ms ease-out";
    setTimeout(() => feedback.remove(), 300);
  }, 4000);
}

// ==========================================
// SMOOTH ANIMATIONS FOR SKILL BARS
// ==========================================

// Animate skill bars when they come into view
const skillCards = document.querySelectorAll(".skill-card");
const skillObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const skillFill = entry.target.querySelector(".skill-fill");
        if (skillFill) {
          // Trigger animation
          skillFill.style.animation = "fillWidth 1s ease-out forwards";
        }
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

skillCards.forEach((card) => skillObserver.observe(card));

// ==========================================
// 3D CUBE INTERACTION
// ==========================================

const cube = document.querySelector(".cube");
let rotateX = 0;
let rotateY = 0;

document.addEventListener("mousemove", (e) => {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  const angleX = (e.clientY - centerY) * 0.05;
  const angleY = (e.clientX - centerX) * 0.05;

  if (cube) {
    cube.style.animation = "none";
    cube.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
  }
});

document.addEventListener("mouseleave", () => {
  if (cube) {
    cube.style.animation = "rotateCube 10s infinite linear";
  }
});

// ==========================================

window.addEventListener("resize", function () {
  if (window.innerWidth > 768) {
    if (navMenu) {
      navMenu.style.display = "flex";
      navMenu.style.position = "static";
      navMenu.style.background = "transparent";
      navMenu.style.borderTop = "none";
    }
  }
});

// ==========================================
// LAZY LOADING IMAGES (if added in future)
// ==========================================

if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// ==========================================
// PAGE LOAD INITIALIZATION
// ==========================================

console.log("Portfolio website loaded. Welcome! 👋");

// Optional: Add custom greeting in console
console.log(
  "%c Thanks for visiting my portfolio!",
  "font-size: 16px; color: #00d4ff; font-weight: bold;"
);
