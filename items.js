//all items
let weapons = [
    {
        name: "Stick",
        type: "melee",
        color: "brown",
        size: 100,
        speed: 10,
        damage: 10,
        range: 90,
        attackCd: 60,
        knockback: 40
    },
    {
        name: "Sword",
        type: "melee",
        color: 178,
        size: 140,
        speed: 5,
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
    },
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
    },
    {
        name: "Dagger",
        type: "melee",
        color: "white",
        size: 70,
        speed: 100,
        damage: 1,
        range: 2,
        attackCd: 1,
        knockback: 20
    }
];

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
            player.canRoar = true;
            player.roarType = "fear";
            this.amount--;
        }
        },
    {
        name: "Roar of Ice",
        amount: 1,
        activate: function () {
            player.canRoar = true;
            player.roarType = "ice";
            this.amount--;
        }
        },
    {
        name: "Roar of Fire",
        amount: 1,
        activate: function () {
            player.canRoar = true;
            player.roarType = "fire";
            this.amount--;
        }
        },
    {
        name: "Black Hole",
        amount: 1,
        activate: function () {
            player.static.x = player.pos.x;
            player.static.y = player.pos.y;
            player.canRoar = true;
            player.roarType = "black hole";
            this.amount--;
        }
        }
];

let charms = [


];

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

//class Roar {
//    constructor(stroke, strokeWeight, roarSize, roarType, maxRoar) {
//        this.stroke = stroke;
//        this.strokeWeight = strokeWeight;
//        this.roarSize = roarSize;
//        this.roarType = roarType;
//        this.maxRoar = maxRoar;
//    }
//
//    roar() {
//        if (this.roarType == "fear") {
//            for (let i = 0; i < enemies.length; i++) {
//                if (enemies[i].timer > 0) {
//                    enemies[i].timer--;
//                }
//                if (enemies[i].timer == 1) {
//                    enemies[i].speed = enemies[i].speed * -2;
//                }
//            }
//        }
//        ellipse(player.pos.x, player.pos.y, this.roarSize);
//        this.roarSize += 20;
//        for (let i = 0; i < enemies.length; i++) {
//            if (dist(player.pos.x, player.pos.y, enemies[i].pos.x, enemies[i].pos.y) < this.roarSize / 2 + enemies[i].size / 2 && enemies[i].canHit == true) {
//                if (this.roarType == "fear") {
//                    enemies[i].canHit = false;
//                    enemies[i].actualHealth -= 10;
//                    enemies[i].speed = enemies[i].speed * -0.5;
//                    enemies[i].timer = 120;
//                    killOff();
//                }
//                if (this.roarType == "ice") {
//                    enemies[i].color = [0, 255, 255, 200];
//                    enemies[i].canHit = false;
//                    enemies[i].speed = 0;
//                }
//                if (this.roarType == "fire") {
//                    enemies[i].dot = 0.1;
//                    enemies[i].canHit = false;
//                }
//            }
//        }
//        if (this.roarSize >= this.maxRoar) {
//            this.canRoar = false;
//            this.roarSize = 0;
//            for (let i = 0; i < enemies.length; i++) {
//                if (enemies[i].canHit == false) {
//                    enemies[i].canHit = true;
//                }
//            }
//        }
//    }
//
//    class BlackHole extends Roar {
//        constructor(stroke, strokeWeight, roarSize, roarType, maxRoar, staticX, staticY) {
//            super(stroke, strokeWeight, roarSize, roarType, maxRoar);
//            this.static = createVector(staticX, staticY);
//            this.holeNum = -1;
//        }
//    }
