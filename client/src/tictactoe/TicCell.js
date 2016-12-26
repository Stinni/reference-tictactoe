import React from 'react';

export default function (injected) {
    const eventRouter = injected('eventRouter');
    const commandPort = injected('commandPort');
    const generateUUID = injected('generateUUID');

    class TicCell extends React.Component {

        constructor() {
            super();
            this.state = {};
            this.placeMove = this.placeMove.bind(this);
        }

        componentWillMount(){
            
            eventRouter.on('MovePlaced', movePlaced);

            var movePlaced = (cmd) => {
                if(cmd.gameId === this.props.gameId) {
                    if(cmd.coordinates.x === this.props.coordinates.x &&
                       cmd.coordinates.y === this.props.coordinates.y) {
                        this.state({ side: cmd.side });
                    }
                }
            };
        }

        placeMove() {

            var message = {
                type: "PlaceMove",
                gameId: this.props.gameId,
                timeStamp: new Date(),
                side: this.props.mySide,
                coordinates: this.props.coordinates
            };

            commandPort.routeMessage(message);
        }

        render() {
            return <div className="ticcell" onClick={this.placeMove}>
                {this.state.side}
            </div>
        }
    }

    return TicCell;
}
