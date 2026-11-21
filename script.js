
// ==============================
// MOBILE NAVIGATION
// ==============================

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");

        const isOpen = navMenu.classList.contains("active");

        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.classList.toggle("active", isOpen);
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}


// ==============================
// AUTOMATIC COPYRIGHT YEAR
// ==============================

const currentYear = document.getElementById("current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


// ==============================
// SMOOTH SCROLLING
// ==============================

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            event.preventDefault();

            targetSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});


// CONTACT FORM - WEB3FORMS
const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formStatus = document.getElementById("form-status");
        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        const originalButtonText = submitButton.innerHTML;

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        if (formStatus) {
            formStatus.textContent = "";
        }

        try {
            const formData = new FormData(contactForm);

            const response = await fetch(
                "https://api.web3forms.com/submit",
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        Accept: "application/json"
                    }
                }
            );

            const result = await response.json();

            if (response.ok && result.success) {
                formStatus.textContent =
                    "Thank you! Your message has been sent successfully.";

                contactForm.reset();
            } else {
                formStatus.textContent =
                    result.message ||
                    "Something went wrong. Please try again.";
            }
        } catch (error) {
            formStatus.textContent =
                "Unable to send your message. Please check your internet connection and try again.";
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }
    });
}
