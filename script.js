// Smooth scroll on navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe product cards and feature items
document.querySelectorAll('.product-card, .feature-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.gradient-orb');
    
    parallaxElements.forEach((el, index) => {
        const factor = 0.5 + (index * 0.1);
        el.style.transform = `translateY(${scrolled * factor}px)`;
    });

    // Update navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (scrolled > 50) {
        navbar.style.background = 'rgba(26, 26, 46, 0.98)';
    } else {
        navbar.style.background = 'rgba(26, 26, 46, 0.95)';
    }
});

// Cursor glow effect
document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    // Optional: Add cursor tracking for interactive elements
    document.querySelectorAll('.product-card, .feature-item').forEach(el => {
        const rect = el.getBoundingClientRect();
        const elX = rect.left + rect.width / 2;
        const elY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt((x - elX) ** 2 + (y - elY) ** 2);
        
        if (distance < 200) {
            el.style.boxShadow = `0 ${20 + distance / 10}px ${50 - distance / 5}px rgba(232, 181, 71, ${0.3 - distance / 600})`;
        }
    });
});

// CTA Button interaction
document.querySelector('.cta-button').addEventListener('click', () => {
    const productsSection = document.getElementById('products');
    productsSection.scrollIntoView({ behavior: 'smooth' });
});

// Product button interactions
document.querySelectorAll('.product-button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const card = this.closest('.product-card');
        const productName = card.querySelector('h3').textContent;
        
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.background = 'rgba(232, 181, 71, 0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'rippleEffect 0.6s ease-out';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
        
        // Show alert
        setTimeout(() => {
            alert(`You selected: ${productName}\n\nRedirecting to product details...`);
        }, 300);
    });
});

// Contact form submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input').value;
    
    if (email) {
        // Success animation
        const submitBtn = this.querySelector('.submit-button');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '✓ Success!';
        submitBtn.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = 'linear-gradient(135deg, #e8b547, #d4a037)';
            this.reset();
        }, 2000);
    }
});

// Add ripple effect keyframe dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleEffect {
        to {
            transform: scale(20);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Performance: Lazy load images if any
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Add page load animation
window.addEventListener('load', () => {
    document.body.style.animation = 'pageLoad 0.6s ease-out';
});

// Page load animation keyframe
const pageLoadStyle = document.createElement('style');
pageLoadStyle.textContent = `
    @keyframes pageLoad {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(pageLoadStyle);

// Add smooth header animations
const header = document.querySelector('.section-header');
if (header) {
    const observer2 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.section-header').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer2.observe(el);
    });
}