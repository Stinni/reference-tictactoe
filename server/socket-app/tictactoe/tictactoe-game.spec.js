var should = require('should');
var _ = require('lodash');

var TictactoeState = require('./tictactoe-state')(inject({}));

var tictactoe = require('./tictactoe-handler')(inject({
    TictactoeState
}));

var gameCreatedEvent = {
    gameId:"123987",
    type: "GameCreated",
    user: {
        userName: "TheGuy"
    },
    name: "TheFirstGame",
    timeStamp: "2016-12-02T11:29:29",
    side:'X'
};

var gameJoinedEvent = {
    gameId:"123987",
    type: "GameJoined",
    user: {
        userName: "Gummi"
    },
    name: "TheFirstGame",
    timeStamp: "2016-12-02T11:29:30",
    side:'O'
};

var placeMoveXOnZeroZero = {
    gameId:"123987",
    type: "PlaceMove",
    user: {
        userName: "TheGuy"
    },
    name: "TheFirstGame",
    timeStamp: "2016-12-02T11:30:00",
    side: "X",
    coordinates: {
        x: 0,
        y: 0
    }
};

var movePlacedXOnZeroZeroEvent = {
    gameId:"123987",
    type: "MovePlaced",
    user: {
        userName: "TheGuy"
    },
    name: "TheFirstGame",
    timeStamp: "2016-12-02T11:30:00",
    side: "X",
    coordinates: {
        x: 0,
        y: 0
    }
};

var movePlacedOOnZeroZero = {
    gameId:"123987",
    type: "PlaceMove",
    user: {
        userName: "Gummi"
    },
    name: "TheFirstGame",
    timeStamp: "2016-12-02T11:30:30",
    side: "O",
    coordinates: {
        x: 0,
        y: 0
    }
};

describe('create game command', function() {

    var given, when, then;

    beforeEach(function(){
        given=undefined;
        when=undefined;
        then=undefined;
    });

    afterEach(function () {
        tictactoe(given).executeCommand(when, function(actualEvents){
            should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
        });
    });


    it('should emit game created event', function(){

        given = [];
        when =
        {
            gameId:"123987",
            type: "CreateGame",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2016-12-02T11:29:29"
        };
        then = [gameCreatedEvent];
    })
});

describe('join game command', function () {

    var given, when, then;

    beforeEach(function () {
        given = undefined;
        when = undefined;
        then = undefined;
    });

    afterEach(function () {
        tictactoe(given).executeCommand(when, function (actualEvents) {
            should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
        });
    });

    it('should emit game joined event...', function () {

        given = [gameCreatedEvent];
        when =
        {
            gameId:"123987",
            type: "JoinGame",
            user: {
                userName: "Gummi"
            },
            name: "TheFirstGame",
            timeStamp: "2016-12-02T11:29:30"
        };
        then = [gameJoinedEvent];
    })

    it('should emit FullGameJoinAttempted event when game full...', function () {

        given = [gameCreatedEvent, gameJoinedEvent];
        when =
        {
            gameId:"123987",
            type: "JoinGame",
            user: {
                userName: "Gulli"
            },
            name: "TheFirstGame",
            timeStamp: "2016-12-02T11:30:29"
        };
        then = [{
            gameId:"123987",
            type: "FullGameJoinAttempted",
            user: {
                userName: "Gulli"
            },
            name: "TheFirstGame",
            timeStamp: "2016-12-02T11:30:29"
        }];
    })
});

describe('place move command', function() {

    var given, when, then;

    beforeEach(function(){
        given=undefined;
        when=undefined;
        then=undefined;
    });

    afterEach(function () {
        tictactoe(given).executeCommand(when, function(actualEvents){
            should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
        });
    });

    it('should emit MovePlaced on first game move...', function(){

        given = [gameCreatedEvent, gameJoinedEvent];
        when = placeMoveXOnZeroZero;
        then = [{
            gameId:"123987",
            type: "MovePlaced",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2016-12-02T11:30:00",
            side: "X",
            coordinates: {
                x: 0,
                y: 0
            }
        }];
    })

    it('should emit IllegalMove when square is already occupied...', function(){

        given = [gameCreatedEvent, gameJoinedEvent, movePlacedXOnZeroZeroEvent];
        when = movePlacedOOnZeroZero;
        then = [{
            gameId:"123987",
            type: "IllegalMove",
            user: {
                userName: "Gummi"
            },
            name: "TheFirstGame",
            timeStamp: "2016-12-02T11:30:30"
        }];
    })

    /*
    it('', function(){

        given = [];
        when = {};
        then = [];
    })
    */
});

/*
- Should emit NotYourMove if attempting to make move out of turn
```
Given: [{GameCreated}, {GameJoined}, {MovePlaced(0,0:X)}], When: {PlaceMove(0,1:X)}, Then: [{NotYourMove}]
```
- Should emit game won
```
Given: [{GameCreated}, {GameJoined}, {MovePlaced(0,0:X)}, {MovePlaced(2,0:O)}, {MovePlaced(0,1:X)}, {MovePlaced(2,1:O)}], When: {PlaceMove(0,2:X)}, Then: [{GameWon}]
```
- Should not emit game draw if won on last move
```
Given: [{GameCreated}, {GameJoined}, {MovePlaced(0,0:X)}, {MovePlaced(1,0:O)}, {MovePlaced(2,0:X)}, {MovePlaced(0,1:O)}, {MovePlaced(0,2:X)}, {MovePlaced(1,2:O)}, {MovePlaced(2,2:X)}, {MovePlaced(2,1:O)}], When: {PlaceMove(1,1:X)}, Then: [{GameWon}]
```
- Should emit game draw when neither wins
```
Given: [{GameCreated}, {GameJoined}, {MovePlaced(1,0:X)}, {MovePlaced(0,0:O)}, {MovePlaced(1,1:X)}, {MovePlaced(1,2:O)}, {MovePlaced(0,2:X)}, {MovePlaced(2,0:O)}, {MovePlaced(2,1:X)}, {MovePlaced(0,1:O)}], When: {PlaceMove(2,2:X)}, Then: [{GameWon}]
```
*/