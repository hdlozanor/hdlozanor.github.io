document.addEventListener('DOMContentLoaded', function () {
    // Countdown Timer
    const weddingDate = new Date('October 19, 2025 15:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const timeleft = weddingDate - now;

        const months = Math.floor(timeleft / (1000 * 60 * 60 * 24 * 30));
        const days = Math.floor((timeleft % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

        document.getElementById('months').textContent = months;
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;

        if (timeleft < 0) {
            clearInterval(timer);
            document.getElementById('countdown').innerHTML = "¡El día ha llegado!";
        }
    }

    const timer = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initialize immediately

    // Carousel functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;

    function showSlide(n) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Handle wrap around
        if (n >= totalSlides) currentSlide = 0;
        if (n < 0) currentSlide = totalSlides - 1;

        // Show current slide and dot
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        currentSlide++;
        showSlide(currentSlide);
    }

    // Auto advance carousel every 4 seconds
    setInterval(nextSlide, 4000);

    // Dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Smooth scrolling for navigation
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        section.scrollIntoView({ behavior: 'smooth' });
    }

    // Fade-in animation on scroll
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0,
        rootMargin: '0px 0px -100px 0px'
    };
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);
    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // RSVP Form handling
    const rsvpForm = document.getElementById('rsvpForm');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(rsvpForm);
            const data = {};
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            
            // Show confirmation message
            alert('¡Gracias por confirmar tu asistencia! Hemos recibido tu información.');
            
            // Reset form
            rsvpForm.reset();
            
            // In a real application, you would send this data to a server
            console.log('RSVP Data:', data);
        });
    }

    // Bottom navigation functionality
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');

    // Handle bottom navigation clicks
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Scroll to section
            scrollToSection(targetId);
        });
    });

    // Update active navigation item on scroll
    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-section') === current) {
                item.classList.add('active');
            }
        });

        // Show/hide bottom date/timer section based on current page
        const body = document.body;
        if (current === 'inicio') {
            body.classList.add('home-active');
        } else {
            body.classList.remove('home-active');
        }
    }

    // Listen for scroll events
    window.addEventListener('scroll', updateActiveNav);
    
    // Initialize on page load
    updateActiveNav();

});
