// Bauhaus quarter circles, after Josef Albers and Herbert Bayer: a grid of arc tiles and one big letter
const SEED = 20261118; // fixed seed for a reproducible render
const N = 4; // tiles per side
const MARGIN = 60;
const PAPER = "#efe8d8";
const INK = "#1a1a1a";
const COLORS = ["#e63b2e", "#1f4e9c", "#f4b400", "#2a9d8f"]; // red, blue, yellow, teal

function setup() {
    createCanvas(800, 800);
    randomSeed(SEED);
    background(PAPER);
    noStroke();

    const size = (width - 2 * MARGIN) / N;
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            drawTile(MARGIN + i * size, MARGIN + j * size, size);
        }
    }
    drawLetter();
    noLoop();
}

// One tile: concentric quarter circles anchored on a random corner
function drawTile(x, y, s) {
    const corner = floor(random(4)); // 0..3 = which corner is the arc center
    const cx = x + (corner % 2) * s;
    const cy = y + floor(corner / 2) * s;
    // Angle range pointing toward the tile's inside
    const start = HALF_PI * [0, 1, 3, 2][corner];
    const rings = floor(random(2, 5));
    const first = random(COLORS);

    fill(random() < 0.3 ? random(COLORS) : PAPER);
    rect(x, y, s, s);

    // Clip the arcs to the tile so nothing leaks outside
    drawingContext.save();
    drawingContext.beginPath();
    drawingContext.rect(x, y, s, s);
    drawingContext.clip();
    for (let r = rings; r >= 1; r--) {
        fill(r % 2 === 0 ? INK : first);
        const d = (s * 2 * r) / rings;
        arc(cx, cy, d, d, start, start + HALF_PI, PIE);
    }
    drawingContext.restore();
}

// A single big lowercase letter, in the lower right, in a bold sans-serif
function drawLetter() {
    fill(INK);
    textFont("Helvetica, Arial, sans-serif");
    textStyle(BOLD);
    textAlign(RIGHT, BASELINE);
    textSize(150);
    text("a", width - MARGIN, height - 4);
}
