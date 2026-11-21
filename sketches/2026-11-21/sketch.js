// Wobbly rings: concentric closed curves distorted by Perlin noise
// New random seed on each reload
const NUM_RINGS = 60;
const POINTS = 240;
const MAX_RADIUS = 380;
const WOBBLE = 0.35; // how strongly noise deforms each ring
const NOISE_SCALE = 0.9;

function setup() {
    createCanvas(800, 800);
    colorMode(HSB, 360, 100, 100, 100);
    background(20, 20, 8);
    noFill();

    const hueStart = random(360);
    const offset = random(1000); // random area of the noise field

    translate(width / 2, height / 2);
    for (let r = 1; r <= NUM_RINGS; r++) {
        const t = r / NUM_RINGS;
        stroke((hueStart + t * 120) % 360, 70, 95, 80);
        strokeWeight(1 + t * 1.5);
        drawRing(t * MAX_RADIUS, t, offset);
    }
    noLoop();
}

// One closed curve whose radius varies with noise; outer rings wobble more
function drawRing(radius, t, offset) {
    beginShape();
    for (let i = 0; i < POINTS; i++) {
        const a = (i / POINTS) * TWO_PI;
        // Sample noise on a circle so the curve closes seamlessly
        const n = noise(offset + cos(a) * NOISE_SCALE + t * 2, offset + sin(a) * NOISE_SCALE + t * 2);
        const rr = radius * (1 + (n - 0.5) * 2 * WOBBLE * t);
        vertex(cos(a) * rr, sin(a) * rr);
    }
    endShape(CLOSE);
}
