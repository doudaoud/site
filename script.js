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

// --- DYNAMIC COURSE DATA & LOGIC ---
const courseData = {
  english: {
    title: "Formation Anglais",
    flag: "🇺🇸/🇬🇧",
    image:
      "https://images.unsplash.com/photo-1526304640152-d4619684e484?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Maîtrisez la langue internationale par excellence.",
    longDesc:
      "<p>Notre formation en anglais est conçue pour vous propulser vers une fluidité totale. Nous combinons des méthodes interactives avec une immersion culturelle pour vous donner confiance en toutes situations.</p><br><p>Que vous soyez débutant absolu ou que vous souhaitiez perfectionner votre accent, nos modules s'adaptent à votre rythme. Vous aurez accès à des ressources exclusives, des ateliers de conversation et un suivi personnalisé par des professeurs natifs.</p>",
    benefits: [
      "Accès à une plateforme e-learning 24/7",
      "Groupes de conversation hebdomadaires",
      "Préparation aux certifications officielles",
      "Cours dispensés par des natifs",
    ],
    meta: [
      { icon: "fa-layer-group", text: "Niveau : Débutant à Avancé" },
      { icon: "fa-clock", text: "Durée : 12 semaines (Modulable)" },
      { icon: "fa-graduation-cap", text: "Certification : TOEFL / IELTS" },
    ],
    program: [
      {
        title: "Bases & Grammaire",
        desc: "Consolidation des acquis fondamentaux et structures de phrases.",
      },
      {
        title: "Conversation & Écoute",
        desc: "Pratique intensive de l'oral avec des locuteurs natifs.",
      },
      {
        title: "Anglais Professionnel",
        desc: "Vocabulaire spécifique au monde des affaires et rédaction d'emails.",
      },
    ],
  },
  french: {
    title: "Formation Français",
    flag: "🇫🇷",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Perfectionnez votre français, langue de la diplomatie.",
    longDesc:
      "<p>Le français est bien plus qu'une langue : c'est une ouverture sur l'art, la gastronomie et la diplomatie internationale. Notre programme vise l'excellence académique et culturelle.</p><br><p>À travers des analyses de textes, des débats d'actualité et des exercices de rédaction, vous affinerez votre style et votre compréhension des nuances de la langue de Molière.</p>",
    benefits: [
      "Ateliers d'écriture créative",
      "Sorties culturelles (virtuelles ou réelles)",
      "Focus sur le français diplomatique",
      "Correction détaillée de vos production écrites",
    ],
    meta: [
      { icon: "fa-layer-group", text: "Niveau : A1 à C2" },
      { icon: "fa-clock", text: "Durée : 12 semaines" },
      { icon: "fa-book", text: "Focus : Culture & Littérature" },
    ],
    program: [
      {
        title: "Phonétique & Prononciation",
        desc: "Maîtriser les sons complexes de la langue française.",
      },
      {
        title: "Expression Écrite",
        desc: "Rédaction de textes structurés et administratifs.",
      },
      {
        title: "Culture & Société",
        desc: "Immersion dans l'histoire et l'actualité française.",
      },
    ],
  },
  german: {
    title: "Formation Allemand",
    flag: "🇩🇪",
    image:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "L'allemand, moteur économique de l'Europe.",
    longDesc:
      "<p>L'allemand est souvent perçu comme difficile, mais notre méthode structurée rend l'apprentissage logique et gratifiant. Idéal pour les ingénieurs, les commerciaux et les passionnés d'histoire.</p><br><p>Nous mettons l'accent sur la construction de phrases solides et le vocabulaire technique, tout en explorant la richesse de la culture germanophone moderne.</p>",
    benefits: [
      "Méthode structurée et logique",
      "Vocabulaire technique et commercial",
      "Partenariats avec des entreprises allemandes",
      "Préparation au Goethe-Zertifikat",
    ],
    meta: [
      { icon: "fa-layer-group", text: "Niveau : Débutant à Intermédiaire" },
      { icon: "fa-clock", text: "Durée : 14 semaines" },
      { icon: "fa-briefcase", text: "Focus : Allemand Technique/Pro" },
    ],
    program: [
      {
        title: "Grammaire Allemande",
        desc: "Compréhension des déclinaisons et de la syntaxe.",
      },
      {
        title: "Allemand des Affaires",
        desc: "Négociation et communication en entreprise.",
      },
      {
        title: "Préparation Goethe-Zertifikat",
        desc: "Entraînement spécifique aux examens officiels.",
      },
    ],
  },
  spanish: {
    title: "Formation Espagnol",
    flag: "🇪🇸",
    image:
      "https://images.unsplash.com/photo-1547756536-cde3673fa2e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "L'espagnol, une langue solaire et mondiale.",
    longDesc:
      "<p>Parlez avec plus de 500 millions de personnes ! Notre cours d'espagnol est vivant, dynamique et axé sur la communication orale immédiate. Oubliez les manuels poussiéreux.</p><br><p>Nous utilisons la musique, le cinéma et l'actualité latino-américaine pour rendre chaque leçon passionnante. Vous serez capable de tenir une conversation dès les premières semaines.</p>",
    benefits: [
      "Apprentissage par la musique et le cinéma",
      "Focus sur l'Espagnol d'Amérique Latine et d'Espagne",
      "Ambiance détendue et interactive",
      "Ateliers de cuisine hispanique",
    ],
    meta: [
      { icon: "fa-layer-group", text: "Niveau : Tous niveaux" },
      { icon: "fa-clock", text: "Durée : 10 semaines" },
      { icon: "fa-sun", text: "Ambiance : Dynamique & Ludique" },
    ],
    program: [
      {
        title: "Bases de la Conversation",
        desc: "Se débrouiller au quotidien et en voyage.",
      },
      {
        title: "Grammaire & Conjugaison",
        desc: "Maîtriser les verbes irréguliers et le subjonctif.",
      },
      {
        title: "Culture Hispanique",
        desc: "Découverte des traditions d'Espagne et d'Amérique Latine.",
      },
    ],
  },
  chinese: {
    title: "Formation Chinois",
    flag: "🇨🇳",
    image:
      "https://images.unsplash.com/photo-1543096222-72de739f7917?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Le Mandarin, un atout majeur pour l'avenir.",
    longDesc:
      "<p>Apprendre le chinois est un défi intellectuel stimulant qui transforme votre façon de penser. Nous démystifions les caractères et les tons pour rendre la langue accessible.</p><br><p>Nos professeurs expérimentés utilisent des mnémotechniques éprouvées pour l'apprentissage des Hanzi (caractères) et insistent sur une prononciation impeccable dès le début.</p>",
    benefits: [
      "Initiation à la calligraphie",
      "Compréhension de la culture d'affaires chinoise",
      "Méthode mnémotechnique pour les caractères",
      "Préparation au HSK",
    ],
    meta: [
      { icon: "fa-layer-group", text: "Niveau : HSK 1 à 4" },
      { icon: "fa-clock", text: "Durée : 16 semaines" },
      { icon: "fa-font", text: "Focus : Caractères & Tons" },
    ],
    program: [
      {
        title: "Pinyin & Tons",
        desc: "Maîtrise de la prononciation correcte.",
      },
      {
        title: "Caractères (Hanzi)",
        desc: "Lecture et écriture des caractères essentiels.",
      },
      {
        title: "Conversation courante",
        desc: "Échanges simples de la vie quotidienne.",
      },
    ],
  },
  arabic: {
    title: "Formation Arabe",
    flag: "🇸🇦",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "L'Arabe, une langue d'histoire et d'avenir.",
    longDesc:
      "<p>Découvrez la beauté de la langue arabe, de la calligraphie à la poésie. Nous enseignons l'Arabe Moderne Standard (littéraire) pour vous permettre de lire et comprendre les médias de tout le monde arabe.</p><br><p>Nous introduisons aussi des bases de dialectes (Levantin ou Maghrébin) pour faciliter la communication orale au quotidien.</p>",
    benefits: [
      "Apprentissage de l'alphabet (Abjad)",
      "Initiation aux dialectes régionaux",
      "Découverte de la littérature arabe",
      "Cours de calligraphie inclus",
    ],
    meta: [
      { icon: "fa-layer-group", text: "Niveau : Débutant à Avancé" },
      { icon: "fa-clock", text: "Durée : 15 semaines" },
      { icon: "fa-pen-nib", text: "Focus : Calligraphie & Écrture" },
    ],
    program: [
      {
        title: "Alphabet & Écriture",
        desc: "Apprentissage de l'alphabet arabe et de la lecture.",
      },
      {
        title: "Arabe Moderne Standard",
        desc: "Communication formelle et médias.",
      },
      {
        title: "Dialectes (Levant/Maghreb)",
        desc: "Introduction aux variations régionales.",
      },
    ],
  },
};

