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
        then = [movePlacedXOnZeroZeroEvent];
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

    it('should emit NotYourMove if attempting to make move out of turn...', function(){

        given = [gameCreatedEvent, gameJoinedEvent, movePlacedXOnZeroZeroEvent];
        when = {
            gameId:"123987",
            type: "PlaceMove",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2016-12-02T11:30:30",
            side: "X",
            coordinates: {
                x: 0,
                y: 1
            }
        };
        then = [{
            gameId:"123987",
            type: "NotYourMove",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2016-12-02T11:30:30"
        }];
    })

    it('should emit game won...', function(){

        given = [gameCreatedEvent, gameJoinedEvent, movePlacedXOnZeroZeroEvent, {
                gameId:"123987",
                type: "MovePlaced",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2016-12-02T11:30:30",
                side: "O",
                coordinates: {
                    x: 2,
                    y: 0
                }
            }, {
                gameId:"123987",
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2016-12-02T11:31:00",
                side: "X",
                coordinates: {
                    x: 0,
                    y: 1
                }
            }, {
                gameId:"123987",
                type: "MovePlaced",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2016-12-02T11:31:30",
                side: "O",
                coordinates: {
                    x: 2,
                    y: 1
                }
            }
        ];
        when = {
            gameId:"123987",
            type: "PlaceMove",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2016-12-02T11:32:00",
            side: "X",
            coordinates: {
                x: 0,
                y: 2
            }
        };
        then = [{
            gameId:"123987",
            type: "MovePlaced",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2016-12-02T11:32:00",
            side: "X",
            coordinates: {
                x: 0,
                y: 2
            }
        }, {
            gameId: "123987",
            type: "GameWon",
            user: { "userName": "TheGuy" },
            name: "TheFirstGame",
            timeStamp: "2016-12-02T11:32:00",
            side: "X"
        }];
    })

    /*
    it('', function(){

        given = [];
        when = {};
        then = [];
    })
    */


    it('should not emit game draw if won on last move...', function(){

        given = [gameCreatedEvent, gameJoinedEvent, movePlacedXOnZeroZeroEvent, {
                gameId:"123987",
                type: "MovePlaced",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2016-12-02T11:30:30",
                side: "O",
                coordinates: {
                    x: 1,
                    y: 0
                }
            }, {
                gameId:"123987",
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2016-12-02T11:31:00",
                side: "X",
                coordinates: {
                    x: 2,
                    y: 0
                }
            }, {
                gameId:"123987",
                type: "MovePlaced",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2016-12-02T11:31:30",
                side: "O",
                coordinates: {
                    x: 0,
                    y: 1
                }
            }, {
                gameId:"123987",
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2016-12-02T11:32:00",
                side: "X",
                coordinates: {
                    x: 0,
                    y: 2
                }
            }, {
                gameId:"123987",
                type: "MovePlaced",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2016-12-02T11:32:30",
                side: "O",
                coordinates: {
                    x: 1,
                    y: 2
                }
            }, {
                gameId:"123987",
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2016-12-02T11:33:00",
                side: "X",
                coordinates: {
                    x: 2,
                    y: 2
                }
            }, {
                gameId:"123987",
                type: "MovePlaced",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2016-12-02T11:33:30",
                side: "O",
                coordinates: {
                    x: 2,
                    y: 1
                }
            }
        ];
        when = {
            gameId:"123987",
            type: "PlaceMove",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2016-12-02T11:34:00",
            side: "X",
            coordinates: {
                x: 1,
                y: 1
            }
        };
        then = [{
            gameId:"123987",
            type: "MovePlaced",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2016-12-02T11:34:00",
            side: "X",
            coordinates: {
                x: 1,
                y: 1
            }
        }, {
            gameId: "123987",
            type: "GameWon",
            user: { "userName": "TheGuy" },
            name: "TheFirstGame",
            timeStamp: "2016-12-02T11:34:00",
            side: "X"
        }];
    })

    it('should emit game draw when neither wins...', function(){

        given = [gameCreatedEvent, gameJoinedEvent, {
                gameId:"123987",
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2016-12-02T11:30:00",
                side: "X",
                coordinates: {
                    x: 1,
                    y: 0
                }
            }, {
                gameId:"123987",
                type: "MovePlaced",
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
            }, {
                gameId:"123987",
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2016-12-02T11:31:00",
                side: "X",
                coordinates: {
                    x: 1,
                    y: 1
                }
            }, {
                gameId:"123987",
                type: "MovePlaced",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2016-12-02T11:31:30",
                side: "O",
                coordinates: {
                    x: 1,
                    y: 2
                }
            }, {
                gameId:"123987",
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2016-12-02T11:32:00",
                side: "X",
                coordinates: {
                    x: 0,
                    y: 2
                }
            }, {
                gameId:"123987",
                type: "MovePlaced",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2016-12-02T11:32:30",
                side: "O",
                coordinates: {
                    x: 2,
                    y: 0
                }
            }, {
                gameId:"123987",
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2016-12-02T11:33:00",
                side: "X",
                coordinates: {
                    x: 2,
                    y: 1
                }
            }, {
                gameId:"123987",
                type: "MovePlaced",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2016-12-02T11:33:30",
                side: "O",
                coordinates: {
                    x: 0,
                    y: 1
                }
            }
        ];
        when = {
            gameId:"123987",
            type: "PlaceMove",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2016-12-02T11:34:00",
            side: "X",
            coordinates: {
                x: 2,
                y: 2
            }
        };
        then = [{
            gameId:"123987",
            type: "MovePlaced",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2016-12-02T11:34:00",
            side: "X",
            coordinates: {
                x: 2,
                y: 2
            }
        }, {
            gameId: "123987",
            type: "GameDraw",
            user: { "userName": "TheGuy" },
            name: "TheFirstGame",
            timeStamp: "2016-12-02T11:34:00",
            side: "X"
        }];
    })
});
