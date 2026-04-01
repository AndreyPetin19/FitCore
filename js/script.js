document.addEventListener("DOMContentLoaded", () => {
  highlightActivePage();
  setupForms();
  revealOnScroll();
  setupButtonsEffect();
  createScrollTopButton();
});

function highlightActivePage() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav a");

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("active-link");
    }
  });
}

function setupForms() {
  const authForms = document.querySelectorAll(".auth-form");

  authForms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const pageName = window.location.pathname.split("/").pop();

      if (pageName === "login.html") {
        const email = form.querySelector('input[type="email"]').value.trim();
        const password = form.querySelector('input[type="password"]').value.trim();

        if (!email || !password) {
          alert("Пожалуйста, заполните все поля.");
          return;
        }

        alert("Вход выполнен успешно! (демо-режим)");
        form.reset();
      }

      if (pageName === "register.html") {
        const inputs = form.querySelectorAll("input");
        const name = inputs[0].value.trim();
        const email = inputs[1].value.trim();
        const password = inputs[2].value.trim();
        const confirmPassword = inputs[3].value.trim();

        if (!name || !email || !password || !confirmPassword) {
          alert("Пожалуйста, заполните все поля.");
          return;
        }

        if (password.length < 6) {
          alert("Пароль должен содержать минимум 6 символов.");
          return;
        }

        if (password !== confirmPassword) {
          alert("Пароли не совпадают.");
          return;
        }

        alert("Регистрация прошла успешно! (демо-режим)");
        form.reset();
      }
    });
  });
}

function revealOnScroll() {
  const elements = document.querySelectorAll(
    ".feature-card, .program-card, .trainer-card, .pricing-card, .cta-box, .schedule-table-wrapper, .stat-card"
  );

  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show-element");
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  elements.forEach((element) => {
    element.classList.add("hidden-element");
    observer.observe(element);
  });
}

function setupButtonsEffect() {
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.add("btn-clicked");

      setTimeout(() => {
        button.classList.remove("btn-clicked");
      }, 200);
    });
  });
}

function createScrollTopButton() {
  const scrollBtn = document.createElement("button");
  scrollBtn.innerHTML = "↑";
  scrollBtn.className = "scroll-top-btn";
  document.body.appendChild(scrollBtn);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add("show-scroll-btn");
    } else {
      scrollBtn.classList.remove("show-scroll-btn");
    }
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}