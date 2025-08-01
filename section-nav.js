/* Navegación por secciones - versión universal */
(function() {
    const isMobile = window.innerWidth <= 600 || 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // En móviles, usar navegación de secciones; en escritorio, solo actualizar estados activos
    
    // En móviles, activar primera sección por defecto
    if (isMobile) {
        let activeSection = 'inicio';
        showSection(activeSection);
    }
    
    // Configurar navegación (para móviles y escritorio)
    document.querySelectorAll('.bottom-nav .nav-item').forEach(function(link) {
        link.addEventListener('click', function(e) {
            const sectionId = this.getAttribute('href').substring(1);
            
            if (isMobile) {
                // En móviles, prevenir navegación normal y usar showSection
                e.preventDefault();
                showSection(sectionId);
            } else {
                // En escritorio, actualizar clase home-active inmediatamente
                if (sectionId === 'inicio') {
                    document.body.classList.add('home-active');
                } else {
                    document.body.classList.remove('home-active');
                }
            }
            // En escritorio, permitir navegación normal pero actualizar clases activas
            
            // Actualizar botones de navegación (tanto móvil como escritorio)
            document.querySelectorAll('.nav-item').forEach(function(nav) {
                nav.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // Función principal para mostrar/ocultar secciones (solo móviles)
    function showSection(sectionId) {
        if (!isMobile) return; // Solo ejecutar en móviles
        
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
    
    // Detectar scroll en escritorio para actualizar navegación activa
    if (!isMobile) {
        // Función para actualizar el botón activo basado en la sección visible
        function updateActiveNavOnScroll() {
            const sections = document.querySelectorAll('.main-section');
            const navItems = document.querySelectorAll('.nav-item');
            
            let currentSection = '';
            
            sections.forEach(function(section) {
                const rect = section.getBoundingClientRect();
                // Considerar activa la sección que esté más visible en viewport
                if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                    currentSection = section.id;
                }
            });
            
            // Si no hay sección claramente visible, usar la primera sección visible
            if (!currentSection) {
                sections.forEach(function(section) {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= window.innerHeight && rect.bottom >= 0 && !currentSection) {
                        currentSection = section.id;
                    }
                });
            }
            
            // Actualizar navegación
            if (currentSection) {
                navItems.forEach(function(nav) {
                    nav.classList.remove('active');
                    if (nav.getAttribute('href') === '#' + currentSection) {
                        nav.classList.add('active');
                    }
                });
                
                // Actualizar clase home-active en el body para mostrar/ocultar contador
                if (currentSection === 'inicio') {
                    document.body.classList.add('home-active');
                } else {
                    document.body.classList.remove('home-active');
                }
            }
        }
        
        // Escuchar scroll para actualizar navegación
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(updateActiveNavOnScroll, 100);
        });
        
        // Ejecutar una vez al cargar la página y configurar estado inicial
        setTimeout(function() {
            updateActiveNavOnScroll();
            // Si no hay scroll significativo, probablemente estamos en inicio
            if (window.scrollY < 100) {
                document.body.classList.add('home-active');
            }
        }, 500);
    }
    
    // Detectar problemas de scroll en iOS (solo móviles)
    if (isMobile) {
        document.addEventListener('touchmove', function(e) {
            const activeContainer = document.querySelector('.main-section.active > .container');
            if (activeContainer) {
                if (activeContainer.scrollHeight <= activeContainer.clientHeight) {
                    e.preventDefault();
                }
            }
        }, { passive: false });
    }
})();
