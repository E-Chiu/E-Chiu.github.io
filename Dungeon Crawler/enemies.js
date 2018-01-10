let enemies = [];

//base guy
class Enemy {
    constructor(color, x, y, size, speed, health, rarity) {
        this.dot = 0;
        this.color = color;
        this.pos = createVector(x, y);
        this.size = size;
        this.speed = speed;
        this.maxHealth = health;
        this.actualHealth = health;
        this.rarity = rarity;
        this.timer = 0;
        this.canHit = true;
        this.blackHoled = false;
        this.speedChanged = false;
        this.marked = 0;
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
        for (let i = 0; i < this.marked; i++) {
            noFill();
            strokeWeight(3);
            stroke(192);
            ellipse(this.pos.x, this.pos.y, this.size + i * 10);
        }
        if (this.dot > 0) {
            this.actualHealth -= this.dot;
            killOff();
        }
    }
    //following player
    track() {
        let moveVector;
        if (this.blackHoled == false) {
            moveVector = p5.Vector.sub(player.pos, this.pos);
        } else if (this.blackHoled == true) {
            if (this.speed == 0) {
                this.speed = 1;
                this.speedChanged = true;
            }
            moveVector = p5.Vector.sub(player.roars[3].static, this.pos);
        }
        if (this.pos.x <= 32.5) {
            this.pos.x = 32.5;
        }
        if (this.pos.x >= 967.5) {
            this.pos.x = 967.5;
        }
        if (this.pos.y <= 32.5) {
            this.pos.y = 32.5;
        }
        if (this.pos.y >= 679.5) {
            this.pos.y = 679.5;
        }
        if (this.timer > 0) {
            this.timer--;
        }
        if (this.timer == 1) {
            this.speed = this.speed * -2;
        }
        moveVector.setMag(this.speed);
        this.pos.add(moveVector);
        if (dist(this.pos.x, this.pos.y, player.pos.x, player.pos.y) < player.size / 2 && player.canHit) {
            if (player.hasShield && player.canHit == true && player.gotHit == false) {
                player.canHit = false;
                player.gotHit = true;
                player.hasShield = false;
            } else {
                player.canHit = false;
                player.gotHit = true;
                player.lives--;
            }
        }
    }
}

//checking to see when an enemy should die
function killOff() {
    for (let i = 0; i < enemies.length; i++) {
        if (enemies[i] instanceof DangerSpot) {
            if (enemies[0].actualBlowUp == 0) {
                enemies.splice(i, 1);
                break;
            }
        }
        if (enemies[i].actualHealth <= 0) {
            dropItem(enemies[i].rarity, enemies[i].pos.x, enemies[i].pos.y);
            enemies.splice(i, 1);
        }
        if (player.bulletArray[i] != undefined) {
            if (player.bulletArray[i].used) {
                player.bulletArray.splice(i, 1);
                break;
            }
        }
    }
}

//Swings a sword
class SwordSwingSusan extends Enemy {
    constructor(color, x, y, size, speed, health, rarity, weaponColor, attackCd, attackAngle, swordLength, swordSpeed) {
        super(color, x, y, size, speed, health, rarity);
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
    //attacking
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
            for (let j = 0; j < this.swordLength; j++) {
                if (dist(player.pos.x, player.pos.y, x1 + (x2 - x1) * ((j + 1) / this.swordLength), y1 + (y2 - y1) * ((j + 1) / this.swordLength)) < player.size / 2) {
                    if (player.canHit) {
                        if (player.hasShield && player.canHit == true && player.gotHit == false) {
                            player.canHit = false;
                            player.gotHit = true;
                            player.hasShield = false;
                        } else {
                            player.canHit = false;
                            player.gotHit = true;
                            player.lives--;
                        }
                    }
                }
            }
        }
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
        fill(255, 255 * (this.actualCd / this.atkCd), 0);
        ellipse(this.pos.x - (this.size / 2 + 10), this.pos.y + (this.size / 2 + 5), 15);
        fill("green");
        rect(this.pos.x - this.size / 2, this.pos.y + this.size / 2, this.size * (this.actualHealth / this.maxHealth), 10);
        for (let i = 0; i < this.marked; i++) {
            noFill();
            strokeWeight(3);
            stroke(192);
            ellipse(this.pos.x, this.pos.y, this.size + i * 10);
        }
        if (this.dot > 0) {
            this.actualHealth -= this.dot;
            killOff();
        }
    }
}

