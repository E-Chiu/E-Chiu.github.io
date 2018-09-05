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
            if (player.hasShield || player.bloodShield) {
                if (player.canHit == true && player.gotHit == false) {
                    player.canHit = false;
                    player.gotHit = true;
                    if (player.bloodShield) {
                        player.bloodShield = false;
                    } else if (player.hasShield) {
                        player.hasShield = false;
                    }
                }
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
            if (enemies[i].timer == 0) {
                enemies.splice(i, 1);
                break;
            }
        }
        if (enemies[i].actualHealth <= 0) {
            if (enemies[i] instanceof TheMachine || enemies[i] instanceof TheNinja) {
                dropItem(enemies[i].rarity, enemies[i].pos.x, enemies[i].pos.y, "boss");
                enemies.splice(i, 1);
            } else {
                dropItem(enemies[i].rarity, enemies[i].pos.x, enemies[i].pos.y);
                enemies.splice(i, 1);
            }
        }
    }
    for (let i = 0; i < player.bulletArray.length; i++) {
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
        this.hitbox(this.pos.x, this.pos.y, this.pos.x + adjacent, this.pos.y + opposite);
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
                        if (player.hasShield || player.bloodShield) {
                            if (player.canHit == true && player.gotHit == false) {
                                player.canHit = false;
                                player.gotHit = true;
                                if (player.bloodShield) {
                                    player.bloodShield = false;
                                } else if (player.hasShield) {
                                    player.hasShield = false;
                                }
                            }
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
            if (player.hasShield || player.bloodShield) {
                if (player.canHit == true && player.gotHit == false) {
                    player.canHit = false;
                    player.gotHit = true;
                    if (player.bloodShield) {
                        player.bloodShield = false;
                    } else if (player.hasShield) {
                        player.hasShield = false;
                    }
                }
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
            if (player.hasShield || player.bloodShield) {
                if (player.canHit == true && player.gotHit == false) {
                    player.canHit = false;
                    player.gotHit = true;
                    if (player.bloodShield) {
                        player.bloodShield = false;
                    } else if (player.hasShield) {
                        player.hasShield = false;
                    }
                }
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
        this.size = 270;
        this.health = 666;
        this.actualHealth = 666;
        this.spawnRate = 240;
        this.actualSpawnRate = 240;
        this.blowUp = 600;
        this.actualBlowUp = 600;
        this.shootCD = 120;
        this.actualShootCD = 120;
        this.lockOn = createVector(0, 0);
        this.dot = 0;
        this.rarity = 3;
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
        if (this.actualHealth == 0) {
            killOff();
        }
        if (this.actualHealth > 0) {
            fill("red");
            stroke("grey");
            strokeWeight(2);
            if (this.actualHealth > 222) {
                rect(10, 10, 900, 50);
            } else {
                rect(10, 10, 900 * (this.actualHealth / 222), 50);
            }
        }
        if (this.actualHealth > 222) {
            fill("green");
            stroke("grey");
            strokeWeight(2);
            if (this.actualHealth > 444) {
                rect(30, 30, 900, 50);
            } else {
                rect(30, 30, 900 * ((this.actualHealth - 222) / 222), 50);
            }
        }
        if (this.actualHealth > 444) {
            fill("blue")
            rect(50, 50, 900 * ((this.actualHealth - 444) / 222), 50);
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

        if (this.actualHealth <= 222) {
            this.blowUp = 150;
            this.shootCD = 15;
            this.bulletSpeed = 1;
        }
    }

    canShoot() {
        if (this.actualHealth <= 444) {
            if (this.actualHealth <= 222 && this.actualShootCD == 15) {
                this.lockOn.x = chance(0, width);
                this.lockOn.y = chance(0, height);
            } else if (this.actualShootCD == 30) {
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
            if (this.actualHealth <= 222) {
                enemies.push(new Enemy(210, chance(0, width), chance(0, height), 45, 1, 20, 0));
            } else {
                enemies.push(new Enemy(210, this.pos.x, this.pos.y, 45, 1, 20, 0));
            }
            this.actualSpawnRate = this.spawnRate;
        } else {
            this.actualSpawnRate--;
        }
    }
    canExplode() {
        if (this.actualBlowUp <= 100) {
            this.blowUpArea();
        }
        if (this.actualBlowUp == 0) {
            this.actualBlowUp = this.blowUp;
        } else {
            this.actualBlowUp--;
        }
    }
    blowUpArea() {
        fill("black");
        if (this.actualHealth <= 444) {
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
        this.size = 200;
        this.timer = 200;
    }

    draw() {
        noFill();
        stroke("red");
        strokeWeight(5);
        ellipse(this.pos.x, this.pos.y, 200);
        fill("red");
        noStroke();
        this.timer--;
        this.size = 200 * (this.timer / 200);
        ellipse(this.pos.x, this.pos.y, this.size);
        if (this.timer == 0) {
            if (dist(player.pos.x, player.pos.y, this.pos.x, this.pos.y) < 100 && player.canHit == true) {
                if (player.hasShield || player.bloodShield) {
                    if (player.canHit == true && player.gotHit == false) {
                        player.canHit = false;
                        player.gotHit = true;
                        if (player.bloodShield) {
                            player.bloodShield = false;
                        } else if (player.hasShield) {
                            player.hasShield = false;
                        }
                    }
                } else {
                    player.canHit = false;
                    player.gotHit = true;
                    player.lives--;
                }
            }
            killOff();
        }
    }
}

//ninja boss
class TheNinja extends NinjaNanny {
    constructor() {
        super(20, 100, 120, 70, 1.5, 666, 3, 8, 173, 12, 180, "white", 80, 180, 90, 40);
        this.clone = 1400;
        this.actualClone = 1400;
        this.dash = 600;
        this.actualDash = 600;
        this.rengarQ = 0;
        this.canRengarQ = false;
        this.rengarQLength = 90;
        this.dashVector = createVector(100, 120);
        this.canDash = false;
        this.cloud = false;
        this.smokeBalls = [
        ];
        this.lockOn = createVector();
    }
    track() {
        if (this.canDash != true) {
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
        }
        if (dist(this.pos.x, this.pos.y, player.pos.x, player.pos.y) < player.size / 2 && player.canHit) {
            if (player.hasShield || player.bloodShield) {
                if (player.canHit == true && player.gotHit == false) {
                    player.canHit = false;
                    player.gotHit = true;
                    if (player.bloodShield) {
                        player.bloodShield = false;
                    } else if (player.hasShield) {
                        player.hasShield = false;
                    }
                }
            } else {
                player.canHit = false;
                player.gotHit = true;
                player.lives--;
            }
        }
    }
    draw() {
        strokeWeight(0);
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.size);
        strokeWeight(2);
        stroke("white");
        strokeWeight(0);
        fill("white");
        text("THE NINJA", 500, 130);
        if (this.actualHealth > 0) {
            fill("red");
            stroke("grey");
            strokeWeight(2);
            if (this.actualHealth > 222) {
                rect(10, 10, 900, 50);
            } else {
                rect(10, 10, 900 * (this.actualHealth / 222), 50);
            }
        }
        if (this.actualHealth > 222) {
            fill("green");
            stroke("grey");
            strokeWeight(2);
            if (this.actualHealth > 444) {
                rect(30, 30, 900, 50);
            } else {
                rect(30, 30, 900 * ((this.actualHealth - 222) / 222), 50);
            }
        }
        if (this.actualHealth > 444) {
            fill("blue")
            rect(50, 50, 900 * ((this.actualHealth - 444) / 222), 50);
        }
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
    //for timers local to the boss
    timers() {
        this.actualClone--;
        this.actualDash--;
        if (this.cloud == true) {
            this.cloudShow();
        }

        if (this.actualCd <= 1) {
            this.rengarQ++;
        }

        if (this.actualClone <= 0 && this.actualHealth < 444) {
            this.cloneJutsu();
        }
        if (this.actualDash == 15 && this.blackHoled == false) {
            this.dashVector.x = player.pos.x - this.pos.x;
            this.dashVector.y = player.pos.y - this.pos.y;
            this.dashVector.mult(1.8);
        }
        if (this.actualDash <= 0) {
            this.dashAtk();
        }
        if (this.rengarQ == 3) {
            this.canRengarQ = true;
        }
    }
    //crappy smoke bomb animation
    cloudShow() {
        for (let i = 0; i < 3; i++) {
            this.smokeBalls[i].size++;
            this.smokeBalls[i].show();
        }
        if (this.smokeBalls[0].size >= 100) {
            this.cloud = false;
            for (let i = 0; i < 3; i++) {
                this.smokeBalls.splice(0, 1);
            }
        }
    }
    //create 3 ninjas and tp to corners
    cloneJutsu() {
        if (enemies.length == 1) {
            this.cloud = true;
            this.smokeBalls.push(new Smoke(this.pos.x + 10, this.pos.y));
            this.smokeBalls.push(new Smoke(this.pos.x - 7, this.pos.y - 11));
            this.smokeBalls.push(new Smoke(this.pos.x, this.pos.y + 5));
            this.pos.x = 100;
            this.pos.y = 120;
            enemies.push(new NinjaNanny("40", 900, 580, 60, 1, 40, 1, 6, 173, 12, 160, "white", 70, 180, 90, 40));
            enemies.push(new NinjaNanny("40", 900, 120, 60, 1, 40, 1, 6, 173, 12, 160, "white", 70, 180, 90, 40));
            enemies.push(new NinjaNanny("40", 100, 580, 60, 1, 40, 1, 6, 173, 12, 160, "white", 70, 180, 90, 40));

        }
        this.actualClone = this.clone;
    }
    //just a charge
    dashAtk() {
        let moveVector = this.dashVector.copy();
        this.actualDash = -1;
        this.speed = 5;
        if (this.actualDash == -1) {
            this.canDash = true;
            moveVector.setMag(this.speed);
            this.dashVector.sub(moveVector);
            if (this.dashVector.mag() > this.speed)
                this.pos.add(moveVector);
        }
        if ((this.dashVector.mag() < this.speed || this.pos.x == 32.5 || this.pos.x == 967.5 || this.pos.y == 32.5 || this.pos.y == 679.5) && this.canDash) {
            this.actualDash = this.dash;
            this.canDash = false;
            this.speed = 1.5;
        }
    }
    //swing
    swing() {
        let length = this.swordLength;
        let theta = this.attackScope.start;
        let opposite = sin(theta) * length;
        let adjacent = cos(theta) * length;
        stroke(this.weaponColor);
        strokeWeight(10);
        line(this.pos.x, this.pos.y, this.pos.x + adjacent, this.pos.y + opposite);
        this.hitbox(this.pos.x, this.pos.y, this.pos.x + adjacent, this.pos.y + opposite);
        if (this.attackScope.start >= this.attackScope.end) {
            this.isAttacking = false;
        }
        if (this.canRengarQ == true) {
            this.rengarQAtk();
        }
    }
    //attack normally then jab
    rengarQAtk() {
        console.log("ye");
        if (this.rengarQ == 3) {
            this.rengarQ = 0;
            this.rengarQLength = -25;
            this.lockOn.x = player.pos.x;
            this.lockOn.y = player.pos.y;
        }
        let length = this.rengarQLength;
        let theta = createVector(this.pos.x - this.lockOn.x, this.pos.y - this.lockOn.y).heading() + 180;
        let opposite = sin(theta) * length;
        let adjacent = cos(theta) * length;
        stroke("red");
        strokeWeight(13);
        line(this.pos.x, this.pos.y, this.pos.x + adjacent, this.pos.y + opposite);
        this.hitbox(this.pos.x, this.pos.y, this.pos.x + adjacent, this.pos.y + opposite);
        if (this.rengarQLength >= 140) {
            this.canRengarQ = false;
        }
    }
}

class Smoke {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 0;
    }

    show() {
        if (enemies[0].cloud == true) {
            fill(173);
            noStroke();
            ellipse(this.x, this.y, this.size);
        }
    }
}

// Skeletron
class Skeletor {
    constructor() {
        this.posHead = createVector(0, 0);
        this.posL = createVector(0, 0);
        this.posR = createVector(0, 0);
        this.speedHead = 0.75;
        this.speedL = 1.12;
        this.speedR = 1.12;
        this.headSize = 75;
        this.handSize = 65;
        this.punchL = chance(60, 180);
        this.punchR = chance(60, 180);
        this.punchBoth = 300;
        this.charge = 600;
        this.healthL = 200;
        this.healthR = 200;
        this.healthHead = 400;
    }
    // for timers local to the boss
    timers() {
        this.punchL--;
        this.punchR--;
        this.punchBoth--;
        this.charge--;
    }
    draw() {
        ellipse(this.posHead.x, this.posHead.y, this.headSize);
        ellipse(this.posL.x, this.posL.y, this.handSize);
        ellipse(this.posR.x, this.posR.y, this.handSize);
    }
    track() {

    }
}
