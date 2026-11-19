// Bauhaus composition: circles, triangles and bars with one big letter
// Each load gives a different random layout
const PAPER = "#f2ead8";
const INK = "#161616";
const PALETTE = ["#d62828", "#1d4e9e", "#f6bd16", "#2a9d6f", INK];
const CELL = 200; // 4x4 grid on 800x800

function setup() {
    createCanvas(800, 800);
    background(PAPER);
    noStroke();

    // Fill each grid cell with a random geometric shape
    for (let gx = 0; gx < width; gx += CELL) {
        for (let gy = 0; gy < height; gy += CELL) {
            drawCell(gx, gy);
        }
    }

    // Big letter on top, with a color shadow
    textFont("Georgia");
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    textSize(380);
    const letter = random("ABGKRWZ".split(""));
    fill(random(PALETTE) + "cc");
    text(letter, width / 2 + 8, height / 2 + 8);
    fill(INK);
    text(letter, width / 2, height / 2);
    noLoop();
}

function drawCell(x, y) {
    const c = random(PALETTE);
    const kind = floor(random(5));
    push();
    translate(x, y);
    fill(c);
    if (kind === 0) {
        circle(CELL / 2, CELL / 2, CELL * 0.8);
    } else if (kind === 1) {
        // quarter circle anchored in a random corner
        const a = floor(random(4)) * HALF_PI;
        arc(CELL / 2, CELL / 2, CELL, CELL, a, a + HALF_PI, PIE);
        fill(PAPER);
        circle(CELL / 2, CELL / 2, CELL * 0.3);
    } else if (kind === 2) {
        triangle(0, CELL, CELL, CELL, random() < 0.5 ? 0 : CELL, 0);
    } else if (kind === 3) {
        // stripes
        const n = floor(random(3, 7));
        for (let i = 0; i < n; i++) {
            rect(0, (i * CELL) / n, CELL, CELL / n / 2);
        }
    }
    // kind 4: empty cell, lets the paper breathe
    pop();
}
