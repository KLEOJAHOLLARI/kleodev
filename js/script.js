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
const projects = [
  {
    title: "Portfolio Website",
    description:
      "A personal developer portfolio built with HTML, CSS, and JavaScript.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/yourusername/portfolio",
    demo: "https://your-demo-link.com",
    image: "images/project1.jpg",
    category: "web",
  },
  {
    title: "Task Manager",
    description: "A web app for managing daily tasks with CRUD functionality.",
    tech: ["Angular", "TypeScript", "CSS"],
    github: "https://github.com/yourusername/task-manager",
    demo: "https://your-demo-link.com",
    image: "images/project2.jpg",
    category: "angular",
  },
  {
    title: "Student Database",
    description: "A Java and SQL application for managing student records.",
    tech: ["Java", "SQL"],
    github: "https://github.com/yourusername/student-database",
    demo: "https://your-demo-link.com",
    image: "images/project3.jpg",
    category: "java",
  },
  {
    title: "AI Study Assistant",
    description:
      "A simple assistant project focused on AI-related ideas and productivity.",
    tech: ["JavaScript", "AI"],
    github: "https://github.com/yourusername/ai-assistant",
    demo: "https://your-demo-link.com",
    image: "images/project4.jpg",
    category: "ai",
  },
];

function renderProjects(filter = "all") {
  const projectGrid = document.getElementById("project-grid");
  if (!projectGrid) return;

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  projectGrid.innerHTML = filteredProjects
    .map((project) => {
      const techTags = project.tech
        .map((item) => `<span>${item}</span>`)
        .join("");

      return `
      <div class="project-card">
        <img src="${project.image}" alt="${project.title}">
        <h3>${project.title}</h3>
        <p>${project.description}</p>

        <div class="tech">
          ${techTags}
        </div>

        <div class="links">
          <a href="${project.github}" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="${project.demo}" target="_blank" rel="noopener noreferrer">Live Demo</a>
        </div>
      </div>
    `;
    })
    .join("");
}

document.addEventListener("DOMContentLoaded", function () {
  renderProjects();

  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
      renderProjects(this.dataset.filter);
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  renderProjects();
});
