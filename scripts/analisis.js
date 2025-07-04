document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("analisis-container");
  const searchBox = document.querySelector(".search-box");
  const searchInput = searchBox.querySelector("input");
  const clearBtn = document.getElementById("clear-search");

  function filtrarTarjetas() {
    const filtro = searchInput.value.toLowerCase();
    const cards = container.querySelectorAll(".analisis-card");
    let anyVisible = false;

    cards.forEach(card => {
      const texto = card.querySelector(".title").textContent.toLowerCase();

      if (texto.includes(filtro)) {
        card.style.display = "flex";
        anyVisible = true;
      } else {
        card.style.display = "none";
      }
    });

    // Siempre mostrar el searchbox (barra de búsqueda)
    searchBox.style.display = "flex";

    // Opcional: mostrar mensaje si no hay resultados
    // (Si quieres, puedo ayudarte a implementarlo)
  }

  fetch("data/analisis.txt")
    .then(res => {
      if (!res.ok) throw new Error("No se pudo cargar el archivo de análisis.");
      return res.text();
    })
    .then(textoCrudo => {
      const bloques = textoCrudo.trim().split('---');

      bloques.forEach(bloque => {
        const linea = bloque.replace(/\n/g, ' ').trim();
        if (linea === '') return;

        const [imgSrc, title, description, date, link] = linea.split("|");

        const card = document.createElement("a");
        card.classList.add("analisis-card");
        card.href = link.trim();
        card.target = "_blank";
        card.rel = "noopener noreferrer";
        card.style.display = "flex";

        card.innerHTML = `
          <img src="${imgSrc.trim()}" alt="">
          <div class="desc-card">
            <p class="title">${title.trim()}</p>
            <p class="text">${description.trim()}</p>
            <p class="date">${date.trim()}</p>
          </div>
        `;

        container.appendChild(card);
      });

      // Mostrar searchBox siempre
      searchBox.style.display = "flex";

      // Eventos para filtrar y limpiar búsqueda
      searchInput.addEventListener("input", filtrarTarjetas);

      clearBtn.addEventListener("click", () => {
        searchInput.value = "";
        const cards = container.querySelectorAll(".analisis-card");
        cards.forEach(card => card.style.display = "flex");
        searchBox.style.display = "flex";
      });
    })
    .catch(err => console.error("Error cargando análisis:", err));
});