//shoots a gun
class ShooterSam extends Enemy {
    constructor(color, x, y, size, speed, health, rarity, bulletSpeed, bulletColor, bulletSize, shootCd) {
        super(color, x, y, size, speed, health, rarity);
        this.bulletSpeed = bulletSpeed;
        this.bulletColor = bulletColor;
        this.bulletSize = bulletSize
        this.shootCd = shootCd;
        this.actualSCd = shootCd;
        this.lockOn = createVector(0, 0);
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
        fill(255, 255 * (this.actualSCd / this.shootCd), 0);
        ellipse(this.pos.x + (this.size / 2 + 10), this.pos.y + (this.size / 2 + 5), 15);
        fill("green");
        rect(this.pos.x - this.size / 2, this.pos.y + this.size / 2, this.size * (this.actualHealth / this.maxHealth), 10);
        for (let i = 0; i < this.marked; i++) {
            noFill();
            strokeWeight(3);
            stroke(192);
            ellipse(this.pos.x, this.pos.y, this.size + i * 10);
        }
        if (this.dot > 0) {
            this.actualHealth -= this.dot;
            killOff();
        }
    }
    canShoot() {
        if (this.actualSCd == 30) {
            this.lockOn.x = player.pos.x;
            this.lockOn.y = player.pos.y;
        }
        if (this.actualSCd == 0) {
            player.bulletArray.push(new Bullet(this.pos.x, this.pos.y, 0, this.bulletSize, this.bulletColor, this.bulletSpeed, 0, "enemy", this.lockOn.x, this.lockOn.y));
            this.actualSCd = this.shootCd;
        } else {
            this.actualSCd--;
        }
    }
}

//stays a safe distance away
class KiterKid extends ShooterSam {
    constructor(color, x, y, size, speed, health, rarity, bulletSpeed, bulletColor, bulletSize, shootCd) {
        super(color, x, y, size, speed, health, rarity, bulletSpeed, bulletColor, bulletSize, shootCd);
    }
    track() {
        let moveVector;
        if (this.blackHoled == false) {
            moveVector = p5.Vector.sub(player.pos, this.pos);
        } else if (this.blackHoled == true) {
            if (this.speed == 0) {
                this.speed = 1;
                this.speedChanged = true;
            }
            moveVector = p5.Vector.sub(player.roars[3].static, this.pos);
        }
        if (this.pos.x <= 32.5) {
            this.pos.x = 32.5;
        }
        if (this.pos.x >= 967.5) {
            this.pos.x = 967.5;
        }
        if (this.pos.y <= 32.5) {
            this.pos.y = 32.5;
        }
        if (this.pos.y >= 679.5) {
            this.pos.y = 679.5;
        }
        if (this.timer > 0) {
            this.timer--;
        }
        if (this.timer == 1) {
            this.speed = this.speed * -2;
        }
        moveVector.setMag(this.speed);
        if (dist(this.pos.x, this.pos.y, player.pos.x, player.pos.y) - moveVector.mag() > 200 || this.blackHoled == true) {
            this.pos.add(moveVector);
        } else if (dist(this.pos.x, this.pos.y, player.pos.x, player.pos.y) + moveVector.mag() < 200 && this.blackHoled == false) {
            this.pos.sub(moveVector);
        }
        if (dist(this.pos.x, this.pos.y, player.pos.x, player.pos.y) < player.size / 2 && player.canHit) {
            if (player.hasShield && player.canHit == true && player.gotHit == false) {
                player.canHit = false;
                player.gotHit = true;
                player.hasShield = false;
            } else {
                player.canHit = false;
                player.gotHit = true;
                player.lives--;
            }
        }
    }
}

