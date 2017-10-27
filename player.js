//equipping a new weapon
class Weapon {
    constructor(type, color, size, speed, damage, range, attackCd) {
        this.type = type;
        this.size = size;
        this.speed = speed;
        this.damage = damage;
        this.range = range;
        this.color = color;
    }
}

//attacking
function keyPressed() {
    if (keyCode == 38) {
        if (items[activeWeapon].atkCd == 0) {
            isAttacking = true;
            if (items[activeWeapon].type == "melee") {
                attackScope.start = 270 - (items[activeWeapon].range / 2);
                attackScope.end = 270 + (items[activeWeapon].range / 2);
            }
        }
    }
    if (keyCode == 40) {
        if (items[activeWeapon].atkCd == 0) {
            isAttacking = true;
            if (items[activeWeapon].type == "melee") {
                attackScope.start = 90 - (items[activeWeapon].range / 2);
                attackScope.end = 90 + (items[activeWeapon].range / 2);
            }
        }
    }
    if (keyCode == 37) {
        if (items[activeWeapon].atkCd == 0) {
            isAttacking = true;
            if (items[activeWeapon].type == "melee") {
                attackScope.start = 180 - (items[activeWeapon].range / 2);
                attackScope.end = 180 + (items[activeWeapon].range / 2);
            }
        }
    }
    if (keyCode == 39) {
        if (items[activeWeapon].atkCd == 0) {
            isAttacking = true;
            if (items[activeWeapon].type == "melee") {
                attackScope.start = 360 - (items[activeWeapon].range / 2);
                attackScope.end = 360 + (items[activeWeapon].range / 2);
            }
        }
    }
}

function attack() {
    if (isAttacking) {
        items[activeWeapon].atkCd = 0;
        if (items[activeWeapon].type == "melee") {
            attackScope.start += items[activeWeapon].speed;
            meleeAttack();
        }
    } else {
        items[activeWeapon].atkCd--;
    }
}

function meleeAttack() {
    let length = items[activeWeapon].size;
    let theta = attackScope.start;
    let opposite = sin(theta) * length;
    let adjacent = cos(theta) * length;

    stroke(items[activeWeapon].color);
    strokeWeight(10);
    line(player.x, player.y, player.x + adjacent, player.y + opposite);
    if (attackScope.start >= attackScope.end) {
        isAttacking = false;
    }
}

//drawing and moving
function drawPlayer() {
    //moving
    fill("grey");
    strokeWeight(0);
    ellipse(player.x, player.y, player.size, player.size);
    if (keyIsDown(87)) {
        player.y -= player.speed;
    }
    if (keyIsDown(83)) {
        player.y += player.speed;
    }
    if (keyIsDown(65)) {
        player.x -= player.speed;
    }
    if (keyIsDown(68)) {
        player.x += player.speed;
    }

    if (player.x <= 32.5) {
        player.x = 32.5;
    }
    if (player.x >= 967.5) {
        player.x = 967.5;
    }
    if (player.y <= 32.5) {
        player.y = 32.5;
    }
    if (player.y >= 679.5) {
        player.y = 679.5;
    }
}
