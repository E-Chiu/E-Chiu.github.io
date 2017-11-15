//all items
let weapons = [
    {
        name: "stick",
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
        name: "sword",
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
        name: "katana",
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
        name: "axe",
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
        name: "dagger",
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
        name: "hp pot",
        amount: 1,
        activate: function () {
            if (player.lives < player.maxLives) {
                player.lives++;
                this.amount--;
            }
        }
    },
    {
        name: "shield",
        amount: 1,
        activate: function () {
            if (player.hasShield == false) {
                player.hasShield = true;
                this.amount--;
            }
        }
    },
    {
        name: "roar",
        amount: 1,
        activate: function () {
            player.roar = true;
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
