function setup() {
    createCanvas(800, 600);
    noLoop();
}

function draw() {
    background("#fff7e8");

    noStroke();

    // Tallo
    stroke("#367a3d");
    strokeWeight(14);
    noFill();
    bezier(400, 250, 395, 335, 410, 425, 400, 525);

    // Hojas
    noStroke();
    fill("#4d9b50");
    push();
    translate(397, 390);
    rotate(0.55);
    ellipse(-38, 0, 92, 38);
    pop();

    push();
    translate(405, 455);
    rotate(0.55);
    ellipse(38, 0, 92, 38);
    pop();

    // Nervaduras de las hojas
    stroke("#2f7139");
    strokeWeight(2);
    line(397, 390, 350, 365);
    line(405, 455, 452, 480);

    // Pétalos
    noStroke();
    const petalCount = 12;
    for (let i = 0; i < petalCount; i++) {
        push();
        translate(400, 220);
        rotate(TWO_PI * i / petalCount);
        fill(i % 2 === 0 ? "#ff922e" : "#ff7b1c");
        ellipse(0, -65, 46, 88);
        pop();
    }

    // Centro de la flor
    fill("#f5b932");
    circle(400, 220, 72);
    fill("#d9791c");
    circle(400, 220, 40);
}
