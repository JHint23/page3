document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("guias-container");
  const searchBox = document.querySelector(".search-box");
  const searchInput = searchBox.querySelector("input");
  const clearBtn = document.getElementById("clear-search");

  // Conexión a Supabase
  const SUPABASE_URL =  'https://jepsuuzybjlsfqgrzeyw.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplcHN1dXp5Ympsc2ZxZ3J6ZXl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxMDQ2NDQsImV4cCI6MjA2NTY4MDY0NH0.t3c3b8UIWRNbSE3tHsMqc1GIN3KwAAuC4daO0eZE2Zg';; // reemplaza con tu key real
  const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  function filtrarTarjetas() {
    const filtro = searchInput.value.toLowerCase();
    const cards = container.querySelectorAll(".guias-card");
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

    searchBox.style.display = "flex";
  }

  async function cargarGuias() {
    const { data, error } = await supabaseClient
      .from('guia')  // nombre de tu tabla en Supabase
      .select('*')
      .order('fecha', { ascending: false });

    if (error) {
      console.error("Error cargando guías desde Supabase:", error);
      container.innerHTML = "<p>No se pudieron cargar las guías.</p>";
      return;
    }

    if (!data || data.length === 0) {
      container.innerHTML = "<p>No hay guías disponibles.</p>";
      return;
    }

    container.innerHTML = "";

    data.forEach(({ imagen_url, titulo, descripcion, fecha, enlace }) => {
      const card = document.createElement("a");
      card.classList.add("guias-card");
      card.href = enlace;
      card.target = "_blank";
      card.rel = "noopener noreferrer";
      card.style.display = "flex";

      card.innerHTML = `
        <img src="${imagen_url}" alt="${titulo}">
        <div class="desc-card">
          <p class="title">${titulo}</p>
          <p class="text">${descripcion}</p>
          <p class="date">Añadido el ${new Date(fecha).toLocaleDateString()}</p>
        </div>
      `;

      container.appendChild(card);
    });

    searchBox.style.display = "flex";

    // Añadir eventos para búsqueda y limpiar
    searchInput.addEventListener("input", filtrarTarjetas);
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      const cards = container.querySelectorAll(".guias-card");
      cards.forEach(card => (card.style.display = "flex"));
      searchBox.style.display = "flex";
    });
  }

  await cargarGuias();
});
