// smooth scrolling

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

//Email sent
document.addEventListener("DOMContentLoaded", function () {
  emailjs.init("CUBpDJ-RYb_8dDSfx");

  const form = document.getElementById("contact-form");
  const submitBtn = document.getElementById("submit-btn");
  const statusMessage = document.getElementById("form-status");
  const pageLoader = document.getElementById("page-loader");

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
        statusMessage.textContent = "Failed to send message. Please try again.";
        statusMessage.classList.add("error");
      })
      .finally(() => {
        submitBtn.classList.remove("loading");
        submitBtn.disabled = false;
        pageLoader.classList.add("hidden");
      });
  });
});

//Typing in the top
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

const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  if (document.body.classList.contains("light-mode")) {
    themeToggle.textContent = "☀️";
  } else {
    themeToggle.textContent = "🌙";
  }
});

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");

menuBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  navLinks.classList.toggle("active");
});

/* close menu when clicking a nav link */
navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

/* close menu when clicking outside */
document.addEventListener("click", (e) => {
  if (
    navLinks.classList.contains("active") &&
    !navLinks.contains(e.target) &&
    !menuBtn.contains(e.target)
  ) {
    navLinks.classList.remove("active");
  }
});

/* optional: close menu when screen becomes desktop */
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navLinks.classList.remove("active");
  }
});

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

// project fetching for now

async function fetchGitHubProjects() {
  const projectGrid = document.getElementById("project-grid");
  if (!projectGrid) return;

  projectGrid.innerHTML = `<p class="projects-loading">Loading projects...</p>`;

  try {
    const response = await fetch(
      "https://api.github.com/users/KLEOJAHOLLARI/repos?sort=updated&per_page=6",
    );

    if (!response.ok) {
      throw new Error("Failed to fetch repositories");
    }

    const repos = await response.json();

    const filteredRepos = repos.filter((repo) => !repo.fork);

    if (filteredRepos.length === 0) {
      projectGrid.innerHTML = `<p class="projects-loading">No public projects found.</p>`;
      return;
    }

    projectGrid.innerHTML = filteredRepos
      .map(
        (repo) => `
      <div class="project-card">
        <div class="project-card-content">
          <h3>${repo.name}</h3>
          <p>${repo.description ? repo.description : "No description available for this project yet."}</p>

          <div class="tech">
            <span>${repo.language ? repo.language : "Code Project"}</span>
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
    projectGrid.innerHTML = `<p class="projects-loading">Unable to load GitHub projects right now.</p>`;
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  fetchGitHubProjects();

  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
      fetchGitHubProjects(this.dataset.filter);
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  fetchGitHubProjects();
});
