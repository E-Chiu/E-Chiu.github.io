class Enemy {
    constructor(color, weaponColor, x, y, size, speed, attackCd, health, attackAngle, swordLength, swordSpeed) {
        this.color = color;
        this.weaponColor = weaponColor;
        this.pos = createVector(x, y);
        this.size = size;
        this.speed = speed;
        this.atkCd = attackCd;
        this.actualCd = attackCd;
        this.maxHealth = health;
        this.actualHealth = health;
        this.swordLength = swordLength;
        this.swordSpeed = swordSpeed;
        this.attackScope = {
            start: 0,
            end: 0
        }
        this.isAttacking = false;
    }

    draw() {
        strokeWeight(0);
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.size);
        strokeWeight(1);
        stroke("white");
        fill("red");
        rect(this.pos.x - this.size / 2, this.pos.y + this.size / 2, this.size, 10);
        strokeWeight(0);
        fill("green");
        rect(this.pos.x - this.size / 2, this.pos.y + this.size / 2, this.size - this.actualHealth / this.maxHealth * 100, 10);
    }

    track() {
        let moveVector = p5.Vector.sub(player.pos, this.pos);
        moveVector.setMag(this.speed);
        this.pos.add(moveVector);
    }

    canAttack() {
        if (this.actualCd == 0) {
            this.attackScope.start = p5.Vector.sub(player.pos, this.pos).heading() - this.range / 2;
            this.attackScope.end = p5.Vector.sub(player.pos, this.pos).heading() + this.range / 2;
            this.swing();
            this.isAttacking = true;
        }
    }

    attack() {
        if (this.isAttacking) {
            this.attackScope.start += this.swordSpeed;
            this.swing();
        } else if (this.actualCd > 0) {
            this.actualCd--;
        }
    }

    swing() {
        let length = this.swordLength;
        let theta = this.attackScope.start;
        let opposite = sin(theta) * length;
        let adjacent = cos(theta) * length;

        stroke(this.weaponColor);
        strokeWeight(10);
        line(this.pos.x, this.pos.y, this.pos.x + adjacent, this.pos.y + opposite);
        if (this.attackScope.start >= this.attackScope.end) {
            this.isAttacking = false;
            this.actualCd == this.atkCd;
        }
    }
}
