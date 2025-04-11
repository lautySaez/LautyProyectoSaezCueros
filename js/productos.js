// ==============================
// CAMBIO DE IMAGEN POR COLOR CON EFECTO DE OPACIDAD
// ==============================

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

  
  