let player;
let items = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

//player values
class Player {
    constructor() {
        //items
        this.shieldGetTimer = 0;
        this.hasShield = false;
        this.bloodShield = false;
        this.roars = [0, 0, 0, 0, 0];
        this.buttonState = "notPickup";
        this.swapIndex;
        this.bulletArray = [];
        this.petArray = [];
        this.cdMod = 0;
        this.atkMod = 1;
        this.starred = false;
        this.cursed = false;
        //player stats
        this.alpha = 255;
        this.color = {
            r: 125,
            g: 125,
            b: 125
        }
        this.canHit = true;
        this.gotHit = false;
        this.timer = 0;
        this.pos = createVector(20, 20);
        this.size = 60;
        this.speed = 2.2;
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
        if (this.isAttacking && items[this.activeWeapon] != 0) {
            items[this.activeWeapon].actualCd = items[this.activeWeapon].atkCd;
            if (items[this.activeWeapon].type == "melee") {
                for (let i = 0; i < items[this.activeWeapon].speed; i++) {
                    this.attackScope.start += 1;
                    this.meleeAttack();
                }
            } else if (items[this.activeWeapon].type == "ranged") {
                if (items[this.activeWeapon].actualAmmo > 0 && items[this.activeWeapon].name !== "Silver Bolts" && items[this.activeWeapon].name !== "Flame Thrower" && items[this.activeWeapon].name !== "Shotgun") {
                    this.bulletArray.push(new Bullet(this.pos.x, this.pos.y, this.attackScope.start, items[this.activeWeapon].size, items[this.activeWeapon].color, items[this.activeWeapon].speed, items[this.activeWeapon].damage, "player", 0, 0, "normal"));
                    this.isAttacking = false;
                    items[this.activeWeapon].actualAmmo--;
                } else if (items[this.activeWeapon].actualAmmo > 0 && items[this.activeWeapon].name == "Silver Bolts") {
                    this.bulletArray.push(new Bullet(this.pos.x, this.pos.y, this.attackScope.start, items[this.activeWeapon].size, items[this.activeWeapon].color, items[this.activeWeapon].speed, items[this.activeWeapon].damage, "player", 0, 0, "vayne"));
                    this.isAttacking = false;
                    items[this.activeWeapon].actualAmmo--;
                } else if (items[this.activeWeapon].actualAmmo > 0 && items[this.activeWeapon].name == "Flame Thrower") {
                    for (let i = 0; i < chance(10, 15); i++) {
                        this.bulletArray.push(new Bullet(this.pos.x, this.pos.y, this.attackScope.start, items[this.activeWeapon].size, items[this.activeWeapon].color, items[this.activeWeapon].speed, items[this.activeWeapon].damage, "player", 0, 0, "fire"));
                    }
                    this.isAttacking = false;
                    items[this.activeWeapon].actualAmmo--;
                } else if (items[this.activeWeapon].actualAmmo > 0 && items[this.activeWeapon].name == "Shotgun") {
                    for (let i = 0; i < 6; i++) {
                        this.bulletArray.push(new Bullet(this.pos.x, this.pos.y, this.attackScope.start, items[this.activeWeapon].size, items[this.activeWeapon].color, items[this.activeWeapon].speed, items[this.activeWeapon].damage, "player", 0, 0, "pellet"));
                    }
                    this.isAttacking = false;
                    items[this.activeWeapon].actualAmmo--;
                }
            } else if(items[this.activeWeapon].type == "pet") {
                if(items[this.activeWeapon].summoned == false) {
                    this.petArray.push(new Pet(items[this.activeWeapon]));
                    items[this.activeWeapon].summoned = true;
                    this.petArray[this.petArray.length - 1].source = this.activeWeapon;
                    this.isAttacking = false;
                }
            }
        }
        //ticking down item cooldowns
        for (let i = 0; i < 3; i++) {
            if (items[i].actualCd > 0) {
                items[i].actualCd -= 1 + this.cdMod;
                if (items[i].actualCd < 0) {
                    items[i].actualCd = 0;
                }

            }
        }
    }
    //attacking with a melee weapon
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
    //attacking with a ranged weapon
    rangedAttack() {
        for (let i = 0; i < this.bulletArray.length; i++) {
            this.bulletArray[i].move();
        }
    }
    //calculate if hit enemies
    hitbox(x1, y1, x2, y2) {
        for (let i = 0; i < enemies.length; i++) {
            for (let j = 0; j < items[this.activeWeapon].size; j++) {
                if (dist(enemies[i].pos.x, enemies[i].pos.y, x1 + (x2 - x1) * ((j + 1) / items[this.activeWeapon].size), y1 + (y2 - y1) * ((j + 1) / items[this.activeWeapon].size)) < enemies[i].size / 2) {
                    if (enemies[i].canHit) {
                        enemies[i].canHit = false;
                        enemies[i].actualHealth -= items[this.activeWeapon].damage * this.atkMod;
                        if (enemies[i].actualHealth <= 0) {
                            if (items[this.activeWeapon].name == "Thirst Blade") {
                                items[this.activeWeapon].thirst++;
                                if (items[this.activeWeapon].thirst == 3) {
                                    if (player.lives < player.maxLives) {
                                        player.lives++;
                                    } else {
                                        if (player.bloodShield != true) {
                                            player.bloodShield = true;
                                        }
                                    }
                                    items[this.activeWeapon].thirst = 0;
                                }
                            }
                        }
                        if (enemies[i] instanceof Enemy) {
                            let moveVector = p5.Vector.sub(this.pos, enemies[i].pos);
                            moveVector.setMag(items[this.activeWeapon].knockback);
                            enemies[i].pos.sub(moveVector);
                            break;
                        }
                    }
                }
            }
        }
    }

