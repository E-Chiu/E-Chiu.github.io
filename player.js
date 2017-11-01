//player values
class Player {
    constructor() {
        this.canHit = true;
        this.pos = createVector(20, 20);
        this.size = 60;
        this.speed = 2;
        this.lives = 3;
        this.activeWeapon = 0;
        this.isAttacking = false;
        this.attackScope = {
            start: 0,
            end: 0
        }
    }

    //attacking
    attack() {
        if (player.isAttacking) {
            items[this.activeWeapon].actualCd = items[this.activeWeapon].atkCd;
            if (items[this.activeWeapon].type == "melee") {
                player.attackScope.start += items[this.activeWeapon].speed;
                player.meleeAttack();
            }
        } else if (items[this.activeWeapon].actualCd > 0) {
            items[this.activeWeapon].actualCd--;

        }
    }

    meleeAttack() {
        let length = items[this.activeWeapon].size;
        let theta = player.attackScope.start;
        let opposite = sin(theta) * length;
        let adjacent = cos(theta) * length;

        stroke(items[this.activeWeapon].color);
        strokeWeight(10);
        line(player.pos.x, player.pos.y, player.pos.x + adjacent, player.pos.y + opposite);
        this.hitbox(player.pos.x, player.pos.y, player.pos.x + adjacent, player.pos.y + opposite);
        if (player.attackScope.start >= player.attackScope.end) {
            player.isAttacking = false;
            this.canHit = true;
        }
    }

    hitbox(x1, y1, x2, y2) {
        for (let i = 0; i < enemies.length; i++) {
            if (dist(enemies[i].pos.x, enemies[i].pos.y, x1, y1) < enemies[i].size ||
                dist(enemies[i].pos.x, enemies[i].pos.y, x2, y2) < enemies[i].size ||
                dist(enemies[i].pos.x, enemies[i].pos.y, (x1 + x2) / 2, (y1 + y2) / 2) < enemies[i].size) {
                if (this.canHit) {
                    this.canHit = false;
                    enemies[i].actualHealth -= items[this.activeWeapon].damage;
                    let moveVector = p5.Vector.sub(this.pos, enemies[i].pos);
                    moveVector.setMag(enemies[i].speed);
                    this.pos.sub(moveVector);
                }
            }
        }
    }

    //drawing and moving
    draw() {
        //moving
        fill("grey");
        strokeWeight(0);
        ellipse(player.pos.x, player.pos.y, player.size);
        if (keyIsDown(87)) {
            player.pos.y -= player.speed;
        }
        if (keyIsDown(83)) {
            player.pos.y += player.speed;
        }
        if (keyIsDown(65)) {
            player.pos.x -= player.speed;
        }
        if (keyIsDown(68)) {
            player.pos.x += player.speed;
        }

        if (player.pos.x <= 32.5) {
            player.pos.x = 32.5;
        }
        if (player.pos.x >= 967.5) {
            player.pos.x = 967.5;
        }
        if (player.pos.y <= 32.5) {
            player.pos.y = 32.5;
        }
        if (player.pos.y >= 679.5) {
            player.pos.y = 679.5;
        }
    }

}

//equipping a new weapon
class Weapon {
    constructor(type, color, size, speed, damage, range, attackCd) {
        this.type = type;
        this.color = color;
        this.size = size;
        this.speed = speed;
        this.damage = damage;
        this.range = range;
        this.atkCd = attackCd;
        this.actualCd = attackCd;
    }
}

//attacking
function keyPressed() {
    if (keyCode == 38) {
        if (items[player.activeWeapon].actualCd == 0) {
            player.isAttacking = true;
            if (items[player.activeWeapon].type == "melee") {
                player.attackScope.start = 270 - (items[player.activeWeapon].range / 2);
                player.attackScope.end = 270 + (items[player.activeWeapon].range / 2);
            }
        }
    }
    if (keyCode == 40) {
        if (items[player.activeWeapon].actualCd == 0) {
            player.isAttacking = true;
            if (items[player.activeWeapon].type == "melee") {
                player.attackScope.start = 90 - (items[player.activeWeapon].range / 2);
                player.attackScope.end = 90 + (items[player.activeWeapon].range / 2);
            }
        }
    }
    if (keyCode == 37) {
        if (items[player.activeWeapon].actualCd == 0) {
            player.isAttacking = true;
            if (items[player.activeWeapon].type == "melee") {
                player.attackScope.start = 180 - (items[player.activeWeapon].range / 2);
                player.attackScope.end = 180 + (items[player.activeWeapon].range / 2);
            }
        }
    }
    if (keyCode == 39) {
        if (items[player.activeWeapon].actualCd == 0) {
            player.isAttacking = true;
            if (items[player.activeWeapon].type == "melee") {
                player.attackScope.start = 360 - (items[player.activeWeapon].range / 2);
                player.attackScope.end = 360 + (items[player.activeWeapon].range / 2);
            }
        }
    }
}
