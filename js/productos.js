document.addEventListener('DOMContentLoaded', () => {
  // ==== Carrusel ====
  const track = document.querySelector('.carrusel-track');
  const prevBtn = document.querySelector('.btn-carrusel.prev');
  const nextBtn = document.querySelector('.btn-carrusel.next');
  const slides = document.querySelectorAll('.slide');
  let currentIndex = 0;

  function getSlideWidth() {
    return slides[0].offsetWidth + 20;
  }

  function getVisibleSlides() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }

  function updateCarrusel() {
    const slideWidth = getSlideWidth();
    const offset = currentIndex * slideWidth;
    track.style.transform = `translateX(-${offset}px)`;
  }

  nextBtn?.addEventListener('click', () => {
    const maxIndex = slides.length - getVisibleSlides();
    currentIndex = (currentIndex < maxIndex) ? currentIndex + 1 : 0;
    updateCarrusel();
  });

  prevBtn?.addEventListener('click', () => {
    const maxIndex = slides.length - getVisibleSlides();
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : maxIndex;
    updateCarrusel();
  });

  window.addEventListener('resize', updateCarrusel);
  updateCarrusel();

  // ==== Variables generales ====
  const productosContainer = document.querySelector('.catalogo-productos');
  const todosLosProductos = Array.from(document.querySelectorAll('.card-producto'));
  const buscador = document.getElementById('buscador');
  const btnVerMas = document.getElementById('ver-mas-btn');
  const btnFiltro = document.getElementById('btn-filtro');
  const menuFiltro = document.getElementById('menu-filtro');

  let productosFiltrados = [...todosLosProductos];
  let cantidadVisible = 4;
  const PASO = 4;

  function renderizarProductos() {
    // Reinserta todos los productos
    productosContainer.innerHTML = '';
    productosFiltrados.forEach((producto, i) => {
      if (i < cantidadVisible) {
        producto.style.display = 'block';
        productosContainer.appendChild(producto);
      }
    });

    if (productosFiltrados.length <= PASO) {
      btnVerMas.style.display = 'none';
    } else {
      btnVerMas.style.display = 'inline-block';
      btnVerMas.textContent = cantidadVisible >= productosFiltrados.length ? 'Ver menos' : 'Ver más';
    }
  }

  // ==== Buscador funcional ====
  buscador?.addEventListener('input', () => {
    const texto = buscador.value.toLowerCase();

    productosFiltrados = todosLosProductos.filter(p =>
      p.textContent.toLowerCase().includes(texto)
    );

    cantidadVisible = PASO;
    renderizarProductos();
  });

  // ==== Ver más / Ver menos ====
  btnVerMas?.addEventListener('click', () => {
    if (cantidadVisible >= productosFiltrados.length) {
      cantidadVisible = PASO;
    } else {
      cantidadVisible += PASO;
    }
    renderizarProductos();
  });

  // ==== Filtros ====
  document.querySelectorAll('#menu-filtro li').forEach(item => {
    item.addEventListener('click', () => {
      const tipo = item.dataset.orden;

      productosFiltrados.sort((a, b) => {
        const precioA = parseFloat(a.dataset.precio);
        const precioB = parseFloat(b.dataset.precio);
        const fechaA = new Date(a.dataset.fecha);
        const fechaB = new Date(b.dataset.fecha);

        if (tipo === 'caro') return precioB - precioA;
        if (tipo === 'barato') return precioA - precioB;
        if (tipo === 'nuevo') return fechaB - fechaA;
        if (tipo === 'viejo') return fechaA - fechaB;
        return 0;
      });

      cantidadVisible = PASO;
      renderizarProductos();
      menuFiltro.classList.remove('show');
    });
  });

  // ==== Mostrar/Ocultar menú ====
  btnFiltro?.addEventListener('click', () => {
    menuFiltro.classList.toggle('show');
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('#menu-filtro') && e.target.id !== 'btn-filtro') {
      menuFiltro?.classList.remove('show');
    }
  });

  // ==== Colores por producto ====
  todosLosProductos.forEach(card => {
    const img = card.querySelector('.imagen-producto');
    const colores = card.querySelectorAll('.color');
    let imagenActual = img.src;

    colores.forEach(color => {
      const nuevaImg = color.dataset.img;

      color.addEventListener('mouseover', () => {
        img.src = nuevaImg;
      });

      color.addEventListener('mouseout', () => {
        img.src = imagenActual;
      });

      color.addEventListener('click', () => {
        if (imagenActual !== nuevaImg) {
          img.classList.add('cambiando');
          setTimeout(() => {
            img.src = nuevaImg;
            img.classList.remove('cambiando');
          }, 150);
          imagenActual = nuevaImg;

          colores.forEach(c => c.classList.remove('activo'));
          color.classList.add('activo');
        }
      });
    });
  });

  // ==== Inicial ====
  renderizarProductos();
});

