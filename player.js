//player values
class Player {
    constructor() {
        this.hasShield = false;
        this.canRoar = false;
        this.roarSize = 0;
        this.roarType;
        this.maxRoar = 0;
        this.alpha = 255;
        this.canHit = true;
        this.gotHit = false;
        this.timer = 0;
        this.pos = createVector(20, 20);
        this.size = 60;
        this.speed = 2;
        this.lives = 3;
        this.maxLives = 3;
        this.activeWeapon = 0;
        this.isAttacking = false;
        this.attackScope = {
            start: 0,
            end: 0
        }
    }

    //attacking
    attack() {
        if (this.isAttacking) {
            items[this.activeWeapon].actualCd = items[this.activeWeapon].atkCd;
            if (items[this.activeWeapon].type == "melee") {
                for (let i = 0; i < items[this.activeWeapon].speed; i++) {
                    this.attackScope.start += 1;
                    this.meleeAttack();
                }
            }
        }
        for (let i = 0; i < 3; i++) {
            if (items[i].actualCd > 0) {
                items[i].actualCd--;

            }
        }
    }


    meleeAttack() {
        if (this.isAttacking) {
            let length = items[this.activeWeapon].size;
            let theta = this.attackScope.start;
            let opposite = sin(theta) * length;
            let adjacent = cos(theta) * length;

            stroke(items[this.activeWeapon].color);
            strokeWeight(10);
            line(this.pos.x, this.pos.y, this.pos.x + adjacent, this.pos.y + opposite);
            this.hitbox(this.pos.x, this.pos.y, this.pos.x + adjacent, this.pos.y + opposite);
            if (this.attackScope.start >= this.attackScope.end) {
                this.isAttacking = false;
                for (let i = 0; i < enemies.length; i++) {
                    enemies[i].canHit = true;
                }
            }
        }
    }
    //calculate if hit enemies
    hitbox(x1, y1, x2, y2) {
        for (let i = 0; i < enemies.length; i++) {
            for (let j = 0; j < items[this.activeWeapon].size; j++) {
                if (dist(enemies[i].pos.x, enemies[i].pos.y, x1 + (x2 - x1) * ((j + 1) / items[this.activeWeapon].size), y1 + (y2 - y1) * ((j + 1) / items[this.activeWeapon].size)) < enemies[i].size / 2) {
                    if (enemies[i].canHit) {
                        enemies[i].canHit = false;
                        enemies[i].actualHealth -= items[this.activeWeapon].damage;
                        let moveVector = p5.Vector.sub(this.pos, enemies[i].pos);
                        moveVector.setMag(items[this.activeWeapon].knockback);
                        enemies[i].pos.sub(moveVector);
                        killOff();
                        break;
                    }
                }
            }
        }
    }

    //invulnerability when hit
    invul() {
        if (this.timer % 15 == 0) {
            if (this.timer == 15) {
                this.alpha = 0;
            } else if (this.timer == 30) {
                this.alpha = 255;
            } else if (this.timer == 45) {
                this.alpha = 0;
            } else if (this.timer == 60) {
                this.alpha = 255;
            }
        }
        if (this.gotHit) {
            this.timer++;
            if (this.timer % 61 == 0) {
                this.canHit = true;
                this.gotHit = false;
                this.timer = 0;
            }
        }
    }

