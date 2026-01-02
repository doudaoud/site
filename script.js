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

  // --- 3D Tilt Effect for Language Cards ---
  const cards = document.querySelectorAll(".language-card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate rotation based on mouse position
      // Center of card is (width/2, height/2)
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Rotate X around Y axis (horizontal mouse movement causes rotation around Y)
      // Rotate Y around X axis (vertical mouse movement causes rotation around X)
      // Limit rotation to +/- 10 degrees
      const rotateX = ((y - centerY) / centerY) * -10; // Invert to tilt towards mouse
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    card.addEventListener("mouseleave", () => {
      // Reset transform
      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
      card.style.transition = "transform 0.5s ease"; // Smooth reset
    });

    card.addEventListener("mouseenter", () => {
      // Remove transition during movement for instant response
      card.style.transition = "none";
    });
  });

  // --- Staggered Animations ---
  // Apply delays to children of grids for nicer entrance
  const grids = document.querySelectorAll(
    ".languages-grid, .features-grid, .testimonials-grid, .cards-grid"
  );
  grids.forEach((grid) => {
    const children = grid.children;
    Array.from(children).forEach((child, index) => {
      // Add a delay based on index (max out at some point to avoid waiting too long)
      const delay = (index % 4) * 150; // 0, 150, 300, 450...
      child.style.transitionDelay = `${delay}ms`;
    });
  });

  // --- Typing Effect for Hero Title ---
  const heroTitle = document.querySelector(".hero-content h1");
  if (heroTitle) {
    // We'll preserve the original HTML structure (breaks) by parsing it
    // Or we can simplify: "Apprenez le monde. Parlez l'avenir."
    // Let's do a simple text replacement for the effect to be robust.

    const text1 = "Apprenez le monde.";
    const text2 = "Parlez l'avenir.";

    // Clear content
    heroTitle.innerHTML =
      '<span class="line-1"></span><br /><span class="line-2"></span>';
    heroTitle.classList.add("typing-cursor");

    const line1Conf = { text: text1, el: heroTitle.querySelector(".line-1") };
    const line2Conf = { text: text2, el: heroTitle.querySelector(".line-2") };

    async function typeText(element, text, speed = 100) {
      for (let i = 0; i < text.length; i++) {
        element.textContent += text.charAt(i);
        await new Promise((r) => setTimeout(r, speed));
      }
    }

    // Sequence the typing
    setTimeout(async () => {
      await typeText(line1Conf.el, line1Conf.text, 80);
      await new Promise((r) => setTimeout(r, 400)); // Pause between lines
      await typeText(line2Conf.el, line2Conf.text, 80);
      heroTitle.classList.remove("typing-cursor"); // Remove cursor at end
    }, 500); // Start delay
  }

  // --- Gradient Text Application ---
  // Apply the class to section titles for the shine effect
  document.querySelectorAll(".section-title h2").forEach((el) => {
    el.classList.add("gradient-text");
  });
});
