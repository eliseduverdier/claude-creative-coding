// Perlin flow field, ink on paper palette
const SIZE = 800;
const SEED = 16;
const PAPER = "#f2ece0";
const INKS = ["#14110f", "#1f2a44", "#3b2a20", "#6b1f1f"]; // black, blue-black, sepia, red ink
const NOISE_SCALE = 0.0035;
const STEP = 2;
const NUM_LINES = 900;
const MAX_STEPS = 220;

function setup() {
    createCanvas(SIZE, SIZE);
    randomSeed(SEED);
    noiseSeed(SEED);
    noLoop();
}

function draw() {
    background(PAPER);
    drawPaperGrain();
    noFill();

    for (let i = 0; i < NUM_LINES; i++) {
        drawStroke(random(-20, width + 20), random(-20, height + 20));
    }
}

// Follow the flow field from a starting point, like a pen dragged by the wind
function drawStroke(x, y) {
    // Mostly black ink, with rare coloured accents
    const ink = random() < 0.85 ? INKS[0] : random(INKS.slice(1));
    const c = color(ink);
    const maxWeight = random(0.4, 1.6);
    const steps = floor(random(40, MAX_STEPS));

    for (let s = 0; s < steps; s++) {
        const angle = noise(x * NOISE_SCALE, y * NOISE_SCALE) * TWO_PI * 2;
        const nx = x + cos(angle) * STEP;
        const ny = y + sin(angle) * STEP;

        // Ink fades in and out along the stroke
        const t = s / steps;
        const fade = sin(t * PI);
        c.setAlpha(40 + 160 * fade);
        stroke(c);
        strokeWeight(maxWeight * (0.4 + 0.6 * fade));
        line(x, y, nx, ny);

        x = nx;
        y = ny;
        if (x < -20 || x > width + 20 || y < -20 || y > height + 20) break;
    }
}

// Subtle speckles to mimic paper texture
function drawPaperGrain() {
    noStroke();
    for (let i = 0; i < 6000; i++) {
        fill(120, 100, 70, random(4, 14));
        circle(random(width), random(height), random(0.5, 1.8));
    }
}
