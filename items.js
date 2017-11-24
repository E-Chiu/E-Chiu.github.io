//equipping a new weapon
class Weapon {
    constructor(name, type, color, size, speed, damage, range, attackCd, knockback) {
        this.name = name;
        this.type = type;
        this.color = color;
        this.size = size;
        this.speed = speed;
        this.damage = damage;
        this.range = range;
        this.atkCd = attackCd;
        this.actualCd = attackCd;
        this.knockback = knockback;
        this.canDraw = false;
        this.pos = createVector(0, 0);
    }
}

//all weapons
let weapons = [
    //rarity zero
    [{
        create: class Stick extends Weapon {
            constructor() {
                super("Stick", "melee", "brown", 100, 10, 10, 90, 60, 40);
            }
            draw() {
                strokeWeight(10);
                stroke("brown");
                line(this.pos.x - 20, this.pos.y + 20, this.pos.x + 20, this.pos.y - 20);
            }
        }
    }, {
        create: class Dagger extends Weapon {
            constructor() {
                super("Dagger", "melee", "white", 70, 100, 5, 2, 1, 20);
            }
            draw() {
                strokeWeight(7);
                stroke("white");
                line(this.pos.x - 10, this.pos.y + 10, this.pos.x + 15, this.pos.y - 15);
                stroke("brown");
                line(this.pos.x - 10, this.pos.y + 10, this.pos.x - 2.5, this.pos.y + 2.5);
                line(this.pos.x - 8, this.pos.y - 3, this.pos.x + 3, this.pos.y + 8);
            }
        }
    }],

    //rarity one
    [{
            create: class Sword extends Weapon {
                constructor() {
                    super("Sword", "melee", 178, 120, 20, 15, 120, 80, 50);
                }
                draw() {
                    strokeWeight(10);
                    stroke(255);
                    line(this.pos.x - 27.5, this.pos.y + 27.5, this.pos.x + 27.5, this.pos.y - 27.5);
                    stroke(80);
                    line(this.pos.x - 27.5, this.pos.y + 27.5, this.pos.x - 7.5, this.pos.y + 7.5);
                    line(this.pos.x - 21.5, this.pos.y - 4, this.pos.x + 6, this.pos.y + 19);
                }
            }
    },
        {
            create: class Katana extends Weapon {
                constructor() {
                    super("Katana", "melee", "white", 120, 40, 5, 180, 20, 15);
                }
                draw() {
                    strokeWeight(4);
                    stroke(200);
                    line(this.pos.x - 22.5, this.pos.y + 22.5, this.pos.x + 25.5, this.pos.y - 25.5);
                    stroke("purple");
                    line(this.pos.x - 22.50, this.pos.y + 22.5, this.pos.x - 4.5, this.pos.y + 4.5);
                    stroke("black");
                    strokeWeight(2);
                    line(this.pos.x - 22.50, this.pos.y + 22.5, this.pos.x - 6, this.pos.y + 6);
                    stroke("yellow");
                    strokeWeight(2);
                    line(this.pos.x - 6, this.pos.y, this.pos.x, this.pos.y + 6);

                }
            }
    }],

    //rarity two
    [
        {
            create: class Axe extends Weapon {
                constructor() {
                    super("Axe", "melee", "brown", 70, 5, 50, 80, 120, 90);
                }
                draw() {
                    strokeWeight(10);
                    stroke("white");
                    fill("white");
                    quad(this.pos.x + 15, this.pos.y - 25, this.pos.x + 40, this.pos.y - 15, this.pos.x + 35, this.pos.y - 8, this.pos.x + 27, this.pos.y - 5);
                    stroke("brown");
                    strokeWeight(10);
                    line(this.pos.x - 25, this.pos.y + 25, this.pos.x + 25, this.pos.y - 25);
                }
            }
    }
        ]
];

