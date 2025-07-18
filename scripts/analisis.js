document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("analisis-container");
  const searchBox = document.querySelector(".search-box");
  const searchInput = searchBox.querySelector("input");
  const clearBtn = document.getElementById("clear-search");

  // 🔌 Conexión a Supabase
  const SUPABASE_URL =  'https://jepsuuzybjlsfqgrzeyw.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplcHN1dXp5Ympsc2ZxZ3J6ZXl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxMDQ2NDQsImV4cCI6MjA2NTY4MDY0NH0.t3c3b8UIWRNbSE3tHsMqc1GIN3KwAAuC4daO0eZE2Zg';; // reemplaza con tu key real
  const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  // 🔍 Filtro de búsqueda
  function filtrarTarjetas() {
    const filtro = searchInput.value.toLowerCase();
    const cards = container.querySelectorAll(".analisis-card");

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

  // 📥 Cargar desde Supabase
  async function cargarAnalisis() {
    const { data, error } = await supabaseClient
      .from('analisis') // ← Tu tabla
      .select('*')
      .order('fecha', { ascending: false });

    if (error) {
      console.error("Error cargando análisis desde Supabase:", error);
      return;
    }

    if (!data || data.length === 0) {
      container.innerHTML = "<p>No hay análisis disponibles.</p>";
      return;
    }

    container.innerHTML = "";

    data.forEach(({ imagen_url, titulo, descripcion, fecha, enlace }) => {
      const card = document.createElement("a");
      card.classList.add("analisis-card");
      card.href = enlace;
      card.target = "_blank";
      card.rel = "noopener noreferrer";
      card.style.display = "flex";

      card.innerHTML = `
        <img src="${imagen_url}" alt="${titulo}">
        <div class="desc-card">
          <p class="title">${titulo}</p>
          <p class="text">${descripcion}</p>
          <p class="date">Publicado el ${new Date(fecha).toLocaleDateString()}</p>
        </div>
      `;

      container.appendChild(card);
    });

    searchBox.style.display = "flex";
  }

  // 🧹 Eventos de búsqueda
  searchInput.addEventListener("input", filtrarTarjetas);

  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    const cards = container.querySelectorAll(".analisis-card");
    cards.forEach(card => card.style.display = "flex");
    searchBox.style.display = "flex";
  });

  // 🚀 Cargar datos al iniciar
  await cargarAnalisis();
});
