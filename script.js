// Select the hamburger icon and the nav menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.navbar ul');

// Toggle the active class on the menu when the hamburger is clicked
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Select all the navigation links
const navLinks = document.querySelectorAll('.navbar ul li a');

// Close the menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active'); // Hide the menu after selecting a link
    });
});

// Smooth Scrolling for Navbar Links
document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});

// Scroll Animations - Reset on Re-entry
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        } else {
            entry.target.classList.remove('fade-in'); // Reset effect
        }
    });
}, { threshold: 0.2 });

sections.forEach(section => {
    section.classList.add('fade-out');
    observer.observe(section);
});

// Handle Form Submission (Using Netlify Forms)
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    let name = document.getElementById('name').value.trim();
    let email = document.getElementById('email').value.trim();
    let message = document.getElementById('message').value.trim();

    if (name === "" || email === "" || message === "") {
        alert("Please fill in all fields.");
        return;
    }

    console.log("Sending Data:", { name, email, message });

    this.submit(); // Netlify will handle the form submission automatically
});

// Skills Progress Animation
document.addEventListener("DOMContentLoaded", function () {
    const skills = document.querySelectorAll(".skill");

    function animateProgress(skill, percent, reset = false) {
        let start = reset ? percent * 3.6 : 0; // Reset to full value on hover
        let end = (360 * percent) / 100;
        let speed = 15; // Adjust animation speed

        let interval = setInterval(() => {
            if ((reset && start <= 0) || (!reset && start >= end)) {
                clearInterval(interval);
            } else {
                start += reset ? -5 : 5; // Reverse on reset, forward on normal
                skill.querySelector(".outer").style.background = 
                    `conic-gradient(#00bcd4 ${start}deg, #1a237e ${start}deg)`;
            }
        }, speed);
    }

    function checkSectionVisible() {
        const section = document.getElementById("skills");
        const sectionPos = section.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (sectionPos < screenHeight - 100) {
            skills.forEach((skill) => {
                let percent = skill.getAttribute("data-percent");
                animateProgress(skill, percent);
            });
            window.removeEventListener("scroll", checkSectionVisible);
        }
    }

    // Hover Effect - Reset to 0% and animate back to full
    skills.forEach((skill) => {
        let percent = skill.getAttribute("data-percent");

        skill.addEventListener("mouseenter", function () {
            animateProgress(skill, percent, true); // Reset first
            setTimeout(() => animateProgress(skill, percent), 600); // Then reanimate
        });
    });

    window.addEventListener("scroll", checkSectionVisible);
    checkSectionVisible(); // Run immediately if already in view
});

// Project Cards Animation
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5 
    });

    projectCards.forEach(card => {
        observer.observe(card);
    });
});

// Star Animation
document.addEventListener("DOMContentLoaded", function () {
    const starsContainer = document.querySelector(".stars");

    for (let i = 0; i < 50; i++) { 
        let star = document.createElement("div");
        star.classList.add("star");

        let posX = Math.random() * 100;
        let posY = Math.random() * 100;
        let size = Math.random() * 3 + 1;
        let duration = Math.random() * 2 + 1;

        star.style.left = `${posX}%`;
        star.style.top = `${posY}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDuration = `${duration}s`;

        starsContainer.appendChild(star);
    }
});
