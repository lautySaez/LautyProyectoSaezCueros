// ==============================
// CAMBIO DE IMAGEN POR COLOR
// ==============================

document.querySelectorAll('.card-producto').forEach(card => {
  const img = card.querySelector('.imagen-producto');
  const colores = card.querySelectorAll('.color');
  let imagenActual = img.src;

  colores.forEach(color => {
    const nuevaImg = color.getAttribute('data-img');

    // Hover: vista previa temporal
    color.addEventListener('mouseover', () => {
      img.src = nuevaImg;
    });

    // Salida del hover: volver a la imagen actual
    color.addEventListener('mouseout', () => {
      img.src = imagenActual;
    });

    // Click: fijar imagen como nueva actual
    color.addEventListener('click', () => {
      imagenActual = nuevaImg;
      img.src = nuevaImg;
    });
  });
});

  
  