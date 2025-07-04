export default function setupUserMenu() {
  document.getElementById('nav-user-mb').addEventListener('click', function () {
    const userMenu = document.getElementById('menu-user-mb');
    const navMenu = document.getElementById('menu-nav-mb');
    const icon = document.getElementById('nav-link-icon');

    // Cierra menú navegación si está abierto
    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      icon.classList.remove('active');
      icon.classList.add('bi-list');
      icon.classList.remove('bi-x');
    }

    // Alterna menú usuario
    userMenu.classList.toggle('active');
  });
}

/*
// Versión anterior:

export default function setupUserMenu() {
  const btn = document.getElementById('nav-user-mb');
  const menu = document.getElementById('menu-user-mb');
  const navMenu = document.getElementById('menu-nav-mb');

  btn.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) return;
    menu.classList.toggle('active');
  });
}
*/
