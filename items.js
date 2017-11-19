let items = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

//all weapons
let weapons = [
    //rarity zero
    [{
        name: "Stick",
        type: "melee",
        color: "brown",
        size: 100,
        speed: 10,
        damage: 10,
        range: 90,
        attackCd: 60,
        knockback: 40,
        draw: function (x, y) {
            strokeWeight(10);
            stroke("brown");
            line(x, y, x + 40, y + 40);
        }
    }, {
        name: "Dagger",
        type: "melee",
        color: "white",
        size: 70,
        speed: 100,
        damage: 1,
        range: 2,
        attackCd: 1,
        knockback: 20
    }],

    //rarity one
    [{
            name: "Sword",
            type: "melee",
            color: 178,
            size: 140,
            speed: 20,
            damage: 15,
            range: 120,
            attackCd: 80,
            knockback: 50
    },
        {
            name: "Katana",
            type: "melee",
            color: "white",
            size: 120,
            speed: 40,
            damage: 5,
            range: 180,
            attackCd: 20,
            knockback: 15
    }],

    //rarity two
    [
        {
            name: "Axe",
            type: "melee",
            color: "brown",
            size: 70,
            speed: 5,
            damage: 50,
            range: 80,
            attackCd: 120,
            knockback: 90
    }
        ]

];

//all consumables
let consumables = [
    {
        name: "Health Potion",
        amount: 1,
        activate: function () {
            if (player.lives < player.maxLives) {
                player.lives++;
                this.amount--;
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

//equipping a new weapon
class Weapon {
    constructor(type, color, size, speed, damage, range, attackCd, knockback) {
        this.type = type;
        this.color = color;
        this.size = size;
        this.speed = speed;
        this.damage = damage;
        this.range = range;
        this.atkCd = attackCd;
        this.actualCd = attackCd;
        this.knockback = knockback;
    }
}

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
function dropItem(rarity, x, y) {
    let dropChance;
    let dropType;
    let dropIndex;
    dropChance = chance(0, 2);
    dropType = chance(0, 2);
    dropIndex = chance(0, itemLibrary[dropType].length);
    if (dropChance == 0) {
        itemLibrary[dropType][rarity][dropIndex].draw(x, y);
    }
}
