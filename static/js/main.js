const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
});

navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

const skillObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll(".skill-fill").forEach((bar) => {
                    const level = bar.dataset.level + "%";
                    bar.style.setProperty("--level", level);
                    bar.classList.add("animated");
                });
                skillObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.3 }
);

const skillsSection = document.getElementById("skills");
if (skillsSection) {
    skillObserver.observe(skillsSection);
}

const fadeObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    },
    { threshold: 0.1 }
);

document.querySelectorAll(".about-card, .project-card").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    fadeObserver.observe(el);
});
