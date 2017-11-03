//base guy
class Enemy {
    constructor(color, x, y, size, speed, health) {
        this.color = color;
        this.pos = createVector(x, y);
        this.size = size;
        this.speed = speed;
        this.maxHealth = health;
        this.actualHealth = health;
        this.canHit = false;
    }

    draw() {
        strokeWeight(0);
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.size);
        strokeWeight(2);
        stroke("white");
        fill("red");
        rect(this.pos.x - this.size / 2, this.pos.y + this.size / 2, this.size, 10);
        strokeWeight(0);
        fill("green");
        rect(this.pos.x - this.size / 2, this.pos.y + this.size / 2, this.size * (this.actualHealth / this.maxHealth), 10);
    }

    track() {
        let moveVector = p5.Vector.sub(player.pos, this.pos);
        moveVector.setMag(this.speed);
        this.pos.add(moveVector);
        if (dist(this.x, this.y, player.x, player.y) < player.size - 25) {
            player.lives--;
            player.gotHit = true;
        }
    }
}

function killOff() {
    for (let i = 0; i < enemies.length; i++) {
        if (enemies[i].actualHealth <= 0) {
            enemies.splice(i, 1);
        }
    }
}

//Swings a sword
class SwordDude extends Enemy {
    constructor(color, x, y, size, speed, health, weaponColor, attackCd, attackAngle, swordLength, swordSpeed) {
        super(color, x, y, size, speed, health);
        this.weaponColor = weaponColor;
        this.atkCd = attackCd;
        this.actualCd = attackCd;
        this.actualHealth = health;
        this.range = attackAngle;
        this.swordLength = swordLength;
        this.swordSpeed = swordSpeed;
        this.attackScope = {
            start: 0,
            end: 0
        }
        this.isAttacking = false;
        this.canHit = true;
    }
    swing() {
        let length = this.swordLength;
        let theta = this.attackScope.start;
        let opposite = sin(theta) * length;
        let adjacent = cos(theta) * length;
        stroke(this.weaponColor);
        strokeWeight(10);
        line(this.pos.x, this.pos.y, this.pos.x + adjacent, this.pos.y + opposite);
        this.hitbox(this.pos.x, this.pos.y, this.pos.x + adjacent, this.pos.y + opposite)
        if (this.attackScope.start >= this.attackScope.end) {
            this.isAttacking = false;
        }
    }
    canAttack() {
        if (this.actualCd == 0) {
            this.attackScope.start = p5.Vector.sub(player.pos, this.pos).heading() - this.range / 2;
            this.attackScope.end = p5.Vector.sub(player.pos, this.pos).heading() + this.range / 2;
            this.actualCd = this.atkCd;
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

    hitbox(x1, y1, x2, y2) {
        for (let i = 0; i < enemies.length; i++) {
            if (dist(player.pos.x, player.pos.y, x1, y1) < player.size / 2 ||
                dist(player.pos.x, player.pos.y, x2, y2) < player.size / 2 ||
                dist(player.pos.x, player.pos.y, (x1 + x2) / 2, (y1 + y2) / 2) < player.size / 2) {
                if (player.canHit) {
                    player.canHit = false;
                    player.gotHit = true;
                    player.lives--;
                }
            }
        }
    }

}
