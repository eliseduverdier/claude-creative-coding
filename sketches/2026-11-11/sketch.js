// Made by me for Genuary

const SQUARE_SIZE = 75;
const COLORS = ["#d97b2d", "#982F29", "#C09F22", "#D74843"];
function setup() {
    createCanvas(600, 600);
    background(255);
    noFill();
    for (let i = 50; i < width - SQUARE_SIZE - 30; i += SQUARE_SIZE) {
        for (let j = 10; j < height - SQUARE_SIZE - 30; j += SQUARE_SIZE) {
            push();
            customSquare(i, j);
            pop();
        }
    }
}

function customSquare(i, j) {
    translate(i, j);
    stroke(COLORS[Math.floor(Math.random() * COLORS.length)])
    for (let x = SQUARE_SIZE; x > 0; x -= Math.random()*30) {
        push();
        translate(SQUARE_SIZE / 4, SQUARE_SIZE / 4);
        fill(Math.random() > 0.5 ? 0 : 255);
        strokeWeight(Math.random() * 5);
        square(SQUARE_SIZE / 2 - x / 2, SQUARE_SIZE / 2 - x / 2, x);
        pop();
    }
}
