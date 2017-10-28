class Enemy {
    constructor(color, x, y, size, speed, range, attackCd, health) {
        this.color = color;
        this.pos = createVector(x, y);
        this.size = size;
        this.speed = speed;
        this.range = range;
        this.atkCd = attackCd;
        this.actualCd = attackCd;
        this.health = health;
    }

    draw() {
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.size);
    }

    track() {
        let moveVector = p5.Vector.sub(player.pos, this.pos);
        moveVector.setMag(this.speed);
        this.pos.add(moveVector);
    }
}
