const buttons = document.querySelectorAll("[data-scroll]");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(button.dataset.scroll);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealElements.forEach((el) => observer.observe(el));

const contactForm = document.querySelector(".contact-form");
const formNote = document.querySelector(".form-note");

if (contactForm && formNote) {
  const emailjsPublicKey = "P9RcPiZ8R4YHRacnj";
  const emailjsServiceId = "service_z18dogo";
  const emailjsTemplateId = "template_sfkhzci";

  if (window.emailjs) {
    window.emailjs.init({ publicKey: emailjsPublicKey });
  }

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    formNote.textContent = "Sending...";

    try {
      if (!window.emailjs) {
        throw new Error("EmailJS not loaded");
      }

      await window.emailjs.send(emailjsServiceId, emailjsTemplateId, payload);

      formNote.textContent = "Message sent. Thank you!";
      contactForm.reset();
    } catch (error) {
      formNote.textContent = "Message failed. Please email me directly.";
    }
  });
}
