let balls = [];
let cueBalls = [];
let explosions = [];

function setup() {
    createCanvas(850, 450);
    background(132, 79, 0);

    //starter balls
    balls.push(new Ball(650, 220, "yellow", 1, "solid"));
    balls.push(new Ball(630, 190, "yellow", 9, "stripe"));
    balls.push(new Ball(670, 210, "blue", 2, "solid"));
    balls.push(new Ball(690, 240, "blue", 10, "stripe"));
    balls.push(new Ball(690, 220, "red", 3, "solid"));
    balls.push(new Ball(670, 190, "red", 11, "stripe"));
    balls.push(new Ball(690, 180, "purple", 4, "solid"));
    balls.push(new Ball(670, 170, "purple", 12, "stripe"));
    balls.push(new Ball(650, 200, "black", 8, "solid"));
    balls.push(new Ball(630, 210, "orange", 5, "solid"));
    balls.push(new Ball(690, 200, "orange", 13, "stripe"));
    balls.push(new Ball(690, 160, "green", 6, "solid"));
    balls.push(new Ball(610, 200, "green", 14, "stripe"));
    balls.push(new Ball(650, 180, "brown", 7, "solid"));
    balls.push(new Ball(670, 230, "brown", 15, "stripe"));
    cueBalls.push(new Ball(200, 200, "white", "", "cue"));
}

function draw() {
    noStroke();
    fill(21, 142, 0);
    rect(25, 25, 800, 400);
    fill("black");
    stroke(0);
    strokeWeight(2);
    line(200, 25, 200, 425);
    ellipse(200, 200, 25);
    for (let i = 0; i < 3; i++) {
        ellipse(25 + (i * 400), 25, 29);
    }
    for (let i = 0; i < 3; i++) {
        ellipse(25 + (i * 400), 425, 29);
    }

    //draw & update balls
    for (let i = 0; i < balls.length; i++) {
        balls[i].draw();
    }
    for (let i = 0; i < cueBalls.length; i++) {
        cueBalls[i].draw();
    }
    //draw range indicator
    noFill();
    stroke("red");
    ellipse();
    //get rid of explosions
    for (let i = 0; i < explosions.length; i++) {
        if (explosions[i].size >= 200) {
            explosions.splice(i, 1);
            i--;
        }
    }
    //draw explosions
    for (let i = 0; i < explosions.length; i++) {
        explosions[i].draw();
    }
}

function mouseClicked() {
    if (dist(mouseX, mouseY, cueBalls[0].pos.x, cueBalls[0].pos.y) < 100) {
        explosions.push(new explosion(mouseX, mouseY, 0));
    }
}

class Ball {
    constructor(x, y, color, number, type) {
        this.pos = createVector(x, y);
        this.color = color;
        this.number = number;
        this.type = type;
        this.size = 20;
        this.moving = false;
        this.accel = 0;
        this.veloc = 0;
    }

    draw() {
        noStroke();
        if (this.type == "solid") {
            fill(this.color);
            ellipse(this.pos.x, this.pos.y, this.size);
        } else {
            fill(this.color);
            ellipse(this.pos.x, this.pos.y, this.size);
            fill("white");
            ellipse(this.pos.x, this.pos.y, 10);
        }
        if (this.type == "cue") {
            noFill();
            stroke("black");
            ellipse(this.pos.x, this.pos.y, 200);
        }
        textAlign(CENTER);
        textSize(14);
        strokeWeight(1);
        fill(0);
        stroke(1);
        if (this.number == 8) {
            fill(255);
            noStroke();
        }
        text(this.number, this.pos.x, this.pos.y + 4.5);
    }

    hit(x, y, input) {

    }
}

class cueBall {
    constructor(x, y, color, number, type) {
        this.pos = createVector(x, y);
        this.color = color;
        this.number = number;
        this.type = type;
        this.size = 20;
        this.moving = false;
        this.accel = 0;
        this.veloc = 0;
    }

    draw() {
        noStroke();
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.size);
        noFill();
        stroke("black");
        ellipse(this.pos.x, this.pos.y, 200);
        textAlign(CENTER);
        textSize(14);
        strokeWeight(1);
        fill(0);
        stroke(1);
        if (this.number == 8) {
            fill(255);
            noStroke();
        }
        text(this.number, this.pos.x, this.pos.y + 4.5);
        //moves the ball
        if (this.moving == true) {
            console.log("yes2");
            this.veloc = this.accel;
            moveVector.setMag(this.veloc);
            this.pos.sub(moveVector);
            this.acel--;
            if (this.veloc <= 0) {
                this.moving == false;
            }
        }
    }

    hit(pos, size) {
        console.log("yes1");
        moveVector = p5.Vector.sub(pos, this.pos);
        this.moving = true;
        this.accel = 10 / size;
    }
}

class explosion {
    constructor(x, y, size) {
        this.pos = createVector(x, y);
        this.size = size;
    }

    draw() {
        noFill();
        let colors = ["orange", "red", "yellow"];
        stroke(random(colors));
        strokeWeight(5);
        ellipse(this.pos.x, this.pos.y, this.size);
        stroke(random(colors));
        ellipse(this.pos.x, this.pos.y, random(this.size));
        this.size += 30;
        if (dist(this.pos.x, this.pos.y, cueBalls[0].pos.x, cueBalls[0].pos.y) < this.size / 2) {
            cueBalls[0].hit(this.pos, this.size);
        }
        for (let i = 0; i < balls.length; i++) {
            if (dist(this.pos.x, this.pos.y, balls[i].pos.x, balls[i].pos.y) < this.size / 2) {
                balls[i].hit(this.pos, this.size);
            }
        }
    }
}
