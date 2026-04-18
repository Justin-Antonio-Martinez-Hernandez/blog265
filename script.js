// Esperar a que el documento esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    
    // Seleccionar todos los elementos que tienen la clase 'fade-in'
    const fadeElements = document.querySelectorAll('.fade-in');

    // Configuración del observador (se activa cuando el 15% del elemento es visible)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    // Crear el Intersection Observer
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            // Si el elemento no está intersectando la pantalla, no hacer nada
            if (!entry.isIntersecting) {
                return;
            } else {
                // Si entra en la pantalla, añadir la clase 'visible'
                entry.target.classList.add('visible');
                // Dejar de observar el elemento una vez que ya apareció
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Aplicar el observador a cada elemento
    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });
});
