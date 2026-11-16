// Mondrian-style grid: recursive subdivision with primary colors
const SEED = 1112;
const PAPER = "#f4f1ea";
const PALETTE = ["#d8231f", "#1f4ea1", "#f2c81c", PAPER, PAPER, PAPER];
const LINE = 10;

function setup() {
    createCanvas(800, 800);
    randomSeed(SEED);
    background(PAPER);
    stroke("#111");
    strokeWeight(LINE);
    subdivide(0, 0, width, height, 0);
    noFill();
    rect(0, 0, width, height); // frame
    noLoop();
}

// Split a rectangle in two until it is small enough or by chance
function subdivide(x, y, w, h, depth) {
    const tooSmall = w < 120 || h < 120;
    if (tooSmall || (depth > 1 && random() < 0.25)) {
        fill(random(PALETTE));
        rect(x, y, w, h);
        return;
    }
    if (w > h) {
        const cut = w * random(0.3, 0.7);
        subdivide(x, y, cut, h, depth + 1);
        subdivide(x + cut, y, w - cut, h, depth + 1);
    } else {
        const cut = h * random(0.3, 0.7);
        subdivide(x, y, w, cut, depth + 1);
        subdivide(x, y + cut, w, h - cut, depth + 1);
    }
}
