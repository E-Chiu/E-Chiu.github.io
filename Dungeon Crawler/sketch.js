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
    //    stageNum = 9;
    stages[stageNum].setup();
//    droppedItems.push(new itemLibrary[2][0][3].create());
//    droppedItems.push(new itemLibrary[2][0][3].create());
//    droppedItems.push(new itemLibrary[2][0][3].create());
//    droppedItems[1].pos.x = 200;
//    droppedItems[1].pos.y = 200;
//    
//    droppedItems[3].pos.x = 200;
//    droppedItems[3].pos.y = 200;
//
//    droppedItems[2].pos.x = 300;
//    droppedItems[2].pos.y = 300;

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
