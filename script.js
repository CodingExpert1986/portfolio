const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Open navigation" : "Close navigation",
    );
    siteNav.classList.toggle("is-open", !isOpen);
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      siteNav.classList.remove("is-open");
    }
  });
}

const filterButtons = document.querySelectorAll("[data-filter]");
const projectCards = document.querySelectorAll(".project-card[data-category]");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });
    projectCards.forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

const projectDetails = {
  "bean-scene": {
    title: "Bean Scene",
    description:
      "A coffee shop concept built around a distinctive visual identity, an easy-to-scan menu, and a friendly responsive experience. The original project pages are still available from the project folder.",
    tags: ["Brand website", "Responsive layout", "HTML & CSS", "JavaScript"],
  },
  goodform: {
    title: "Goodform Goods",
    description:
      "An ecommerce concept for useful, well-made home objects. A warm product palette, clear product storytelling, and a simple path from discovery to checkout keep the shopping experience focused.",
    tags: ["Ecommerce", "Shopify", "Product storytelling", "Accessibility"],
  },
  northline: {
    title: "Northline Studio",
    description:
      "An editorial portfolio concept for a small architecture practice. Oversized type, considered imagery, and responsive layouts help the work take center stage on every screen.",
    tags: [
      "Studio website",
      "Art direction",
      "Responsive design",
      "Performance",
    ],
  },
};

const projectDialog = document.querySelector("#project-dialog");
if (projectDialog) {
  document.querySelectorAll("[data-project]").forEach((button) => {
    button.addEventListener("click", () => {
      const project = projectDetails[button.dataset.project];
      if (!project) return;

      projectDialog.querySelector("#dialog-title").textContent = project.title;
      projectDialog.querySelector("#dialog-description").textContent =
        project.description;
      const tags = projectDialog.querySelector("#dialog-tags");
      tags.replaceChildren(
        ...project.tags.map((tag) => {
          const element = document.createElement("span");
          element.textContent = tag;
          return element;
        }),
      );
      projectDialog.showModal();
    });
  });

  projectDialog
    .querySelector(".dialog-contact")
    .addEventListener("click", () => {
      projectDialog.close();
    });
}

const contactForm = document.querySelector("#contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const subject = `Project inquiry from ${formData.get("name")}`;
    const body = `${formData.get("message")}\n\nFrom: ${formData.get("name")}\nEmail: ${formData.get("email")}`;
    const recipient = "hello@example.com";
    document.querySelector("#form-note").textContent =
      `Opening an email draft to ${recipient}.`;
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

const currentYear = document.querySelector("#current-year");
if (currentYear) currentYear.textContent = String(new Date().getFullYear());

function registerUser(userData) {
  alert(`Account created successfully for ${userData.name}!`);
  window.location.href = "login.html";
}

function loginUser(loginData) {
  alert("Login attempted successfully!");
}
