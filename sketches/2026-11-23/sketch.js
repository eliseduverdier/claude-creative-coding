// Flow field: particles follow a Perlin noise vector field and leave trails
// New random layout on each reload
const PARTICLES = 600;
const STEPS = 120;
const SCALE = 0.004;

function setup() {
    createCanvas(800, 800);
    colorMode(HSB, 360, 100, 100, 100);
    background(220, 40, 10);
    noiseSeed(random(10000));
    noFill();

    const hueStart = random(360);
    for (let i = 0; i < PARTICLES; i++) {
        let x = random(width);
        let y = random(height);
        // Hue depends on the starting position
        stroke((hueStart + (x / width) * 90) % 360, 70, 100, 30);
        strokeWeight(random(0.5, 1.5));
        beginShape();
        for (let s = 0; s < STEPS; s++) {
            vertex(x, y);
            // The noise value gives the direction of the flow
            const angle = noise(x * SCALE, y * SCALE) * TWO_PI * 2;
            x += cos(angle) * 2;
            y += sin(angle) * 2;
        }
        endShape();
    }
    noLoop();
}
