// Op art: concentric circles shifted by a sine wave, black and white with one accent
const SEED = 1115;
const ACCENT = "#ff3b30";

function setup() {
    createCanvas(800, 800);
    randomSeed(SEED);
    background(255);
    noStroke();

    const rings = 40;
    // Draw from the largest ring to the smallest, alternating colors
    for (let i = rings; i > 0; i--) {
        const r = i * 10 + 10;
        const shift = sin(i * 0.4) * 60;
        if (i % 13 === 0) fill(ACCENT);
        else fill(i % 2 ? 0 : 255);
        circle(width / 2 + shift, height / 2 + cos(i * 0.3) * 30, r * 2);
    }
    noLoop();
}
