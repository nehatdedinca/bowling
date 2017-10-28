import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class ControlBar extends PureComponent {
    static propTypes = {
        maxPins: PropTypes.number.isRequired,
        finished: PropTypes.bool.isRequired,
        addUser: PropTypes.func.isRequired,
        addScore: PropTypes.func.isRequired,
        resetGame: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.onPlayerClick = () => this.handlePlayerClick();
        this.onRollClick = () => this.handleRollClick();
        this.onKeyPress = (ev) => this.handleKeyPress(ev);
    }

    handleResetGame() {
        this.props.resetGame();
     }

    handlePlayerClick() {
        this.props.addUser();
    }

    handleRollClick() {
        let value = parseInt(this.pinsInput.value);

        if(isNaN(value)) {
            // no/wrong input -> random number
            value = Math.floor(Math.random() * (this.props.maxPins,  1));
        } else if (value < 0) {
            value = 0;
        } else if (value > this.props.maxPins) {
            value = this.props.maxPins;
        }

        this.props.addScore(value);
    }

    handleKeyPress(ev) {
        let keyCode = ev.keyCode || ev.which;
        if (keyCode === 13){
            this.handleRollClick();
        }
    }

    renderFinish() {
        return (
            <div className="inner">
                <span className="finished">Game over:</span>
                <div className="button" onClick={this.onResetGame}>Reset</div>
             </div>
         );
     }

     renderControl() {
        return (
            <div className="inner">
                <div className="button" onClick={this.onPlayerClick}>Add Player</div>
                <div className="score-control">
                    <input
                        onKeyPress={this.onKeyPress}
                        ref={(input) => { this.pinsInput = input; }}
                        type="text"
                        className="score-input"
                        size="2"
                        maxLength="2" />
                    <div className="button" onClick={this.onRollClick}>Roll</div>
                  </div>
              </div>
        );
    }

    render() {
        let control = this.props.finished ? this.renderFinish() : this.renderControl()
        return (
            <div className="controlbar">
                {control}
            </div>
        );
    }
}

export default ControlBar; 