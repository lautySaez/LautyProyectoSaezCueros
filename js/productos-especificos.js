// ===========================
// GALERÍA DE MINIATURAS
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    const imgPrincipal = document.querySelector('.imagen-principal');
    const miniaturas = document.querySelectorAll('.galeria-miniaturas img');
  
    miniaturas.forEach(mini => {
      mini.addEventListener('click', () => {
        // Remover clase activa de todas
        miniaturas.forEach(m => m.classList.remove('activa'));
  
        // Agregar clase activa a la seleccionada
        mini.classList.add('activa');
  
        // Efecto de desvanecido al cambiar
        imgPrincipal.classList.add('cambiando');
  
        setTimeout(() => {
          imgPrincipal.src = mini.dataset.img;
          imgPrincipal.classList.remove('cambiando');
        }, 150);
      });
    });
  });
  
  
  