AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const lightIcon = document.getElementById('lightIcon');
const darkIcon = document.getElementById('darkIcon');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    lightIcon.classList.add('d-none');
    darkIcon.classList.remove('d-none');
}

// Dark mode toggle functionality
darkModeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        lightIcon.classList.add('d-none');
        darkIcon.classList.remove('d-none');
        localStorage.setItem('theme', 'dark');
    } else {
        lightIcon.classList.remove('d-none');
        darkIcon.classList.add('d-none');
        localStorage.setItem('theme', 'light');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar-custom');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Add parallax effect to gradient backgrounds
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.gradient-bg');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stats-value');
    
    counters.forEach(counter => {
        const target = counter.innerText;
        const isPercentage = target.includes('%');
        const isPlus = target.includes('+');
        const numericValue = parseInt(target.replace(/[^0-9]/g, ''));
        
        let count = 0;
        const increment = numericValue / 50;
        
        const updateCounter = () => {
            if (count < numericValue) {
                count += increment;
                counter.innerText = Math.ceil(count) + (isPercentage ? '%' : (isPlus ? '+' : ''));
                setTimeout(updateCounter, 30);
            } else {
                counter.innerText = target;
            }
        };
        
        // Trigger animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Initialize counter animation
animateCounters();

// Add hover effect to cards
document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Typing effect for hero title (optional enhancement)
function typeEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const text = heroTitle.innerText;
    heroTitle.innerText = '';
    let index = 0;
    
    function type() {
        if (index < text.length) {
            heroTitle.innerText += text.charAt(index);
            index++;
            setTimeout(type, 50);
        }
    }
    
    // Uncomment to enable typing effect
    // setTimeout(type, 500);
}

// Initialize all effects
document.addEventListener('DOMContentLoaded', function() {
    // Optional: Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});