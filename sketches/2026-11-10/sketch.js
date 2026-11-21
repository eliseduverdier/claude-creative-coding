// Made by me for Genuary


//const colors = ["#c29e07", "#41583C", "#dac598", "#3e5052", "#cfcfd4", ""];
const colors = ["#ffffff", " #000000", "#cccc00", "#00cccc"];
const RECT_HEIGHT = 100,
    RECT_WIDTH = 50;
function setup() {
    createCanvas(600, 600);
    background(220);

    for (let i = 0; i < width; i += RECT_WIDTH) {
        for (let j = 0; j < height; j += RECT_HEIGHT) {
            blockk(
                i,
                j,
                RECT_HEIGHT,
                RECT_WIDTH,
                Math.random() * 20 + 2, // line heigth
                colors[Math.floor(Math.random() * colors.length)],
                colors[Math.floor(Math.random() * colors.length)],
                Math.random() > 0.5
            );
        }
    }
}

function draw() {}

function blockk(x, y, w, h, lineWeight, color1, color2, horizontal) {
    let loop = 1;
    noStroke();
    if (horizontal) {
        for (let i = x; i < x + h; i += lineWeight) {
            fill(loop % 2 === 0 ? color1 : color2);

            rect(y, i, w, lineWeight);
            loop += 1;
        }
    } else {
        for (let j = y; j < y + w; j += lineWeight) {
            fill(loop % 2 === 0 ? color1 : color2);

            rect(j, x, lineWeight, h);
            loop += 1;
        }
    }
}
