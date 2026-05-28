document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            header.style.padding = '0'; // Could animate padding if desired
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    // Note: To fully implement mobile menu, we'd add an 'active' class to nav-list 
    // and style it in CSS as a slide-out drawer or dropdown. 
    // For now, this just logs or handles basic toggle.
    menuToggle.addEventListener('click', () => {
        const navList = document.querySelector('.nav-list');
        navList.classList.toggle('show-mobile');
        
        // Transform hamburger icon
        menuToggle.classList.toggle('is-active');
    });

    // Intersection Observer for scroll animations (if we add elements lower down)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                // Or simply add a class to trigger animation
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Statistics Counter Scroll Animation
    const counterElements = document.querySelectorAll('.stat-number');
    
    const countUp = (element) => {
        const target = +element.getAttribute('data-target');
        const suffix = element.getAttribute('data-suffix') || '';
        const duration = 1800; // Animation duration in ms
        const frameRate = 30; // 30 updates per second
        const totalFrames = Math.round(duration / frameRate);
        let frame = 0;
        
        const timer = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            // Ease-out quad formula for smoother deceleration
            const easeProgress = progress * (2 - progress); 
            const currentVal = Math.round(target * easeProgress);
            
            element.textContent = currentVal + suffix;
            
            if (frame >= totalFrames) {
                element.textContent = target + suffix;
                clearInterval(timer);
            }
        }, frameRate);
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Delay counting slightly for a premium feel as card fades in
                setTimeout(() => {
                    countUp(entry.target);
                }, 150);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    counterElements.forEach(el => {
        statsObserver.observe(el);
    });
});
