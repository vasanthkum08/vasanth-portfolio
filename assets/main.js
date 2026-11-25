// Debugging: Ensure script is loaded
console.log("main.js is loaded successfully.");

// Toggle navigation menu with interactive close/bars icon transition
function myMenuFunction(e) {
    if (e && e.preventDefault) {
        e.preventDefault();
    }
    var menu = document.getElementById("myNavMenu");
    var menuBtnIcon = document.querySelector(".nav-menu-btn i");

    if (menu) {
        var isOpen = menu.classList.toggle("responsive");
        if (menuBtnIcon) {
            if (isOpen) {
                menuBtnIcon.classList.remove("uil-bars");
                menuBtnIcon.classList.add("uil-times");
            } else {
                menuBtnIcon.classList.remove("uil-times");
                menuBtnIcon.classList.add("uil-bars");
            }
        }
    }
}
window.myMenuFunction = myMenuFunction;

// Initialize app logic when DOM is ready
function initApp() {
    // Navigation menu button event listener
    const menuBtn = document.querySelector(".nav-menu-btn");
    if (menuBtn) {
        menuBtn.addEventListener("click", myMenuFunction);
    }

    // Auto-close menu when clicking a link
    const navLinks = document.querySelectorAll(".nav-links, .nav-menu-list a");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            const menu = document.getElementById("myNavMenu");
            const menuBtnIcon = document.querySelector(".nav-menu-btn i");
            if (menu && menu.classList.contains("responsive")) {
                menu.classList.remove("responsive");
                if (menuBtnIcon) {
                    menuBtnIcon.classList.replace("uil-times", "uil-bars");
                }
            }
        });
    });

    // Typing effect initialization
    if (typeof Typed !== "undefined" && document.querySelector(".typedtext")) {
        try {
            new Typed(".typedtext", {
                strings: ["Developer", "Web Developer", "Designer"],
                loop: true,
                typeSpeed: 100,
                backSpeed: 80,
                backDelay: 2000
            });
        } catch (err) {
            console.error("Typed error:", err);
        }
    }

    // ScrollReveal Animations setup
    if (typeof ScrollReveal !== "undefined") {
        try {
            const isMobile = window.innerWidth <= 768;

            // Base reveal: animate once (reset: false) and avoid horizontal sway on mobile
            const sr = ScrollReveal({
                origin: isMobile ? "bottom" : "top",
                distance: isMobile ? "20px" : "40px",
                duration: 1200,
                reset: false // Animation stays fixed and stable once triggered
            });

            sr.reveal(".featured-text-card", {});
            sr.reveal(".featured-name", { delay: 100 });
            sr.reveal(".featured-text-info", { delay: 150 });
            sr.reveal(".featured-text-btn", { delay: 200 });
            sr.reveal(".social-icons", { delay: 200 });
            sr.reveal(".featured-image", { delay: 250 });
            sr.reveal(".project-box", { interval: 150 });
            sr.reveal(".top-header", {});

            // Left/Right reveal: On mobile, use bottom to prevent horizontal swaying ("agutu ingutu poitu irukku")
            const srLeft = ScrollReveal({
                origin: isMobile ? "bottom" : "left",
                distance: isMobile ? "20px" : "40px",
                duration: 1200,
                reset: false
            });

            srLeft.reveal(".about-info", { delay: 100 });
            srLeft.reveal(".contact-info", { delay: 100 });
            srLeft.reveal(".top-footer", { delay: 100 });
            srLeft.reveal(".footer-social-icons", { delay: 100 });

            const srRight = ScrollReveal({
                origin: isMobile ? "bottom" : "right",
                distance: isMobile ? "20px" : "40px",
                duration: 1200,
                reset: false
            });

            srRight.reveal(".skill-box", { delay: 100 });
            srRight.reveal(".form-control", { delay: 100 });
            srRight.reveal(".bottom-footer", { delay: 100 });
            srRight.reveal(".middle-footer", { delay: 100 });
        } catch (err) {
            console.error("ScrollReveal error:", err);
        }
    }

    // Run shadow and active-links calculations initially
    headerShadow();
    scrollActive();
}

// Scroll highlight active navigation links
function scrollActive() {
    const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    const sections = document.querySelectorAll("section[id]");

    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 120;
        const sectionId = current.getAttribute("id");
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add("active-link");
            } else {
                navLink.classList.remove("active-link");
            }
        }
    });
}

// Add shadow effect on header during scroll (without height changes to prevent jumping)
function headerShadow() {
    const navHeader = document.getElementById("header");
    const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    
    if (navHeader) {
        if (scrollTop > 20) {
            navHeader.classList.add("header-shadow");
        } else {
            navHeader.classList.remove("header-shadow");
        }
    }
}

// Consolidate scroll event listeners
window.addEventListener("scroll", () => {
    headerShadow();
    scrollActive();
});

// Ensure initApp runs safely on load
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
} else {
    initApp();
}

// AJAX Form submission listener
const contactForm = document.querySelector(".form-control");
if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const formData = new FormData(contactForm);
        fetch(contactForm.getAttribute("action") || "assets/connect.php", {
            method: "POST",
            body: formData
        })
        .then(res => res.text())
        .then(data => {
            alert("Message sent successfully!");
            contactForm.reset();
        })
        .catch(() => {
            alert("An error occurred during submission.");
        });
    });
}
