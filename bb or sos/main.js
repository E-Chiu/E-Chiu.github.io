google.charts.load('current', {packages: ['corechart', 'line']});

$(document).ready(function() {
    $("#calculate").click(function() {
        var mana = 0;
        var tears = 0;
        var starGuardians = 0;
        var modifier = 1.0;
        var blueBattery = document.getElementById('blueBattery').checked;
        var blue = document.getElementById('blue').checked;
        var axiom =  document.getElementById('axiom').checked;
        var plots = [];
        mana = $("#mana").val();
        tears = $("#tears").val();
        starGuardians = $("#starGuardians").val();

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
        // simulate for 60 autos becuase thats usually how much ap casters can get in
        var shojinCasts = 0;
        var blueCasts = 0;
        var shojinMana = 15 + 15*tears;
        var blueMana = 40 + 15*tears;
        var stored = false;
        for(var i = 1; i <= 60; i++) {
            shojinMana += 10*modifier;
            blueMana += 10*modifier;
            if(i%3 == 0) { // check if add shojin mana
                if(shojinMana >= mana) { // if this auto reaches threshold store it
                    stored = true;
                } else {
                    shojinMana += 20*modifier;
                }
            }
            // would this auto make you cast?
            if(shojinMana >= mana) {
                shojinCasts++;
                if(i%3 == 0 && stored) { //  if mana is stored
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
            plots.push([i, shojinCasts, blueCasts]);
        }

        // make 3d array to graph it
        var googleGraph = new google.visualization.DataTable();
        googleGraph.addColumn('number', 'X');
        googleGraph.addColumn('number', 'Shojin');
        googleGraph.addColumn('number', 'Blue');
        var options = {
            'width':900,
            'height':700,
            hAxis: {
              title: 'Autos'
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

        googleGraph.addRows(plots);

        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        chart.draw(googleGraph, options);

        if(shojinCasts > blueCasts) {
            document.getElementById("results").innerHTML = "Shojin is probably better.";
        } else if(shojinCasts < blueCasts) {
            document.getElementById("results").innerHTML = "Blue Buff is probably better.";
        } else {
            document.getElementById("results").innerHTML = "They are both probably the same.";

        }
    });
});