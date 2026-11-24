// Stained glass: pixels are colored by their nearest random seed (Voronoi cells)
// with dark lead lines where two cells meet. New random layout on each reload.
const SEEDS = 40;
const LEAD = 6;

function setup() {
    createCanvas(800, 800);
    colorMode(HSB, 360, 100, 100);
    pixelDensity(1);
    noStroke();

    // Random seeds, each with its own color
    const baseHue = random(360);
    const seeds = [];
    for (let i = 0; i < SEEDS; i++) {
        seeds.push({
            x: random(width),
            y: random(height),
            color: color((baseHue + random(-60, 60) + 360) % 360, random(50, 90), random(60, 100)),
        });
    }

    loadPixels();
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            // Find the two closest seeds
            let d1 = Infinity;
            let d2 = Infinity;
            let nearest = seeds[0];
            for (const s of seeds) {
                const d = dist(x, y, s.x, s.y);
                if (d < d1) {
                    d2 = d1;
                    d1 = d;
                    nearest = s;
                } else if (d < d2) {
                    d2 = d;
                }
            }
            // Close to a border: draw lead; otherwise glass, brighter near the seed
            const i = 4 * (y * width + x);
            let c;
            if (d2 - d1 < LEAD) {
                c = [20, 20, 20];
            } else {
                const k = map(d1, 0, 120, 1, 0.65, true);
                c = [red(nearest.color) * k, green(nearest.color) * k, blue(nearest.color) * k];
            }
            pixels[i] = c[0];
            pixels[i + 1] = c[1];
            pixels[i + 2] = c[2];
            pixels[i + 3] = 255;
        }
    }
    updatePixels();
    noLoop();
}
