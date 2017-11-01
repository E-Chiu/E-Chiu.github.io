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
    //color, x, y, size, speed, range, attackCd, health, attackAngle, swordLength
    enemies.push(new SwordDude("green", 900, 600, 50, 1, 30, "brown", 60, 100, 50, 5));
    items.push(new Weapon("melee", "brown", 100, 10, 10, 90, 60));
}

// DRAW FUNCTION - Loops @ 60FPS by default
function draw() {
    stroke("black");
    strokeWeight(1);
    background("black");
    //player;
    player.attack();
    player.draw();
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
