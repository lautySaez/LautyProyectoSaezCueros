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

  // Animación al hacer scroll
  const observer = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('animado');
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('.producto-card').forEach(el => observer.observe(el));

  // Mostrar/Ocultar menú hamburguesa
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
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

    // Scroll suave al hacer click
    btnVolverArriba.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});






