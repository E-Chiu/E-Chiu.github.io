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
// level e
    {
        setup: function () {
            player.buttonState = "notPickup";
            player.pos.x = 20;
            player.pos.y = 355;
            for (let i = 0; i < items.length; i++) {
                items.splice(i, 1, 0);
            }
            //        droppedItems.push(new itemLibrary[0][1][3].create());
            //        droppedItems[1].pos.x = 200;
            //        droppedItems[1].pos.y = 200;
            enemies.push(new Enemy("blue", 500, 355, 50, 0, 1, 0));
            items.splice(0, 1, new itemLibrary[0][0][0].create());
            droppedItems.push(new itemLibrary[0][0][0].create());
            droppedItems.push(new itemLibrary[1][0][0].create());
            droppedItems.push(new itemLibrary[2][0][0].create());
            droppedItems[0].pos.x = 200;
            droppedItems[0].pos.y = 200;
            droppedItems[1].pos.x = 500;
            droppedItems[1].pos.y = 600;
            droppedItems[2].pos.x = 800;
            droppedItems[2].pos.y = 200;
            player.lives = 3;
        },
        draw: function () {
            fill("white");
            strokeWeight(0);
            textSize(30);
            text("Hover over a Item to pick it up", 500, 40);
            fill("red");
            text("Red slots are for weapons", 500, 70);
            fill("green");
            text("Green slots are for consumables", 500, 100);
            fill("blue");
            text("Blue slots are for charms", 500, 130);
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
            dropItem(1, 500, 355, "boss");
            player.buttonState = "notPickup";
            localStorage.setItem("played", "yes");
            if (player.cursed) {
                player.lives--;
            }
            player.pos.x = 20;
            player.pos.y = 355;
            for (let i = 0; i < items.length; i++) {
                items.splice(i, 1, 0);
            }
            items.splice(0, 1, new itemLibrary[0][0][0].create());
            player.lives = 3;
            enemies.push(new Enemy("green", 500, 355, 50, 1, 30, 0));
            enemies.push(new ExplodingEllen("red", 500, 355, 50, 1, 30, 0, 60, 100));
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
//level 2
    {
        setup: function () {
            player.buttonState = "notPickup";
            if (player.cursed) {
                player.lives--;
            }
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
            player.buttonState = "notPickup";
            if (player.cursed) {
                player.lives--;
            }
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
            player.buttonState = "notPickup";
            if (player.cursed) {
                player.lives--;
            }
            player.pos.x = 20;
            player.pos.y = 355;
            enemies.push(new SwordSwingSusan("blue", 800, 700 * 0.33, 20, 3, 10, 0, "white", 30, 45, 40, 12));
            enemies.push(new SwordSwingSusan("blue", 800, 900 * 0.33, 20, 3, 10, 0, "white", 30, 45, 40, 12));
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
            player.buttonState = "notPickup";
            if (player.cursed) {
                player.lives--;
            }
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
            player.buttonState = "notPickup";
            if (player.cursed) {
                player.lives--;
            }
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
            player.buttonState = "notPickup";
            if (player.cursed) {
                player.lives--;
            }
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
            player.buttonState = "notPickup";
            if (player.cursed) {
                player.lives--;
            }
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
            player.buttonState = "notPickup";
            if (player.cursed) {
                player.lives--;
            }
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
            player.buttonState = "notPickup";
            if (player.cursed) {
                player.lives--;
            }
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
    },
//level 11
    {
        setup: function () {
            player.buttonState = "notPickup";
            if (player.cursed) {
                player.lives--;
            }
            player.pos.x = 500;
            player.pos.y = 350;
            //charger = color, x, y, size, speed, health, rarity, weaponColor, swordLength, chargeTimer
            enemies.push(new ChargingChad("white", 200, 200, 30, 10, 25, 1, "grey", 40, 80));
            enemies.push(new ChargingChad("grey", 800, 600, 50, 8, 40, 1, "white", 65, 120));
            enemies.push(new ChargingChad("white", 800, 200, 30, 10, 25, 1, "grey", 40, 80));
            enemies.push(new ChargingChad("grey", 200, 600, 50, 8, 40, 1, "white", 65, 120));
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
    //level 12
    {
        setup: function () {
            player.buttonState = "notPickup";
            if (player.cursed) {
                player.lives--;
            }
            player.pos.x = 500;
            player.pos.y = 350;
            //shoot/kite = color, x, y, size, speed, health, rarity, bulletSpeed, bulletColor, bulletSize, shootCd
            enemies.push(new ShooterSam("red", 100, 100, 50, 0.2, 60, 2, 6, "green", 10, 70));
            enemies.push(new ShooterSam("red", 100, 600, 50, 0.2, 60, 2, 6, "green", 10, 70));
            enemies.push(new KiterKid("green", 900, 100, 50, 1.5, 50, 1, 4, "red", 15, 60));
            enemies.push(new KiterKid("green", 900, 100, 50, 1.5, 50, 1, 4, "red", 15, 60));
            //sword = color, x, y, size, speed, health, rarity, weaponColor, attackCd, attackAngle, swordLength, swordSpeed
            enemies.push(new SwordSwingSusan("grey", 250, 350, 70, 1.5, 90, 2, "grey", 120, 90, 100, 20));
            enemies.push(new SwordSwingSusan("grey", 750, 350, 70, 1.5, 90, 2, "grey", 120, 90, 100, 20));
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
    //level 13
    {
        setup: function () {
            player.buttonState = "notPickup";
            if (player.cursed) {
                player.lives--;
            }
            player.pos.x = 500;
            player.pos.y = 350;
            //normal dudes = color, x, y, size, speed, health, rarity
            enemies.push(new Enemy("white", 100, 100, 80, 0.5, 100, 1));
            enemies.push(new Enemy("white", 200, 100, 80, 0.5, 100, 1));
            enemies.push(new Enemy("white", 300, 100, 80, 0.5, 100, 1));
            enemies.push(new Enemy("white", 400, 100, 80, 0.5, 100, 1));
            enemies.push(new Enemy("white", 500, 100, 80, 0.5, 100, 1));
            enemies.push(new Enemy("white", 600, 100, 80, 0.5, 100, 1));
            enemies.push(new Enemy("white", 700, 100, 80, 0.5, 100, 1));
            enemies.push(new Enemy("white", 800, 100, 80, 0.5, 100, 1));
            enemies.push(new Enemy("white", 900, 100, 80, 0.5, 100, 1));

            enemies.push(new Enemy("white", 100, 600, 80, 0.5, 100, 1));
            enemies.push(new Enemy("white", 200, 600, 80, 0.5, 100, 1));
            enemies.push(new Enemy("white", 300, 600, 80, 0.5, 100, 1));
            enemies.push(new Enemy("white", 400, 600, 80, 0.5, 100, 1));
            enemies.push(new Enemy("white", 500, 600, 80, 0.5, 100, 1));
            enemies.push(new Enemy("white", 600, 600, 80, 0.5, 100, 1));
            enemies.push(new Enemy("white", 700, 600, 80, 0.5, 100, 1));
            enemies.push(new Enemy("white", 800, 600, 80, 0.5, 100, 1));
            enemies.push(new Enemy("white", 900, 600, 80, 0.5, 100, 1));
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
//level 14
    {
        setup: function () {
            player.buttonState = "notPickup";
            if (player.cursed) {
                player.lives--;
            }
            player.pos.x = 500;
            player.pos.y = 350;
            //ninja = color, x, y, size, speed, health, rarity, bulletSpeed, bulletColor, bulletSize, shootCd, weaponColor, attackCd, attackAngle, swordLength, swordSpeed
            enemies.push(new NinjaNanny("blue", 100, 600, 60, 1.5, 60, 2, 2, "red", 10, 70, "green", 60, 60, 110, 3));
            enemies.push(new NinjaNanny("blue", 900, 100, 60, 1.5, 60, 2, 2, "red", 10, 70, "green", 60, 60, 110, 3));
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
//level 15: THE NINJA
    {
        setup: function () {
            player.buttonState = "notPickup";
            if (player.cursed) {
                player.lives--;
            }
            player.pos.x = 20;
            player.pos.y = 355;
            enemies.push(new TheNinja());
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
    // level 16
    {
        setup: function () {
            player.buttonState = "notPickup";
            if (player.cursed) {
                player.lives--;
            }
            player.pos.x = 500;
            player.pos.y = 350;
            //sword = color, x, y, size, speed, health, rarity, weaponColor, attackCd, attackAngle, swordLength, swordSpeed
            enemies.push(new SwordSwingSusan("orange", 150, 150, 100, 0, 120, 2, "red", 300, 360, 180, 8));
            enemies.push(new SwordSwingSusan("orange", 150, 650, 100, 0, 120, 2, "red", 300, 360, 180, 8));
            enemies.push(new SwordSwingSusan("orange", 850, 150, 100, 0, 120, 2, "red", 300, 360, 180, 8));
            enemies.push(new SwordSwingSusan("orange", 850, 650, 100, 0, 120, 2, "red", 300, 360, 180, 8));
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
            ]
