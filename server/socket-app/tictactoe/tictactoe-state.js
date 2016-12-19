var _ = require('lodash');

module.exports = function (injected) {

    return function (history) {

        var gamefull = false;

        function processEvent(event) {
            if(event.type === "GameJoined") {
                gamefull = true;
            }
            /*if(event.type === "") {
                TODO: add something here... :)
            }*/
        }

        function processEvents(history) {
            _.each(history, processEvent);
        }

        function gameFull() {
            return gamefull;
        }

        processEvents(history);

        return {
            gameFull: gameFull,
            processEvents: processEvents
        }
    };
};
