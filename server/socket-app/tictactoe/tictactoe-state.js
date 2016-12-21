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
            if(event.type === "GameWon") {
                gameOver = true;
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

        function haveIWon(side) {
            for(var i = 0; i < 3; i++){
                if (gameBoard[0][i] ===  side && gameBoard[1][i] ===  side && gameBoard[2][i] ===  side) return true;
                if (gameBoard[i][0] ===  side && gameBoard[i][1] ===  side && gameBoard[i][2] ===  side) return true;
            }
            if (gameBoard[0][0] ===  side && gameBoard[1][1] ===  side && gameBoard[2][2] ===  side) return true;
            if (gameBoard[2][0] ===  side && gameBoard[1][1] ===  side && gameBoard[0][2] ===  side) return true;
            return false;
        }

        function isGameOver() {
            return gameOver;
        }

        processEvents(history);

        return {
            processEvents: processEvents,
            gameFull: gameFull,
            isCellEmpty: isCellEmpty,
            isItYourTurn: isItYourTurn,
            haveIWon: haveIWon,
            isGameOver: isGameOver
        }
    };
};
