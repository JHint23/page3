document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("top-content");
  const searchBox = document.querySelector(".search-box");
  const searchInput = searchBox.querySelector("input");
  const clearBtn = document.getElementById("clear-search");

  const SUPABASE_URL = 'https://jepsuuzybjlsfqgrzeyw.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplcHN1dXp5Ympsc2ZxZ3J6ZXl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxMDQ2NDQsImV4cCI6MjA2NTY4MDY0NH0.t3c3b8UIWRNbSE3tHsMqc1GIN3KwAAuC4daO0eZE2Zg';; // reemplaza con tu key real
  const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  function filtrarTarjetas() {
    const filtro = searchInput.value.toLowerCase();
    const cards = container.querySelectorAll(".top-card");

    cards.forEach(card => {
      const texto = card.querySelector(".title").textContent.toLowerCase();
      card.style.display = texto.includes(filtro) ? "flex" : "none";
    });

    searchBox.style.display = "flex";
  }

  async function cargarTops() {
    const { data, error } = await supabaseClient
      .from("tops")
      .select("*")
      .order("fecha", { ascending: false });

    if (error) {
      console.error("Error al cargar tops:", error);
      container.innerHTML = "<p>No se pudo cargar el contenido.</p>";
      return;
    }

    if (!data || data.length === 0) {
      container.innerHTML = "<p>No hay tops disponibles.</p>";
      return;
    }

    container.innerHTML = "";

    data.forEach(({ imagen_url, titulo, descripcion, fecha, puntuacion, enlace }) => {
      let scoreClass = "f4"; 
      const score = parseInt(puntuacion, 10) || 0;
      const score10 = (score / 10).toFixed(1);

      if (score >= 85) {
        scoreClass = "f1"; // verde
      } else if (score >= 70) {
        scoreClass = "f2"; // amarillo
      } else if (score >= 55) {
        scoreClass = "f3"; // naranja
      }

      const link = document.createElement("a");
      link.href = enlace;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.classList.add("top-card");
      link.style.display = "flex";

      link.innerHTML = `
        <div class="top-subcard ${scoreClass}">
          <div class="puntuacion">
            <div class="circle-1 ${scoreClass}">
              <div class="circle-2">
                <div class="score">${score10}</div>
              </div>
            </div>
          </div>
          <div class="content">
            <p class="title">${titulo}</p>
            <p class="text">${descripcion}</p>
            <p class="date">${new Date(fecha).toLocaleDateString()}</p>
          </div>
        </div>
        <img src="${imagen_url}" alt="${titulo}">
      `;

      container.appendChild(link);
    });

    searchBox.style.display = "flex";
  }

  searchInput.addEventListener("input", filtrarTarjetas);

  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    const cards = container.querySelectorAll(".top-card");
    cards.forEach(card => card.style.display = "flex");
    searchBox.style.display = "flex";
  });
  await cargarTops();
});
