document.addEventListener('DOMContentLoaded', () => {
  // Scroll suave para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach(enlace => {
    enlace.addEventListener('click', function(e) {
      e.preventDefault();
      const destino = document.querySelector(this.getAttribute('href'));
      if (destino) {
        destino.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Mostrar/Ocultar menú hamburguesa
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }

  // Scroll volver arriba
  const btnVolverArriba = document.querySelector('.btn-volver-arriba');

  if (btnVolverArriba) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        btnVolverArriba.classList.add('visible');
      } else {
        btnVolverArriba.classList.remove('visible');
      }
    });

    btnVolverArriba.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  const track = document.querySelector('.opiniones-track');
  const btnNext = document.querySelector('.btn-opinion.next');
  const btnPrev = document.querySelector('.btn-opinion.prev');
  const slides = document.querySelectorAll('.opinion');
  let currentIndex = 0;

  function updateOpiniones() {
    const offset = currentIndex * slides[0].offsetWidth;
    track.style.transform = `translateX(-${offset}px)`;
  }

  btnNext.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateOpiniones();
  });

  btnPrev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateOpiniones();
  });

  window.addEventListener('resize', updateOpiniones);
  updateOpiniones();

});
