// header-loader.js
document.addEventListener("DOMContentLoaded", () => {
  const headerPlaceholder = document.getElementById("header-placeholder");

  if (headerPlaceholder) {
    fetch("../header.html") // cambia la ruta si está en otra carpeta
      .then(response => {
        if (!response.ok) {
          throw new Error("Error al cargar el header");
        }
        return response.text();
      })
      .then(data => {
        headerPlaceholder.innerHTML = data;
      })
      .catch(error => {
        console.error("Error al cargar el header:", error);
      });
  }
});
