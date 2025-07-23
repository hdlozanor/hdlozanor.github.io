/* 
  Script principal para la invitación de boda
  Incluye: 
  - Reproducción de audio de fondo
  - Zoom de imagen
  - Formulario de confirmación
  - Cuenta regresiva
  - Carrusel de fotos
*/

document.addEventListener('DOMContentLoaded', function() {
    // ===== AUDIO DE FONDO =====
    const musicBtn = document.getElementById('music-toggle');
    const musicIcon = document.getElementById('music-icon');
    const audio = document.getElementById('background-music');
    
    if (musicBtn && audio) {
        let isPlaying = false;
        
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
        
        musicBtn.addEventListener('click', toggleAudio);
    }
    
    // ===== ZOOM DE IMAGEN =====
    const haciendaImg = document.getElementById('hacienda-img');
    const modal = document.getElementById('hacienda-modal');
    const closeModal = document.getElementById('close-hacienda-modal');
    
    if (haciendaImg && modal && closeModal) {
        haciendaImg.addEventListener('click', function() {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
        
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }
    
    // ===== FORMULARIO DE CONFIRMACIÓN =====
    const rsvpForm = document.getElementById('rsvpForm');
    const submitBtn = rsvpForm ? rsvpForm.querySelector('.submit-btn') : null;
    const submitText = document.getElementById('submit-text');
    const idGroup = document.getElementById('id-group');
    const nombreGroup = document.getElementById('nombre-group');
    const restriccionGroup = document.getElementById('restriccion-group');
    // const adultosSelect = document.getElementById('adultos');
    // const ninosSelect = document.getElementById('ninos');
    let selectedAsistencia = null;

    // Ocultar los campos explícitamente al cargar la página
    if (idGroup) idGroup.style.display = 'none';
    if (nombreGroup) nombreGroup.style.display = 'none';
    if (restriccionGroup) restriccionGroup.style.display = 'none';
    if (submitBtn) submitBtn.style.display = 'none';

    // Mostrar campos según selección
    if (rsvpForm && rsvpForm.asistencia) {
      Array.from(rsvpForm.asistencia).forEach(radio => {
        radio.addEventListener('change', function() {
          selectedAsistencia = this.value;
          nombreGroup.style.display = 'block';
          // Mostrar el botón de submit cuando se selecciona una opción
          if (submitBtn) {
            submitBtn.style.display = 'flex';
          }
          if (this.value === 'Si') {
            idGroup.style.display = 'block';
            restriccionGroup.style.display = 'flex';
          } else {
            idGroup.style.display = 'none';
            restriccionGroup.style.display = 'none';
          }
        });
      });
    }

    if (rsvpForm) {
      rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!submitBtn || !submitText) return;
        submitBtn.disabled = true;
        submitText.textContent = 'Enviando...';

        const formData = new FormData(rsvpForm);
        const data = {
          asistencia: formData.get('asistencia') || '',
          id: formData.get('id') || '',
          nombre: formData.get('nombre') || '',
          restriccion: formData.get('restriccion') || '',
        };

        fetch('https://script.google.com/macros/s/AKfycbxD8kSn9U76VAF3lvY2c9CguWomugyjsbGK18zQVNc-0w2bZ4C8Zl7iu1yG33aG4oog-w/exec', {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams(data).toString()
        }).then(() => {
          // Mostrar pop-up de confirmación
          const popup = document.getElementById('confirmacion-popup');
          if (popup) {
            popup.style.display = 'flex';
          }
          
          // Ocultar el botón de confirmar
          submitBtn.style.display = 'none';
          
          // Restablecer el formulario
          rsvpForm.reset();
          nombreGroup.style.display = 'none';
          idGroup.style.display = 'none';
          restriccionGroup.style.display = 'none';

          // Habilitar el botón para futuros envíos
          submitBtn.disabled = false;
          submitText.textContent = 'Confirmar Asistencia';
        }).catch(() => {
          submitText.textContent = 'Error, intenta de nuevo';
          submitBtn.classList.add('error');
          setTimeout(() => {
            submitText.textContent = 'Confirmar Asistencia';
            submitBtn.classList.remove('error');
            submitBtn.disabled = false;
          }, 2500);
        });
      });
      
      // Manejar el cierre del pop-up
      const closePopupBtn = document.getElementById('close-popup');
      const popup = document.getElementById('confirmacion-popup');
      
      if (closePopupBtn && popup) {
        closePopupBtn.addEventListener('click', function() {
          popup.style.display = 'none';
        });
      }
    }


    // ===== CUENTA REGRESIVA =====
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
    updateCountdown();

    // ===== CARRUSEL DE FOTOS =====
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        if (n >= totalSlides) currentSlide = 0;
        if (n < 0) currentSlide = totalSlides - 1;

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        currentSlide++;
        showSlide(currentSlide);
    }

    setInterval(nextSlide, 4000);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // ===== NAVEGACIÓN SUAVE =====
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };
});