//all consumables
let consumables = [

    //rarity zero
    [{
            create: class Potion {
                constructor() {
                    this.name = "Health Potion";
                    this.type = "consumable";
                    this.amount = 1;
                    this.maxAmount = 3;
                    this.pos = createVector(0, 0);
                }

                draw() {
                    fill("red");
                    stroke("white");
                    strokeWeight(2);
                    ellipse(this.pos.x, this.pos.y, 30);
                    fill(214, 138, 56);
                    strokeWeight(3);
                    quad(this.pos.x - 6, this.pos.y - 7, this.pos.x + 6, this.pos.y - 7, this.pos.x + 7.5, this.pos.y - 20,
                        this.pos.x - 7.5, this.pos.y - 20);
                }

                activate() {
                    if (player.lives < player.maxLives) {
                        player.lives++;
                        this.amount--;
                    }
                }
            }
    },
        {
            create: class EnergyShield {
                constructor() {
                    this.name = "Energy Shield";
                    this.type = "consumable";
                    this.amount = 1;
                    this.maxAmount = 3;
                    this.pos = createVector(0, 0);
                }

                draw() {
                    fill(0, 0, 255, 100);
                    stroke("blue");
                    strokeWeight(2);
                    ellipse(this.pos.x, this.pos.y, 50);
                }

                activate() {
                    if (player.hasShield == false) {
                        player.hasShield = true;
                        this.amount--;
                    }
                }
            }
    }],

//rarity one 
    [{
            create: class RoarOfFear {
                constructor() {
                    this.name = "Roar of Fear";
                    this.type = "consumable";
                    this.amount = 1;
                    this.maxAmount = 3;
                    this.pos = createVector(0, 0);
                }
                draw() {
                    noFill();
                    strokeWeight(4);
                    stroke(255, 0, 0);
                    ellipse(this.pos.x, this.pos.y, 50);
                    ellipse(this.pos.x, this.pos.y, 30);
                    ellipse(this.pos.x, this.pos.y, 12.5);
                }
                activate() {
                    if (player.roars[0] == 0) {
                        player.roars.splice(0, 1, new Roar("red", 5, 0, 300));
                        this.amount--;
                    }

                }
            }
                },
        {
            create: class RoarOfFire {
                constructor() {
                    this.name = "Roar of Fire";
                    this.type = "consumable";
                    this.amount = 1;
                    this.maxAmount = 4;
                    this.pos = createVector(0, 0);
                }
                draw() {
                    noFill();
                    strokeWeight(4);
                    stroke("orange");
                    ellipse(this.pos.x, this.pos.y, 50);
                    ellipse(this.pos.x, this.pos.y, 30);
                    ellipse(this.pos.x, this.pos.y, 12.5);
                }
                activate() {
                    if (player.roars[2] == 0) {
                        player.roars.splice(2, 1, new Roar("orange", 12, 0, 500));
                        this.amount--;
                    }
                }
            }
                }],

    //rarity two
    [{
            create: class RoarOfIce {
                constructor() {
                    this.name = "Roar of Ice";
                    this.type = "consumable";
                    this.amount = 1;
                    this.maxAmount = 2;
                    this.pos = createVector(0, 0);
                }
                draw() {
                    noFill();
                    strokeWeight(4);
                    stroke(0, 255, 255);
                    ellipse(this.pos.x, this.pos.y, 50);
                    ellipse(this.pos.x, this.pos.y, 30);
                    ellipse(this.pos.x, this.pos.y, 12.5);
                }
                activate() {
                    if (player.roars[1] == 0) {
                        player.roars.splice(1, 1, new Roar([0, 255, 255], 8, 0, 250));
                        this.amount--;
                    }
                }
            }
    },
        {
            create: class BlackHoleItem {
                constructor() {
                    this.name = "Black Hole";
                    this.type = "consumable";
                    this.amount = 1;
                    this.maxAmount = 3;
                    this.pos = createVector(0, 0);
                }
                draw() {
                    noFill();
                    strokeWeight(4);
                    stroke(74, 0, 112);
                    ellipse(this.pos.x, this.pos.y, 50);
                    ellipse(this.pos.x, this.pos.y, 30);
                    ellipse(this.pos.x, this.pos.y, 12.5);
                }
                activate() {
                    if (player.roars[3] == 0) {
                        player.roars.splice(3, 1, new BlackHole([74, 0, 112], 15, 300, 0, player.pos.x, player.pos.y));
                        this.amount--;
                    }
                }
            }
    }]

];

