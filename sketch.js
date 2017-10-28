// PLAYERS
let player;
let enemies = [];
let items = [];
let lives = 3;
let activeWeapon = 0;
let isAttacking = false;
let attackScope;

// SETUP FUNCTION - Runs once at beginning of program
function setup() {
    createCanvas(1000, 810);
    background("black");
    angleMode(DEGREES);
    player = new Player();
    attackScope = {
        start: 0,
        stop: 0
    }
    enemies.push(new Enemy("green", 900, 600, 50, 1, 40, 60, 10))
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
        enemies[i].draw();
        enemies[i].track();
    }
    //display;
    drawHud();
    drawMap();

}
