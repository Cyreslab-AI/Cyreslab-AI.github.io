document.addEventListener('DOMContentLoaded', function() {
    // Terminal animation
    animateTerminal();
    
    // Logo animation enhancements
    const logoSymbol = document.querySelector('.logo-symbol');
    if (logoSymbol) {
        // Add subtle rotation on hover
        logoSymbol.addEventListener('mouseenter', function() {
            const svgElement = this.querySelector('svg');
            if (svgElement) {
                svgElement.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        logoSymbol.addEventListener('mouseleave', function() {
            const svgElement = this.querySelector('svg');
            if (svgElement) {
                svgElement.style.transform = '';
            }
        });
    }
    
    // Random security alerts
    setInterval(() => {
        const alertChance = Math.random();
        if (alertChance > 0.85) { // 15% chance of triggering
            triggerSecurityAlert();
        }
    }, 8000); // Check every 8 seconds
    
    // Add subtle movement to the page on mouse move
    document.addEventListener('mousemove', function(e) {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
    
    // Button hover effect
    const button = document.querySelector('.button');
    if (button) {
        button.addEventListener('mouseenter', function() {
            const textElement = this.querySelector('.button-text');
            if (textElement) {
                const originalText = textElement.textContent;
                const scrambledText = scrambleText(originalText);
                
                textElement.textContent = scrambledText;
                
                setTimeout(() => {
                    textElement.textContent = originalText;
                }, 300);
            }
        });
    }
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
function triggerSecurityAlert() {
    // Create alert overlay
    const alertOverlay = document.createElement('div');
    alertOverlay.classList.add('security-alert');
    alertOverlay.innerHTML = `
        <div class="alert-content">
            <div class="alert-icon">!</div>
            <div class="alert-text">UNAUTHORIZED ACCESS ATTEMPT DETECTED</div>
        </div>
    `;
    
    document.body.appendChild(alertOverlay);
    
    // Flash effect
    setTimeout(() => {
        alertOverlay.classList.add('flash');
        
        setTimeout(() => {
            document.body.removeChild(alertOverlay);
        }, 1000);
    }, 100);
}

// Text scramble function
function scrambleText(text) {
    const chars = '!<>-_\\/[]{}—=+*^?#________';
    let result = '';
    
    for (let i = 0; i < text.length; i++) {
        if (Math.random() < 0.3) {
            result += text[i];
        } else {
            result += chars[Math.floor(Math.random() * chars.length)];
        }
    }
    
    return result;
}

// Add CSS for the effects defined in JS
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .hero-content {
            transition: transform 0.2s ease-out;
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
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 62, 62, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.2s ease;
            pointer-events: none;
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
        
        .logo-symbol svg {
            transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
    `;
    document.head.appendChild(style);
});
