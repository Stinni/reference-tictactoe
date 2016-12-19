var _ = require('lodash');

module.exports = function (injected) {

    return function (history) {

        var gamefull = false;
        var turnsPlayed = 0;
        var gameOver = false;
        var gameBoard = [["-", "-", "-"], ["-", "-", "-"], ["-", "-", "-"]];

        function processEvent(event) {
            if(event.type === "GameJoined") {
                gamefull = true;
            }
            if(event.type === "MovePlaced") {
                turnsPlayed++;
            }
        }

        function processEvents(history) {
            _.each(history, processEvent);
        }

        function gameFull() {
            return gamefull;
        }

        /*function isItYourTurn() {
            return true; // use modulo 2 on turnsPlayed :)
        }*/

        processEvents(history);

        return {
            processEvents: processEvents,
            gameFull: gameFull/*,
            isItYourTurn: isItYourTurn*/
        }
    };
};
