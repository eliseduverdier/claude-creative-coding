// Perlin flow field, ink on paper
const SEED = 16;
const NUM_STROKES = 1400;
const STEPS = 140;
const STEP_LENGTH = 2.2;
const NOISE_SCALE = 0.004;
const PAPER = "#f2ecde";
const INKS = ["#14110f", "#1d2a44", "#3a2a22", "#7a1f1f"]; // black, indigo, sepia, red seal

function setup() {
    createCanvas(800, 800);
    randomSeed(SEED);
    noiseSeed(SEED);
    background(PAPER);
    drawPaperGrain();
    noFill();

    for (let n = 0; n < NUM_STROKES; n++) {
        drawStroke(random(-50, width + 50), random(-50, height + 50), pickInk());
    }
    noLoop();
}

// Mostly black ink, with rarer colored accents
function pickInk() {
    const r = random();
    if (r < 0.7) return INKS[0];
    if (r < 0.88) return INKS[1];
    if (r < 0.96) return INKS[2];
    return INKS[3];
}

// Angle of the flow at a given point, from Perlin noise
function flowAngle(x, y) {
    return noise(x * NOISE_SCALE, y * NOISE_SCALE) * TWO_PI * 2;
}

// Follow the field from a start point, thinning the line like a dry brush
function drawStroke(x, y, ink) {
    const c = color(ink);
    const maxWeight = random(0.6, 2.2);
    for (let i = 0; i < STEPS; i++) {
        const a = flowAngle(x, y);
        const nx = x + cos(a) * STEP_LENGTH;
        const ny = y + sin(a) * STEP_LENGTH;
        const t = i / STEPS;
        const fade = sin(t * PI); // thin at both ends
        c.setAlpha(40 + 140 * fade);
        stroke(c);
        strokeWeight(maxWeight * fade + 0.2);
        line(x, y, nx, ny);
        x = nx;
        y = ny;
    }
}

// Subtle speckles to mimic paper fibers
function drawPaperGrain() {
    noStroke();
    for (let i = 0; i < 6000; i++) {
        fill(120, 100, 70, random(5, 20));
        circle(random(width), random(height), random(0.5, 2));
    }
}
