// Funcionalidad principal del sitio
document.addEventListener('DOMContentLoaded', function() {
    // Audio de fondo
    const musicBtn = document.getElementById('music-toggle');
    const musicIcon = document.getElementById('music-icon');
    const audio = document.getElementById('background-music');
    
    // Configurar control de audio
    if (musicBtn && audio) {
        let isPlaying = false;
        
        // Función para reproducir/pausar el audio
        function toggleAudio() {
            if (isPlaying) {
                audio.pause();
                musicIcon.classList.remove('fa-heart-pulse');
                musicIcon.classList.add('fa-heart');
            } else {
                audio.play().catch(error => {
                    console.log('Error al reproducir audio:', error);
                });
                musicIcon.classList.remove('fa-heart');
                musicIcon.classList.add('fa-heart-pulse');
            }
            isPlaying = !isPlaying;
        }
        
        // Agregar evento de clic al botón
        musicBtn.addEventListener('click', toggleAudio);
    }
    
    // Zoom de imagen
    const haciendaImg = document.getElementById('hacienda-img');
    const modal = document.getElementById('hacienda-modal');
    const closeModal = document.getElementById('close-hacienda-modal');
    
    if (haciendaImg && modal && closeModal) {
        // Abrir modal al hacer clic en la imagen
        haciendaImg.addEventListener('click', function() {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevenir scroll
        });
        
        // Cerrar modal
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Restaurar scroll
        });
        
        // Cerrar modal al hacer clic fuera de la imagen
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }
    
    // Formulario de confirmación
    const radioSi = document.querySelector('input[name="asistencia"][value="Si"]');
    const radioNo = document.querySelector('input[name="asistencia"][value="No"]');
    const acompGroup = document.getElementById('acompanantes-group');
    const nombreGroup = document.getElementById('nombre-group');
    const rsvpForm = document.getElementById('rsvpForm');

    function updateForm() {
        if (radioSi && radioSi.checked) {
            nombreGroup.style.display = 'block';
            acompGroup.style.display = 'flex';
        } else if (radioNo && radioNo.checked) {
            nombreGroup.style.display = 'block';
            acompGroup.style.display = 'none';
        } else {
            nombreGroup.style.display = 'none';
            acompGroup.style.display = 'none';
        }
    }
    
    if (radioSi && radioNo) {
        radioSi.addEventListener('change', updateForm);
        radioNo.addEventListener('change', updateForm);
        updateForm();
    }
    
    // Manejar envío del formulario
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí puedes agregar la lógica para enviar los datos del formulario
            // Por ahora, solo mostraremos un mensaje de confirmación
            alert('¡Gracias por confirmar tu asistencia!');
            
            // Opcional: reiniciar formulario
            this.reset();
            updateForm();
        });
    }

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
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
});
    
    // Manejar envío del formulario
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí puedes agregar la lógica para enviar los datos del formulario
            // por ejemplo, usando fetch() para enviar a un endpoint
            
            // Por ahora, solo mostraremos un mensaje de confirmación
            alert('¡Gracias por confirmar tu asistencia!');
            
            // Opcional: reiniciar formulario
            this.reset();
            updateForm();
        });
    }

// Funcionalidad principal del sitio
document.addEventListener('DOMContentLoaded', function() {
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

            // Desktop: usar scroll normal
            if (window.innerWidth > 600) {
                scrollToSection(targetId);
                
                // Actualizar clases en el body
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
            }
            // El manejo móvil se hace en mobile-scroll.js
        });
    });
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
            if (item.getAttribute('href') === '#' + current) {
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

    // Listen for scroll events (solo en escritorio)
    if (window.innerWidth > 600) {
        window.addEventListener('scroll', updateActiveNav);
    }
    
    // Initialize on page load (solo en escritorio)
    if (window.innerWidth > 600) {
        updateActiveNav();
    }

});
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
    
    // Initialize on page load (solo en escritorio)
    if (window.innerWidth > 600) {
        updateActiveNav();
    }

});
    
    function lockGlobalScroll() {
        if (isMobile()) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.height = '100%';
            document.body.style.top = '0';
            document.body.style.left = '0';
        }
    }
    
    function unlockGlobalScroll() {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.height = '';
        document.body.style.top = '';
        document.body.style.left = '';
    }
    
    // Solo permitir scroll en la sección activa
    function allowSectionScroll() {
        if (!isMobile()) return;
        
        document.querySelectorAll('.main-section').forEach(sec => {
            if (sec.classList.contains('active')) {
                const container = sec.querySelector('.container');
                if (container) {
                    // Habilitar scroll para el contenedor principal
                    container.style.overflowY = 'auto';
                    container.style.overflowX = 'hidden';
                    container.style.touchAction = 'pan-y';
                    container.style.WebkitOverflowScrolling = 'touch';
                    container.style.height = '100vh';
                    container.style.paddingBottom = '80px'; // Espacio para el menú inferior
                    
                    // Asegurarse de que el contenido sea visible
                    sec.style.display = 'block';
                    sec.style.visibility = 'visible';
                    sec.style.pointerEvents = 'auto';
                    sec.style.opacity = '1';
                    
                    // Forzar relayout para asegurar que el scroll funcione
                    container.scrollTop = 0.1;
                    setTimeout(() => {
                        container.scrollTop = 0;
                    }, 0);
                }
            } else {
                const container = sec.querySelector('.container');
                if (container) {
                    container.style.overflowY = 'hidden';
                    container.style.touchAction = 'none';
                }
                
                sec.style.display = 'none';
                sec.style.visibility = 'hidden';
                sec.style.pointerEvents = 'none';
                sec.style.opacity = '0';
            }
        });
    }
    
    // Marcar una sección como activa y actualizar el scroll
    function activateSection(sectionId) {
        document.querySelectorAll('.main-section').forEach(sec => {
            sec.classList.remove('active');
        });
        
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            
            // Actualizar clases en el body
            const body = document.body;
            body.className = body.className
                .split(' ')
                .filter(c => !c.endsWith('-active'))
                .join(' ');
                
            body.classList.add(sectionId + '-active');
            
            if (sectionId === 'inicio') {
                body.classList.add('home-active');
            } else {
                body.classList.remove('home-active');
            }
            
            // Actualizar navegación
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === '#' + sectionId) {
                    item.classList.add('active');
                }
            });
            
            // Aplicar scroll solo a la sección activa
            allowSectionScroll();
        }
    }
    
    // Inicializar bloqueo de scroll global
    document.addEventListener('DOMContentLoaded', function() {
        if (isMobile()) {
            lockGlobalScroll();
            
            // Activar la primera sección por defecto
            const firstSectionId = document.querySelector('.main-section').id;
            activateSection(firstSectionId);
            
            // Configurar navegación
            document.querySelectorAll('.bottom-nav .nav-item').forEach(function(item) {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href').substring(1);
                    activateSection(targetId);
                });
            });
        }
    });
    
    // Al cambiar tamaño de pantalla
    window.addEventListener('resize', function() {
        if (isMobile()) {
            lockGlobalScroll();
            allowSectionScroll();
        } else {
            unlockGlobalScroll();
            document.querySelectorAll('.main-section').forEach(sec => {
                sec.style.display = '';
                sec.style.visibility = '';
                sec.style.pointerEvents = '';
                sec.style.opacity = '';
            });
            document.querySelectorAll('.main-section .container').forEach(c => {
                c.style.overflowY = '';
                c.style.overflowX = '';
                c.style.touchAction = '';
                c.style.WebkitOverflowScrolling = '';
                c.style.height = '';
                c.style.paddingBottom = '';
            });
        }
    });
})();
