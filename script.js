// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Initialize theme from localStorage or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', savedTheme);
updateToggleIcon(savedTheme);

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleIcon(newTheme);
});

// Update the toggle icon based on current theme
function updateToggleIcon(theme) {
    themeToggle.innerHTML = theme === 'dark' 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
}

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Typing Animation
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["Data Analyst", "Data Scientist", "Business Intelligence Analyst", "Data Storyteller"];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } 
    else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } 
    else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if(textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(type, newTextDelay + 250);
});

// Scroll Animations
function animateOnScroll() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + window.innerHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition > sectionTop + sectionHeight * 0.3) {
            section.classList.add('show-animate');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Animate Skill Bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.progress');
    
    skillBars.forEach(bar => {
        const skillLevel = bar.parentElement.previousElementSibling.lastElementChild.textContent;
        bar.style.width = skillLevel;
    });
}

// Use Intersection Observer for skill bars
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('#skills').forEach(section => {
    observer.observe(section);
});

// Highlight Active Nav Link on Scroll
function highlightNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNav);

// Back to Top Button
const footerTop = document.querySelector('.footer-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        footerTop.classList.add('active');
    } else {
        footerTop.classList.remove('active');
    }
});

// Update Copyright Year
document.getElementById('year').textContent = new Date().getFullYear();

// ===== FORMSPREE FORM HANDLING (CHOOSE ONE OPTION) =====

// OPTION 1: Use Formspree with alert (Recommended)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        try {
            const response = await fetch(this.action, {
                method: 'POST',
                body: new FormData(this),
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                alert('Thank you for your message! I will get back to you soon.');
                this.reset();
            } else {
                alert('Something went wrong. Please try again.');
            }
        } catch (error) {
            alert('Network error. Please try again.');
        }
    });
}

// OPTION 2: Remove JavaScript and let Formspree handle everything
// (Just delete all form submission JavaScript if you want Formspree default behavior)

// ===== Timeline Navigation =====
const timelineBtns = document.querySelectorAll('.timeline-btn');
const timelines = document.querySelectorAll('.timeline');

// Initialize first timeline as active
if (timelineBtns.length > 0 && timelines.length > 0) {
    timelineBtns[0].classList.add('active');
    timelines[0].classList.add('active');
    
    // Timeline Navigation
    timelineBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const timelineType = btn.dataset.timeline;
            
            // Update active button
            timelineBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Show selected timeline
            timelines.forEach(timeline => {
                timeline.classList.remove('active');
                if (timeline.classList.contains(`${timelineType}-timeline`)) {
                    timeline.classList.add('active');
                }
            });
        });
    });
}
