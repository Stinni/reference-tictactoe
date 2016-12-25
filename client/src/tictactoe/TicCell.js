import React from 'react';

export default function (injected) {
    const eventRouter = injected('eventRouter');
    const commandPort = injected('commandPort');
    const generateUUID = injected('generateUUID');

    class TicCell extends React.Component {
        constructor() {
            super();
            this.state = {
            }
        }
        componentWillMount() {
        }
        letsAlert() {
            alert("Cell has been clicked!")
        }
        render() {
            return <div className="ticcell" onClick={this.letsAlert}>
                {this.state.side}
            </div>
        }
    }
    return TicCell;
}
