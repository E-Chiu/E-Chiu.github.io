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

    //text for game over
    if (player.lives == 0) {
        fill("red");
        textSize(80);
        text("GAME OVER", 500, 355);
    }
    //text for picking up/swapping weapons
    if (player.buttonState == "pickup") {
        noStroke();
        fill("white");
        textSize(32);
        text("Press the slot number you wish to swap it with.", 500, 100);
    }
    for (let i = 0; i < droppedItems.length; i++) {
        if (dist(droppedItems[i].pos.x, droppedItems[i].pos.y, player.pos.x, player.pos.y) < player.size / 2 && player.buttonState == "notPickup") {
            fill("white");
            noStroke();
            textSize(32);
            text("Press space to pick up " + droppedItems[i].name + ".", 500, 50);
            text("Press shift to ignore " + droppedItems[i].name + ".", 500, 100);
            break;
        }
    }
}

//drawing the hud
function drawHud() {
    fill("grey");
    strokeWeight(0);
    rect(-1, 710, 1001, 100);
    for (let i = 0; i < 10; i++) {
        fill("black");
        if (player.activeWeapon == i) {
            strokeWeight(7);
        } else {
            strokeWeight(2.5);
        }
        if (i >= 0) {
            stroke("red");
        }
        if (i >= 3) {
            stroke("green");
        }
        if (i >= 7) {
            stroke("blue");
        }
        rect(i * 81.5 + 185, 726, 65, 65);
        noStroke();
        fill("white");
        textSize(20);
        text(i + 1, i * 81.5 + 193, 744);
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
    //drawing items
    for (let i = 0; i < items.length; i++) {
        if (items[i] != 0) {
            items[i].pos.x = i * 81.5 + 217.5;
            items[i].pos.y = 758.6;
            items[i].draw();
            if (items[i].type == "consumable") {
                fill("white");
                noStroke();
                textSize(20);
                text(items[i].amount, i * 81.5 + 245, 788);
            }
            if (items[i].type == "ranged") {
                fill("white");
                noStroke();
                textSize(20);
                text(items[i].actualAmmo, i * 81.5 + 234, 787);
            }
            if(items[i].name == "Thirst Blade") {
                fill("white");
                noStroke();
                textSize(20);
                text(items[i].thirst, i * 81.5 + 234, 787);
            }
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
