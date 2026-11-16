// Typography: a single letter repeated and rotated into a radial rosette
const SEED = 1113;
const LETTERS = "AGRTX";
const COLORS = ["#e63946", "#f1a208", "#2a9d8f", "#264653", "#e9c46a"];

function setup() {
    createCanvas(800, 800);
    randomSeed(SEED);
    background("#fdf6e3");
    textFont("Georgia");
    textAlign(CENTER, CENTER);
    noStroke();
    translate(width / 2, height / 2);

    // Rings from outside to inside, each with its own letter and color
    for (let ring = 0; ring < 6; ring++) {
        const radius = 340 - ring * 55;
        const count = 10 + ring * 4;
        const letter = random(LETTERS.split(""));
        fill(COLORS[ring % COLORS.length]);
        textSize(90 - ring * 10);
        for (let i = 0; i < count; i++) {
            push();
            rotate((TWO_PI / count) * i + ring * 0.2);
            translate(0, -radius);
            text(letter, 0, 0);
            pop();
        }
    }
    noLoop();
}
