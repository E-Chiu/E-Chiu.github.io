// PLAYERS
let player;
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
    player = {
        x: 50,
        y: 50,
        size: 60,
        speed: 2
    };
    attackScope = {
        start: 0,
        stop: 0
    }
    items.push(new Weapon("melee", "brown", 100, 5, 10, 90, 60));
}

// DRAW FUNCTION - Loops @ 60FPS by default
function draw() {
    stroke("black");
    strokeWeight(1);
    background("black");
    attack();
    drawPlayer();
    drawHud();
    drawMap();

}
