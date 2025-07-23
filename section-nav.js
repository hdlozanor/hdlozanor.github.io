/* Navegación por secciones para móviles - versión mínima */
(function() {
    // Solo aplicar en móviles
    if (window.innerWidth > 600 && 
        !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return;
    }
    
    // Activar primera sección por defecto
    let activeSection = 'inicio';
    showSection(activeSection);
    
    // Configurar navegación
    document.querySelectorAll('.bottom-nav .nav-item').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            showSection(sectionId);
            
            // Actualizar botones de navegación
            document.querySelectorAll('.nav-item').forEach(function(nav) {
                nav.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // Función principal para mostrar/ocultar secciones
    function showSection(sectionId) {
        // Ocultar todas las secciones
        document.querySelectorAll('.main-section').forEach(function(section) {
            section.classList.remove('active');
        });
        
        // Mostrar la sección solicitada
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.add('active');
            
            // Reiniciar posición de scroll
            const container = section.querySelector('.container');
            if (container) {
                setTimeout(function() {
                    container.scrollTop = 0;
                }, 10);
            }
            
            // Actualizar clase en el body
            if (sectionId === 'inicio') {
                document.body.classList.add('home-active');
            } else {
                document.body.classList.remove('home-active');
            }
        }
    }
    
    // Detectar problemas de scroll en iOS
    document.addEventListener('touchmove', function(e) {
        const activeContainer = document.querySelector('.main-section.active > .container');
        if (activeContainer) {
            if (activeContainer.scrollHeight <= activeContainer.clientHeight) {
                e.preventDefault();
            }
        }
    }, { passive: false });
})();
