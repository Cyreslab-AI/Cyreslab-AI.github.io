document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('header');
    const scrollThreshold = 50;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - header.offsetHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Terminal animation
    animateTerminal();
    
    // Enhance glitch effect on scroll
    window.addEventListener('scroll', function() {
        const glitchElement = document.querySelector('.glitch');
        if (glitchElement) {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            
            // Intensify glitch effect based on scroll position
            if (scrollPosition < windowHeight) {
                const intensity = scrollPosition / (windowHeight / 2);
                glitchElement.style.setProperty('--glitch-intensity', Math.min(intensity, 1));
            }
        }
    });
    
    // Research card hover effects
    const researchCards = document.querySelectorAll('.research-card');
    
    researchCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const hexIcon = this.querySelector('.hex-icon');
            if (hexIcon) {
                hexIcon.style.transform = 'scale(1.1) rotate(30deg)';
                setTimeout(() => {
                    hexIcon.style.transform = 'scale(1) rotate(0deg)';
                }, 300);
            }
            
            if (this.classList.contains('deception-card')) {
                this.querySelector('.teaser-overlay').style.opacity = '1';
                
                // Add a glitch effect to the deception card text
                const cardTitle = this.querySelector('h3');
                cardTitle.classList.add('text-glitch');
                setTimeout(() => {
                    cardTitle.classList.remove('text-glitch');
                }, 1000);
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (this.classList.contains('deception-card')) {
                this.querySelector('.teaser-overlay').style.opacity = '0.8';
            }
        });
    });
    
    // Random "system alert" effect for deception card
    const deceptionCard = document.querySelector('.deception-card');
    if (deceptionCard) {
        setInterval(() => {
            const alertChance = Math.random();
            if (alertChance > 0.7) { // 30% chance of triggering
                triggerSecurityAlert(deceptionCard);
            }
        }, 10000); // Check every 10 seconds
    }
    
    // Add parallax effect to sections
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const scrollPosition = window.scrollY;
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition > sectionTop - window.innerHeight && 
                scrollPosition < sectionTop + sectionHeight) {
                const speed = section.getAttribute('data-parallax') || 0.2;
                const yPos = (scrollPosition - sectionTop) * speed;
                section.style.backgroundPositionY = yPos + 'px';
            }
        });
    });
});

// Terminal animation function
function animateTerminal() {
    const terminalBody = document.querySelector('.terminal-body');
    if (!terminalBody) return;
    
    const lines = Array.from(terminalBody.querySelectorAll('p'));
    
    // Hide all lines initially
    lines.forEach(line => {
        line.style.opacity = '0';
        line.style.transform = 'translateY(10px)';
        line.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
    
    // Show lines one by one with delay
    lines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
            
            // Add typing effect to command line
            if (line.querySelector('.terminal-command')) {
                const commandText = line.querySelector('.terminal-command').textContent;
                line.querySelector('.terminal-command').textContent = '';
                
                let i = 0;
                const typeInterval = setInterval(() => {
                    if (i < commandText.length) {
                        line.querySelector('.terminal-command').textContent += commandText.charAt(i);
                        i++;
                    } else {
                        clearInterval(typeInterval);
                    }
                }, 50);
            }
        }, 500 + (index * 700));
    });
}

// Security alert effect
function triggerSecurityAlert(element) {
    // Create alert overlay
    const alertOverlay = document.createElement('div');
    alertOverlay.classList.add('security-alert');
    alertOverlay.innerHTML = `
        <div class="alert-content">
            <div class="alert-icon">!</div>
            <div class="alert-text">UNAUTHORIZED ACCESS ATTEMPT DETECTED</div>
        </div>
    `;
    
    element.appendChild(alertOverlay);
    
    // Flash effect
    setTimeout(() => {
        alertOverlay.classList.add('flash');
        
        setTimeout(() => {
            element.removeChild(alertOverlay);
        }, 1000);
    }, 100);
}

// Add CSS for the effects defined in JS
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        header.scrolled {
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            background-color: rgba(10, 14, 23, 0.98);
        }
        
        .deception-card .teaser-overlay {
            opacity: 0.8;
            transition: opacity 0.3s ease;
        }
        
        .hex-icon {
            transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .text-glitch {
            position: relative;
            animation: textGlitch 0.5s infinite;
        }
        
        @keyframes textGlitch {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
            100% { transform: translate(0); }
        }
        
        .security-alert {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 62, 62, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10;
            opacity: 0;
            transition: opacity 0.2s ease;
        }
        
        .security-alert.flash {
            opacity: 1;
        }
        
        .alert-content {
            display: flex;
            align-items: center;
            background-color: rgba(10, 14, 23, 0.9);
            padding: 0.5rem 1rem;
            border: 1px solid #ff3e3e;
            border-radius: 4px;
        }
        
        .alert-icon {
            color: #ff3e3e;
            font-size: 1.2rem;
            font-weight: bold;
            margin-right: 0.5rem;
        }
        
        .alert-text {
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.8rem;
            color: #ff3e3e;
        }
        
        .glitch {
            --glitch-intensity: 0.5;
        }
        
        .glitch::before {
            animation-duration: calc(5s / var(--glitch-intensity, 1));
        }
        
        .glitch::after {
            animation-duration: calc(5s / var(--glitch-intensity, 1));
        }
    `;
    document.head.appendChild(style);
});
