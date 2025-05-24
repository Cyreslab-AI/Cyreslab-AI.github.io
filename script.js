// Minimalist JavaScript for cyreslab.ai

document.addEventListener('DOMContentLoaded', function() {
    // Initialize smooth animations
    initScrollAnimations();

    // Initialize navigation behavior
    initNavigation();

    // Initialize subtle interactions
    initInteractions();
});

// Scroll-triggered animations
function initScrollAnimations() {
    // Only run if user prefers motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.pillar, .about-text, .contact-content');
    animatedElements.forEach(el => observer.observe(el));
}

// Navigation behavior
function initNavigation() {
    const nav = document.querySelector('.nav');
    let lastScrollY = window.scrollY;

    // Add scroll effect to navigation
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Add/remove nav background based on scroll position
        if (currentScrollY > 50) {
            nav.style.backgroundColor = 'rgba(250, 250, 250, 0.98)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.backgroundColor = 'rgba(250, 250, 250, 0.95)';
            nav.style.boxShadow = 'none';
        }

        lastScrollY = currentScrollY;
    });

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const navHeight = nav.offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Subtle interactions
function initInteractions() {
    // Logo hover effect
    const logoMain = document.querySelector('.logo-main');
    if (logoMain) {
        logoMain.addEventListener('mouseenter', () => {
            logoMain.style.transform = 'scale(1.05) rotate(2deg)';
        });

        logoMain.addEventListener('mouseleave', () => {
            logoMain.style.transform = 'scale(1) rotate(0deg)';
        });
    }

    // Contact link subtle animation
    const contactLink = document.querySelector('.contact-link');
    if (contactLink) {
        contactLink.addEventListener('mouseenter', () => {
            const icon = contactLink.querySelector('.contact-icon svg');
            if (icon) {
                icon.style.transform = 'translateX(5px)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });

        contactLink.addEventListener('mouseleave', () => {
            const icon = contactLink.querySelector('.contact-icon svg');
            if (icon) {
                icon.style.transform = 'translateX(0)';
            }
        });
    }

    // Pillar hover enhancements
    const pillars = document.querySelectorAll('.pillar');
    pillars.forEach(pillar => {
        pillar.addEventListener('mouseenter', () => {
            const icon = pillar.querySelector('.pillar-icon svg');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });

        pillar.addEventListener('mouseleave', () => {
            const icon = pillar.querySelector('.pillar-icon svg');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
}

// Scroll indicator interaction
document.addEventListener('DOMContentLoaded', function() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const pillarsSection = document.querySelector('.pillars');
            if (pillarsSection) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = pillarsSection.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });

        // Add cursor pointer to indicate it's clickable
        scrollIndicator.style.cursor = 'pointer';
    }
});

// Performance optimization: throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events for better performance
window.addEventListener('scroll', throttle(() => {
    // Any scroll-based animations can be added here if needed
}, 16)); // ~60fps
