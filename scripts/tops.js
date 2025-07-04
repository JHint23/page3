document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("top-content");
  const searchBox = document.querySelector(".search-box");
  const searchInput = searchBox.querySelector("input");
  const clearBtn = document.getElementById("clear-search");

  function filtrarTarjetas() {
    const filtro = searchInput.value.toLowerCase();
    const cards = container.querySelectorAll(".top-card");

    cards.forEach(card => {
      const texto = (
        card.querySelector(".title").textContent +
        " " +
        card.querySelector(".text").textContent
      ).toLowerCase();

      card.style.display = texto.includes(filtro) ? "flex" : "none";
    });

    searchBox.style.display = "flex";
  }

  fetch("data/tops.txt")
    .then(res => {
      if (!res.ok) throw new Error("No se pudo cargar el archivo de tops.");
      return res.text();
    })
    .then(textoCrudo => {
      const bloques = textoCrudo.trim().split('---');

      bloques.forEach(bloque => {
        const linea = bloque.replace(/\n/g, ' ').trim();
        if (linea === '') return;

        const partes = linea.split("|");
        if (partes.length < 5) return; // ignorar si no hay suficientes partes

        const [imgSrc, title, description, score, url] = partes.map(p => p.trim());

        const scoreValue = parseInt(score, 10);
        let scoreClass = "min";
        if (scoreValue >= 90) {
          scoreClass = "max";
        } else if (scoreValue >= 75) {
          scoreClass = "mid";
        }

        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.classList.add("top-card");
        link.style.display = "flex";

        link.innerHTML = `
          <div class="top-subcard">
            <div class="puntuacion">
              <div class="circle-1 ${scoreClass}">
                <div class="circle-2">
                  <div class="score">${scoreValue}</div>
                </div>
              </div>
            </div>
            <div class="content">
              <p class="title">${title}</p>
              <p class="text">${description}</p>
            </div>
          </div>
          <img src="${imgSrc}" alt="${title}">
        `;

        container.appendChild(link);
      });

      searchBox.style.display = "flex";

      searchInput.addEventListener("input", filtrarTarjetas);

      clearBtn.addEventListener("click", () => {
        searchInput.value = "";
        const cards = container.querySelectorAll(".top-card");
        cards.forEach(card => card.style.display = "flex");
        searchBox.style.display = "flex";
      });
    })
    .catch(err => console.error("Error cargando tops:", err));
});
