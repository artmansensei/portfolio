document.addEventListener('DOMContentLoaded', () => {
    
    /* 1. Preloader Removal */
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('fade-out');
    }, 400); 

    /* 2. Dark/Light Theme State Management */
    const themeToggle = document.getElementById('theme-toggle');
    const rootElement = document.documentElement;
    const themeIcon = themeToggle.querySelector('i');

    const savedTheme = localStorage.getItem('theme') || 'dark';
    rootElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = rootElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        rootElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme); 
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if(theme === 'dark') {
            themeIcon.className = 'fa-solid fa-sun';
        } else {
            themeIcon.className = 'fa-solid fa-moon';
        }
    }

    /* 3. Dynamic Typing Effect */
    const typingText = document.querySelector('.typing-text');
    const phrases = ["Developer.", "artist.", "writer.", "photographer."];
    let phraseIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, letterIndex - 1);
            letterIndex--;
        } else {
            typingText.textContent = currentPhrase.substring(0, letterIndex + 1);
            letterIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && letterIndex === currentPhrase.length) {
            typeSpeed = 2000; 
            isDeleting = true;
        } else if (isDeleting && letterIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; 
        }

        setTimeout(type, typeSpeed);
    }
    setTimeout(type, 2000); 

    /* 4. Scroll Reveal API */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

    /* 5. 3D Card Tilt Physics */
    const cards = document.querySelectorAll('.tilt-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = "transform 0.5s ease";
        });
        
        card.addEventListener('mouseenter', () => {
            card.style.transition = "none";
        });
    });
});

/* =========================================
   Particle.js Configuration
========================================= */
if (document.getElementById("particles-js")) {
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 60, // বিন্দুর সংখ্যা
                "density": { "enable": true, "value_area": 800 }
            },
            "color": { "value": "#3b82f6" }, // আপনার থিমের ব্লু কালার
            "shape": {
                "type": "circle",
                "stroke": { "width": 0, "color": "#000000" }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": { "enable": false }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": { "enable": false }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#3b82f6", // লাইনের কালার
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2, // বিন্দুগুলোর মুভমেন্ট স্পিড
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": { "enable": true, "mode": "grab" }, // মাউস নিলে লাইন কানেক্ট হবে
                "onclick": { "enable": true, "mode": "push" }, // ক্লিক করলে নতুন বিন্দু তৈরি হবে
                "resize": true
            },
            "modes": {
                "grab": { "distance": 140, "line_linked": { "opacity": 1 } },
                "push": { "particles_nb": 4 }
            }
        },
        "retina_detect": true
    });
}


/* =========================================
   3D Background Parallax Scroll Effect
========================================= */
window.addEventListener('scroll', () => {
    let scrollPosition = window.scrollY;
    
    let shape1 = document.querySelector('.shape-1');
    let shape2 = document.querySelector('.shape-2');
    let shape3 = document.querySelector('.shape-3');
    
    // আলাদা আলাদা স্পিডে শেপগুলো মুভ করানো হচ্ছে
    if(shape1) shape1.style.transform = `translateY(${scrollPosition * 0.3}px)`;
    if(shape2) shape2.style.transform = `translateY(${scrollPosition * -0.2}px)`; // এটি উল্টো দিকে যাবে
    if(shape3) shape3.style.transform = `translateY(${scrollPosition * 0.15}px)`;
});