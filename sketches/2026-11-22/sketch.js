// Spirograph: layered hypotrochoid curves with random gear ratios
// New random layout on each reload
const LAYERS = 5;
const STEPS = 3000;

function setup() {
    createCanvas(800, 800);
    colorMode(HSB, 360, 100, 100, 100);
    background(230, 30, 8);
    noFill();

    const hueStart = random(360);
    translate(width / 2, height / 2);
    for (let i = 0; i < LAYERS; i++) {
        const t = i / (LAYERS - 1);
        stroke((hueStart + t * 150) % 360, 60, 100, 60);
        strokeWeight(1);
        // Outer gear radius shrinks with each layer
        const R = 360 - i * 55;
        drawSpiro(R, int(random(3, 9)) * random([1, 1.5]), random(0.4, 1) * R * 0.5);
    }
    noLoop();
}

// Hypotrochoid: a pen inside a small circle rolling inside a big one
function drawSpiro(R, r, d) {
    // Enough turns to close the curve
    const turns = 20 * TWO_PI;
    beginShape();
    for (let i = 0; i <= STEPS; i++) {
        const a = (i / STEPS) * turns;
        const x = (R - r) * cos(a) + d * cos(((R - r) / r) * a);
        const y = (R - r) * sin(a) - d * sin(((R - r) / r) * a);
        vertex(x, y);
    }
    endShape();
}