function loadCourseData() {
  const params = new URLSearchParams(window.location.search);
  const courseId = params.get("id");
  const data = courseData[courseId];

  if (!data) {
    if (document.getElementById("course-title"))
      document.getElementById("course-title").innerText =
        "Formation introuvable";
    return;
  }

  document.title = `${data.title} - Global Learn School`;

  if (document.getElementById("course-title"))
    document.getElementById("course-title").innerText = data.title;
  if (document.getElementById("course-flag"))
    document.getElementById("course-flag").innerText = data.flag;
  if (document.getElementById("course-description"))
    document.getElementById("course-description").innerText = data.description;
  if (document.getElementById("course-image"))
    document.getElementById("course-image").src = data.image;

  if (document.getElementById("course-long-desc") && data.longDesc) {
    document.getElementById("course-long-desc").innerHTML = data.longDesc;
  }

  const benefitsContainer = document.getElementById("course-benefits");
  if (benefitsContainer && data.benefits) {
    benefitsContainer.innerHTML = "";
    data.benefits.forEach((benefit) => {
      const li = document.createElement("li");
      li.style.marginBottom = "10px";
      li.innerHTML = `<i class="fas fa-check-circle" style="color: var(--primary-color); margin-right: 10px;"></i> ${benefit}`;
      benefitsContainer.appendChild(li);
    });
  }

  const metaContainer = document.getElementById("course-meta");
  if (metaContainer) {
    metaContainer.innerHTML = "";
    data.meta.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `<i class="fas ${item.icon}"></i> ${item.text}`;
      metaContainer.appendChild(li);
    });
  }

  const programContainer = document.getElementById("course-program");
  if (programContainer) {
    programContainer.innerHTML = "";
    programContainer.className = "program-timeline"; // Switch to timeline class

    data.program.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "timeline-item fade-in";
      // Add staggered delay style manually since it's dynamic
      div.style.transitionDelay = `${index * 200}ms`;

      div.innerHTML = `
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <h3>Module ${index + 1} : ${item.title}</h3>
                    <p>${item.desc}</p>
                </div>
            `;
      programContainer.appendChild(div);
    });

    // Trigger observer for these new elements
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    programContainer
      .querySelectorAll(".timeline-item")
      .forEach((el) => observer.observe(el));
  }

  // TRIGGER VISIBILITY FOR STATIC ELEMENTS (Fix for empty page)
  // Ensure the hero elements are visible immediately after loading data
  setTimeout(() => {
    const hiddenElements = document.querySelectorAll(
      ".course-hero .fade-in, .card.fade-in, .section-title.fade-in"
    );
    hiddenElements.forEach((el) => el.classList.add("visible"));
  }, 100);
}

