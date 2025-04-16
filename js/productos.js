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

  // Ordenar productos por filtro
  document.querySelectorAll('#menu-filtro li').forEach(item => {
    item.addEventListener('click', () => {
      const tipo = item.dataset.orden;
      const productosContainer = document.querySelector('.catalogo-productos');
      const productos = Array.from(document.querySelectorAll('.card-producto'));

      // Lógica de orden
      productos.sort((a, b) => {
        const precioA = parseFloat(a.dataset.precio);
        const precioB = parseFloat(b.dataset.precio);
        const fechaA = new Date(a.dataset.fecha);
        const fechaB = new Date(b.dataset.fecha);

        if (tipo === "caro") return precioB - precioA;
        if (tipo === "barato") return precioA - precioB;
        if (tipo === "nuevo") return fechaB - fechaA;
        if (tipo === "viejo") return fechaA - fechaB;
      });

      // Eliminamos los productos viejos y reinsertamos ordenados
      productos.forEach(p => p.remove());
      productos.forEach(p => productosContainer.appendChild(p));

      // Cerrar el menú de filtros
      document.getElementById('menu-filtro').classList.remove('show');
    });
  });

  // Mostrar u ocultar el menú de orden
  const btnFiltro = document.getElementById('btn-filtro');
  const menuFiltro = document.getElementById('menu-filtro');

  btnFiltro.addEventListener('click', () => {
    menuFiltro.classList.toggle('show');
  });

  // Cerrar el menú si clickeamos fuera de él
  document.addEventListener('click', (e) => {
    const esBoton = e.target.id === 'btn-filtro';
    const dentroDelMenu = e.target.closest('#menu-filtro');

    if (!esBoton && !dentroDelMenu) {
      document.getElementById('menu-filtro').classList.remove('show');
    }
  });

});



  
  