//shoots and swings
class NinjaNanny extends SwordSwingSusan {
    constructor(color, x, y, size, speed, health, rarity, bulletSpeed, bulletColor, bulletSize, shootCd, weaponColor, attackCd, attackAngle, swordLength, swordSpeed) {
        super(color, x, y, size, speed, health, rarity, weaponColor, attackCd, attackAngle, swordLength, swordSpeed);
        this.bulletSpeed = bulletSpeed;
        this.bulletColor = bulletColor;
        this.bulletSize = bulletSize
        this.shootCd = shootCd;
        this.actualSCd = shootCd;
        this.lockOn = createVector(0, 0);
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
        fill(255, 255 * (this.actualSCd / this.shootCd), 0);
        ellipse(this.pos.x + (this.size / 2 + 10), this.pos.y + (this.size / 2 + 5), 15);
        fill(255, 255 * (this.actualCd / this.atkCd), 0);
        ellipse(this.pos.x - (this.size / 2 + 10), this.pos.y + (this.size / 2 + 5), 15);
        fill("green");
        rect(this.pos.x - this.size / 2, this.pos.y + this.size / 2, this.size * (this.actualHealth / this.maxHealth), 10);
        for (let i = 0; i < this.marked; i++) {
            noFill();
            strokeWeight(3);
            stroke(192);
            ellipse(this.pos.x, this.pos.y, this.size + i * 10);
        }
        if (this.dot > 0) {
            this.actualHealth -= this.dot;
            killOff();
        }
    }
    canShoot() {
        if (this.actualSCd == 30) {
            this.lockOn.x = player.pos.x;
            this.lockOn.y = player.pos.y;
        }
        if (this.actualSCd == 0) {
            player.bulletArray.push(new Bullet(this.pos.x, this.pos.y, 0, this.bulletSize, this.bulletColor, this.bulletSpeed, 0, "enemy", this.lockOn.x, this.lockOn.y));
            this.actualSCd = this.shootCd;
        } else {
            this.actualSCd--;
        }
    }
}

//charges after charging
class ChargingChad extends SwordSwingSusan {
    constructor(color, x, y, size, speed, health, rarity, weaponColor, swordLength, chargeTimer) {
        super(color, x, y, size, speed, health, rarity, weaponColor, 0, 1, swordLength, 1);
        this.chargeTimer = chargeTimer;
        this.actualTimer = chargeTimer;
        this.chargeVector = createVector(0, 0);
        this.canCharge = false;
    }
    draw() {
        strokeWeight(2);
        stroke(255, 255 * (this.actualTimer / this.chargeTimer), 0);
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.size);
        strokeWeight(2);
        stroke("white");
        fill("red");
        rect(this.pos.x - this.size / 2, this.pos.y + this.size / 2, this.size, 10);
        strokeWeight(0);
        fill("green");
        rect(this.pos.x - this.size / 2, this.pos.y + this.size / 2, this.size * (this.actualHealth / this.maxHealth), 10);

        if (this.dot > 0) {
            this.actualHealth -= this.dot;
            killOff();
        }
    }
    track() {
        if (this.actualTimer == -1) {
            console.log("charging");
        }
        let moveVector = this.chargeVector.copy();
        if (this.actualTimer >= 15 && this.blackHoled == false) {
            this.chargeVector.x = player.pos.x - this.pos.x;
            this.chargeVector.y = player.pos.y - this.pos.y;
            this.chargeVector.mult(1.8);
        }
        if (this.actualTimer > -1) {
            this.actualTimer--;
        }
        if (this.timer == 1) {
            this.canCharge = false;
            this.chargeVector.x = 0;
            this.chargeVector.y = 0;

        }
        if (this.blackHoled == true) {
            if (this.speed == 0) {
                this.speed = 1;
                this.speedChanged = true;
            }
            this.chargeVector.x = player.roars[3].static.x - this.pos.x;
            this.chargeVector.y = player.roars[3].static.y - this.pos.y;
            this.chargeVector.mult(1.8);
        }
        if (this.actualTimer == -1) {
            this.canCharge = true;
            moveVector.setMag(this.speed);
            this.chargeVector.sub(moveVector);
            if (this.chargeVector.mag() > this.speed)
                this.pos.add(moveVector);
        }
        if (this.pos.x <= 32.5) {
            this.pos.x = 32.5;
        }
        if (this.pos.x >= 967.5) {
            this.pos.x = 967.5;
        }
        if (this.pos.y <= 32.5) {
            this.pos.y = 32.5;
        }
        if (this.pos.y >= 679.5) {
            this.pos.y = 679.5;
        }
        if (this.timer > 0) {
            this.timer--;
        }
        if (this.timer == 1) {
            this.speed = this.speed * -2;
        }
        if ((this.chargeVector.mag() < this.speed || this.pos.x == 32.5 || this.pos.x == 967.5 || this.pos.y == 32.5 || this.pos.y == 679.5) && this.canCharge) {
            this.actualTimer = this.chargeTimer;
            this.canCharge = false;
        }
        if (dist(this.pos.x, this.pos.y, player.pos.x, player.pos.y) < player.size / 2 && player.canHit) {
            if (player.hasShield && player.canHit == true && player.gotHit == false) {
                player.canHit = false;
                player.gotHit = true;
                player.hasShield = false;
            } else {
                player.canHit = false;
                player.gotHit = true;
                player.lives--;
            }
        }
    }
    canAttack() {
        if (this.actualCd == 0) {
            if (this.timer > 0) {
                this.attackScope.start = this.chargeVector.heading() - this.range / 2 + 180;
                this.attackScope.end = this.chargeVector.heading() + this.range / 2 + 180;
            } else {
                this.attackScope.start = this.chargeVector.heading() - this.range / 2;
                this.attackScope.end = this.chargeVector.heading() + this.range / 2;
            }
            this.actualCd = this.atkCd;
            this.swing();
            this.isAttacking = true;
        }
    }
}

