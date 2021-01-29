"use strict";

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
    if (nLoop+1 >= colArr.length) {
        return;
    }
    // Colour and thickness
    stroke(color('#3FBA7D'));
    strokeWeight(laserStroke);

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

function mapPoints(points, xMax, yMax, pads) {
    let arr = [];
    for (point of points) {
        arr.push({x:map(point.x, 0, xMax, pads, windW - pads),y:map(Math.abs(point.y-yMax), 0, yMax, pads, windH - pads)});
    }
    return arr;
}

function mapOutput(points) {
    return points.map(function(item) {return {x: item.x.toNumber(), y: item.y.toNumber()};});
}

function findCorners(jugXc, jugYc, h, l) {
    let k = Math.sin(Math.PI/6)*jugYc;
    return  [{x:0,y:0}, {x:k,y:h}, {x:jugXc,y:0}, {x:l,y:h}];
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(color("#232b2b"));
    frameRate(fps);
}

function draw() {
    // If a changed has occured to the drawing, redo the board calculations
    if (changeOccured) {
        // Run Math Code:

        colArr = mapOutput(solve_billards(bignumber(jugX), bignumber(jugY), bignumber(numCollisions)));
        
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

/////////////// Input variables ///////////////
// User Input
let numCollisions = 1000;
let jugX = 25.002;
let jugY = 60.335;
let windW = 1000;
let windH = 600;
let fps = 60;
let padding = 15;
let laserStroke = 1;

// General variables
let lenBoard;
let heightBoard;
let colArr;
let c;
let nLoop = 0;
let changeOccured = true;
let mappedCorners;
/////////////// Input variables ///////////////