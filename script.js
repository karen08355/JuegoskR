let Click = new Audio("Click.mp3")
let Fondo = new Audio("Fondo.mp3")

const musica = document.getElementById('musica-fondo');
const btnSonido = document.getElementById('toggle-sound');

let sonidoActivo = false;

btnSonido.addEventListener('click', () => {
  if (!sonidoActivo) {
    Fondo.play();
    Fondo.muted = false;
    btnSonido.textContent = "🔊 Silenciar";
  } else {
    Fondo.pause();
    btnSonido.textContent = "🔈 Activar Sonido";
  }
  sonidoActivo = !sonidoActivo;
});
const canvas = document.getElementById("efecto-canvas");
const ctx = canvas.getContext("2d");
Fondo.play();

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

window.addEventListener("resize", () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
});

const numCopos = 150;
const copos = [];

for (let i = 0; i < numCopos; i++) {
  copos.push({
    x: Math.random() * width,
    y: Math.random() * height,
    radio: Math.random() * 3 + 1,
    velocidadY: Math.random() * 1 + 0.5,
    velocidadX: Math.random() * 0.5 - 0.25,
  });
}

function dibujarCopos() {
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = "white";
  ctx.beginPath();
  for (let i = 0; i < numCopos; i++) {
    const copo = copos[i];
    ctx.moveTo(copo.x, copo.y);
    ctx.arc(copo.x, copo.y, copo.radio, 0, Math.PI * 2);
  }
  ctx.fill();

  moverCopos();
  requestAnimationFrame(dibujarCopos);
}

function moverCopos() {
  for (let i = 0; i < numCopos; i++) {
    const copo = copos[i];
    copo.y += copo.velocidadY;
    copo.x += copo.velocidadX;

    if (copo.y > height) {
      copo.y = -copo.radio;
      copo.x = Math.random() * width;
    }
  }
}

dibujarCopos();