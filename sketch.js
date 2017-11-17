// PLAYERS
let player;
let enemies = [];
let items = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


// SETUP FUNCTION - Runs once at beginning of program
function setup() {
    createCanvas(1000, 810);
    background("black");
    angleMode(DEGREES);
    player = new Player();
    //normal dudes = color, x, y, size, speed, health
    //sword = color, x, y, size, speed, health, weaponColor, attackCd, attackAngle, swordLength, swordSpeed
        enemies.push(new Enemy("green", 100, 300, 50, 1, 30));
        enemies.push(new Enemy("green", 200, 300, 50, 1, 30));
        enemies.push(new Enemy("green", 300, 700, 50, 1, 30));
        enemies.push(new Enemy("green", 400, 500, 50, 1, 30));
        enemies.push(new Enemy("green", 500, 300, 50, 1, 30));
        enemies.push(new Enemy("green", 600, 200, 50, 1, 30));
        enemies.push(new Enemy("green", 700, 400, 50, 1, 30));
        enemies.push(new Enemy("green", 800, 600, 50, 1, 30));
    
            enemies.push(new SwordDude("green", 900, 600, 50, 1, 30, "brown", 60, 100, 50, 5));
            enemies.push(new SwordDude("red", 900, 100, 50, 1, 50, "grey", 60, 100, 50, 5));
    enemies.push(new SwordDude("blue", 300, 600, 200, 0, 10, "white", 60, 180, 300, 10));
    //type, color, size, speed, damage, range, attackCd, knockback
    items.splice(0, 1, new Weapon(itemLibrary[0][4].type, itemLibrary[0][4].color, itemLibrary[0][4].size, itemLibrary[0][4].speed,
        itemLibrary[0][4].damage, itemLibrary[0][4].range, itemLibrary[0][4].attackCd, itemLibrary[0][4].knockback));

    items.splice(1, 1, new Weapon(itemLibrary[0][2].type, itemLibrary[0][2].color, itemLibrary[0][2].size, itemLibrary[0][2].speed,
        itemLibrary[0][2].damage, itemLibrary[0][2].range, itemLibrary[0][2].attackCd, itemLibrary[0][2].knockback));

    //    items.splice(3,1, consumables[0]);
    //    items.splice(4,1, consumables[1]);
    items.splice(3, 1, consumables[2]);
    items.splice(4, 1, consumables[3]);
    items.splice(5, 1, consumables[4]);

    items.splice(2, 1, new Weapon(itemLibrary[0][3].type, itemLibrary[0][3].color, itemLibrary[0][3].size, itemLibrary[0][3].speed,
        itemLibrary[0][3].damage, itemLibrary[0][3].range, itemLibrary[0][3].attackCd, itemLibrary[0][3].knockback));
}

// DRAW FUNCTION - Loops @ 60FPS by default
function draw() {
    stroke("black");
    strokeWeight(1);
    background("black");
    //player
    player.attack();
    player.draw();
    player.invul();
    player.ring();
    //enemy
    for (let i = 0; i < enemies.length; i++) {
        if (enemies[i] instanceof SwordDude) {
            enemies[i].attack();
            enemies[i].canAttack();
        }
        enemies[i].track();
        enemies[i].draw();
    }
    //display;
    drawHud();
    drawMap();
    drawCds();

}
