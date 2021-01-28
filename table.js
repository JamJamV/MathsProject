const Y_LENGTH = 5;
const X_LENGTH = 10;
const SCALE = 100;
const RADI = 3;
const SHIFT = [20, 20];
const LINE_STYLE = {strokeColor: 'black', strokeWidth: RADI}

function to_cart_coords(x, y) {
    return [x, y+x/2];
}

function to_trap_coords(x, y) {
    return [x, Y_LENGTH-y];
}

let debug_layer = new Layer();
debug_layer.activate();

let circles = new Group();
let points = [];
for (let x=0; x<=X_LENGTH; x++) {
    points.push([]);
    for (let y=0; y<=Y_LENGTH; y++) {
        let point = new Point((Y_LENGTH-y)/2+x,y) * SCALE;
        points[x].push(point);
        
        let dot = new Path.Circle(point, RADI);
        dot.fillColor = 'black';
        circles.addChild(dot);
        
        let text = new PointText(point);
        let [x_trap, y_trap] = to_trap_coords(x, y);
        text.content = "x: " + x + ", y: " + y;
    }
}

// Shift everything right 20 and down 20.
debug_layer.translate(SHIFT);
points = points.map((x) => x.map((y) => y + SHIFT));

let grid_layer = new Layer();
grid_layer.activate();

//let vertical_lines = new Group();
for (let index_1 in points) {
    let path = new Path(LINE_STYLE);
    for (let index_2 in points[index_1]) {
        let point = points[index_1][index_2];
        path.add(point);
        //vertical_lines.addChild(path);
    }
}

/*
let diagonal_lines = new Group();
for (let index_1 = 0; index_1<points.length - 1; index_1++) {
    let path = new Path(LINE_STYLE);
    for (let index_2 = 0; index_2<points[index_1].length - 1; index_2++) {
        let point_1 = points[index_1][index_2];
        let point_2 = points[index_1 + 1][index_2 + 1];
        path.add(point_1, point_2);
        path.strokeColor = Color.random();
        diagonal_lines.addChild(path);
    }
}
*/

//let diagonal_lines = new Group();
for (let col_index = 0; col_index<points.length; col_index++) {
    let path = new Path(LINE_STYLE);
    
    let index_1 = col_index;
    let index_2 = 0;
    
    while (index_1 < points.length && index_2 < points[0].length) {
        let point = points[index_1][index_2];
        path.add(point);
        //diagonal_lines.addChild(path);
        index_1 += 1;
        index_2 += 1;
    }
}

for (let row_index = 0; row_index<points[0].length; row_index++) {
    let path = new Path(LINE_STYLE);
    
    let index_1 = 0;
    let index_2 = row_index;
    
    while (index_1 < points.length && index_2 < points[0].length) {
        let point = points[index_1][index_2];
        path.add(point);
        //diagonal_lines.addChild(path);
        index_1 += 1;
        index_2 += 1;
    }
}

//let horizontal_lines = new Group();
for (let index_1 = 0; index_1<points[0].length; index_1++) {
    let path = new Path(LINE_STYLE);
    for (let index_2 = 0; index_2<points.length; index_2++) {
        let point = points[index_2][index_1];
        path.add(point);
        //horizontal_lines.addChild(path);
    }
}

let iterate_through = function(func) {
    for (let index_1 in grid_layer.children) {
        let item = grid_layer.children[index_1];
        for (let index_2 in item.segments) {
            let point = item.segments[index_2].point;
            func(point);
        }
    }
}

let original_pos = [];
iterate_through(function (point) {
    original_pos.push(point.clone());
});

let spokes = [];
let spokes_layer = new Layer();
spokes_layer.activate();
iterate_through(function (point) {
    let path = new Path(LINE_STYLE);
    path.strokeColor = 'red';
    path.remove();
    path.add(point.clone());
    path.add(point.clone());
    spokes.push(path);
});

let upper_layer = new Layer();
upper_layer.activate();
let upper_line = new Path(LINE_STYLE);
upper_line.remove();
spokes.map(function (path) {
    upper_line.add(path.segments[1]);
});
/*
function onFrame(event) {
    let counter = 0;
	iterate_through(function (point) {
	    let {x, y} = original_pos[counter];
        point.y = y + Math.sin(event.time+x) * 25;
        point.x = x + Math.cos(event.time+y) * 25;
        let origin_point = spokes[counter].segments[0].point;
        let new_destination = (point - origin_point) + point;
        spokes[counter].segments[1].point = new_destination;
        upper_line.segments[counter].point = new_destination;
        counter += 1;
    });
}*/

