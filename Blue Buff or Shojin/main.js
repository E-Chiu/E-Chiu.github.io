google.charts.load('current', {packages: ['corechart', 'line']});

$(document).ready(function() {
    $("#calculate").click(function() {
        var mana = $("#mana").val() ? $("#mana").val() : 0;
        var tears = $("#tears").val() ? $("#tears").val() : 0;
        // 1/atk/sec = sec/atk
        var millisecsPerAttack = Math.floor(1 / $("#atkSpeed").val() * 1000);
        var starGuardians = $('input[name="starGuardianTrait"]:checked').val() ? $('input[name="starGuardianTrait"]:checked').val() : 0;
        var civilians = $('input[name="civilianTrait"]:checked').val() ? $('input[name="civilianTrait"]:checked').val() : 0;
        var modifier = 1.0;
        var civMana = 0;
        var blueBattery = document.getElementById('blueBattery').checked;
        var blue = document.getElementById('blue').checked;
        var axiom = document.getElementById('axiom').checked;
        var castPlots = [];
        var manaPlots = [];

        // if star guardian is active figure out new mod
        switch(starGuardians) {
            case '3':
                modifier = 1.4;
                break;
            case '5':
                modifier = 1.7;
                break;
            case '7':
                modifier = 2.2;
                break;
            case '9':
                modifier = 3.0;
                break;
        }

        // if civilian is active figure out new civMana
        switch(civilians) {
            case '1':
                civMana = 2;
                break;
            case '2':
                civMana = 4;
                break;
            case '3':
                civMana = 10;
                break;
        }

        // simulate one round
        casts = simulateRound(mana, tears, millisecsPerAttack, modifier, civMana, blueBattery, axiom, blue, castPlots, manaPlots);

        // graph data
        graphCasts(castPlots);
        if(document.getElementById('manaChart').checked) {
            graphMana(manaPlots);
        }

        // show which one is better
        if(casts[0] > casts[1]) {
            document.getElementById("results").innerHTML = "Shojin is probably better.";
        } else if(casts[0] < casts[1]) {
            document.getElementById("results").innerHTML = "Blue Buff is probably better.";
        } else {
            document.getElementById("results").innerHTML = "They are both probably the same.";

        }
    });
});

