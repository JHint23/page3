const container = document.getElementById("carouselTrack");
const cards = container.querySelectorAll(".card");
let currentIndex = 0;

function updateCarousel() {
  cards.forEach((card, i) => {
    card.classList.remove("active");
    // Calculamos la distancia mínima (loop)
    let diff = Math.abs(i - currentIndex);
    let maxIndex = cards.length;
    if(diff > maxIndex / 2) {
      diff = maxIndex - diff; // efecto loop
    }

    // Solo la tarjeta central (diff == 0) estará activa
    if(diff === 0) {
      card.classList.add("active");
    }

    // Ajustamos opacidad y escala para tarjetas adyacentes
    if(diff === 1) {
      card.style.opacity = "0.8";
      card.style.transform = "scale(1)";
    } else if(diff > 1) {
      card.style.opacity = "0.5";
      card.style.transform = "scale(0.8)";
    }
  });
}

function scrollCarousel(direction) {
  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = cards.length - 1;
  } else if (currentIndex >= cards.length) {
    currentIndex = 0;
  }

  // Para centrar la tarjeta activa, calculamos scrollLeft:
  const cardWidth = cards[0].offsetWidth + 20; // ancho + margin
  const scrollPosition = cardWidth * currentIndex - (container.offsetWidth / 2 - cardWidth / 2);
  container.scrollTo({
    left: scrollPosition,
    behavior: 'smooth'
  });

  updateCarousel();
}

// Inicializamos
updateCarousel();
