"use strict";

const factor = 86.95652;

var playGoingOn = true;

var landzahl;
var kartenlink;
var gesamtzahl;
var circle;

function fight(i) {
    if (playGoingOn) {
        var oldAmount = parseInt(landzahl.item(i).innerHTML);
        var newAmount = Math.max(0, oldAmount - 30);

        landzahl.item(i).innerHTML = newAmount;
        kartenlink.item(i).style.width = newAmount / factor + "%";
        gesamtzahl.item(0).innerHTML = parseInt(gesamtzahl.item(0).innerHTML) - 100;
    }
}

function progress() {
    if (playGoingOn) {
        for  (var i = 0; i < landzahl.length; i += 2) {

            var progressInfected = Math.ceil(parseInt(landzahl.item(i).innerHTML) * 0.004);
            var progressDeath =  Math.ceil(parseInt(landzahl.item(i).innerHTML) * 0.002);

            landzahl.item(i).innerHTML = parseInt(landzahl.item(i).innerHTML) + progressInfected;
            landzahl.item(i+1).innerHTML = parseInt(landzahl.item(i+1).innerHTML) + progressDeath;

            kartenlink.item(i).style.width = parseInt(landzahl.item(i).innerHTML) / factor  + "%";
            kartenlink.item(i+1).style.width = parseInt(landzahl.item(i+1).innerHTML) / factor+ "%";

            gesamtzahl.item(0).innerHTML = parseInt(gesamtzahl.item(0).innerHTML) + progressInfected;
            gesamtzahl.item(1).innerHTML = parseInt(gesamtzahl.item(1).innerHTML) + progressDeath;

            circle.item(0).style.width = parseInt(gesamtzahl.item(0).innerHTML) / factor + "%";
            circle.item(1).style.width = parseInt(gesamtzahl.item(1).innerHTML) / factor + "%";
        }

        if (parseInt(gesamtzahl.item(0).innerHTML) + parseInt(gesamtzahl.item(1).innerHTML) > 15000) {
            playGoingOn = false;

            document.getElementsByClassName('karte').item(0).style.display = "none";
            document.getElementsByClassName('donate').item(0).style.display = "block";

        }
    }
}


window.onload = function() {

    circle = document.getElementsByClassName('circle');
    landzahl = document.getElementsByClassName('landzahl');
    kartenlink = document.getElementsByClassName('kartenlink');
    gesamtzahl = document.getElementsByClassName('gesamtzahl');

    for  (var i = 0; i < landzahl.length; i += 2) {
        kartenlink.item(i).addEventListener('click', fight.bind(null, i), false);
    }

    setInterval(function () {progress()}, 100);

};