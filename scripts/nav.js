tu-proyecto/
│
├── index.html
├── about.html              # otros HTML si aplica
│
├── assets/                 # todos los recursos estáticos
│   ├── css/
│   │   ├── main.css        # tu CSS general
│   │   ├── reset.css       # opcional: normalización/reset
│   │   └── components/     # si usas CSS modular
│   │       ├── nav.css
│   │       └── footer.css
│   │
│   ├── js/
│   │   ├── main.js
│   │   ├── nav.js
│   │   └── utils.js
│   │
│   ├── img/
│   │   ├── logo.svg
│   │   └── bg.jpg
│   │
│   ├── icons/
│   │   └── wg_logo.svg
│   │
│   └── fonts/
│       └── inter/          # si llegas a alojar tus propias fuentes
│
├── components/             # opcional si usas algún templating parcial
│   ├── header.html
│   └── footer.html
│
├── styles/                 # alias de css, si prefieres separar así
│
└── README.md               # notas del proyecto


// Menú de navegación
document.getElementById('menu-toggle').addEventListener('click', function () {
    const navMenu = document.getElementById('menu-nav-mb');
    const userMenu = document.getElementById('menu-user-mb');

    // Si el menú de usuario está abierto, no hacer nada
    if (userMenu.classList.contains('active')) return;

    // Alternar el menú de navegación
    navMenu.classList.toggle('active');

    const icon = document.getElementById('nav-link-icon');
    icon.classList.toggle('active');
    icon.classList.toggle('bi-list');
    icon.classList.toggle('bi-x');
});

// Menú de usuario
document.getElementById('nav-user-mb').addEventListener('click', function () {
    const navMenu = document.getElementById('menu-nav-mb');
    const userMenu = document.getElementById('menu-user-mb');

    // Si el menú de navegación está abierto, no hacer nada
    if (navMenu.classList.contains('active')) return;

    // Alternar el menú de usuario
    userMenu.classList.toggle('active');
});


// Abrir/Cerrar Menú de Navegación
document.getElementById('menu-toggle').addEventListener('click', function () {
    const navMenu = document.getElementById('menu-nav-mb');
    const userMenu = document.getElementById('menu-user-mb');
    const icon = document.getElementById('nav-link-icon');

    // Cierra el menú de usuario si está abierto
    userMenu.classList.remove('active');

    // Alterna el menú de navegación
    navMenu.classList.toggle('active');
    icon.classList.toggle('active');
    icon.classList.toggle('bi-list');
    icon.classList.toggle('bi-x');
});

// Abrir/Cerrar Menú de Usuario
document.getElementById('nav-user-mb').addEventListener('click', function () {
    const userMenu = document.getElementById('menu-user-mb');
    const navMenu = document.getElementById('menu-nav-mb');
    const icon = document.getElementById('nav-link-icon');

    // Cierra el menú de navegación si está abierto
    navMenu.classList.remove('active');
    icon.classList.remove('active');
    icon.classList.add('bi-list');  // Asegura que vuelve a "list"
    icon.classList.remove('bi-x');  // Asegura que se quita la "x"

    // Alterna el menú de usuario
    userMenu.classList.toggle('active');
});