    //invulnerability when hit
    invul() {
        if (this.starred) {
            this.color.r = chance(0, 255);
            this.color.g = chance(0, 255);
            this.color.b = chance(0, 255);
            this.timer++;
        } else if (this.starred == false) {
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
        }
        if (this.gotHit) {
            this.timer++;
            if (this.timer > 60) {
                this.canHit = true;
                this.gotHit = false;
                this.timer = 0;
                this.color.r = 125;
                this.color.g = 125;
                this.color.b = 125;
                if (this.starred) {
                    this.starred = false;
                    this.speed -= 1;
                }
            }
        }
    }

    //drawing and moving
    draw() {
        //moving
        fill(this.color.r, this.color.g, this.color.b, this.alpha);
        strokeWeight(0);
        ellipse(this.pos.x, this.pos.y, this.size);
        for (let i = 7; i < 10; i++) {
            if (items[i].name == "Shield Charm") {
                if (this.shieldGetTimer % 480 == 0 && this.shieldGetTimer > 0) {
                    this.hasShield = true;
                    this.shieldGetTimer = 0;
                } else {
                    this.shieldGetTimer++;
                }
            }
        }
        if (this.hasShield) {
            stroke(61, 232, 255);
            strokeWeight(2);
            noFill();
            ellipse(this.pos.x, this.pos.y, this.size + 20);
        }
        if (this.bloodShield) {
            stroke(173, 34, 34, 100);
            strokeWeight(3);
            noFill();
            ellipse(this.pos.x, this.pos.y, this.size + 10);
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
        //barriers
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
        if (stageNum == 10 && enemies[0] instanceof TheMachine) {
            if (this.pos.x < 600 && this.pos.x > 595 && this.pos.y > 205 && this.pos.y < 455) {
                this.pos.x = 600;
            }
            if (this.pos.x > 350 && this.pos.x < 355 && this.pos.y > 205 && this.pos.y < 455) {
                this.pos.x = 350;
            }
            if (this.pos.y < 455 && this.pos.y > 450 && this.pos.x > 350 && this.pos.x < 600) {
                this.pos.y = 455;
            }
            if (this.pos.y > 205 && this.pos.y < 210 && this.pos.x > 350 && this.pos.x < 600) {
                this.pos.y = 205;
            }
        }
        //moving to new stage
        if (this.pos.x == 967.5 && this.pos.y < 405 && this.pos.y > 305 && enemies.length == 0 && canAdvance) {
            stageNum++;
            canAdvance = false;
            for (let i = 0; i < droppedItems.length; i++) {
                droppedItems.splice(i, 1);
                i--;
            }
            for(let i = 0; i < player.petArray.length; i ++) {
                items[player.petArray[i].source].summoned = false;
                player.petArray.splice(i, 1);
                i--;
            }
            stages[stageNum].setup();
        }
        //losing
        if (player.lives == 0) {
            for (let i = 0; i < enemies.length; i++) {
                enemies.splice(i, 1);
            }
            for (let i = 0; i < droppedItems.length; i++) {
                droppedItems.splice(i, 1);
            }
            player.pos.x = 2000;
            player.pos.y = 1600;
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
            } else if (items[player.activeWeapon].type == "ranged") {
                player.attackScope.start = 270;
            }
        }
    }
    if (keyCode == 40) {
        if (items[player.activeWeapon].actualCd == 0) {
            player.isAttacking = true;
            if (items[player.activeWeapon].type == "melee") {
                player.attackScope.start = 90 - (items[player.activeWeapon].range / 2);
                player.attackScope.end = 90 + (items[player.activeWeapon].range / 2);
            } else if (items[player.activeWeapon].type == "ranged") {
                player.attackScope.start = 90;
            }
        }
    }
    if (keyCode == 37) {
        if (items[player.activeWeapon].actualCd == 0) {
            player.isAttacking = true;
            if (items[player.activeWeapon].type == "melee") {
                player.attackScope.start = 180 - (items[player.activeWeapon].range / 2);
                player.attackScope.end = 180 + (items[player.activeWeapon].range / 2);
            } else if (items[player.activeWeapon].type == "ranged") {
                player.attackScope.start = 180;
            }
        }
    }
    if (keyCode == 39) {
        if (items[player.activeWeapon].actualCd == 0) {
            player.isAttacking = true;
            if (items[player.activeWeapon].type == "melee") {
                player.attackScope.start = 360 - (items[player.activeWeapon].range / 2);
                player.attackScope.end = 360 + (items[player.activeWeapon].range / 2);
            } else if (items[player.activeWeapon].type == "ranged") {
                player.attackScope.start = 360;
            }
        }
    }
    //switching weapons
    if (player.buttonState == "notPickup") {
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
            if (items[keyCode - 49].amount == 0) {
                items.splice(keyCode - 49, 1, 0);
            }
        }
    }
    //picking up items
    if (player.buttonState == "pickup") {
        if (droppedItems[player.swapIndex].type == "melee" || droppedItems[player.swapIndex].type == "ranged" || droppedItems[player.swapIndex].type == "pet") {
            if (keyCode > 48 && keyCode < 52) {
                items.splice(keyCode - 49, 1, droppedItems[player.swapIndex]);
                if (droppedItems[player.swapIndex].type == "ranged") {
                    if (items[7].name == "Ammo Charm" || items[8].name == "Ammo Charm" || items[9].name == "Ammo Charm") {
                        items[keyCode - 49].ammo = items[keyCode - 49].ammo * 3;
                        items[keyCode - 49].ammoChanged = true;
                    }
                }
                if (droppedItems[player.swapIndex].type == "pet") {
                    if (items[7].name == "Ammo Charm" || items[8].name == "Ammo Charm" || items[9].name == "Ammo Charm") {
                        items[keyCode - 49].energy = items[keyCode - 49].energy * 3;
                        items[keyCode - 49].energyChanged = true;
                    }
                }
                droppedItems.splice(player.swapIndex, 1);
                player.buttonState = "notPickup";
            }
        } else if (droppedItems[player.swapIndex].type == "consumable") {
            if (keyCode > 51 && keyCode < 56) {
                items.splice(keyCode - 49, 1, droppedItems[player.swapIndex]);
                droppedItems.splice(player.swapIndex, 1);
                player.buttonState = "notPickup";
            }
        } else if (droppedItems[player.swapIndex].type == "charm") {
            if (keyCode > 55 && keyCode < 58 || keyCode == 48) {
                if (keyCode == 48) {
                    if (items[9] != 0) {
                        items[9].takeOff();
                    }
                    items.splice(9, 1, droppedItems[player.swapIndex]);
                    items[9].putOn();
                } else {
                    if (items[keyCode - 49] != 0) {
                        items[keyCode - 49].takeOff();
                    }
                }
                items.splice(keyCode - 49, 1, droppedItems[player.swapIndex]);
                droppedItems.splice(player.swapIndex, 1);
                player.buttonState = "notPickup";
                items[keyCode - 49].putOn();
            }
        }
    }
    //picking up / deleting items
    if (keyCode == 32 || keyCode == 16) {
        checkItem: for (let i = 0; i < droppedItems.length; i++) {
            if (dist(droppedItems[i].pos.x, droppedItems[i].pos.y, player.pos.x, player.pos.y) < 30) {
                if (keyCode == 32) {
                    if (droppedItems[i].type == "consumable") {
                        for (j = 3; j < 7; j++) {
                            if (items[j].name == droppedItems[i].name && items[j].amount < items[j].maxAmount) {
                                items[j].amount++;
                                droppedItems.splice(i, 1);
                                break checkItem;
                            }
                        }
                    }
                    player.buttonState = "pickup";
                    player.swapIndex = i;
                } else if (keyCode == 16) {
                    droppedItems.splice(i, 1);
                }
                break checkItem;
            }
        }
    }
}
