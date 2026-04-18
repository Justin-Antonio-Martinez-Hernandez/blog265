document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Animaciones de Aparición al hacer Scroll (IntersectionObserver) ---
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Se activa cuando el 10% del elemento es visible
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Solo anima una vez
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    // --- 2. Lógica del Reproductor de Música ---
    const musicBtn = document.getElementById('musicBtn');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;

    // Ajustar volumen por defecto (0.0 a 1.0)
    bgMusic.volume = 0.3; 

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.innerText = "🎵 Play Music";
            musicBtn.style.background = "rgba(0,0,0,0.5)";
            musicBtn.style.color = "white";
        } else {
            // Intentar reproducir (puede fallar si el navegador bloquea autoplay)
            bgMusic.play().then(() => {
                musicBtn.innerText = "⏸️ Pause Music";
                musicBtn.style.background = "white";
                musicBtn.style.color = "black";
            }).catch(error => {
                console.log("Autoplay blocked by browser. User interaction required.");
                alert("Please click again to allow playback.");
            });
        }
        isPlaying = !isPlaying;
    });
});