function simulateRound(mana, tears, millisecsPerAttack, modifier, civMana, blueBattery, axiom, blue, castPlots, manaPlots) {
    // simulate for 30 seconds because that's how long a match is before overtime
    var shojinCasts = 0;
    var blueCasts = 0;
    var shojinMana = 15 + 15*tears;
    var blueMana = 40 + 15*tears;
    var autos = 0;
    var stored = false;
    // check for initial cast
    // add mana to plot before mana gets used
    manaPlots.push([i / 1000, shojinMana, blueMana]);
    // would this auto make you cast?
    // YES IT'S TRIPLED BUT I'M TOO LAZY TO FIX
    if(shojinMana >= mana) {
        shojinCasts++;
        //  if mana is stored
        if(i%3 == 0 && stored) {
            shojinMana = 20*modifier;
            stored = false;
        } else {
            shojinMana = 0;
        }
        if(blueBattery) {
            shojinMana += 10*modifier;
        }
        if(axiom) {
            shojinMana += 30*modifier;
        }
    }
    if (blueMana >= mana - 10) {
        blueCasts++;
        blueMana = 0;
        if(blueBattery) {
            blueMana += 10*modifier;
        }
        if(axiom) {
            blueMana += 30*modifier;
        }
        if(blue) {
            blueMana += 10*modifier;
        }
    }
    // add casts after mana is used
    castPlots.push([i / 1000, shojinCasts, blueCasts]);
    for(var i = 1; i <= 30000; i++) {
        // see if civilian gives mana
        if (i % 2000 == 0 && civMana != 0) {
            shojinMana += civMana*modifier;
            blueMana += civMana*modifier;
            // add mana to plot before mana gets used
            // YES IT'S TRIPLED BUT I'M TOO LAZY TO FIX
            manaPlots.push([i / 1000, shojinMana, blueMana]);
            // check if have to cast
            if(shojinMana >= mana) {
                shojinCasts++;
                //  if mana is stored
                if(i%3 == 0 && stored) {
                    shojinMana = 20*modifier;
                    stored = false;
                } else {
                    shojinMana = 0;
                }
                if(blueBattery) {
                    shojinMana += 10*modifier;
                }
                if(axiom) {
                    shojinMana += 30*modifier;
                }
            }
            if (blueMana >= mana - 10) {
                blueCasts++;
                blueMana = 0;
                if(blueBattery) {
                    blueMana += 10*modifier;
                }
                if(axiom) {
                    blueMana += 30*modifier;
                }
                if(blue) {
                    blueMana += 10*modifier;
                }
            }
            // add casts after mana is used
            castPlots.push([i / 1000, shojinCasts, blueCasts]);
        }
        // see if they auto
        if (i % millisecsPerAttack == 0) {
            shojinMana += 10*modifier;
            blueMana += 10*modifier;
            autos++;
            // check if add shojin mana
            if(autos%3 == 0) {
                // if this auto reaches threshold store it
                if(shojinMana >= mana) {
                    stored = true;
                } else {
                    shojinMana += 20*modifier;
                }
            }
            // add mana to plot before mana gets used
            manaPlots.push([i / 1000, shojinMana, blueMana]);
            // would this auto make you cast?
            // YES IT'S TRIPLED BUT I'M TOO LAZY TO FIX
            if(shojinMana >= mana) {
                shojinCasts++;
                //  if mana is stored
                if(i%3 == 0 && stored) {
                    shojinMana = 20*modifier;
                    stored = false;
                } else {
                    shojinMana = 0;
                }
                if(blueBattery) {
                    shojinMana += 10*modifier;
                }
                if(axiom) {
                    shojinMana += 30*modifier;
                }
            }
            if (blueMana >= mana - 10) {
                blueCasts++;
                blueMana = 0;
                if(blueBattery) {
                    blueMana += 10*modifier;
                }
                if(axiom) {
                    blueMana += 30*modifier;
                }
                if(blue) {
                    blueMana += 10*modifier;
                }
            }
            // add casts after mana is used
            castPlots.push([i / 1000, shojinCasts, blueCasts]);
        }
    }
    return [shojinCasts, blueCasts];
}

function graphCasts(plots) {
    var castGraph = new google.visualization.DataTable();
    castGraph.addColumn('number', 'X');
    castGraph.addColumn('number', 'Shojin');
    castGraph.addColumn('number', 'Blue');
    var options = {
        'width':900,
        'height':700,
        hAxis: {
            title: 'Seconds'
        },
        vAxis: {
            title: 'Casts'
        },
        series: {
            0: {color: 'green'},
            1: {color: 'blue'},
            2: {curveType: 'function'}
        }
        };

    castGraph.addRows(plots);

    var chart = new google.visualization.LineChart(document.getElementById('castChart_div'));
    chart.draw(castGraph, options);
}

function graphMana(plots) {
    var manaGraph = new google.visualization.DataTable();
    manaGraph.addColumn('number', 'X');
    manaGraph.addColumn('number', 'Shojin');
    manaGraph.addColumn('number', 'Blue');
    var options = {
        'width':900,
        'height':700,
        hAxis: {
            title: 'Seconds'
        },
        vAxis: {
            title: 'Mana'
        },
        series: {
            0: {color: 'green'},
            1: {color: 'blue'},
            2: {curveType: 'function'}
        },
        curveType: 'function',
        focusTarget: 'category'
        };

    manaGraph.addRows(plots);

    var chart = new google.visualization.LineChart(document.getElementById('manaChart_div'));
    chart.draw(manaGraph, options);
}