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

function findCoordinate(point, h) {
    if (point.y == 0) {
        // bottom line
        return [point, {x:0,y:20}];
    } else if (point.y == h) {
        // top line
        return [{x: point.x - k, y: jugY}, {x:0,y:-15}];
    } else if (point.y == table.walls.left.equation.calc(bignumber(point.x)).toNumber()) {
        // left side line
        let ypoint = map(point.y, 0, h, 0, jugY);
        return [{x: 0, y: ypoint}, {x:-55,y:0}];
    } else {
        // right side line
        let ypoint = map(point.y, 0, h, 0, jugY);
        return [{x: jugX, y: ypoint}, {x:15,y:0}];
    }
}

function laserStroke(lenCollisionArr) {
    let m = maxStroke*(0.99**lenCollisionArr);
    if (m < minStroke) {return minStroke;}
    return m;
}

function textCordSize(lenCollisionArr) {
    let m = maxCordTextSize*(0.99**lenCollisionArr);
    if (m < minStroke) {return minStroke;}
    return m;
}

function drawLaser(colArrMapped, nLoop, colArr, h) {
    if (nLoop+1 >= colArrMapped.length) {
        return;
    }
    // Colour and thickness
    let st = laserStroke(colArrMapped.length);
    //stroke(color('#3FBA7D'));
    stroke(color('#ff6961'));
    strokeWeight(st);

    // Draw Line Laser
    line(colArrMapped[nLoop].x,colArrMapped[nLoop].y,colArrMapped[nLoop+1].x,colArrMapped[nLoop+1].y);

    // Draw dot a points
    ellipse(colArrMapped[nLoop+1].x,colArrMapped[nLoop+1].y, st*.5);

    // Get actual points
    let cords1 = findCoordinate(colArr[nLoop], h);
    let cords2 = findCoordinate(colArr[nLoop+1], h);
    let acutalPoint1= cords1[0];
    let acutalPoint2= cords2[0];
    let sideOffset1 = cords1[1];
    let sideOffset2 = cords2[1];
    // Draw Text at actual point
    let txt1 = '(' + acutalPoint1.x.toFixed(1) + ',' + acutalPoint1.y.toFixed(1) + ')';
    let txt2 = '(' + acutalPoint2.x.toFixed(1) + ',' + acutalPoint2.y.toFixed(1) + ')';

    // Push to an array, for display later
    actualCordsArr.push(txt1);
    
    // Display cords only if selected or small colArr
    if (colArr.length < 50 || seeCords) {
        noStroke();
        textSize(textCordSize(colArr.length));
        fill(color('#e1e1e1'));

        text(txt1, colArrMapped[nLoop].x + sideOffset1.x, colArrMapped[nLoop].y + sideOffset1.y);
        text(txt2, colArrMapped[nLoop+1].x + sideOffset2.x, colArrMapped[nLoop+1].y + sideOffset2.y);
    }
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

function findCorners(h, l) {
    return  [{x:0,y:0}, {x:k,y:h}, {x:jugX,y:0}, {x:l,y:h}];
}

function setup() {
    windW = windowWidth;
    windH = windowHeight;
    createCanvas(windW, windH);
    background(color("#232b2b"));
    frameRate(fps);
}

function draw() {
    // If a changed has occured to the drawing, redo the board calculations
    if (changeOccured) {
        // Run Math Code:
        
        k = math.sin(math.pi.div(6)).mul(jugY);
        
        table = new Table(bignumber(jugX), bignumber(jugY));
        let laser = new Laser(DIRECTIONS.diagonal_up, table.coordinates.bottom_right, table, water_target);
        laser.collide(numCollisions);
        colArr = laser.path;

        colArr = colArr.map(function (item) {
            return {x: item.x.toNumber(), y: item.y.toNumber()}
        });
        // Get the rectangle lengths needed to display board
        // This is the total occupying length of the board.

        lenBoard = table.actual_width.toNumber();
        heightBoard = table.actual_height.toNumber();

        // Get corners
        c = findCorners(heightBoard,lenBoard);

        // Map the corner points relative to the size of the canvas
        mappedCorners = mapPoints(c, lenBoard, heightBoard, padding);
        // Draw Board
        drawBilliardsBoard(mappedCorners);
        
        changeOccured = false;
    }

    if (nLoop < numCollisions) {
        // Map the collision points relative to the size of the canvas
        mappedCollisions = mapPoints(colArr, lenBoard, heightBoard, padding);
        // Draw laser
        drawLaser(mappedCollisions, nLoop, colArr, heightBoard);
        nLoop++;
    }
}


function windowResized() {    
    windW = windowWidth;
    windH = windowHeight;
    resizeCanvas(windW, windH);
    // Reset variables
    background(color("#232b2b"));
    nLoop = 0;
    changeOccured = true;
}


function keyPressed() {
    if (keyCode === UP_ARROW) {
        jugY++;
    } else if (keyCode === DOWN_ARROW) {
        if (jugY == 1) {return;}
        jugY--;
    }
    if (keyCode === LEFT_ARROW) {
        if (jugX == 1) {return;}
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
let jugX = 5;
let jugY = 3;
let fps = 60;
let water_target = bignumber(4);
let seeCords = false;

let padding = 50;
let maxStroke = 9;
let minStroke = 0.1;
let windW = 1000;
let windH = 600;
let maxCordTextSize = 14.5;
let actualCordsArr = [];

// General variables
let lenBoard;
let heightBoard;
let colArr;
let c;
let nLoop = 0;
let changeOccured = true;
let mappedCorners;
let k;
let table;
let mappedCollisions;
/////////////// Input variables ///////////////