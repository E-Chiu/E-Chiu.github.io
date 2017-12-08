// SETUP FUNCTION - Runs once at beginning of program
let swap;
let star;

function preload() {
    star = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA0klEQVRYR+2VURKAIAhE8Trd/yxdxyamnFKDBT6cZvA3ld3HSoUWr7K4PqWAJJAEogQqUewlRQTUuhOVjSeJ+x73QSJaKoCL3ytCwUtgqYBX8SgFjcCZ8mE98XcCZtvFGtLHqVPr31PLh0rgy20fQoGKm8BtdiBxutIEaM5b60CkQ+olAWhx6wSDMmEp/isBkHvPTNBewWcQpexY2oAIkCYf6/A+QTQDs7nfn+WJ6flBaQRa8QurJvolBGmFJoCNXf1G9rbMoGcsl4Izy7YtBSSBA+UZSiEjNeNaAAAAAElFTkSuQmCC");
}

function setup() {
    createCanvas(1000, 810);
    background("black");
    angleMode(DEGREES);
    textAlign(CENTER);
    player = new Player(20, 355);
    imageMode(CENTER);
    star.loadPixels();
    //normal dudes = color, x, y, size, speed, health, rarity
    //sword = color, x, y, size, speed, health, rarity, weaponColor, attackCd, attackAngle, swordLength, swordSpeed
    //shoot = color, x, y, size, speed, health, rarity, bulletSpeed, bulletColor, bulletSize, shootCd

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
        enemies.push(new SwordDude("blue", 300, 600, 200, 0, 100, 1, "white", 60, 180, 300, 10));
//    enemies.push(new ShooterGuy("blue", 300, 600, 50, 0, 30, 2, 5, "grey", 10, 120));

    //type, color, size, speed, damage, range, attackCd, knockback
    items.splice(0, 1, new itemLibrary[0][0][0].create);
    items.splice(1, 1, new itemLibrary[0][2][0].create);
    //        items.splice(3,1, consumables[0]);
    //        items.splice(4,1, consumables[1]);
    items.splice(3, 1, new consumables[2][2].create());
    items.splice(4, 1, new consumables[0][1].create());
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
    player.rangedAttack();
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
        if (enemies[i] instanceof ShooterGuy) {
            enemies[i].canShoot();
        }
        enemies[i].track();
        enemies[i].draw();
    }
    //splicing
    killOff();
    //stage
    //    stages[stageNum].draw();
    //display;
    drawHud();
    drawMap();
    drawCds();

}
