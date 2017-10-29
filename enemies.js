class Enemy {
    constructor(color, x, y, size, speed, range, attackCd, health, attackAngle, swordLength) {
        this.color = color;
        this.pos = createVector(x, y);
        this.size = size;
        this.speed = speed;
        this.range = range;
        this.atkCd = attackCd;
        this.actualCd = attackCd;
        this.maxHealth = health;
        this.actualHealth = health;
        this.attackAngle = attackAngle;
        this.swordLength = swordLength;
    }

    draw() {
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.size);
        fill("red");
        rect(this.pos.x - this.size / 2, this.pos.y + this.size / 2, this.size, 10);
        stroke("white");
        fill("green");
        rect(this.pos.x - this.size / 2, this.pos.y + this.size / 2,  this.size - this.actualHealth / this.maxHealth * 100, 10);
    }

    track() {
        let moveVector = p5.Vector.sub(player.pos, this.pos);
        moveVector.setMag(this.speed);
        this.pos.add(moveVector);
    }

    attack() {
        if (this.actualCd == 0) {
            this.swing(this.attackAngle);
            animationAngle++;
        } else if (this.actualCd > 0) {
            this.actualCd--;
        }
    }

    swing(angle) {
        if (angle == 0) {
            swordAnimation = createVector(0, this.swordLength);
            swordAnimation.rotate(this.vel.heading() + this.scope / 2)
        }
        line(this.x, this.y, this.x + swordAnimation.x, this.y + swordAnimation.y);
        swordAnimation.rotate(1);
    }
}
