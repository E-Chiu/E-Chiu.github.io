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
        if (this.isAttacking) {
            items[this.activeWeapon].actualCd = items[this.activeWeapon].atkCd;
            if (items[this.activeWeapon].type == "melee") {
                this.attackScope.start += items[this.activeWeapon].speed;
                this.meleeAttack();
            }
        } else if (items[this.activeWeapon].actualCd > 0) {
            items[this.activeWeapon].actualCd--;

        }
    }

    meleeAttack() {
        let length = items[this.activeWeapon].size;
        let theta = this.attackScope.start;
        let opposite = sin(theta) * length;
        let adjacent = cos(theta) * length;

        stroke(items[this.activeWeapon].color);
        strokeWeight(10);
        line(this.pos.x, this.pos.y, this.pos.x + adjacent, this.pos.y + opposite);
        this.hitbox(this.pos.x, this.pos.y, this.pos.x + adjacent, this.pos.y + opposite);
        if (this.attackScope.start >= this.attackScope.end) {
            this.isAttacking = false;
            for (let i = 0; i < enemies.length; i++) {
                enemies[i].canHit = true;
            }
        }
    }

    //calculate if hit enemy
    hitbox(x1, y1, x2, y2) {
        for (let i = 0; i < enemies.length; i++) {
            if (dist(enemies[i].pos.x, enemies[i].pos.y, x1, y1) < enemies[i].size - 25 ||
                dist(enemies[i].pos.x, enemies[i].pos.y, x2, y2) < enemies[i].size - 25 ||
                dist(enemies[i].pos.x, enemies[i].pos.y, (x1 + x2) / 2, (y1 + y2) / 2) < enemies[i].size - 25) {
                if (enemies[i].canHit) {
                    enemies[i].canHit = false;
                    enemies[i].actualHealth -= items[this.activeWeapon].damage;
                    let moveVector = p5.Vector.sub(this.pos, enemies[i].pos);
                    moveVector.setMag(items[this.activeWeapon].knockback);
                    enemies[i].pos.sub(moveVector);
                }
            }
        }
    }

    //invulnerability when hit
    gotHit() {
        
    }

    //drawing and moving
    draw() {
        //moving
        fill("grey");
        strokeWeight(0);
        ellipse(this.pos.x, this.pos.y, this.size);
        if (keyIsDown(87)) {
            this.pos.y -= this.speed;
        }
        if (keyIsDown(83)) {
            this.pos.y += this.speed;
        }
        if (keyIsDown(65)) {
            this.pos.x -= this.speed;
        }
        if (keyIsDown(68)) {
            this.pos.x += this.speed;
        }

        if (this.pos.x <= 32.5) {
            this.pos.x = 32.5;
        }
        if (this.pos.x >= 967.5) {
            this.pos.x = 967.5;
        }
        if (this.pos.y <= 32.5) {
            this.pos.y = 32.5;
        }
        if (this.pos.y >= 679.5) {
            this.pos.y = 679.5;
        }
    }

}

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
