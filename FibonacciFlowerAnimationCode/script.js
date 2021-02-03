var n = 0;
var c = 5;

function setup() {
    createCanvas(400, 400);
    background(0);
}

function draw() {
    var a = n * 137.5;
    var r = c * Math.sqrt(n);

    var x = r * Math.cos(a) + width/2; 
    var y = r * Math.sin(a) + height/2;

    fill(255);
    ellipse(x, y, 8, 8);

    n++;
}