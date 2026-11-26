// Joy Division style ridgelines: stacked noise-displaced lines,
// each filled with the background color to hide the lines behind it.
// New random layout on each reload.
const LINES = 45;
const STEP = 4;

function setup() {
    createCanvas(800, 800);
    background(10);
    stroke(240);
    strokeWeight(1.5);
    noLoop();

    const seed = random(1000);
    const margin = 100;

    for (let j = 0; j < LINES; j++) {
        const baseY = map(j, 0, LINES - 1, 160, height - 60);
        fill(10);
        beginShape();
        vertex(margin, baseY);
        for (let x = margin; x <= width - margin; x += STEP) {
            // Peaks are strongest in the middle of the line
            const center = 1 - abs(map(x, margin, width - margin, -1, 1));
            const h = noise(x * 0.01, j * 0.15, seed) * 120 * center * center;
            vertex(x, baseY - h);
        }
        vertex(width - margin, baseY);
        endShape(CLOSE);
    }
}