// --- PAGE TRANSITION LOGIC ---
document.addEventListener("DOMContentLoaded", () => {
  // 1. Create Overlay
  const overlay = document.createElement("div");
  overlay.className = "page-overlay";
  document.body.appendChild(overlay);

  // 2. Intercept Links using Event Delegation
  document.body.addEventListener("click", (e) => {
    const link = e.target.closest("a");

    // If clicked a link that is local and not an anchor link
    if (
      link &&
      link.href &&
      link.target !== "_blank" &&
      !link.href.includes("#")
    ) {
      const targetUrl = link.href;

      // Check if it's same domain
      if (
        targetUrl.startsWith(window.location.origin) ||
        targetUrl.includes("file://")
      ) {
        e.preventDefault();

        // Swipe Up Animation
        overlay.classList.add("cover");

        // Wait for animation then navigate
        setTimeout(() => {
          window.location.href = targetUrl;
        }, 600); // Matches CSS transition time
      }
    }
  });

  // 3. Page Enter Animation (Reverse)
  // Actually, the overlay starts transformed Y(100%), so the page is visible.
  // If we wanted an "Uncover" effect, we'd need the overlay to start at Y(0) and move to Y(-100%).
  // For simplicity with this code, we just do the "Exit" animation (Swipe Up).
  // The new page loads fresh.
});
