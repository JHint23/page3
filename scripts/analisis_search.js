document.addEventListener("DOMContentLoaded", () => {
  const searchBox = document.querySelector(".search-box");
  const searchInput = searchBox.querySelector("input");
  const clearBtn = document.getElementById("clear-search");
  const container = document.getElementById("analisis-container");

  // Función para filtrar tarjetas por texto
  function filtrarTarjetas() {
    const filtro = searchInput.value.toLowerCase();
    const cards = container.querySelectorAll(".analisis-card");
    let anyVisible = false;

    cards.forEach(card => {
      // Puedes ajustar qué texto buscar, aquí ejemplo: título + descripción
      const texto = (card.querySelector(".title").textContent + " " +
                     card.querySelector(".text").textContent).toLowerCase();

      if (texto.includes(filtro)) {
        card.style.display = "flex"; // o inline-block, según tu diseño
        anyVisible = true;
      } else {
        card.style.display = "none";
      }
    });

    // Mostrar search box solo si hay tarjetas y coincidencias
    searchBox.style.display = anyVisible && cards.length > 0 ? "flex" : "none";
  }

  // Evento input para filtrar en vivo
  searchInput.addEventListener("input", filtrarTarjetas);

  // Botón para limpiar búsqueda y mostrar todas las tarjetas
  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    const cards = container.querySelectorAll(".analisis-card");
    cards.forEach(card => card.style.display = "flex");
    searchBox.style.display = cards.length > 0 ? "flex" : "none";
  });

  // Al cargar la página, oculta search box si no hay tarjetas
  const initialCards = container.querySelectorAll(".analisis-card");
  searchBox.style.display = initialCards.length > 0 ? "flex" : "none";
});
