//kiting practice for League of Legends

function setup() {
    createCanvas(1229, 691);
    noCursor();
    let champion = new champ();
}

function draw() {
    let mousePos = createVector(mouseX, mouseY);
    background(0);
    //cursor for mouse
    fill(255);
    noStroke();
    mousePos.x = mouseX;
    mousePos.y = mouseY;
    ellipse(mousePos.x, mousePos.y, 20);
}

function mouseDragged() {
    mousePos.x = mouseX;
    mousePos.y = mouseY;
}

class champ {
    constructor() {
        this.pos = createVector(0, 0);
        this.size = 0;
        this.hp = 0;
        this.col = [0, 0, 0];
        this.speed = 0;
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
