// Mondrian split: recursive grid subdivision, primary colors and a few small letters
// Each load gives a different random layout
const PAPER = "#f4f1e8";
const INK = "#161616";
const COLORS = ["#E938E4", "#25D7D7", "#f6bd16"];
const LINE = 10; // thickness of the black lines
const MIN_SIZE = 120; // cells smaller than this are not split anymore

function setup() {
    createCanvas(800, 800);
    background(PAPER);
    noStroke();
    textFont("Helvetica");
    textStyle(BOLD);
    textAlign(CENTER, CENTER);

    splitCell(0, 0, width, height, 0);
    noLoop();
}

// Split a cell in two along a random axis, or paint it if it is small enough
function splitCell(x, y, w, h, depth) {
    const canSplit = w > MIN_SIZE * 2 || h > MIN_SIZE * 2;
    if (!canSplit || (depth > 1 && random() < 0.25)) {
        paintCell(x, y, w, h);
        return;
    }
    // split along the longest side, with some randomness
    const vertical = w > h ? random() < 0.8 : random() < 0.2;
    if (vertical && w > MIN_SIZE * 2) {
        const cut = random(MIN_SIZE, w - MIN_SIZE);
        splitCell(x, y, cut, h, depth + 1);
        splitCell(x + cut, y, w - cut, h, depth + 1);
    } else if (h > MIN_SIZE * 2) {
        const cut = random(MIN_SIZE, h - MIN_SIZE);
        splitCell(x, y, w, cut, depth + 1);
        splitCell(x, y + cut, w, h - cut, depth + 1);
    } else {
        paintCell(x, y, w, h);
    }
}

// Fill a cell: mostly white, sometimes a primary color, rarely a letter
function paintCell(x, y, w, h) {
    const r = random();
    if (r < 0.4) {
        fill(random(COLORS));
        rect(x, y, w, h);
    } else if (r < 0.5) {
        fill(INK);
        rect(x, y, w, h);
        fill(PAPER);
        textSize(min(w, h) * 0.7);
        text(random("MONDRIAN".split("")), x + w / 2, y + h / 2);
    }
    // black outline drawn on the cell borders
    noFill();
    stroke(INK);
    strokeWeight(LINE);
    rect(x, y, w, h);
    noStroke();
}