//all charms
let charms = [


];

//all items
let itemLibrary = [weapons, consumables, charms];

//roar
class Roar {
    constructor(stroke, strokeWeight, roarSize, maxRoar) {
        this.stroke = stroke;
        this.strokeWeight = strokeWeight;
        this.roarSize = roarSize;
        this.maxRoar = maxRoar;
    }

    drawRoar(index) {
        if (index == 0) {
            stroke("red");
            strokeWeight(5);
            noFill();
        } else if (index == 1) {
            stroke(0, 255, 255);
            strokeWeight(8);
            noFill();
        } else if (index == 2) {
            stroke("orange");
            strokeWeight(12);
            noFill();
        }
        ellipse(player.pos.x, player.pos.y, this.roarSize);
        this.roarSize += 20;
        for (let i = 0; i < enemies.length; i++) {
            if (dist(player.pos.x, player.pos.y, enemies[i].pos.x, enemies[i].pos.y) < this.roarSize / 2 + enemies[i].size / 2 && enemies[i].canHit == true) {
                if (index == 0) {
                    enemies[i].canHit = false;
                    enemies[i].actualHealth -= 10;
                    enemies[i].speed = enemies[i].speed * -0.5;
                    enemies[i].timer = 120;
                    killOff();
                } else if (index == 1) {
                    enemies[i].color = [0, 255, 255, 200];
                    enemies[i].canHit = false;
                    enemies[i].speed = 0;
                } else if (index == 2) {
                    enemies[i].dot = 0.1;
                    enemies[i].canHit = false;
                }
            }
        }
        if (this.roarSize >= this.maxRoar) {
            player.roars.splice(index, 1, 0);
            for (let i = 0; i < enemies.length; i++) {
                if (enemies[i].canHit == false) {
                    enemies[i].canHit = true;
                }
            }
        }
    }
}

//black hole
class BlackHole {
    constructor(stroke, strokeWeight, roarSize, maxRoar, staticX, staticY) {
        this.stroke = stroke;
        this.strokeWeight = strokeWeight;
        this.roarSize = roarSize;
        this.maxRoar = maxRoar;
        this.static = createVector(staticX, staticY);
        this.holeNum = -1;
    }

    drawRoar(index) {
        stroke(74, 0, 112);
        strokeWeight(15);
        noFill();
        ellipse(this.static.x, this.static.y, this.roarSize);
        this.roarSize -= 5;
        for (let i = 0; i < enemies.length; i++) {
            if (dist(this.static.x, this.static.y, enemies[i].pos.x, enemies[i].pos.y) < this.roarSize / 2 + enemies[i].size / 2) {
                enemies[i].blackHoled = true;
            }
        }
        if (this.roarSize <= this.maxRoar) {
            this.roarSize = 300
            this.holeNum++;
            if (this.holeNum == 6) {
                for (let i = 0; i < enemies.length; i++) {
                    if (enemies[i].speedChanged == true) {
                        enemies[i].speed = 0;
                        enemies[i].speedChanged = false;
                    }
                    enemies[i].blackHoled = false;
                }
                player.roars.splice(index, 1, 0);
            }
        }
    }
}
//generate a random number
function chance(min, max) {
    return (Math.floor(random(min, max + 1)));
}
//check to see if you should drop an item
let droppedItems = [];

function dropItem(rarity, x, y) {
    let dropChance;
    let dropType;
    let dropIndex;
    dropChance = chance(0, 3);
    dropType = chance(0, 1);
    dropIndex = chance(0, itemLibrary[dropType][rarity].length - 1);
    if (dropChance == 0) {
        droppedItems.push(new itemLibrary[dropType][rarity][dropIndex].create());
        //        droppedItems.push(new itemLibrary[1][2][1].create());
        droppedItems[droppedItems.length - 1].pos.x = x;
        droppedItems[droppedItems.length - 1].pos.y = y;
    }
}
