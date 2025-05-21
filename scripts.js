const houses = ["gryffindor", "slytherin", "ravenclaw", "hufflepuff"];
const houseNames = {
  gryffindor: "Gryffindor",
  slytherin: "Slytherin",
  ravenclaw: "Ravenclaw",
  hufflepuff: "Hufflepuff",
};

const button = document.getElementById("spin-roulette");
const resultContainer = document.getElementById("house-result");
const houseName = document.getElementById("house-name");
const invitationContainer = document.querySelector(".triangle-container");
const mapVideo = document.querySelector(".background-video");

// Sonidos mágicos
const spinSound = new Audio("./audio/spin.mp3");
const selectSound = new Audio("./audio/select.mp3");
const sparkleSound = new Audio("./audio/sparkle.mp3");

const houseSounds = {
  gryffindor: new Audio("./audio/gryffindor.mp3"),
  slytherin: new Audio("./audio/slytherin.mp3"),
  ravenclaw: new Audio("./audio/ravenclaw.mp3"),
  hufflepuff: new Audio("./audio/hufflepuff.mp3"),
};

// 🎵 Música de fondo
const backgroundMusic = new Audio("./audio/music.mp3");
backgroundMusic.volume = 0.3;
backgroundMusic.loop = true;

// Asegurarse de que siempre se mantenga sonando
backgroundMusic.addEventListener("ended", () => {
  backgroundMusic.currentTime = 0;
  backgroundMusic.play();
});

// Iniciar la música
backgroundMusic.play().catch((error) => {
  console.log("Autoplay bloqueado por el navegador:", error);
});
// 🎯 Escudos de cada casa
const houseShields = {
  gryffindor: "./img/shields/gryffindor.png",
  slytherin: "./img/shields/slytherin.png",
  ravenclaw: "./img/shields/ravenclaw.png",
  hufflepuff: "./img/shields/hufflepuff.png",
};

/* 🎇 Función para generar partículas mágicas */
const generateParticles = (color) => {
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    particle.style.backgroundColor = color;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    document.body.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 5000);
  }
};

/* ✨ Función para efecto de destello mágico */
const magicFlash = (color) => {
  const flash = document.createElement("div");
  flash.classList.add("flash");
  flash.style.backgroundColor = color;
  document.body.appendChild(flash);

  setTimeout(() => {
    flash.remove();
  }, 1500);
};

/* ✨ Función para mostrar el escudo de la casa */
const showHouseShield = (house) => {
  const shield = document.createElement("img");
  shield.src = houseShields[house];
  shield.classList.add("house-shield");
  invitationContainer.appendChild(shield);

  // Aplicar animación de entrada
  shield.classList.add("animate__animated", "animate__bounceIn");
  shield.style.position = "absolute";
  shield.style.width = "550px"; // 👈 Aquí es donde defines el tamaño
  shield.style.height = "auto"; // 👈 Esto asegura que mantenga la proporción

  // Después de 3 segundos, aplicar fadeOutUp
  setTimeout(() => {
    shield.classList.remove("animate__bounceOut");
    shield.classList.add("animate__bounceOut");
  }, 3000);

  // Remover después de la animación
  setTimeout(() => {
    shield.remove();
  }, 5000);
};

/* ✨ Función para el cambio de color de la casa */
const changeHouseColor = (house) => {
  invitationContainer.classList.remove(...houses);
  invitationContainer.classList.add(house);

  // Animación del contenedor
  invitationContainer.classList.add("animate__animated", "animate__fadeInDown");

  // Colores para partículas y destello
  const colors = {
    gryffindor: "#7f0909",
    slytherin: "#1a472a",
    ravenclaw: "#0e1a40",
    hufflepuff: "#ecb939",
  };

  generateParticles(colors[house]);
  magicFlash(colors[house]);
  showHouseShield(house);

  // Sonido de la casa después de 2 segundos
  if (houseSounds[house]) {
    setTimeout(() => {
      houseSounds[house].play();
    }, 2000);
  }

  // ✨ Activar la animación del mapa
  mapVideo.classList.add("map-reveal");

  // 🔥 Actualizar el texto en grande con color blanco
  resultContainer.innerHTML = `<p>¡Felicidades! Eres parte de:</p><h1 style="font-size: 2.5em; margin-top: 10px; font-weight: bold; color: white;">${houseNames[
    house
  ].toUpperCase()}</h1>`;
  resultContainer.classList.remove("hidden");

  // Eliminar el sombrero y agregar el botón de regreso
  button.style.display = "none";

  const backButton = document.createElement("button");
  backButton.textContent = "↩ Regresar";
  backButton.classList.add("return-button");

  invitationContainer.appendChild(backButton);

  // Acción para recargar la página al hacer clic
  backButton.addEventListener("click", () => {
    window.location.reload();
  });

  setTimeout(() => {
    mapVideo.classList.remove("map-reveal");
  }, 5000);
};

/* 🎡 Evento para girar la ruleta */
button.addEventListener("click", () => {
  spinSound.play();

  // Activar la animación de giro y encogimiento
  const hatImage = button.querySelector("img");
  hatImage.classList.add("hat-spin");
  setTimeout(() => {
    hatImage.classList.remove("hat-spin");
    hatImage.classList.add("hat-shrink");
  }, 1500);

  button.disabled = true;

  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * houses.length);
    const selectedHouse = houses[randomIndex];
    changeHouseColor(selectedHouse);

    // Sonidos mágicos
    selectSound.play();
    sparkleSound.play();

    button.disabled = false;
  }, 2000);
});
