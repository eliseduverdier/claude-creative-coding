// Neo-plastic grid, after Mondrian: recursive splits, primary colors, one big letter
const MARGIN = 40;
const LINE = 10;
const MIN_SIZE = 110;
const PAPER = "#f4f1e8";
const INK = "#111111";
const COLORS = ["#d62718", "#1b4fa0", "#f2c200"]; // red, blue, yellow

const cells = [];

function setup() {
    createCanvas(800, 800);
    background(PAPER);

    splitRect(MARGIN, MARGIN, width - 2 * MARGIN, height - 2 * MARGIN, 0);
    colorCells();

    for (const c of cells) drawCell(c);
    drawLetter();
    noLoop();
}

// Recursively cut a rectangle in two, until it is small enough or by chance
function splitRect(x, y, w, h, depth) {
    const canSplitX = w > MIN_SIZE * 2;
    const canSplitY = h > MIN_SIZE * 2;
    if ((!canSplitX && !canSplitY) || (depth > 1 && random() < 0.25)) {
        cells.push({ x, y, w, h, fill: PAPER });
        return;
    }
    // Cut across the longest side when both are possible
    const vertical = canSplitX && (!canSplitY || w > h || (w === h && random() < 0.5));
    if (vertical) {
        const cut = random(MIN_SIZE, w - MIN_SIZE);
        splitRect(x, y, cut, h, depth + 1);
        splitRect(x + cut, y, w - cut, h, depth + 1);
    } else {
        const cut = random(MIN_SIZE, h - MIN_SIZE);
        splitRect(x, y, w, cut, depth + 1);
        splitRect(x, y + cut, w, h - cut, depth + 1);
    }
}

// Keep most cells white, give a few of them a primary color
function colorCells() {
    for (const c of cells) {
        if (random() < 0.35) c.fill = random(COLORS);
    }
}

// Colored fill, then black borders drawn centered on the cell edges
function drawCell(c) {
    noStroke();
    fill(c.fill);
    rect(c.x, c.y, c.w, c.h);
    noFill();
    stroke(INK);
    strokeWeight(LINE);
    strokeJoin(MITER);
    rect(c.x, c.y, c.w, c.h);
}

// A large bold letter in the biggest white cell
function drawLetter() {
    let best = null;
    for (const c of cells) {
        if (c.fill === PAPER && (!best || c.w * c.h > best.w * best.h)) best = c;
    }
    if (!best) return;
    noStroke();
    fill(INK);
    textFont("Helvetica, Arial, sans-serif");
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    textSize(min(best.w, best.h) * 0.7);
    text("M", best.x + best.w / 2, best.y + best.h / 2);
}
