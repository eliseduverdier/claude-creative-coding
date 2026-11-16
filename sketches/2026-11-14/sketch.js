// Color field: stacked soft-edged bands in the spirit of Rothko
const SEED = 1114;
const BACKGROUNDS = ["#5b1a18", "#2b2d42", "#3d2c4a"];
const BANDS = ["#d1495b", "#edae49", "#e07a5f", "#f2cc8f", "#8d5a97"];

function setup() {
    createCanvas(800, 800);
    randomSeed(SEED);
    background(random(BACKGROUNDS));
    noStroke();

    const top = drawBand(90, 60, 340);
    drawBand(top + 60, 340, 340);
    noLoop();
}

// Draw a band made of many translucent layers for fuzzy edges
function drawBand(y, w, h) {
    const x = (width - 560) / 2;
    const c = color(random(BANDS));
    for (let i = 0; i < 40; i++) {
        c.setAlpha(14);
        fill(c);
        const j = i * 0.6;
        rect(x + random(-j, j), y + random(-j, j), 560 + random(-j, j), h + random(-j, j), 14);
    }
    return y + h;
}
