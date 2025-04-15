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

  // ================================
  // MODO OSCURO / CLARO
  // ================================
  const toggleBtn = document.getElementById('toggle-tema');
  const body = document.body;

  // Aplicar el tema guardado aunque no haya toggle
  const temaGuardado = localStorage.getItem('tema');
  if (temaGuardado === 'claro') {
    body.classList.add('tema-claro');
  }

  // Si hay botón toggle, actualizarlo
  if (toggleBtn) {
    toggleBtn.textContent = body.classList.contains('tema-claro') ? '🌙' : '☀️';

    toggleBtn.addEventListener('click', () => {
      body.classList.toggle('tema-claro');
      const esClaro = body.classList.contains('tema-claro');
      toggleBtn.textContent = esClaro ? '🌙' : '☀️';
      localStorage.setItem('tema', esClaro ? 'claro' : 'oscuro');
    });
  }

});
