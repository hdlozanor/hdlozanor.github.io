/* Scroll por sección en móviles - Versión simplificada */
document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth <= 600 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // Activar la primera sección por defecto
        activateSection('inicio');
        
        // Configurar click en navegación
        document.querySelectorAll('.bottom-nav .nav-item').forEach(function(item) {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                activateSection(targetId);
                
                // Actualizar navegación
                document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    // Función para activar una sección
    function activateSection(sectionId) {
        // Ocultar todas las secciones
        document.querySelectorAll('.main-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Mostrar sección seleccionada
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            
            // Asegurar que el contenedor sea scrollable
            const container = targetSection.querySelector('.container');
            if (container) {
                // Asegurar que el scroll esté en la parte superior
                setTimeout(function() {
                    container.scrollTop = 0;
                }, 10);
            }
        }
        
        // Actualizar clases en el body
        if (sectionId === 'inicio') {
            document.body.classList.add('home-active');
        } else {
            document.body.classList.remove('home-active');
        }
    }
    
    // Verificar el scroll y touch
    function fixTouchScroll() {
        const activeSection = document.querySelector('.main-section.active');
        if (activeSection) {
            const container = activeSection.querySelector('.container');
            if (container) {
                // Forzar reflow
                container.style.display = 'none';
                void container.offsetHeight; // Trigger reflow
                container.style.display = '';
                
                // Hacer scroll mínimo para activar
                container.scrollTop = 1;
                setTimeout(function() {
                    container.scrollTop = 0;
                }, 0);
            }
        }
    }
    
    // Aplicar fix cuando cambia la orientación
    window.addEventListener('orientationchange', function() {
        setTimeout(fixTouchScroll, 200);
    });
    
    // Aplicar fix inicial
    setTimeout(fixTouchScroll, 100);
});
