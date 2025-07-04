export default function setupMenuToggle() {
  document.getElementById('menu-toggle').addEventListener('click', function () {
    const navMenu = document.getElementById('menu-nav-mb');
    const userMenu = document.getElementById('menu-user-mb');
    const icon = document.getElementById('nav-link-icon');

    // Cierra menú usuario si está abierto
    if (userMenu.classList.contains('active')) {
      userMenu.classList.remove('active');
    }

    // Alterna menú navegación
    navMenu.classList.toggle('active');
    icon.classList.toggle('active');
    icon.classList.toggle('bi-list');
    icon.classList.toggle('bi-x');
  });
}

/*
// Versión anterior:

export default function setupMenuToggle() {
  const toggleBtn = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu-nav-mb');
  const userMenu = document.getElementById('menu-user-mb');
  const icon = document.getElementById('nav-link-icon');

  toggleBtn.addEventListener('click', () => {
    if (userMenu.classList.contains('active')) return;

    menu.classList.toggle('active');
    icon.classList.toggle('active');
    icon.classList.toggle('bi-list');
    icon.classList.toggle('bi-x');
  });
}
*/
