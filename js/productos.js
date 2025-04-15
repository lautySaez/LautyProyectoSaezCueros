document.addEventListener('DOMContentLoaded', () => {
  // Cambio de imagen por color
  document.querySelectorAll('.card-producto').forEach(card => {
    const img = card.querySelector('.imagen-producto');
    const colores = card.querySelectorAll('.color');
    let imagenActual = img.src;

    colores.forEach(color => {
      const nuevaImg = color.dataset.img;

      // Hover: vista previa temporal
      color.addEventListener('mouseover', () => {
        img.src = nuevaImg;
      });

      // Salida del hover: volver a la imagen actual
      color.addEventListener('mouseout', () => {
        img.src = imagenActual;
      });

      // Click: fijar imagen y aplicar efecto
      color.addEventListener('click', () => {
        if (imagenActual !== nuevaImg) {
          img.classList.add('cambiando');
          setTimeout(() => {
            img.src = nuevaImg;
            img.classList.remove('cambiando');
          }, 150);
          imagenActual = nuevaImg;

          // Activar color seleccionado
          colores.forEach(c => c.classList.remove('activo'));
          color.classList.add('activo');
        }
      });
    });
  });

  // Cambio de tema
  const toggleBtn = document.querySelector('.toggle-btn');
  const body = document.body;

  if (toggleBtn) {
    const temaGuardado = localStorage.getItem('tema');
    if (temaGuardado === 'claro') {
      body.classList.add('tema-claro');
      toggleBtn.textContent = '🌙';
    }

    toggleBtn.addEventListener('click', () => {
      body.classList.toggle('tema-claro');
      const esClaro = body.classList.contains('tema-claro');
      toggleBtn.textContent = esClaro ? '🌙' : '☀️';
      localStorage.setItem('tema', esClaro ? 'claro' : 'oscuro');
    });
  }

  // Buscador de productos
  const buscador = document.getElementById('buscador');
  const productos = document.querySelectorAll('.card-producto');

  if (buscador) {
    buscador.addEventListener('input', () => {
      const filtro = buscador.value.toLowerCase();

      productos.forEach(producto => {
        const texto = producto.textContent.toLowerCase();
        producto.style.display = texto.includes(filtro) ? 'block' : 'none';
      });
    });
  }
});


  
  