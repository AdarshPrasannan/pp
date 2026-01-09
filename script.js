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
    if (themeToggle) {
        themeToggle.innerHTML = theme === 'dark' 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
    }
}

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navContainer = document.querySelector('.nav-container');

if (hamburger && navContainer) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navContainer.classList.toggle('active');
        
        // Prevent body scrolling when menu is open
        if (navContainer.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navContainer.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (hamburger && navContainer) {
            if (!hamburger.contains(e.target) && !navContainer.contains(e.target) && navContainer.classList.contains('active')) {
                hamburger.classList.remove('active');
                navContainer.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });
}

// Typing Animation
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

if (typedTextSpan && cursorSpan) {
    const textArray = ["Data Analyst", "Business Intelligence Analyst", "Data Storyteller"];
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
        if (typedTextSpan && cursorSpan) {
            setTimeout(type, newTextDelay + 250);
        }
    });
}

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
if (document.querySelector('#skills')) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('#skills').forEach(section => {
        observer.observe(section);
    });
}

// Highlight Active Nav Link on Scroll
function highlightNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 150) {
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

// Throttle the scroll event for better performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(highlightNav, 100);
});

// Back to Top Button
const footerTop = document.querySelector('.footer-top');

if (footerTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            footerTop.classList.add('active');
        } else {
            footerTop.classList.remove('active');
        }
    });
    
    // Scroll to top when clicked
    footerTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Update Copyright Year
const yearElement = document.getElementById('year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

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

// ===== Formspree Form Handling =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        // Only prevent default if form has Formspree action
        if (this.action.includes('formspree')) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            try {
                // Show loading state
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
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
            } finally {
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        }
    });
}

// Add smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#" or external link
        if (href === '#' || href.includes('http')) return;
        
        e.preventDefault();
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            window.scrollTo({
                top: targetElement.offsetTop - headerHeight,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (hamburger && navContainer && navContainer.classList.contains('active')) {
                hamburger.classList.remove('active');
                navContainer.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });
});

// ===== Initialize on Load =====
window.addEventListener('load', () => {
    // Initialize animations
    animateOnScroll();
    
    // Initialize current year
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Initialize active nav link
    highlightNav();
    
    // Check if skills section is already in viewport and animate
    const skillsSection = document.querySelector('#skills');
    if (skillsSection && isElementInViewport(skillsSection)) {
        animateSkillBars();
    }
});

// Helper function to check if element is in viewport
function isElementInViewport(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Close mobile menu on ESC key press
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburger && navContainer && navContainer.classList.contains('active')) {
        hamburger.classList.remove('active');
        navContainer.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Keep Header Always Visible
const header = document.querySelector('header');
if (header) {
    // Force header to always be visible
    header.style.transform = 'translateY(0)';
    
    // Remove any scroll-based transformations
    window.addEventListener('scroll', () => {
        header.style.transform = 'translateY(0)';
    });
}

// ===== Form Input Validation =====
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
if (formInputs.length > 0) {
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = '#ff6b6b';
            } else {
                this.style.borderColor = '';
            }
        });
        
        input.addEventListener('input', function() {
            this.style.borderColor = '';
        });
    });
}

// ===== Performance Optimization =====
// Debounce resize events
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recalculate any layout-dependent values
        if (navContainer && navContainer.classList.contains('active')) {
            // Close mobile menu on resize to desktop
            if (window.innerWidth > 768) {
                hamburger.classList.remove('active');
                navContainer.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    }, 250);
});
