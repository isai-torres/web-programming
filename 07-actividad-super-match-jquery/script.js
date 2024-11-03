$(document).ready(function () {
  const totalPairs = 8; // Número de pares
  let attempts = 0;
  let pairsFound = 0;
  let completedGames = 0;

  function initializeGame() {
    attempts = 0;
    pairsFound = 0;
    $("#attempts").text(`Intentos: ${attempts}`);
    $("#pairs-found").text(`Pares encontrados: ${pairsFound}`);
    $("#efficiency").text(`Eficiencia: 0%`);
    createCards();
  }

  function createCards() {
    $("#game-board").empty();
    // Aquí utilizaríamos una API para obtener imágenes de personajes.
    // Ejemplo ficticio:
    let characters = ["A", "B", "C", "D", "E", "F", "G", "H"];
    characters = [...characters, ...characters]; // Duplicamos para tener pares
    characters.sort(() => 0.5 - Math.random()); // Mezclamos las cartas
    characters.forEach((character, index) =>{
      $("#game-board").append(
        `<div class="card" data-character="${character}" id="card${index}">${character}</div>`
      );
    });
    $(".card").on("click", cardClickHandler);
  }

  let flippedCards = [];
  function cardClickHandler() {
    if ($(this).hasClass("flipped") || $(this).hasClass("matched")) return;
    $(this).text($(this).data("character")).addClass("flipped");
    flippedCards.push($(this));
    if (flippedCards.length === 2) {
      checkForMatch();
    }
  }

  function checkForMatch() {
    attempts++;
    $("#attempts").text(`Intentos: ${attempts}`);
    const [card1, card2] = flippedCards;
    if (card1.data("character") === card2.data("character")) {
      // Si coinciden, se quedan volteadas
      card1.addClass("matched");
      card2.addClass("matched");
      pairsFound++;
      $("#pairs-found").text(`Pares encontrados: ${pairsFound}`);
      if (pairsFound === totalPairs) {
        completedGames++;
        $("#completed-games").text(`Juegos completados: ${completedGames}`);
        alert("¡Felicidades! Has completado el juego.");
      }
    } else {
      // Usamos un retraso para que el usuario pueda ver la segunda carta antes de ocultarla
      setTimeout(() => {
        card1.removeClass("flipped").text(""); // Oculta el contenido de la carta
        card2.removeClass("flipped").text(""); // Oculta el contenido de la carta
        alert("No parean. Inténtalo de nuevo."); // Retraso de 0.5 segundos antes de ocultar las cartas
      },500);
    }
    updateEfficiency();
    flippedCards = [];
  }

  function updateEfficiency() {
    const efficiency = Math.round((pairsFound / attempts) * 100);
    $("#efficiency").text(`Eficiencia: ${isNaN(efficiency) ? 0 : efficiency}%`);
  }

  $("#reload-game").click(function () {
    initializeGame();
  });

  initializeGame();
});