    //using the roar consumables
    roar() {
        if (this.roarType == "fear") {
            for (let i = 0; i < enemies.length; i++) {
                if (enemies[i].timer > 0) {
                    enemies[i].timer--;
                }
                if (enemies[i].timer == 1) {
                    enemies[i].speed = enemies[i].speed * -2;
                }
            }
        }
        if (this.canRoar) {
            if (this.roarType == "fear") {
                stroke("red");
                strokeWeight(5);
                noFill();
                this.maxRoar = 300;
            }
            if (this.roarType == "ice") {
                stroke(0, 255, 255);
                strokeWeight(8);
                noFill();
                this.maxRoar = 200;
            }
            if (this.roarType == "fire") {
                stroke("orange");
                strokeWeight(12);
                noFill();
                this.maxRoar = 500;
            }
            ellipse(player.pos.x, player.pos.y, this.roarSize);
            this.roarSize += 20;
            for (let i = 0; i < enemies.length; i++) {
                if (dist(this.pos.x, this.pos.y, enemies[i].pos.x, enemies[i].pos.y) < this.roarSize / 2 + enemies[i].size / 2 && enemies[i].canHit == true) {
                    if (this.roarType == "fear") {
                        enemies[i].canHit = false;
                        enemies[i].actualHealth -= 10;
                        enemies[i].speed = enemies[i].speed * -0.5;
                        enemies[i].timer = 120;
                        killOff();
                    }
                    if (this.roarType == "ice") {
                        enemies[i].color = [0, 255, 255, 200];
                        enemies[i].canHit = false;
                        enemies[i].speed = 0;
                    }
                    if (this.roarType == "fire") {
                        enemies[i].dot = 0.1;
                        enemies[i].canHit = false;
                    }
                }
            }
            if (this.roarSize >= this.maxRoar) {
                this.canRoar = false;
                this.roarSize = 0;
                for (let i = 0; i < enemies.length; i++) {
                    if (enemies[i].canHit == false) {
                        enemies[i].canHit = true;
                    }
                }
            }
        }
    }

    //drawing and moving
    draw() {
        //moving
        fill(125, 125, 125, this.alpha);
        strokeWeight(0);
        ellipse(this.pos.x, this.pos.y, this.size);
        if (this.hasShield) {
            stroke(61, 232, 255);
            strokeWeight(2);
            noFill();
            ellipse(this.pos.x, this.pos.y, this.size + 20)
        }
        if (keyIsDown(87)) {
            this.pos.y -= this.speed;
        }
        if (keyIsDown(83)) {
            this.pos.y += this.speed;
        }
        if (keyIsDown(65)) {
            this.pos.x -= this.speed;
        }
        if (keyIsDown(68)) {
            this.pos.x += this.speed;
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
    }

}
//attacking
function keyPressed() {
    //attacking
    if (keyCode == 38) {
        if (items[player.activeWeapon].actualCd == 0) {
            player.isAttacking = true;
            if (items[player.activeWeapon].type == "melee") {
                player.attackScope.start = 270 - (items[player.activeWeapon].range / 2);
                player.attackScope.end = 270 + (items[player.activeWeapon].range / 2);
            }
        }
    }
    if (keyCode == 40) {
        if (items[player.activeWeapon].actualCd == 0) {
            player.isAttacking = true;
            if (items[player.activeWeapon].type == "melee") {
                player.attackScope.start = 90 - (items[player.activeWeapon].range / 2);
                player.attackScope.end = 90 + (items[player.activeWeapon].range / 2);
            }
        }
    }
    if (keyCode == 37) {
        if (items[player.activeWeapon].actualCd == 0) {
            player.isAttacking = true;
            if (items[player.activeWeapon].type == "melee") {
                player.attackScope.start = 180 - (items[player.activeWeapon].range / 2);
                player.attackScope.end = 180 + (items[player.activeWeapon].range / 2);
            }
        }
    }
    if (keyCode == 39) {
        if (items[player.activeWeapon].actualCd == 0) {
            player.isAttacking = true;
            if (items[player.activeWeapon].type == "melee") {
                player.attackScope.start = 360 - (items[player.activeWeapon].range / 2);
                player.attackScope.end = 360 + (items[player.activeWeapon].range / 2);
            }
        }
    }
    //switching weapons
    if (keyCode == 81) {
        if (player.activeWeapon == 0) {
            player.activeWeapon = 2;
        } else if (player.activeWeapon == 1) {
            player.activeWeapon = 0;
        } else if (player.activeWeapon == 2) {
            player.activeWeapon = 1;
        }
    } else if (keyCode == 69) {
        if (player.activeWeapon == 0) {
            player.activeWeapon = 1;
        } else if (player.activeWeapon == 1) {
            player.activeWeapon = 2;
        } else if (player.activeWeapon == 2) {
            player.activeWeapon = 0;
        }
    }

    //using items
    if (keyCode > 51 && keyCode < 56) {
        items[keyCode - 49].activate();
    }
}
