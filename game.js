const celdas = document.querySelectorAll("#juego .celda");
const reiniciarBtn = document.getElementById("reiniciar");

let turno = "x"; // empieza X
let juegoActivo = true;

const combinacionesGanadoras = [
  [0,1,2],[3,4,5],[6,7,8], // filas
  [0,3,6],[1,4,7],[2,5,8], // columnas
  [0,4,8],[2,4,6]           // diagonales
];

// Marcar celda al hacer clic
function marcarCelda(celda, index) {
  if (!juegoActivo || celda.innerHTML.includes("fa-x") || celda.innerHTML.includes("fa-o")) return;

  celda.innerHTML = turno === "x" 
    ? '<i class="fa-solid fa-x"></i>' 
    : '<i class="fa-solid fa-o"></i>';

  if (verificarGanador()) {
    mostrarResultado(`${turno.toUpperCase()} ganó 🎉`);
    juegoActivo = false;
    return;
  }

  if ([...celdas].every(c => c.innerHTML.includes("fa-x") || c.innerHTML.includes("fa-o"))) {
    mostrarResultado("¡Empate! 🤝");
    juegoActivo = false;
    return;
  }

  turno = turno === "x" ? "o" : "x"; // cambiar turno
}

// Verificar ganador
function verificarGanador() {
  return combinacionesGanadoras.some(comb => {
    return comb.every(i => 
      celdas[i].innerHTML.includes(turno === "x" ? "fa-x" : "fa-o")
    );
  });
}

// Mostrar resultado y botón "Jugar de nuevo"
function mostrarResultado(mensaje) {
  const cartel = document.createElement("div");
  cartel.id = "resultado";
  cartel.innerHTML = `
    <p>${mensaje}</p>
    <button id="jugar-nuevo">Jugar de nuevo</button>
  `;
  
  const juego = document.getElementById("juego");
  juego.appendChild(cartel); // siempre encima por el z-index

  document.getElementById("jugar-nuevo").addEventListener("click", reiniciarJuego);
}


// Reiniciar juego
function reiniciarJuego() {
  celdas.forEach((c, i) => c.innerHTML = (i+1));
  turno = "x";
  juegoActivo = true;
  const cartel = document.getElementById("resultado");
  if (cartel) cartel.remove();
}

// Eventos clic
celdas.forEach((celda, index) => {
  celda.addEventListener("click", () => marcarCelda(celda, index));
});

// Botón reiniciar
reiniciarBtn.addEventListener("click", reiniciarJuego);