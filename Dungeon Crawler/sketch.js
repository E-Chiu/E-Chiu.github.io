// SETUP FUNCTION - Runs once at beginning of program
let swap;
let star;

function setup() {
    createCanvas(1000, 810);
    background("black");
    angleMode(DEGREES);
    textAlign(CENTER);
    player = new Player(20, 355);
    imageMode(CENTER);
    star.loadPixels();
    silverBolts.loadPixels();
    //normal dudes = color, x, y, size, speed, health, rarity
    //sword = color, x, y, size, speed, health, rarity, weaponColor, attackCd, attackAngle, swordLength, swordSpeed
    //shoot/kite = color, x, y, size, speed, health, rarity, bulletSpeed, bulletColor, bulletSize, shootCd
    //ninja = color, x, y, size, speed, health, rarity, bulletSpeed, bulletColor, bulletSize, shootCd, weaponColor, attackCd, attackAngle, swordLength, swordSpeed
    //charger = color, x, y, size, speed, health, rarity, weaponColor, swordLength, chargeTimer
    if (localStorage.getItem("played") == "yes") {
        stageNum = 4;
    }
    stageNum = 10;
    stages[stageNum].setup();
    //    enemies.push(new ChargingChad(125, 100, 300, 50, 10, 30, 0, "white", 50, 240));
    //    enemies.push(new ChargingChad(125, 200, 400, 50, 10, 30, 0, "white", 50, 240));
    //    enemies.push(new ChargingChad(125, 400, 600, 50, 10, 30, 0, "white", 50, 240));
    //    enemies.push(new Enemy("green", 100, 300, 50, 1, 30, 0));
    //    enemies.push(new Enemy("green", 500, 300, 50, 1, 30, 0));
    //    enemies.push(new Enemy("green", 600, 200, 50, 1, 30, 0));
    //    enemies.push(new Enemy("green", 700, 400, 50, 1, 30, 0));
    //    enemies.push(new SwordSwingSusan("green", 900, 600, 50, 1, 30, 1, "brown", 60, 100, 50, 5));
    //    enemies.push(new SwordSwingSusan("red", 900, 100, 50, 1, 50, 2, "grey", 60, 100, 50, 5));
    //    enemies.push(new SwordSwingSusan("blue", 300, 600, 200, 0, 100, 1, "white", 60, 180, 300, 10));
    //    enemies.push(new ShooterSam("blue", 600, 600, 50, 0, 30, 2, 5, "grey", 20, 120));
    //    enemies.push(new KiterKid("blue", 600, 600, 50, 2, 30, 2, 5, "grey", 20, 120));
    //    enemies.push(new KiterKid("blue", 300, 300, 50, 1, 30, 2, 5, "grey", 20, 120));
    //    enemies.push(new KiterKid("blue", 800, 100, 50, 1, 30, 2, 5, "grey", 20, 120));
    //    enemies.push(new NinjaNanny("white", 800, 100, 50, 1, 30, 2, 5, "white", 20, 60, "white", 30, 180, 120, 40));

    //type, color, size, speed, damage, range, attackCd, knockback
    items.splice(0, 1, new itemLibrary[0][2][0].create);
    items.splice(1, 1, new itemLibrary[0][2][0].create);
    items.splice(2, 1, new itemLibrary[0][1][3].create);
    //
    //
    //    items.splice(3, 1, new consumables[1][0].create());
    //    items.splice(4, 1, new consumables[2][2].create());
    //    items.splice(5, 1, new consumables[2][0].create());
    items.splice(6, 1, new consumables[2][1].create());
}

// DRAW FUNCTION - Loops @ 60FPS by default
function draw() {
    stroke("black");
    strokeWeight(1);
    background("black");
    //stage
    stages[stageNum].draw();

    //drops
    for (let i = 0; i < droppedItems.length; i++) {
        droppedItems[i].draw();
    }
    // blow up spots
    //    for(let i = 0; i < enemies.length; i ++) {
    //        if (enemies[i] instanceof DangerSpot) {
    //            enemies[i].draw();
    //        }
    //    }
    //player
    player.attack();
    player.draw();
    player.invul();
    player.rangedAttack();
    //roar
    for (let i = 0; i < player.roars.length; i++) {
        if (player.roars[i] != 0) {
            player.roars[i].drawRoar(i);
        }
    }
    //enemy
    for (let i = 0; i < enemies.length; i++) {
        if (enemies[i] instanceof SwordSwingSusan) {
            enemies[i].attack();
            enemies[i].canAttack();
        }
        if (enemies[i] instanceof ShooterSam || enemies[i] instanceof NinjaNanny || enemies[i] instanceof TheMachine) {
            enemies[i].canShoot();
        }
        if (enemies[i] instanceof Enemy) {
            enemies[i].track();
        }
        if (enemies[i] instanceof TheMachine) {
            enemies[i].canSpawn();
            enemies[i].canExplode();
        }
        enemies[i].draw();
    }
    //splicing
    killOff();
    //display;
    drawHud();
    drawMap();
    drawCds();
}
