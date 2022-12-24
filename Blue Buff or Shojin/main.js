google.charts.load('current', {packages: ['corechart', 'line']});

$(document).ready(function() {
    $("#calculate").click(function() {
        var neededMana = $("#mana").val() ? $("#mana").val() : 0;
        var tears = $("#tears").val() ? $("#tears").val() : 0;
        var millisecsPerAttack = Math.floor(1 / $("#atkSpeed").val() * 1000); // 1/atk/sec = sec/atk
        var starGuardians = $('input[name="starGuardianTrait"]:checked').val() ? $('input[name="starGuardianTrait"]:checked').val() : 0;
        var civilians = $('input[name="civilianTrait"]:checked').val() ? $('input[name="civilianTrait"]:checked').val() : 0;
        var janna = $('input[name="windyJanna"]:checked').val() ? $('input[name="windyJanna"]:checked').val() : 0;
        var admin = $('input[name="adminPerk"]:checked').val() ? $('input[name="adminPerk"]:checked').val() : 0;
        var sameAdmin = document.getElementById('sameAdmin').checked;
        var sixAdmin = document.getElementById('6Admin').checked;
        var blueBattery = document.getElementById('blueBattery').checked;
        var uplink1 = document.getElementById('uplink1').checked;
        var uplink2 = document.getElementById('uplink2').checked;
        var uplink3 = document.getElementById('uplink3').checked;
        var undercurrent = document.getElementById('undercurrent').checked;
        var blueTakedown = document.getElementById('blue').checked;
        var axiom = document.getElementById('axiom').checked;
        var autoOnly = document.getElementById('autoOnly').checked;
        var startingMana = 0;
        var modifier = 1.0;
        var manaPerTwo = 0;
        var manaPerFive = 0;
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

        // if civilian is active figure out new manaPerTwo
        switch(civilians) {
            case '1':
                manaPerTwo = 2;
                break;
            case '2':
                manaPerTwo = 4;
                break;
            case '3':
                manaPerTwo = 10;
                break;
        }

        // calculate how much mana uplink gives
        if (uplink1) {
            manaPerTwo += 2;
        }
        if (uplink2) {
            manaPerTwo += 3;
        }
        if (uplink3) {
            manaPerTwo += 3;
        }

        // if there is a janna figure out how much mana to start with
        switch(janna) {
            case '1':
                startingMana += 20;
                break;
            case '2':
                startingMana += 40;
                break;
        }

        // if there is admin figure out the perk
        var bonus;
        switch(admin) {
            case '1':
                sameAdmin ? bonus = 100 : bonus = 50;
                sixAdmin ? Math.floor(bonus *= 1.8) : bonus *= 1;
                startingMana += bonus;
                break;
            case '2':
                sameAdmin ? bonus = 50 : bonus = 25;
                sixAdmin ? Math.floor(bonus *= 1.8) : bonus *= 1;
                startingMana += bonus;
                break;
            case '3':
                sameAdmin ? bonus = 24 : bonus = 12;
                sixAdmin ? Math.floor(bonus *= 1.8) : bonus *= 1;
                manaPerFive += bonus;
                break;
        }

        // check for undercurrent
        if (undercurrent) {
            startingMana += 50;
        }

        // add tears
        startingMana += 15*tears;

        // simulate one round
        casts = simulateRound(neededMana, startingMana, millisecsPerAttack, modifier, manaPerTwo, manaPerFive, blueBattery, axiom, blueTakedown, castPlots, manaPlots, autoOnly);

        // graph data
        graphCasts(castPlots, autoOnly);
        if (document.getElementById('manaChart').checked) {
            graphMana(manaPlots, autoOnly);
        }

        // show which one is better
        if (casts[0] > casts[1]) {
            document.getElementById("results").innerHTML = "Shojin is probably better.";
        } else if (casts[0] < casts[1]) {
            document.getElementById("results").innerHTML = "Blue Buff is probably better.";
        } else {
            document.getElementById("results").innerHTML = "They are both probably the same.<br> If you have blue buff takedowns disabed this means blue buff is better because of the chance of resets.";

        }
    });
});

