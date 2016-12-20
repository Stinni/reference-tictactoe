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
                gameBoard[event.coordinates.x][event.coordinates.y] = event.side;
                turnsPlayed++;
            }
        }

        function processEvents(history) {
            _.each(history, processEvent);
        }

        function gameFull() {
            return gamefull;
        }

        function isCellEmpty(coordinates) {
            return gameBoard[coordinates.x][coordinates.y] === "-";
        }

        function isItYourTurn(side) {
            if(turnsPlayed % 2 === 0) {
                return side === "X";
            }
            return side === "Y";
        }

        processEvents(history);

        return {
            processEvents: processEvents,
            gameFull: gameFull,
            isCellEmpty: isCellEmpty,
            isItYourTurn: isItYourTurn
        }
    };
};