//spawner boss
class TheMachine {
    constructor() {
        this.pos = createVector(width / 2, 355);
        this.size = 280;
        this.health = 999;
        this.actualHealth = 339;
        this.spawnRate = 240;
        this.actualSpawnRate = 240;
        this.blowUp = 600;
        this.actualBlowUp = 600;
        this.shootCD = 120;
        this.actualShootCD = 120;
        this.lockOn = createVector(0, 0);
        this.dot = 0;
        this.rarity = 2;
        this.timer = 0;
        this.canHit = true;
        this.marked = 0;
        this.bulletSize = 30;
        this.bulletColor = 90;
        this.bulletSpeed = 5;
    }
    draw() {
        fill(210);
        noStroke();
        rect(this.pos.x - 150, this.pos.y - 150, 250, 250);
        if (this.actualHealth > 0) {
            fill("red");
            stroke("grey");
            strokeWeight(2);
            if (this.actualHealth > 333) {
                rect(10, 10, 900, 50);
            } else {
                rect(10, 10, 900 * (this.actualHealth / 333), 50);
            }
        }
        if (this.actualHealth > 333) {
            fill("green");
            stroke("grey");
            strokeWeight(2);
            if (this.actualHealth > 666) {
                rect(30, 30, 900, 50);
            } else {
                rect(30, 30, 900 * ((this.actualHealth - 333) / 333), 50);
            }
        }
        if (this.actualHealth > 666) {
            fill("blue")
            rect(50, 50, 900 * ((this.actualHealth - 666) / 333), 50);
        }
        fill("white");
        strokeWeight(0);
        textSize(30);
        text("THE MACHINE", 500, 130);
        for (let i = 0; i < this.marked; i++) {
            noFill();
            strokeWeight(3);
            stroke(192);
            ellipse(this.pos.x, this.pos.y, 450 + i * 30);
        }
        if (this.dot > 0) {
            this.actualHealth -= this.dot;
            killOff();
        }
        
        if(this.actualHealth <= 333) {
            this.blowUp = 150;
            this.shootCD = 30;
        }
    }

    canShoot() {
        if (this.actualHealth <= 666) {
            if (this.actualShootCD == 30) {
                this.lockOn.x = player.pos.x;
                this.lockOn.y = player.pos.y;
            }
            if (this.actualShootCD == 0) {
                player.bulletArray.push(new Bullet(this.pos.x, this.pos.y, 0, this.bulletSize, this.bulletColor, this.bulletSpeed, 0, "enemy", this.lockOn.x, this.lockOn.y));
                this.actualShootCD = this.shootCD;
            } else {
                this.actualShootCD--;
            }
        }
    }
    canSpawn() {
        if (this.actualSpawnRate == 0) {
            enemies.push(new Enemy(210, this.pos.x, this.pos.y, 45, 1, 20, 0));
            this.actualSpawnRate = this.spawnRate;
        } else {
            this.actualSpawnRate--;
        }
    }
    canExplode() {
        if (this.actualHealth <= 666) {
            if (this.actualBlowUp == 100) {
                enemies.push(new DangerSpot(player.pos.x, player.pos.y));
            }
            if (this.actualBlowUp == 0) {
                this.actualBlowUp = this.blowUp;
            } else {
                this.actualBlowUp--;
            }
        }
    }
}

class DangerSpot {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.size == 200;
    }

    draw() {
        noFill();
        stroke("red");
        strokeWeight(5);
        ellipse(this.pos.x, this.pos.y, 200);
        fill("red");
        noStroke();
        this.size = 200 * (enemies[0].actualBlowUp / 100);
        ellipse(this.pos.x, this.pos.y, this.size);
        if (enemies[0].actualBlowUp == 0) {
            if (dist(player.pos.x, player.pos.y, this.pos.x, this.pos.y) < 100 && player.canHit == true) {
                if (player.hasShield && player.canHit == true && player.gotHit == false) {
                    player.canHit = false;
                    player.gotHit = true;
                    player.hasShield = false;
                } else {
                    player.canHit = false;
                    player.gotHit = true;
                    player.lives--;
                }
            }
        }
    }
}