function simulateRound(neededMana, startingMana, millisecsPerAttack, modifier, manaPerTwo, manaPerFive, blueBattery, axiom, blueTakedown, castPlots, manaPlots, autoOnly) {
    const shojin = {
        mana: 15 + startingMana,
        casts: 0,
        stored: false,
        checkCast: function(neededMana, modifier, blueBattery, axiom) {
            if (this.mana >= neededMana) {
                this.casts++;
                //  if mana is stored
                if (i%3 == 0 && this.stored) {
                    this.mana = 20*modifier;
                    this.stored = false;
                } else {
                    this.mana = 0;
                }
                if (blueBattery) {
                    this.mana += 10*modifier;
                }
                if (axiom) {
                    this.mana += 30*modifier;
                }
            }
        }
    }
    
    const blue = {
        mana: 40 + startingMana,
        casts: 0,
        checkCast: function(neededMana, modifier, blueBattery, axiom, blueTakedown) {
            if (this.mana >= neededMana - 10) {
                this.casts++;
                this.mana = 0;
                if (blueBattery) {
                    this.mana += 10*modifier;
                }
                if (axiom) {
                    this.mana += 30*modifier;
                }
                if (blueTakedown) {
                    this.mana += 10*modifier;
                }
            }
        }
    }

    const auto = {
        mana: startingMana,
        casts: 0,
        checkCast: function(neededMana, modifier, blueBattery, axiom) {
            if (this.mana >= neededMana - 10) {
                this.casts++;
                this.mana = 0;
                if (blueBattery) {
                    this.mana += 10*modifier;
                }
                if (axiom) {
                    this.mana += 30*modifier;
                }
            }
        }
    }

    // simulate for 30 seconds because that's how long a match is before overtime
    var autos = 0;
    // add mana to plot before mana gets used
    autoOnly ? manaPlots.push([0, shojin.mana, blue.mana, auto.mana]) : manaPlots.push([0, shojin.mana, blue.mana]);
    // check for initial cast
    shojin.checkCast(neededMana, modifier, blueBattery, axiom)
    blue.checkCast(neededMana, modifier, blueBattery, axiom);
    if (autoOnly) {
        auto.checkCast(neededMana, modifier, blueBattery, axiom);
    }
    // add casts after mana is used
    autoOnly ? manaPlots.push([0, shojin.mana, blue.mana, auto.mana]) : manaPlots.push([0, shojin.mana, blue.mana]);
    autoOnly? castPlots.push([0, shojin.casts, blue.casts, auto.casts]) : castPlots.push([0, shojin.casts, blue.casts]);
    for (var i = 1; i <= 30000; i++) {
        // see if there is mana to give every 2 secs
        if (i % 2000 == 0 && manaPerTwo != 0) {
            shojin.mana += manaPerTwo*modifier;
            blue.mana += manaPerTwo*modifier;
            if(autoOnly) {
                auto.mana += manaPerTwo*modifier;
            }
            // add mana to plot before mana gets used
            autoOnly ? manaPlots.push([i / 1000, shojin.mana, blue.mana, auto.mana]) : manaPlots.push([i / 1000, shojin.mana, blue.mana]);
            // check if have to cast
            shojin.checkCast(neededMana, modifier, blueBattery, axiom);
            blue.checkCast(neededMana, modifier, blueBattery, axiom, blueTakedown);
            if (autoOnly) {
                auto.checkCast(neededMana, modifier, blueBattery, axiom);
            }
            // add mana and casts after mana is used
            autoOnly ? manaPlots.push([i / 1000, shojin.mana, blue.mana, auto.mana]) : manaPlots.push([i / 1000, shojin.mana, blue.mana]);
            autoOnly ? castPlots.push([i / 1000, shojin.casts, blue.casts, auto.casts]) : castPlots.push([i / 1000, shojin.casts, blue.casts]);
        }
        // see if there is mana to give every 5 secs
        if (i % 2000 == 0 && manaPerFive != 0) {
            shojin.mana += manaPerFive*modifier;
            blue.mana += manaPerFive*modifier;
            if(autoOnly) {
                auto.mana += manaPerFive*modifier;
            }
            // add mana to plot before mana gets used
            autoOnly ? manaPlots.push([i / 1000, shojin.mana, blue.mana, auto.mana]) : manaPlots.push([i / 1000, shojin.mana, blue.mana]);
            // check if have to cast
            shojin.checkCast(neededMana, modifier, blueBattery, axiom);
            blue.checkCast(neededMana, modifier, blueBattery, axiom);
            if (autoOnly) {
                auto.checkCast(neededMana, modifier, blueBattery, axiom);
            }
            // add mana and casts after mana is used
            autoOnly ? manaPlots.push([i / 1000, shojin.mana, blue.mana, auto.mana]) : manaPlots.push([i / 1000, shojin.mana, blue.mana]);
            autoOnly ? castPlots.push([i / 1000, shojin.casts, blue.casts, auto.casts]) : castPlots.push([i / 1000, shojin.casts, blue.casts]);
        }
        // see if they auto
        if (i % millisecsPerAttack == 0) {
            shojin.mana += 10*modifier;
            blue.mana += 10*modifier;
            if(autoOnly) {
                auto.mana += 10*modifier;
            }
            autos++;
            // check if add shojin mana
            if (autos % 3 == 0) {
                // if this auto reaches threshold store it
                if (shojin.mana >= mana) {
                    shojin.stored = true;
                } else {
                    shojin.mana += 20*modifier;
                }
            }
        // add mana to plot before mana gets used
        autoOnly ? manaPlots.push([i / 1000, shojin.mana, blue.mana, auto.mana]) : manaPlots.push([i / 1000, shojin.mana, blue.mana]);
        // would this auto make you cast?
        shojin.checkCast(neededMana, modifier, blueBattery, axiom);
        blue.checkCast(neededMana, modifier, blueBattery, axiom);
        if (autoOnly) {
            auto.checkCast(neededMana, modifier, blueBattery, axiom);
        }
        // add mana and casts after mana is used
        autoOnly ? manaPlots.push([i / 1000, shojin.mana, blue.mana, auto.mana]) : manaPlots.push([i / 1000, shojin.mana, blue.mana]);
        autoOnly ? castPlots.push([i / 1000, shojin.casts, blue.casts, auto.casts]) : castPlots.push([i / 1000, shojin.casts, blue.casts]);
    }
    }
    return [shojin.casts, blue.casts];
}

function graphCasts(plots, autoOnly) {
    var castGraph = new google.visualization.DataTable();
    castGraph.addColumn('number', 'X');
    castGraph.addColumn('number', 'Shojin');
    castGraph.addColumn('number', 'Blue');
    if (autoOnly) {
        castGraph.addColumn('number', 'Auto');
    }
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
            2: {color: 'gray'},
            3: {curveType: 'function'}
        }
        };

    castGraph.addRows(plots);

    var chart = new google.visualization.LineChart(document.getElementById('castChart_div'));
    chart.draw(castGraph, options);
}

function graphMana(plots, autoOnly) {
    var manaGraph = new google.visualization.DataTable();
    manaGraph.addColumn('number', 'X');
    manaGraph.addColumn('number', 'Shojin');
    manaGraph.addColumn('number', 'Blue');
    if (autoOnly) {
        manaGraph.addColumn('number', 'Auto');
    }
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
            2: {color: 'gray'},
            3: {curveType: 'function'}
        },
        focusTarget: 'category'
        };

    manaGraph.addRows(plots);

    var chart = new google.visualization.LineChart(document.getElementById('manaChart_div'));
    chart.draw(manaGraph, options);
}