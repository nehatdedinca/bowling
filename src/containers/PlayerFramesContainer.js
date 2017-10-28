import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import PlayerFrames from '../components/PlayerFrames';

@connect(
    state => ({
        activePlayer: state.getIn(['game', 'activePlayer']),
        activeFrame: state.getIn(['game', 'activeFrame']),
        players: state.getIn(['game', 'players']).toJS()
    })
)
class PlayerFramesContainer extends Component {
    static propTypes = {
        activePlayer: PropTypes.number.isRequired,
        activeFrame: PropTypes.number.isRequired,
        players: PropTypes.array.isRequired
    };

    render() {
        return (
            <div>
                {this.props.players.map((playerFrames, index) => {
                    return <PlayerFrames
                        key={index}
                        isActive={this.props.activePlayer === index || this.props.activeFrame > 9}
                        activeFrame={this.props.activeFrame}
                        playerFrames={playerFrames}/>
                })
                }
            </div>
        )
    }
}

export default PlayerFramesContainer;