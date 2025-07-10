// Lógica para mostrar/ocultar campos del formulario RSVP
// Adaptado para la nueva estructura: nombre y teléfono individuales

document.addEventListener('DOMContentLoaded', function() {
    const radioSi = document.querySelector('input[name="asistencia"][value="si"]');
    const radioNo = document.querySelector('input[name="asistencia"][value="no"]');
    const acompGroup = document.getElementById('acompanantes-group');
    const nombreGroup = document.getElementById('nombre-group');
    // const telefonoGroup = document.getElementById('telefono-group');
    //const mensajeGroup = document.querySelector('textarea#mensaje').parentElement;

    function updateForm() {
        if (radioSi.checked) {
            nombreGroup.style.display = '';
            // telefonoGroup.style.display = '';
            acompGroup.style.display = '';
            //mensajeGroup.style.display = '';
        } else if (radioNo.checked) {
            nombreGroup.style.display = '';
            // telefonoGroup.style.display = '';
            acompGroup.style.display = 'none';
            //mensajeGroup.style.display = '';
        } else {
            nombreGroup.style.display = 'none';
            // telefonoGroup.style.display = 'none';
            acompGroup.style.display = 'none';
            //mensajeGroup.style.display = 'none';
        }
    }
    radioSi.addEventListener('change', updateForm);
    radioNo.addEventListener('change', updateForm);
    updateForm();
});
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

    // RSVP Form handling (migrated to inline script in index.html)

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

            // --- NUEVO: Forzar actualización de barra inferior según sección ---
            const body = document.body;
            // Elimina cualquier clase *-active
            body.className = body.className
                .split(' ')
                .filter(c => !c.endsWith('-active'))
                .join(' ');
            if (targetId) {
                body.classList.add(targetId + '-active');
            }
            if (targetId === 'inicio') {
                body.classList.add('home-active');
            } else {
                body.classList.remove('home-active');
            }
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
        // Elimina cualquier clase *-active
        body.className = body.className
            .split(' ')
            .filter(c => !c.endsWith('-active'))
            .join(' ');
        // Agrega solo la clase activa correspondiente
        if (current) {
            body.classList.add(current + '-active');
        }
        // Solo agrega la clase home-active si estamos en la sección con id="inicio"
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
// --- BLOQUEO DE SCROLL GLOBAL Y PERMISO SOLO EN SECCIÓN ACTIVA EN MÓVIL ---
(function() {
    function isMobile() {
        return window.innerWidth <= 600 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    function lockGlobalScroll() {
        if (isMobile()) {
            // document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        }
    }
    function unlockGlobalScroll() {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
    }
    // Solo permitir scroll en la sección activa
    function allowSectionScroll() {
        if (!isMobile()) return;
        document.querySelectorAll('.main-section').forEach(sec => {
            if (sec.classList.contains('active')) {
                const container = sec.querySelector('.container');
                if (container) {
                    container.style.overflowY = 'auto';
                    container.style.touchAction = 'pan-y';
                }
            } else {
                const container = sec.querySelector('.container');
                if (container) {
                    container.style.overflowY = 'hidden';
                    container.style.touchAction = 'none';
                }
            }
        });
    }
    // Inicializar bloqueo de scroll global
    document.addEventListener('DOMContentLoaded', function() {
        if (isMobile()) {
            lockGlobalScroll();
            allowSectionScroll();
        }
    });
    // Al cambiar de sección por menú
    document.querySelectorAll('.bottom-nav .nav-item').forEach(function(item) {
        item.addEventListener('click', function(e) {
            setTimeout(() => {
                allowSectionScroll();
            }, 350);
        });
    });
    // Al cambiar tamaño de pantalla
    window.addEventListener('resize', function() {
        if (isMobile()) {
            lockGlobalScroll();
            allowSectionScroll();
        } else {
            unlockGlobalScroll();
            document.querySelectorAll('.main-section .container').forEach(c => {
                c.style.overflowY = '';
                c.style.touchAction = '';
            });
        }
    });
})();
