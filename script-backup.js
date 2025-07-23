// Respaldo del script original
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
