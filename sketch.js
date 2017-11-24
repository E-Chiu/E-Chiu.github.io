// SETUP FUNCTION - Runs once at beginning of program
function setup() {
    createCanvas(1000, 810);
    background("black");
    angleMode(DEGREES);
    textAlign(CENTER);
    player = new Player(20, 355);
    //normal dudes = color, x, y, size, speed, health, rarity
    //sword = color, x, y, size, speed, health, rarity, weaponColor, attackCd, attackAngle, swordLength, swordSpeed

    //    stages[stageNum].setup();

    enemies.push(new Enemy("green", 100, 300, 50, 1, 30, 0));
    enemies.push(new Enemy("green", 200, 300, 50, 1, 30, 0));
    enemies.push(new Enemy("green", 300, 700, 50, 1, 30, 0));
    enemies.push(new Enemy("green", 400, 500, 50, 1, 30, 0));
    enemies.push(new Enemy("green", 500, 300, 50, 1, 30, 0));
    enemies.push(new Enemy("green", 600, 200, 50, 1, 30, 0));
    enemies.push(new Enemy("green", 700, 400, 50, 1, 30, 0));
    enemies.push(new Enemy("green", 800, 600, 50, 1, 30, 0));
    enemies.push(new SwordDude("green", 900, 600, 50, 1, 30, 1, "brown", 60, 100, 50, 5));
    enemies.push(new SwordDude("red", 900, 100, 50, 1, 50, 2, "grey", 60, 100, 50, 5));
    enemies.push(new SwordDude("blue", 300, 600, 200, 0, 10, 1, "white", 60, 180, 300, 10));

    //type, color, size, speed, damage, range, attackCd, knockback
    items.splice(0, 1, new itemLibrary[0][0][0].create);
    //    items.splice(0, 1, new Weapon(itemLibrary[0][0][1].type, itemLibrary[0][0][1].color, itemLibrary[0][0][1].size, itemLibrary[0][0][1].speed,
    //        itemLibrary[0][0][1].damage, itemLibrary[0][0][1].range, itemLibrary[0][0][1].attackCd, itemLibrary[0][0][1].knockback));
    //    items.splice(1, 1, new Weapon(itemLibrary[0][1][0].type, itemLibrary[0][1][0].color, itemLibrary[0][1][0].size, itemLibrary[0][1][0].speed,
    //        itemLibrary[0][1][0].damage, itemLibrary[0][1][0].range, itemLibrary[0][1][0].attackCd, itemLibrary[0][1][0].knockback));
    //    items.splice(2, 1, new Weapon(itemLibrary[0][2][0].type, itemLibrary[0][2][0].color, itemLibrary[0][2][0].size, itemLibrary[0][2][0].speed,
    //        itemLibrary[0][2][0].damage, itemLibrary[0][2][0].range, itemLibrary[0][2][0].attackCd, itemLibrary[0][2][0].knockback));

    //        items.splice(3,1, consumables[0]);
    //        items.splice(4,1, consumables[1]);
    items.splice(3, 1, new consumables[1][0].create());
    items.splice(4, 1, new consumables[1][1].create());
    items.splice(5, 1, new consumables[2][0].create());
    items.splice(6, 1, new consumables[2][1].create());
}

// DRAW FUNCTION - Loops @ 60FPS by default
function draw() {
    stroke("black");
    strokeWeight(1);
    background("black");
    //drops
    for (let i = 0; i < droppedItems.length; i++) {
        droppedItems[i].draw();
    }
    //player
    player.attack();
    player.draw();
    player.invul();
    //roar
    for (let i = 0; i < player.roars.length; i++) {
        if (player.roars[i] != 0) {
            player.roars[i].drawRoar(i);
        }
    }
    //enemy
    for (let i = 0; i < enemies.length; i++) {
        if (enemies[i] instanceof SwordDude) {
            enemies[i].attack();
            enemies[i].canAttack();
        }
        enemies[i].track();
        enemies[i].draw();
    }
    //stage
    //    stages[stageNum].draw();
    //display;
    drawHud();
    drawMap();
    drawCds();

}
