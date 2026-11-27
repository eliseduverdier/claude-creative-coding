// Truchet tiles: each cell randomly gets one of two quarter-arc layouts,
// so the arcs join into winding paths. New random layout on each reload.
const TILES = 10;

function setup() {
    createCanvas(800, 800);
    background(245, 238, 220);
    noFill();
    strokeCap(SQUARE);

    const size = width / TILES;
    // Random palette: a dark ground color and a bright arc color
    colorMode(HSB, 360, 100, 100);
    const hue = random(360);
    const ground = color(hue, 60, 25);
    const arc1 = color((hue + 180) % 360, 70, 95);
    const arc2 = color((hue + 40) % 360, 30, 100);

    for (let i = 0; i < TILES; i++) {
        for (let j = 0; j < TILES; j++) {
            const x = i * size;
            const y = j * size;
            noStroke();
            fill(ground);
            rect(x, y, size, size);
            noFill();

            // Two arcs per tile, centered on opposite corners
            const flip = random() < 0.5;
            strokeWeight(size / 5);
            stroke(arc1);
            if (flip) {
                arc(x, y, size, size, 0, HALF_PI);
                arc(x + size, y + size, size, size, PI, PI + HALF_PI);
            } else {
                arc(x + size, y, size, size, HALF_PI, PI);
                arc(x, y + size, size, size, -HALF_PI, 0);
            }
            // Thin highlight on top of each arc
            strokeWeight(size / 20);
            stroke(arc2);
            if (flip) {
                arc(x, y, size, size, 0, HALF_PI);
                arc(x + size, y + size, size, size, PI, PI + HALF_PI);
            } else {
                arc(x + size, y, size, size, HALF_PI, PI);
                arc(x, y + size, size, size, -HALF_PI, 0);
            }
        }
    }
    noLoop();
}
