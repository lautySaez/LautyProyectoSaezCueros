document.addEventListener('DOMContentLoaded', () => {

  // ==== Cambio de imagen por color ====
  document.querySelectorAll('.card-producto').forEach(card => {
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

  // ==== Buscador ====
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

  // ==== Ordenar productos ====
  document.querySelectorAll('#menu-filtro li').forEach(item => {
    item.addEventListener('click', () => {
      const tipo = item.dataset.orden;
      const productosContainer = document.querySelector('.catalogo-productos');
      const productos = Array.from(document.querySelectorAll('.card-producto'));

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

      productos.forEach(p => p.remove());
      productos.forEach(p => productosContainer.appendChild(p));

      document.getElementById('menu-filtro').classList.remove('show');
    });
  });

  // ==== Mostrar/Ocultar menú filtro ====
  const btnFiltro = document.getElementById('btn-filtro');
  const menuFiltro = document.getElementById('menu-filtro');

  btnFiltro.addEventListener('click', () => {
    menuFiltro.classList.toggle('show');
  });

  document.addEventListener('click', (e) => {
    const esBoton = e.target.id === 'btn-filtro';
    const dentroDelMenu = e.target.closest('#menu-filtro');
    if (!esBoton && !dentroDelMenu) {
      menuFiltro.classList.remove('show');
    }
  });

  // ==== Carrusel de productos destacados ====
  
  const track = document.querySelector('.carrusel-track');
  const prevBtn = document.querySelector('.btn-carrusel.prev');
  const nextBtn = document.querySelector('.btn-carrusel.next');
  const slides = document.querySelectorAll('.slide');
  
  let currentIndex = 0;
  
  function getSlideWidth() {
    return slides[0].offsetWidth + 20; // ancho + margen
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
  
  nextBtn.addEventListener('click', () => {
    const maxIndex = slides.length - getVisibleSlides();
    if (currentIndex < maxIndex) {
      currentIndex++;
    } else {
      currentIndex = 0; // ← bucle infinito
    }
    updateCarrusel();
  });
  
  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = slides.length - getVisibleSlides(); // ← volver al final
    }
    updateCarrusel();
  });
  
  window.addEventListener('resize', updateCarrusel);
  updateCarrusel();
  
 // ==== Mostrar productos con botón "Ver más" ====
 const productosCard = document.querySelectorAll('.card-producto');
 const btnVerMas = document.getElementById('ver-mas-btn');
 const cantidadInicial = 4;
 let mostrandoTodo = false;

 function actualizarVista() {
   productos.forEach((producto, index) => {
     producto.style.display = mostrandoTodo || index < cantidadInicial ? 'block' : 'none';
   });

   btnVerMas.textContent = mostrandoTodo ? 'Ver menos' : 'Ver más';
 }

 if (btnVerMas && productos.length > cantidadInicial) {
   actualizarVista();

   btnVerMas.addEventListener('click', () => {
     mostrandoTodo = !mostrandoTodo;
     actualizarVista();
   });
 }

});


  
  