// 

let ROJO = [215, 38, 46];
let AMARILLO = [246, 197, 43];
let AZUL = [31, 79, 163];
let NEGRO = [20, 16, 18];
let BLANCO = [255, 255, 255];
let CREMA = [243, 233, 214];
let ROSA = [234, 76, 137];
let VERDE = [47, 163, 107];

let escena = "portada";
let siguiente = "";
let tiempo = 0;
let estrellaX = 0;
let estrellaY = 0;

function setup() {
  createCanvas(960, 540);
}

function draw() {
  switch (escena) {
    case "portada":
      dibujarPortada();
      break;
    case "separador":
      dibujarSeparador();
      break;
    case "calle":
      dibujarCalle();
      break;
    case "granbaile":
      dibujarGranBaile();
      break;
  }
}

function irA(nombre) {
  siguiente = nombre;
  escena = "separador";
  tiempo = millis();
}

function dibujarPortada() {
  background(...ROJO);
  noStroke();
  fill(...BLANCO);
  textFont("sans-serif");
  textStyle(BOLD);
  textSize(115);
  textAlign(LEFT, CENTER);
  let inicio = width / 2 - textWidth("SANALEJO") / 2;
  text("SANALEJO", inicio, 240);

  // Cuernos y cola del logo
  triangle(inicio + 5, 190, inicio - 20, 150, inicio + 25, 180);
  triangle(inicio + 45, 180, inicio + 60, 140, inicio + 65, 190);
  stroke(...BLANCO);
  strokeWeight(6);
  line(inicio + 10, 300, inicio - 25, 320);
  noStroke();
  triangle(inicio - 40, 330, inicio - 18, 308, inicio - 28, 336);

  // Estrella de la A (botón)
  estrellaX = inicio + textWidth("SAN") + textWidth("A") / 2;
  estrellaY = 265;
  fill(...AMARILLO);
  estrella(estrellaX, estrellaY, 8, 18);

  fill(...BLANCO);
  textAlign(CENTER, CENTER);
  textStyle(NORMAL);
  textSize(24);
  text("ALMA Y LOCURA", 480, 360);
  textSize(14);
  text("toca la estrella", 480, 470);
}

function dibujarSeparador() {
  background(...NEGRO);
  fill(...BLANCO);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  textSize(70);
  let titulo = siguiente === "calle" ? "LA RUMBA" : "EL GRAN BAILE";
  text(titulo, 480, 250);
  fill(...AMARILLO);
  estrella(480, 340, 7, 16);

  if (millis() - tiempo > 1500) {
    escena = siguiente;
  }
}

function dibujarCalle() {
  background(...AZUL);
  noStroke();
  fill(...ROJO);
  circle(480, 100, 140);
  fill(...NEGRO);
  rect(0, 340, 960, 200);

  // Los locales son decorativos, no tienen interacción
  local(20, ROJO, "EL DIABLO");
  local(205, ROSA, "MUJER CALAVERA");
  local(390, AMARILLO, "EL CULEVANTE");
  local(575, AZUL, "GUARICHA");
  local(760, VERDE, "TU CULPA");

  fill(...ROJO);
  rect(370, 440, 220, 30);
  fill(...BLANCO);
  textStyle(BOLD);
  textSize(18);
  textAlign(CENTER, CENTER);
  text("EL GRAN BAILE", 480, 420);
  fill(...AMARILLO);
  estrella(480, 385, 8, 18);
  fill(...BLANCO);
  textStyle(NORMAL);
  textSize(13);
  text("toca la estrella para entrar", 480, 495);
}

function local(x, c, nombre) {
  fill(...CREMA);
  rect(x, 200, 170, 140);
  fill(...c);
  rect(x, 200, 170, 40);
  rect(x + 55, 260, 60, 80);
  fill(...(c === AMARILLO ? NEGRO : BLANCO));
  textStyle(BOLD);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(nombre, x + 85, 220);
  // Sin estrellas clicables sobre los locales
}

function dibujarGranBaile() {
  // Al mover el mouse de izquierda a derecha cambia ALMA -> LOCURA
  let mezcla = constrain(map(mouseX, 0, width, 0, 1), 0, 1);
  background(lerpColor(color(...CREMA), color(...ROJO), mezcla));
  noStroke();
  fill(...NEGRO);
  rect(200, 300, 560, 40);
  fill(...BLANCO);
  textStyle(BOLD);
  textSize(26);
  textAlign(CENTER, CENTER);
  text("SANALEJO", 480, 318);

  let colores = [ROJO, AMARILLO, AZUL, ROSA, VERDE];
  for (let i = 0; i < 5; i++) {
    let salto = abs(sin(frameCount * (0.02 + mezcla * 0.2) + i)) * 20 * mezcla;
    let c = lerpColor(color(150), color(...colores[i]), mezcla);
    persona(300 + i * 90, 240 - salto, c);
  }
  for (let i = 0; i < 10; i++) {
    persona(50 + i * 95, 440, color(...NEGRO));
  }

  fill(...NEGRO);
  textStyle(NORMAL);
  textSize(16);
  textAlign(LEFT, CENTER);
  text("ALMA", 20, 520);
  textAlign(RIGHT, CENTER);
  text("LOCURA", 940, 520);

  // Único botón: estrella para volver al inicio
  fill(...AMARILLO);
  estrella(480, 80, 14, 32);
  fill(...NEGRO);
  textSize(13);
  textAlign(CENTER, CENTER);
  text("volver al inicio", 480, 125);
}

function mousePressed() {
  if (escena === "portada") {
    if (dist(mouseX, mouseY, estrellaX, estrellaY) < 30) {
      irA("calle");
    }
  } else if (escena === "calle") {
    if (dist(mouseX, mouseY, 480, 385) < 30) {
      irA("granbaile");
    }
  } else if (escena === "granbaile") {
    if (dist(mouseX, mouseY, 480, 80) < 38) {
      escena = "portada";
    }
  }
}

function estrella(x, y, r1, r2) {
  noStroke();
  beginShape();
  for (let i = 0; i < 10; i++) {
    let angulo = -HALF_PI + (i * PI) / 5;
    let r = i % 2 === 0 ? r2 : r1;
    vertex(x + cos(angulo) * r, y + sin(angulo) * r);
  }
  endShape(CLOSE);
}

function persona(x, y, c) {
  noStroke();
  fill(c);
  rect(x - 15, y, 30, 60);
  circle(x, y - 15, 26);
}