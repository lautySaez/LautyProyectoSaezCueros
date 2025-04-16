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


  // ==== Productos ====
  const productosContainer = document.querySelector('.catalogo-productos');
  const todosLosProductos = Array.from(document.querySelectorAll('.card-producto'));
  const buscador = document.getElementById('buscador');
  const btnVerMas = document.getElementById('btn-ver-mas');
  const btnFiltro = document.getElementById('btn-filtro');
  const menuFiltro = document.getElementById('menu-filtro');

  let productosFiltrados = [...todosLosProductos];
  let cantidadVisible = 4;
  const PASO = 4;

  function renderizarProductos() {
    productosFiltrados.forEach((producto, i) => {
      producto.style.display = i < cantidadVisible ? 'block' : 'none';
      productosContainer.appendChild(producto); // Reinserta en el DOM
    });

    if (productosFiltrados.length <= 4) {
      btnVerMas.style.display = 'none';
    } else {
      btnVerMas.style.display = 'inline-block';
      btnVerMas.textContent = cantidadVisible >= productosFiltrados.length ? 'Ver menos' : 'Ver más';
    }
  }

  // ==== Buscador ====
  buscador?.addEventListener('input', () => {
    const texto = buscador.value.toLowerCase();

    productosFiltrados = todosLosProductos.filter(p =>
      p.textContent.toLowerCase().includes(texto)
    );

    cantidadVisible = 4;
    renderizarProductos();
  });

  // ==== Ver más / menos ====
  btnVerMas?.addEventListener('click', () => {
    if (cantidadVisible >= productosFiltrados.length) {
      cantidadVisible = 4;
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

      cantidadVisible = 4;
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

  // ==== Inicial ====
  renderizarProductos();

});
