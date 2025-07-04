document.querySelectorAll('.tab-buttons button').forEach(button => {
  button.addEventListener('click', () => {
    // Quitar clase activa a todos los botones y contenidos
    document.querySelectorAll('.tab-buttons button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));

    // Activar el botón y contenido correspondiente
    button.classList.add('active');
    const targetId = button.getAttribute('data-tab');
    document.getElementById(targetId).classList.add('active');
  });
});