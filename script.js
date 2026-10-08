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
      "A warm, responsive digital home for an independent neighborhood coffee shop, with a distinctive visual identity and an easy-to-scan menu.",
    tags: ["Brand website", "Responsive layout", "HTML & CSS", "JavaScript"],
  },
  "xtra-logistic": {
    title: "Xtra Logistic",
    description:
      "A responsive logistics platform for shipment tracking, service information, customer inquiries, and administrative operations.",
    tags: ["Logistics", "Shipment tracking", "Responsive design", "React"],
  },
  stonewise: {
    title: "Stonewise Construction",
    description:
      "A responsive construction company website presenting building services, company information, and contact details across desktop and mobile.",
    tags: [
      "Construction",
      "Service information",
      "Responsive design",
      "Business website",
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
    const recipient = "codingexpert1986@gmail.com";
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
