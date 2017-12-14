let stageNum = 0;

//all stages
let stages = [
    //tutorial
    //level 0
    {
        setup: function () {
            player.pos.x = 20;
            player.pos.y = 355;
            //normal dudes = color, x, y, size, speed, health, rarity
            //sword = color, x, y, size, speed, health, rarity, weaponColor, attackCd, attackAngle, swordLength, swordSpeed
            //shoot/kite = color, x, y, size, speed, health, rarity, bulletSpeed, bulletColor, bulletSize, shootCd
            //ninja = color, x, y, size, speed, health, rarity, bulletSpeed, bulletColor, bulletSize, shootCd, weaponColor, attackCd, attackAngle, swordLength, swordSpeed
            //charger = color, x, y, size, speed, health, rarity, weaponColor, swordLength, chargeTimer
            enemies.push(new Enemy("blue", 500, 355, 50, 0, 1, 0));
        },
        draw: function () {
            fill("white");
            strokeWeight(0);
            textSize(30);
            text("Move with WASD, attack with arrow keys", 500, 40);
            if (enemies.length == 0) {
                fill("yellow");
                rect(990, 305, 10, 100);
            }
        }
    },
    // level 1
    {
        setup: function () {
            player.pos.x = 20;
            player.pos.y = 355;
            enemies.push(new Enemy("blue", 500, 355, 50, 0, 1));
        },
        draw: function () {
            fill("white");
            strokeWeight(0);
            textSize(30);
            text("Switch weapons with Q or E", 500, 40);
            text("Killing all the enemies clears the stage", 500, 80);
            if (enemies.length == 0) {
                rect(width / 2, 0, 100, 10);
            }
        }
    },
    {},
]
