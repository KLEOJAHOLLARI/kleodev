document.addEventListener("DOMContentLoaded", function () {
  // smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // navbar active link on scroll
  const sections = document.querySelectorAll("section[id]");
  const navAnchors = document.querySelectorAll(".nav-links a");

  function updateActiveNavLink() {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navAnchors.forEach((link) => {
      link.classList.remove("active");

      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  }

  // EmailJS form
  emailjs.init("CUBpDJ-RYb_8dDSfx");

  const form = document.getElementById("contact-form");
  const submitBtn = document.getElementById("submit-btn");
  const statusMessage = document.getElementById("form-status");
  const pageLoader = document.getElementById("page-loader");

  if (form && submitBtn && statusMessage && pageLoader) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      submitBtn.classList.add("loading");
      submitBtn.disabled = true;
      pageLoader.classList.remove("hidden");

      statusMessage.textContent = "";
      statusMessage.className = "form-status";

      emailjs
        .sendForm("service_3lpy5b8", "template_k53ozgo", form)
        .then(() => {
          statusMessage.textContent = "Message sent successfully ✓";
          statusMessage.classList.add("success");
          form.reset();
        })
        .catch(() => {
          statusMessage.textContent =
            "Failed to send message. Please try again.";
          statusMessage.classList.add("error");
        })
        .finally(() => {
          submitBtn.classList.remove("loading");
          submitBtn.disabled = false;
          pageLoader.classList.add("hidden");
        });
    });
  }

  // typing effect
  if (document.querySelector(".typing")) {
    new Typed(".typing", {
      strings: [
        "Web Developer",
        "Angular Developer",
        "Computer Science Student",
        "AI Enthusiast",
      ],
      typeSpeed: 60,
      backSpeed: 40,
      loop: true,
    });
  }

  // theme toggle
  const themeToggle = document.getElementById("theme-toggle");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");

      if (document.body.classList.contains("light-mode")) {
        themeToggle.textContent = "☀️";
      } else {
        themeToggle.textContent = "🌙";
      }
    });
  }

  // mobile menu
  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-links a");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      navLinks.classList.toggle("active");
    });

    navItems.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });

    document.addEventListener("click", (e) => {
      if (
        navLinks.classList.contains("active") &&
        !navLinks.contains(e.target) &&
        !menuBtn.contains(e.target)
      ) {
        navLinks.classList.remove("active");
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        navLinks.classList.remove("active");
      }
    });
  }

  // scroll reveal
  if (typeof ScrollReveal !== "undefined") {
    ScrollReveal().reveal(".hero-text", {
      delay: 200,
      distance: "40px",
      origin: "left",
    });

    ScrollReveal().reveal(".skill", {
      interval: 100,
    });

    ScrollReveal().reveal(".project-card", {
      interval: 150,
    });

    ScrollReveal().reveal(".experience-card", {
      interval: 150,
    });

    ScrollReveal().reveal(".testimonial-card", {
      interval: 150,
    });
  }

  // GitHub projects with filtering
  let githubRepos = [];

  async function fetchGitHubProjects(filter = "all") {
    const projectGrid = document.getElementById("project-grid");
    if (!projectGrid) return;

    projectGrid.innerHTML = `<p class="projects-loading">Loading projects...</p>`;

    try {
      if (githubRepos.length === 0) {
        const response = await fetch(
          "https://api.github.com/users/KLEOJAHOLLARI/repos?sort=updated&per_page=20",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }

        const repos = await response.json();
        githubRepos = repos.filter((repo) => !repo.fork);
      }

      let filteredRepos = githubRepos;

      if (filter !== "all") {
        filteredRepos = githubRepos.filter((repo) => {
          const language = repo.language ? repo.language.toLowerCase() : "";
          const name = repo.name ? repo.name.toLowerCase() : "";
          const description = repo.description
            ? repo.description.toLowerCase()
            : "";

          if (filter === "web") {
            return ["html", "css", "javascript", "typescript"].includes(
              language,
            );
          }

          if (filter === "angular") {
            return (
              language === "typescript" ||
              name.includes("angular") ||
              description.includes("angular")
            );
          }

          if (filter === "java") {
            return language === "java";
          }

          if (filter === "ai") {
            return name.includes("ai") || description.includes("ai");
          }

          return true;
        });
      }

      if (filteredRepos.length === 0) {
        projectGrid.innerHTML = `<p class="projects-loading">No matching projects found.</p>`;
        return;
      }

      projectGrid.innerHTML = filteredRepos
        .map(
          (repo) => `
            <div class="project-card">
              <div class="project-card-content">
                <h3>${repo.name}</h3>
                <p>${repo.description || "No description available for this project yet."}</p>

                <div class="tech">
                  <span>${repo.language || "Code Project"}</span>
                  <span>GitHub Repo</span>
                </div>

                <div class="links">
                  <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">GitHub</a>
                  ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" rel="noopener noreferrer">Live Demo</a>` : ""}
                </div>
              </div>
            </div>
          `,
        )
        .join("");
    } catch (error) {
      const projectGrid = document.getElementById("project-grid");
      if (projectGrid) {
        projectGrid.innerHTML = `<p class="projects-loading">Unable to load GitHub projects right now.</p>`;
      }
      console.error(error);
    }
  }

  fetchGitHubProjects();

  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
      fetchGitHubProjects(this.dataset.filter);
    });
  });

  // scroll progress + back to top + active nav
  const scrollProgress = document.getElementById("scroll-progress");
  const backToTopBtn = document.getElementById("back-to-top");

  function handleScrollUI() {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (scrollProgress) {
      scrollProgress.style.width = `${scrollPercent}%`;
    }

    if (backToTopBtn) {
      if (scrollTop > 300) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    }

    updateActiveNavLink();
  }

  window.addEventListener("scroll", handleScrollUI);
  handleScrollUI();

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});

//avaiable
const counters = document.querySelectorAll(".counter");
let countersStarted = false;

function animateCounters() {
  const statsSection = document.querySelector(".stats");
  if (!statsSection || countersStarted) return;

  const sectionTop = statsSection.getBoundingClientRect().top;
  const triggerPoint = window.innerHeight - 100;

  if (sectionTop < triggerPoint) {
    counters.forEach((counter) => {
      const target = Number(counter.getAttribute("data-target"));
      let current = 0;
      const increment = Math.max(1, Math.ceil(target / 60));

      const updateCounter = () => {
        current += increment;

        if (current >= target) {
          counter.textContent = `${target}+`;
        } else {
          counter.textContent = `${current}+`;
          requestAnimationFrame(updateCounter);
        }
      };

      updateCounter();
    });

    countersStarted = true;
  }
}
animateCounters();
