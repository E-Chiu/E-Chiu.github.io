var board;
var turnColumn;
var whosTurn;
var turnSuccess;

function setup() {
    createCanvas(800, 800);
    background(220);
    board = [];
    whosTurn = 1;
    turnColumn = 0;
    turnSuccess = false;
    //initializes the array once! now populated with 7 rows and 7 columns of 0's
    for (var i = 0; i < 7; i++) {
        board.push([]);
        for (var y = 0; y < 7; y++) {
            board[i].push(0);
        }
    }
}

function draw() {
    ////////BOARD///////
    //Base
    noStroke();
    fill(0, 0, 255);
    rect(50, 50, 700, 700, 20);
    fill(0);
    //Buttons
    if (whosTurn == 1) {
        fill("red");
    } else if (whosTurn == 2) {
        fill("yellow");
    }

    for (var c = 0; c < 7; c++) {
        ellipse(100 + c * 100, 25, 50);
    }

    fill("black");
    for (var t = 0; t < 7; t++) {
        triangle(100 + t * 100, 45, 80 + t * 100, 20, 120 + t * 100, 20);
    }
    //Holes
    for (var i = 0; i < 7; i++) {
        for (var y = 0; y < 7; y++) {
            if (board[i][y] == 1) {
                fill("red");
                ellipse(100 + i * 100, 100 + y * 100, 50);
            } else if (board[i][y] == 2) {
                fill("yellow");
                ellipse(100 + i * 100, 100 + y * 100, 50);
            } else if (board[i][y] === 0) {
                fill("black");
                ellipse(100 + i * 100, 100 + y * 100, 50);
            }
        }
    }
}


/////////TURNS//////////
function mousePressed() {
    turnSuccess = false;
    //column determination
    for (var i1 = 0; i1 < 8; i1++) {
        if (dist(100 * (i1 + 1), 25, mouseX, mouseY) <= 24) {
            turnColumn = i1;
            break;
        }
        if (i1 == 7)
            turnColumn = -1;
    }

    if (turnColumn >= 0) {
        for (var i2 = 6; i2 >= 0; i2--) {
            if (board[turnColumn][i2] === 0) {
                board[turnColumn][i2] = whosTurn;
                turnSuccess = true;
                break;
            }
        }
    }
    if (turnSuccess === true) {
        if (whosTurn == 1)
            whosTurn = 2;
        else if (whosTurn == 2)
            whosTurn = 1;
    }
}
