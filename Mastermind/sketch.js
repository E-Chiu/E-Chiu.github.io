var guessboard;
var checkboard;
var answer;
var pegClr;
var reveal;
var guessRow;
var guessCol;
var turnBool;
var checkCol;
var checkRow;
var answerCol;
// SETUP FUNCTION - Runs once at beginning of program
function setup() {
    createCanvas(800, 800);
    background(1, 114, 0);
    guessboard = [];
    checkboard = [];
    answer = [];
    pegClr = [color("black"), color("red"), color("blue"), color("yellow"),
        color(0, 255, 0), color("white"), color(255, 0, 140)
    ];
    reveal = 255;
    guessRow = 0;
    guessCol = 0;
    turnBool = true;
    //Guessboard Array
    for (var i1 = 0; i1 < 4; i1++) {
        guessboard.push([]);
        for (y1 = 0; y1 < 12; y1++) {
            guessboard[i1].push(0);
        }
    }
    //Checkboard Array
    for (var checkCol = 0; checkCol < 4; checkCol++) {
        checkboard.push([]);
        for (var checkRow = 0; checkRow < 12; checkRow++) {
            checkboard[checkCol].push(0);
        }
    }
    //Answer Array
    for (var ansCol = 0; ansCol < 4; ansCol++) {
        answer.push(round(random(1, 6)));
    }
}
// DRAW FUNCTION - Loops @ 60FPS by default
function draw() {
    //////////WIN/LOSE CONDITIONS//////////
    for (var win = 0; win < 12; win++) {
            if (checkboard[0][win] == 2 &&
                checkboard[1][win] == 2 &&
                checkboard[2][win] == 2 &&
                checkboard[3][win] == 2) {
                reveal = 0;
                turnBool = false;
                //text?
            }
        }

    if (guessRow == 12 && turnBool === true) {
        reveal = 0;
        turnBool = false;
        //text?
    }
    //////////BOARD//////////
    fill("gray");
    noStroke();
    rect(200, 25, 400, 750, 25);
    //Guessboard Holes
    for (var i1 = 0; i1 < 4; i1++) {
        for (var y1 = 0; y1 < 12; y1++) {
            fill(pegClr[guessboard[i1][y1]]);
            ellipse(250 + i1 * 70, 70 + y1 * 60, 25);
        }
    }

    //Checkboard Holes
    for (var checkCol = 0; checkCol < 4; checkCol++) {
        for (var checkRow = 0; checkRow < 12; checkRow++) {
            //Blank
            if (checkboard[checkCol][checkRow] === 0) {
                fill("black");
                ellipse(510 + checkCol * 20, 70 + checkRow * 60, 10);
            }
            //Right Color
            if (checkboard[checkCol][checkRow] == 1) {
                fill("white");
                ellipse(510 + checkCol * 20, 70 + checkRow * 60, 10);
            }
            //Right Color Right Position
            if (checkboard[checkCol][checkRow] == 2) {
                fill("red");
                ellipse(510 + checkCol * 20, 70 + checkRow * 60, 10);
            }
        }
    }

    //Answer Holes
    stroke(1);
    for (i3 = 0; i3 < 4; i3++) {
        fill(pegClr[answer[i3]]);
        ellipse(50 + i3 * 30, 190, 20);
    }
    noStroke();
    fill(255, 255, 255, reveal);
    rect(30, 170, 130, 40, 20);

    //Peg Choosers
    stroke(1);
    var rotation = 0;
    for (i4 = 0; i4 < 2; i4++) {
        for (y4 = 0; y4 < 3; y4++) {
            rotation++;
            fill(pegClr[rotation]);
            ellipse(55 + i4 * 80, 250 + y4 * 80, 50);
        }
    }
    fill(255);
    noStroke();
    rect(30, 450, 60, 50, 20);
    rect(100, 450, 60, 50, 20);
    fill(0);
    textSize(15);
    stroke(1);
    textAlign(CENTER);
    text("ENTER", 60, 480);
    text("DELETE", 130, 480);
}

//////////TURNS//////////
function mousePressed() {
    //////////GUESSING//////////
    var rotation = 0;
    for (i1 = 0; i1 < 2; i1++) {
        for (y1 = 0; y1 < 3; y1++) {
            rotation++;
            if (dist(55 + i1 * 80, 250 + y1 * 80, mouseX, mouseY) <= 25 && turnBool === true) {
                if (guessCol < 4) guessboard[guessCol][guessRow] = rotation;
                if (guessCol < 4) guessCol++;
            }
        }
    }
    //////////ENTERING & CHECKING//////////
    if (mouseX > 30 && mouseX < 90 && mouseY > 450 && mouseY < 500 && guessCol == 4) {
        //Checking Colour

        var answerItemsUsed = [false, false, false, false];
        for (i2 = 0; i2 < 4; i2++) {
            if (guessboard[i2][guessRow] == answer[i2]) {
                if (answerItemsUsed[i2] === true) {
                    for (var y2 = 3; y2 >= 0; y2--) {
                        if (checkboard[y2][guessRow] == 1) {
                            checkboard[y2][guessRow] = 0;
                            break;
                        }
                    }
                }
                for (var i3 = 3; i3 > 0; i3--) {
                    checkboard[i3][guessRow] = checkboard[i3 - 1][guessRow];
                }

                checkboard[0][guessRow] = 2;
                answerItemsUsed[i2] = true;
            } else {
                for (var i4 = 0; i4 < 4; i4++) {
                    if (guessboard[i2][guessRow] == answer[i4] && answerItemsUsed[i4] === false) {
                        for (var y3 = 0; y3 < 4; y3++) {
                            if (checkboard[y3][guessRow] === 0) {
                                checkboard[y3][guessRow] = 1;
                                answerItemsUsed[i4] = true;
                                break; //exits, eql to y = 4
                            }
                        }
                        break; //exits, eql to i = 4
                    }
                }
            }
            //  }
        }
        guessCol = 0;
        guessRow++;
    }
    //////////DELETING//////////
    if (mouseX > 100 && mouseX < 160 && mouseY > 450 && mouseY < 500 && guessCol > 0) {
        guessboard[guessCol - 1][guessRow] = 0;
        if (guessCol > 0) guessCol--;
    }
}
