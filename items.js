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
                line(this.x, this.y, this.x + 40, this.y - 40);
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
                line(this.x, this.y, this.x + 20, this.y - 20);
                stroke("brown");
                line(this.x, this.y, this.x + 5, this.y - 5);
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
                    stroke(200);
                    line(this.pos.x, this.pos.y, this.pos.x + 50, this.pos.y - 50);
                    stroke(80);
                    line(this.pos.x, this.pos.y, this.pos.x + 15, this.pos.y - 15);
                    line(this.pos.pos.x + 5, this.pos.y - 30, this.pos.x + 30, this.pos.y - 5);
                }
            }
    },
        {
            create: class Katana extends Weapon {
                constructor() {
                    super("Katana", "melee", "white", 120, 40, 5, 180, 20, 15);
                }
                draw() {
                    strokeWeight(6);
                    stroke(200);
                    line(this.pos.x, this.pos.y, this.pos.x + 55, this.pos.y - 55);
                    stroke("purple");
                    line(this.pos.x, this.pos.y, this.pos.x + 20, this.pos.y - 20);
                    stroke("black");
                    strokeWeight(3);
                    line(this.pos.x + 1, this.pos.y - 2, this.pos.x + 19, this.pos.y - 20);
                    stroke("yellow");
                    strokeWeight(2);
                    line(this.pos.x + 18, this.pos.y - 25, this.pos.x + 25, this.pos.y - 18);

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
                    quad(this.pos.x + 40, this.pos.y - 50, this.pos.x + 65, this.pos.y - 40, this.pos.x + 60, this.pos.y - 33, this.pos.x + 52, this.pos.y - 30);
                    stroke("brown");
                    strokeWeight(10);
                    line(this.pos.x, this.pos.y, this.pos.x + 50, this.pos.y - 50);
                }
            }
    }
        ]
];

//all consumables
let consumables = [
    {
        create: class Potion {
            constructor() {
                this.name = "Health Potion";
                this.amount = 1;
                this.pos = createVector(0, 0);
            }
            draw() {
                fill("red");
                stroke("white");
                strokeWeight(2);
                ellipse
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
        name: "Energy Shield",
        amount: 1,
        activate: function () {
            if (player.hasShield == false) {
                player.hasShield = true;
                this.amount--;
            }
        }
    },
    {
        name: "Roar of Fear",
        amount: 1,
        activate: function () {
            if (player.roars[0] == 0) {
                player.roars.splice(0, 1, new Roar("red", 5, 0, 300));
                this.amount--;
            }
        }
    },
    {
        name: "Roar of Ice",
        amount: 1,
        activate: function () {
            if (player.roars[1] == 0) {
                player.roars.splice(1, 1, new Roar([0, 255, 255], 8, 0, 250));
                this.amount--;
            }
        }
    }, {
        name: "Roar of Fire",
        amount: 1,
        activate: function () {
            if (player.roars[2] == 0) {
                player.roars.splice(2, 1, new Roar('orange', 12, 0, 500));
                this.amount--;
            }
        }
    }, {
        name: "Black Hole",
        amount: 1,
        activate: function () {
            if (player.roars[3] == 0) {
                player.roars.splice(3, 1, new BlackHole([74, 0, 112], 15, 200, 0, player.pos.x, player.pos.y));
                this.amount--;
            }
        }
    }
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
            this.roarSize = 200;
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
    dropChance = chance(0, 2);
    dropType = chance(0, 2);
    dropIndex = chance(0, itemLibrary[dropType].length);
    if (dropChance == 0) {
        //        droppedItems.push(itemLibrary[dropType][rarity][dropIndex]);
        droppedItems.push(new itemLibrary[0][2][0].create);
        droppedItems[droppedItems.length - 1].pos.x = x;
        droppedItems[droppedItems.length - 1].pos.y = y;
    }
}
