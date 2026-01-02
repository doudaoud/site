// DOMContentLoaded to ensure elements are ready
document.addEventListener("DOMContentLoaded", () => {
  // Sticky Navbar
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("sticky");
    } else {
      navbar.classList.remove("sticky");
    }
  });

  // Theme Toggle
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;
  const icon = themeToggle.querySelector("i");

  // Check for saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  }

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    } else {
      localStorage.setItem("theme", "light");
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }
  });

  // Fade-in Animation Observer
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const fadeElements = document.querySelectorAll(".fade-in");
  fadeElements.forEach((el) => observer.observe(el));

  // Form Submission Simulation
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      const data = {};
      formData.forEach((value, key) => (data[key] = value));

      // Simulate sending
      const btn = contactForm.querySelector("button");
      const originalText = btn.innerText;
      btn.innerText = "Envoi en cours...";
      btn.disabled = true;

      setTimeout(() => {
        console.log("Formulaire envoyé avec succès:", data);
        alert(
          `Merci ${data.name} ! Votre message a bien été envoyé. (Simulation)`
        );
        contactForm.reset();
        btn.innerText = originalText;
        btn.disabled = false;
      }, 1500);
    });
  }

  // Smooth Scroll triggers active state updates (Optional enhancement)
  // Mobile Menu Toggle (Basic implementation)
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    // Optional: Toggle icon between bars and times (close)
    const icon = hamburger.querySelector("i");
    if (navLinks.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      const icon = hamburger.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    });
  });
});
