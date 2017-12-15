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
    //level 0
    {
        setup: function () {
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
                fill("yellow");
                rect(990, 305, 10, 100);
                canAdvance = true;
            }
        }
    },
    // level 1
    {
        setup: function () {
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
                fill("yellow");
                rect(990, 305, 10, 100);
                canAdvance = true;
            }
        }
},
            // level 2
    {
        setup: function () {
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
                fill("yellow");
                rect(990, 305, 10, 100);
                canAdvance = true;
            }
        }
},
    // level 3
    {
        setup: function () {
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
                fill("yellow");
                rect(990, 305, 10, 100);
                canAdvance = true;
            }
        }
},
    //level 4
    {
        setup: function () {
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
            fill("white");
            strokeWeight(0);
            textSize(30);
            if (enemies.length == 0) {
                fill("yellow");
                rect(990, 305, 10, 100);
                canAdvance = true;
            }
        }
},
// stage 5
    {
        setup: function () {
            player.pos.x = width / 2;
            player.pos.y = height / 2;
            enemies.push(new Enemy("red", width * 0.66, height * 0.66, 50, 1, 30, 0));
            enemies.push(new Enemy("blue", width * 0.33, height * 0.66, 50, 1, 30, 0));
            enemies.push(new Enemy("yellow", width / 2, height * 0.33, 50, 1, 30, 0));
            for (let i = 0; i < 2; i++) {
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
                fill("yellow");
                rect(990, 305, 10, 100);
                canAdvance = true;
            }
        }
},
    {
        setup: function () {
            player.pos.x = 20;
            player.pos.y = 355;
            enemies.push(new SwordSwingSusan("red", 200, height / 2, 80, 1, 60, 1, "white", 120, 45, 120, 10));
            for (let i = 0; i < 2; i++) {
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
                fill("yellow");
                rect(990, 305, 10, 100);
                canAdvance = true;
            }
        }
},
            ]
