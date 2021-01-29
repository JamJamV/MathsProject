function drawBilliardsBoard(mC) {
    // Colour and thickness
    stroke(color('#e1e1e1'));
    strokeWeight(3);
    // left line
    line(mC[0].x, mC[0].y, mC[1].x, mC[1].y);
    // right line
    line(mC[2].x, mC[2].y, mC[3].x, mC[3].y);
    // Bottom line
    line(mC[0].x, mC[0].y, mC[2].x, mC[2].y);
    // Top line
    line(mC[1].x, mC[1].y, mC[3].x, mC[3].y);
}

function drawLaser(colArr, nLoop, c) {
    if (nLoop+1 == colArr.length){
        return;
    }
    // Colour and thickness
    stroke(color('#3FBA7D'));
    strokeWeight(5);

    // Draw Line Laser
    line(colArr[nLoop].x,colArr[nLoop].y,colArr[nLoop+1].x,colArr[nLoop+1].y);

    // Draw dot a points
    ellipse(colArr[nLoop+1].x,colArr[nLoop+1].y, 5)

    /*
    // Draw Text at literal point *******
    let txt = '(' + c[nLoop+1].x.toFixed(2) + ',' + c[nLoop+1].y.toFixed(2) + ')';
    noStroke();
    textSize(14.5);
    fill(color('#ff6961'));
    text(txt, colArr[nLoop+1].x, colArr[nLoop+1].y);
    */
}

/////////////// Input variables ///////////////
// User Input
let numCollisions = 14;
let jugX = 5;
let jugY = 3;
let windW = 500;
let windH = 400;
let fps = 7;
let padding = 15;

// General variables
let lenBoard;
let heightBoard;
let colArr;
let c;
let nLoop = 0;
let changeOccured = true;
/////////////// Input variables ///////////////

function mapPoints(points, xMax, yMax, pads) {
    let arr = [];
    for (point of points) {
        arr.push({x:map(point.x, 0, xMax, pads, windW - pads),y:map(Math.abs(point.y-yMax), 0, yMax, pads, windH - pads)});
    }
    return arr;
}

function mapOutput(points) {
    return points.map(function(item) {return {x: item[0], y: item[1]};});
}

function findCorners(jugXc, jugYc, h, l) {
    let k = Math.sin(Math.PI/6)*jugYc;
    return  [{x:0,y:0}, {x:k,y:h}, {x:jugXc,y:0}, {x:l,y:h}];
}

function setup() {
    windW = windW;
    windH = windH;
    createCanvas(windW, windH);
    background(color("#232b2b"));
    frameRate(fps);
}

function draw() {
    let mappedCorners;

    // If a changed has occured to the drawing, redo the board calculations
    if (changeOccured) {
        // Run Math Code:

        //let j = solve_billards(bignumber(5), bignumber(3), bignumber(10));

        colArr = mapOutput([[5, 0],
            [3.5000000000000000001, 2.5980762113533159403],
            [2.0000000000000000002, 0],
            [1.0000000000000000001, 1.7320508075688772937],
            [6, 1.7320508075688772937],
            [5.5000000000000000005, 2.5980762113533159403],
            [4.0000000000000000006, 0],
            [2.5000000000000000006, 2.5980762113533159403],
            [1.0000000000000000006, 0],
            [0.50000000000000000029, 0.86602540378443864726],
            [5.5000000000000000004, 0.86602540378443864726],
            [4.5000000000000000009, 2.5980762113533159403],
            [3.000000000000000001, 0],
            [1.500000000000000001, 2.5980762113533159403]]);

        // Get the rectangle lengths needed to display board
        lenBoard = jugX + Math.sin(Math.PI/6)*(jugY);
        heightBoard = Math.cos(Math.PI/6)*(jugY);
        
        // Get corners
        c = findCorners(jugX,jugY,heightBoard,lenBoard);

        // Map the corner points relative to the size of the canvas
        mappedCorners = mapPoints(c, lenBoard, heightBoard, padding);
        // Draw Board
        drawBilliardsBoard(mappedCorners);
        
        changeOccured = false;
    }

    if (nLoop < numCollisions) {
        // Map the collision points relative to the size of the canvas
        let mappedCollisions = mapPoints(colArr, lenBoard, heightBoard, padding);
        // Draw laser
        drawLaser(mappedCollisions, nLoop, colArr);
        nLoop++;
    }
}

/*
function windowResized() {
    windW = windowWidth;
    windH = windowHeight;    
    resizeCanvas(windowWidth, windowHeight);
    // Reset variables
    background(color("#232b2b"));
    nLoop = 0;
    changeOccured = true;
}
*/
function keyPressed() {
    if (keyCode === UP_ARROW) {
        jugY++;
    } else if (keyCode === DOWN_ARROW) {
        jugY--;
    }
    if (keyCode === LEFT_ARROW) {
        jugX--;
    } else if (keyCode === RIGHT_ARROW) {
        jugX++;
    }

    // Reset variables
    background(color("#232b2b"));
    nLoop = 0;
    changeOccured = true;
}