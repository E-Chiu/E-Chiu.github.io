//drawing the map
function drawMap() {
    stroke("white");
    strokeWeight(10);
    line(0, 0, 0, 810);
    line(1000, 0, 1000, 810);
    line(0, 0, 1000, 0);
    line(0, 810, 1000, 810);
    strokeWeight(5);
    line(0, 710, 1000, 710);
}

//drawing the hud
function drawHud() {
    fill("grey");
    rect(-1, 710, 1001, 100);
    fill("black");
    for (let i = 0; i < 10; i++) {
        if (player.activeWeapon == i) {
            strokeWeight(7);
        } else {
            strokeWeight(2.5);
        }
        if (i == 0) {
            stroke("red");
        }
        if (i == 3) {
            stroke("green");
        }
        if (i == 7) {
            stroke("blue");
        }
        rect(i * 81.5 + 185, 726, 65, 65);
    }

    fill("red");
    stroke("white");
    for (let i = 0; i < player.lives; i++) {
        if (i < 3) {
            ellipse(i * 50 + 40, 740, 36, 36);
        }
        if (i > 2) {
            ellipse((i - 3) * 50 + 40, 780, 36, 36);
        }
    }
}

//drawing weapons cooldowns
function drawCds() {
    for (let i = 0; i < 3; i++) {
        if (items[i] != 0 && items[i].actualCd != 0 && items[i].actualCd != items[i].atkCd) {
            noStroke();
            fill(255, 255, 255, 90);
            rect(i * 81.5 + 185, 791, 65, -1 * (65 * (items[i].actualCd / items[i].atkCd)));
        }
    }
}
