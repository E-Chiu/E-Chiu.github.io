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
            for (let i = 0; i < enemies.length; i++) {
                if (enemies[i].timer > 0) {
                    enemies[i].timer--;
                }
                if (enemies[i].timer == 1) {
                    enemies[i].speed = enemies[i].speed * -2;
                }
            }
        }
        if (index == 1) {
            stroke(0, 255, 255);
            strokeWeight(8);
            noFill();
        }
        if (index == 2) {
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
                }
                if (index == 1) {
                    enemies[i].color = [0, 255, 255, 200];
                    enemies[i].canHit = false;
                    enemies[i].speed = 0;
                }
                if (index == 2) {
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
        console.log(player.roars);
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



//    //using the roar consumables
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
//        if (this.canRoar) {
//            if (this.roarType == "fear") {
//                //roars.push(new Roar("red", 5, 0, "fear", 300));
//                stroke("red");
//                strokeWeight(5);
//                noFill();
//                this.maxRoar = 300;
//            }
//            if (this.roarType == "ice") {
//                //roars.push(new Roar([0, 255, 255], 8, 0, "ice", 250));
//                stroke(0, 255, 255);
//                strokeWeight(8);
//                noFill();
//                this.maxRoar = 250;
//            }
//            if (this.roarType == "fire") {
//                //roars.push(new Roar('orange', 12, 0, "fire", 500));
//                stroke("orange");
//                strokeWeight(12);
//                noFill();
//                this.maxRoar = 500;
//            }
//            if (this.roarType == "black hole") {
//                //roars.push(new BlackHole([74, 0, 112], 15, 200, "black hole", 0, player.pos.x, player.pos.y));
//                stroke(74, 0, 112);
//                strokeWeight(15);
//                noFill();
//                this.maxRoar = 0;
//            }
//            if (this.roarType != "black hole") {
//                ellipse(this.pos.x, this.pos.y, this.roarSize);
//                this.roarSize += 20;
//            } else if (this.roarType == "black hole") {
//                ellipse(this.static.x, this.static.y, this.roarSize);
//                this.roarSize -= 5;
//            }
//            for (let i = 0; i < enemies.length; i++) {
//                if (this.roarType != "black hole") {
//                    if (dist(this.pos.x, this.pos.y, enemies[i].pos.x, enemies[i].pos.y) < this.roarSize / 2 + enemies[i].size / 2 && enemies[i].canHit == true) {
//                        if (this.roarType == "fear") {
//                            enemies[i].canHit = false;
//                            enemies[i].actualHealth -= 10;
//                            enemies[i].speed = enemies[i].speed * -0.5;
//                            enemies[i].timer = 120;
//                            killOff();
//                        }
//                        if (this.roarType == "ice") {
//                            enemies[i].color = [0, 255, 255, 200];
//                            enemies[i].canHit = false;
//                            enemies[i].speed = 0;
//                        }
//                        if (this.roarType == "fire") {
//                            enemies[i].dot = 0.1;
//                            enemies[i].canHit = false;
//                        }
//                    }
//                } else {
//                    if (dist(this.static.x, this.static.y, enemies[i].pos.x, enemies[i].pos.y) < this.roarSize / 2 + enemies[i].size / 2) {
//                        if (this.roarType == "black hole") {
//                            enemies[i].blackHoled = true;
//                        }
//                    }
//                }
//            }
//            if (this.roarType != "black hole") {
//                if (this.roarSize >= this.maxRoar) {
//                    this.canRoar = false;
//                    this.roarSize = 0;
//                    for (let i = 0; i < enemies.length; i++) {
//                        if (enemies[i].canHit == false) {
//                            enemies[i].canHit = true;
//                        }
//                    }
//                }
//            } else {
//                if (this.roarSize <= this.maxRoar) {
//                    this.roarSize = 200;
//                    this.holeNum++;
//                    if (this.holeNum == 6) {
//                        this.canRoar = false;
//                        this.roarSize = 0;
//                        this.holeNum = -1;
//                        for (let i = 0; i < enemies.length; i++) {
//                            enemies[i].blackHoled = false;
//                        }
//                    }
//                }
//            }
//        }
//    }
