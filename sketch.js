// PLAYERS
let player;
let enemies = [];
let items = [];


// SETUP FUNCTION - Runs once at beginning of program
function setup() {
    createCanvas(1000, 810);
    background("black");
    angleMode(DEGREES);
    player = new Player();
    //normal dudes = color, x, y, size, speed, health
    //sword = color, x, y, size, speed, health, weaponColor, attackCd, attackAngle, swordLength, swordSpeed
    enemies.push(new SwordDude("green", 900, 600, 50, 1, 30, "brown", 60, 100, 50, 5));
    enemies.push(new SwordDude("red", 900, 100, 50, 1, 50, "grey", 60, 100, 50, 5));
    enemies.push(new SwordDude("blue", 300, 600, 200, 0, 10, "white", 60, 180, 300, 10));
    items.push(new Weapon("melee", "brown", 100, 10, 10, 90, 60, 40));
}

// DRAW FUNCTION - Loops @ 60FPS by default
function draw() {
    stroke("black");
    strokeWeight(1);
    background("black");
    //player;
    player.attack();
    player.draw();
    player.invul();
    //enemy
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].attack();
        enemies[i].canAttack();
        enemies[i].draw();
        enemies[i].track();
    }
    //display;
    drawHud();
    drawMap();

}
