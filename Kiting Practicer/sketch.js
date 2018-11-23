//kiting practice for League of Legends

let cursorArray = [];
let champArray = [];

function setup() {
    createCanvas(1229, 691);
    noCursor();

}

function draw() {
    cursorArray.push(new mouse());
    champArray.push(new champ());
    background(0);
    //cursor for mouse
    fill(255);
    noStroke();
    cursorArray[0].pos.x = mouseX;
    cursorArray[0].pos.y = mouseY;
    ellipse(cursorArray[0].pos.x, cursorArray[0].pos.y, 20);
}

function mouseDragged() {
    mousePressed();
}

function mousePressed() {
    if (mouseButton === RIGHT) {
        console.log("ye");
        champArray[0].travelPos.x = mouseX;
        champArray[0].travelPos.y = mouseY;
    }
}

class champ {
    constructor() {
        this.pos = createVector(0, 0);
        this.travelPos = createVector(0, 0);
        this.size = 0;
        this.hp = 0;
        this.col = [0, 0, 0];
        this.speed = 0;
        this.range = 0;
    }

    draw() {
        fill(this.col[0], this.col[1], this.col[2]);
        ellipse(this.pos.x, this.pos.y, this.size);
    }

    move() {
        //moveVector = p5.Vector.sub(, this.pos);
        moveVector.setMag(this.speed);
        this.pos.add(moveVector);
    }
}

class mouse {
    constructor() {
        this.pos = createVector(mouseX, mouseY);
    }
}
