document.addEventListener('DOMContentLoaded', () => {
  const imgPrincipal = document.querySelector('.imagen-principal');
  const miniaturas = document.querySelectorAll('.galeria-miniaturas img');
  const toggleBtn = document.querySelector('.toggle-btn'); // Asegúrate de que esta clase esté correcta
  const body = document.body;
  
  // Manejo de las miniaturas
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
  
  // Manejo del tema oscuro/claro
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
});

  
  