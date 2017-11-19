let stageNum = 0;

//all stages
let stages = [
    //tutorial
    {
        setup: function () {
            player.pos.x = 20;
            player.pos.y = 355;
            //normal dudes = color, x, y, size, speed, health
            //sword = color, x, y, size, speed, health, weaponColor, attackCd, attackAngle, swordLength, swordSpeed
            enemies.push(new Enemy("blue", 500, 355, 50, 0, 1));
        },
        draw: function () {
            fill("white");
            strokeWeight(0);
            textSize(30);
            text("Move with WASD, attack with arrow keys", 500, 40);
        }
    }, {
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
        }
    },
    {},

            ]
