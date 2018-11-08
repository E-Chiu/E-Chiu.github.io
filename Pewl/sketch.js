let balls = [];
function setup() {
    createCanvas(850, 450);
    background(132, 79, 0);
    
    //starter balls
    
}

function draw() {
    noStroke();
    fill(21, 142, 0);
    rect(25, 25, 800, 400);
    
    //draw & update balls
    for(let i = 0; i < balls.size; i++) {
        balls[i].draw();
    }
}

class Ball {
    constructor(x, y, color, number, type) {
        this.pos = createVector(x, y);
        this.color = color;
        this.number = number;
        this.type = type;
    }
    
    draw() {
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.pos.size);
    }
}
