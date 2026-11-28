// Circle packing: random circles are placed one by one,
// each one grows until it touches another circle or the border.
const MAX_CIRCLES = 600;
const ATTEMPTS = 20000;
const MARGIN = 2;

function setup() {
    createCanvas(800, 800);
    colorMode(HSB, 360, 100, 100);
    background(0, 0, 8);
    noStroke();

    const hue = random(360);
    const circles = [];

    for (let i = 0; i < ATTEMPTS && circles.length < MAX_CIRCLES; i++) {
        const x = random(width);
        const y = random(height);

        // Largest radius that fits here (distance to border and to other circles)
        let r = min(x, y, width - x, height - y);
        for (const c of circles) {
            r = min(r, dist(x, y, c.x, c.y) - c.r - MARGIN);
        }
        if (r < 4) continue;

        circles.push({ x, y, r });

        // Color depends on size: small circles are bright, big ones are darker
        const h = (hue + map(r, 4, 100, 0, 90, true)) % 360;
        fill(h, 70, map(r, 4, 100, 100, 50, true));
        circle(x, y, r * 2);
        // Small light dot in the middle
        fill(0, 0, 100, 0.6);
        circle(x, y, r * 0.3);
    }
    noLoop();
}
