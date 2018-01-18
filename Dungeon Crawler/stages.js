let stageNum = 0;
let canAdvance = false;


//normal dudes = color, x, y, size, speed, health, rarity
//sword = color, x, y, size, speed, health, rarity, weaponColor, attackCd, attackAngle, swordLength, swordSpeed
//shoot/kite = color, x, y, size, speed, health, rarity, bulletSpeed, bulletColor, bulletSize, shootCd
//ninja = color, x, y, size, speed, health, rarity, bulletSpeed, bulletColor, bulletSize, shootCd, weaponColor, attackCd, attackAngle, swordLength, swordSpeed
//charger = color, x, y, size, speed, health, rarity, weaponColor, swordLength, chargeTimer

//all stages
let stages = [
//tutorial
//level a
    {
        setup: function () {
            player.buttonState = "notPickup";
            player.pos.x = 20;
            player.pos.y = 355;
            enemies.push(new Enemy("blue", 500, 355, 50, 0, 1, 0));
            items.splice(0, 1, new itemLibrary[0][0][0].create());
        },
        draw: function () {
            fill("white");
            strokeWeight(0);
            textSize(30);
            text("Move with WASD, attack with arrow keys", 500, 40);
            if (enemies.length == 0) {
                noStroke();
                fill("yellow");
                rect(990, 305, 10, 100);
                canAdvance = true;
            }
        }
    },
// level b
    {
        setup: function () {
            player.buttonState = "notPickup";
            player.pos.x = 20;
            player.pos.y = 355;
            player.lives = 3;
            for (let i = 0; i < items.length; i++) {
                items.splice(i, 1, 0);
            }
            items.splice(0, 1, new itemLibrary[0][0][0].create());
            items.splice(1, 1, new itemLibrary[0][0][1].create());
            enemies.push(new Enemy("blue", 500, 355, 50, 0, 1, 0));
        },
        draw: function () {
            fill("white");
            strokeWeight(0);
            textSize(30);
            text("Switch weapons with Q or E", 500, 40);
            text("Killing all the enemies clears the stage", 500, 80);
            if (enemies.length == 0) {
                noStroke();
                fill("yellow");
                rect(990, 305, 10, 100);
                canAdvance = true;
            }
        }
},
// level c
    {
        setup: function () {
            player.buttonState = "notPickup";
            player.pos.x = 20;
            player.pos.y = 355;
            for (let i = 0; i < items.length; i++) {
                items.splice(i, 1, 0);
            }
            enemies.push(new Enemy("blue", 500, 355, 50, 0, 1, 0));
            items.splice(0, 1, new itemLibrary[0][0][0].create());
            items.splice(3, 1, new itemLibrary[1][0][0].create());
            player.lives = 2;
        },
        draw: function () {
            fill("white");
            strokeWeight(0);
            textSize(30);
            text("Press the slot number to use consumables", 500, 40);
            if (enemies.length == 0) {
                noStroke();
                fill("yellow");
                rect(990, 305, 10, 100);
                canAdvance = true;
            }
        }
},
// level d
    {
        setup: function () {
            player.buttonState = "notPickup";
            player.pos.x = 20;
            player.pos.y = 355;
            for (let i = 0; i < items.length; i++) {
                items.splice(i, 1, 0);
            }
            enemies.push(new Enemy("blue", 500, 355, 50, 0, 1, 0));
            items.splice(0, 1, new itemLibrary[0][0][0].create());
            items.splice(1, 1, new itemLibrary[0][0][2].create());
            player.lives = 3;
        },
        draw: function () {
            fill("white");
            strokeWeight(0);
            textSize(30);
            text("Ranged weapons have have ammo that reset after every stage", 500, 40);
            if (enemies.length == 0) {
                noStroke();
                fill("yellow");
                rect(990, 305, 10, 100);
                canAdvance = true;
            }
        }
},
//level 1
    {
        setup: function () {
            dropItem(0, 500, 355, "boss");
            player.buttonState = "notPickup";
            localStorage.setItem("played", "yes");
            player.pos.x = 20;
            player.pos.y = 355;
            for (let i = 0; i < items.length; i++) {
                items.splice(i, 1, 0);
            }
            items.splice(0, 1, new itemLibrary[0][0][0].create());
            player.lives = 3;
            enemies.push(new Enemy("green", 500, 355, 50, 1, 30, 0));
        },
        draw: function () {
            if (enemies.length == 0) {
                dropItem(0, 500, 355, "boss");
                noStroke();
                fill("yellow");
                rect(990, 305, 10, 100);
                canAdvance = true;
            }
        }
},
//level 2
    {
        setup: function () {
            dropItem(0, 500, 355, "boss");
            player.buttonState = "notPickup";
            player.pos.x = width / 2;
            player.pos.y = 700 / 2;
            enemies.push(new Enemy("red", width * 0.66, 700 * 0.66, 50, 1, 30, 0));
            enemies.push(new Enemy("blue", width * 0.33, 700 * 0.66, 50, 1, 30, 0));
            enemies.push(new Enemy("yellow", width / 2, 700 * 0.33, 50, 1, 30, 0));
            for (let i = 0; i < 3; i++) {
                if (items[i].type == "ranged") {
                    items[i].actualAmmo = items[i].ammo;
                }
            }
        },
        draw: function () {
            fill("white");
            strokeWeight(0);
            textSize(30);
            if (enemies.length == 0) {
                noStroke();
                fill("yellow");
                rect(990, 305, 10, 100);
                canAdvance = true;
            }
        }
},
// level 3
    {
        setup: function () {
            dropItem(0, 500, 355, "boss");
            player.buttonState = "notPickup";
            player.pos.x = 20;
            player.pos.y = 355;
            enemies.push(new SwordSwingSusan("red", 200, 700 / 2, 80, 0.8, 60, 1, "white", 120, 45, 120, 10));
            for (let i = 0; i < 3; i++) {
                if (items[i].type == "ranged") {
                    items[i].actualAmmo = items[i].ammo;
                }
            }
        },
        draw: function () {
            if (enemies.length == 0) {
                noStroke();
                fill("yellow");
                rect(990, 305, 10, 100);
                canAdvance = true;
            }
        }
},
// level 4
    {
        setup: function () {
            dropItem(0, 500, 355, "boss");
            player.buttonState = "notPickup";
            player.pos.x = 20;
            player.pos.y = 355;
            enemies.push(new SwordSwingSusan("blue", 800, 700 * 0.33, 20, 3, 10, 0, "white", 30, 45, 40, 12));
            enemies.push(new SwordSwingSusan("blue", 800, 700 * 0.66, 20, 3, 10, 0, "white", 30, 45, 40, 12));
            for (let i = 0; i < 3; i++) {
                if (items[i].type == "ranged") {
                    items[i].actualAmmo = items[i].ammo;
                }
            }
        },
        draw: function () {
            if (enemies.length == 0) {
                noStroke();
                fill("yellow");
                rect(990, 305, 10, 100);
                canAdvance = true;
            }
        }
},
// level 5
    {
        setup: function () {
            dropItem(0, 500, 355, "boss");
            player.buttonState = "notPickup";
            player.pos.x = 20;
            player.pos.y = 355;
            //shoot/kite = color, x, y, size, speed, health, rarity, bulletSpeed, bulletColor, bulletSize, shootCd
            enemies.push(new ShooterSam("red", 960, 355, 40, 0, 20, 0, 5, "blue", 10, 60));
            enemies.push(new Enemy("red", width * 0.66, 700 * 0.66, 50, 1, 30, 0));
            enemies.push(new Enemy("blue", width * 0.33, 700 / 2, 50, 1, 30, 0));
            enemies.push(new Enemy("yellow", width * 0.66, 700 * 0.33, 50, 1, 30, 0));
            for (let i = 0; i < 3; i++) {
                if (items[i].type == "ranged") {
                    items[i].actualAmmo = items[i].ammo;
                }
            }
        },
        draw: function () {
            if (enemies.length == 0) {
                noStroke();
                fill("yellow");
                rect(990, 305, 10, 100);
                canAdvance = true;
            }
        }
    },
// level 6
    {
        setup: function () {
            dropItem(0, 500, 355, "boss");
            player.buttonState = "notPickup";
            player.pos.x = width / 2;
            player.pos.y = 700 / 2;
            //charger = color, x, y, size, speed, health, rarity, weaponColor, swordLength, chargeTimer
            enemies.push(new Enemy("brown", width / 2, 50, 30, 1, 10, 0));
            enemies.push(new Enemy("brown", 600, 150, 30, 1, 10, 0));
            enemies.push(new Enemy("brown", 700, 250, 30, 1, 10, 0));

            enemies.push(new Enemy("brown", 800, 355, 30, 1, 10, 0));
            enemies.push(new Enemy("brown", 700, 450, 30, 1, 10, 0));
            enemies.push(new Enemy("brown", 600, 550, 30, 1, 10, 0));

            enemies.push(new Enemy("brown", width / 2, 650, 30, 1, 10, 0));
            enemies.push(new Enemy("brown", 400, 550, 30, 1, 10, 0));
            enemies.push(new Enemy("brown", 300, 450, 30, 1, 10, 0));

            enemies.push(new Enemy("brown", 200, 355, 30, 1, 10, 0));
            enemies.push(new Enemy("brown", 300, 250, 30, 1, 10, 0));
            enemies.push(new Enemy("brown", 400, 150, 30, 1, 10, 0));
            for (let i = 0; i < 3; i++) {
                if (items[i].type == "ranged") {
                    items[i].actualAmmo = items[i].ammo;
                }
            }
        },
        draw: function () {
            if (enemies.length == 0) {
                noStroke();
                fill("yellow");
                rect(990, 305, 10, 100);
                canAdvance = true;
            }
        }
    },
// level 7    
    {
        setup: function () {
            dropItem(0, 500, 355, "boss");
            player.buttonState = "notPickup";
            player.pos.x = width / 2;
            player.pos.y = 700 / 2;
            //charger = color, x, y, size, speed, health, rarity, weaponColor, swordLength, chargeTimer
            enemies.push(new ChargingChad("blue", 20, 20, 50, 10, 50, 1, "red", 40, 120));
            for (let i = 0; i < 3; i++) {
                if (items[i].type == "ranged") {
                    items[i].actualAmmo = items[i].ammo;
                }
            }
        },
        draw: function () {
            if (enemies.length == 0) {
                noStroke();
                fill("yellow");
                rect(990, 305, 10, 100);
                canAdvance = true;
            }
        }
    },
// level 8
    {
        setup: function () {
            dropItem(0, 500, 355, "boss");
            player.buttonState = "notPickup";
            player.pos.x = 300;
            player.pos.y = 700 / 2;
            enemies.push(new ChargingChad("black", 900, 100, 30, 5, 20, 0, "blue", 10, 30));
            enemies.push(new ChargingChad("black", 900, 350, 30, 5, 20, 0, "blue", 10, 30));
            enemies.push(new ChargingChad("black", 900, 600, 30, 5, 20, 0, "blue", 10, 30));
            //sword = color, x, y, size, speed, health, rarity, weaponColor, attackCd, attackAngle, swordLength, swordSpeed
            enemies.push(new SwordSwingSusan("black", 100, 355, 40, 1, 40, 1, "white", 60, 180, 60, 3));
            for (let i = 0; i < 3; i++) {
                if (items[i].type == "ranged") {
                    items[i].actualAmmo = items[i].ammo;
                }
            }
        },
        draw: function () {
            if (enemies.length == 0) {
                noStroke();
                fill("yellow");
                rect(990, 305, 10, 100);
                canAdvance = true;
            }
        }
    },
// level 9
    {
        setup: function () {
            dropItem(0, 500, 355, "boss");
            player.buttonState = "notPickup";
            player.pos.x = chance(0, 1000);
            player.pos.y = chance(0, 700);
            //shoot/kite = color, x, y, size, speed, health, rarity, bulletSpeed, bulletColor, bulletSize, shootCd
            enemies.push(new KiterKid("yellow", chance(0, 1000), chance(0, 700), 40, 0.8, 30, 1, 5, "yellow",
                10, 180));
            enemies.push(new KiterKid("yellow", chance(0, 1000), chance(0, 700), 40, 0.8, 30, 1, 5, "yellow",
                10, 180));
            enemies.push(new KiterKid("yellow", chance(0, 1000), chance(0, 700), 40, 0.8, 30, 1, 5, "yellow",
                10, 180));
            for (let i = 0; i < 3; i++) {
                if (items[i].type == "ranged") {
                    items[i].actualAmmo = items[i].ammo;
                }
            }
        },
        draw: function () {
            if (enemies.length == 0) {
                noStroke();
                fill("yellow");
                rect(990, 305, 10, 100);
                canAdvance = true;
            }
        }
    },
//level 10: THE MACHINE
    {
        setup: function () {
            dropItem(0, 500, 355, "boss");
            player.buttonState = "notPickup";
            player.pos.x = 20;
            player.pos.y = 355;
            enemies.push(new TheMachine());
            for (let i = 0; i < 3; i++) {
                if (items[i].type == "ranged") {
                    items[i].actualAmmo = items[i].ammo;
                }
            }
        },
        draw: function () {
            if (enemies.length == 0) {
                noStroke();
                fill("yellow");
                rect(990, 305, 10, 100);
                canAdvance = true;
            }
        }
    }
            ]
