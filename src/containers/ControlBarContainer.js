import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ControlBar from '../components/ControlBar';
import * as GameActions from '../redux/actions/game';

@connect(
    state => ({
        activeFrame: state.getIn(['game', 'players'])
            .get(state.getIn(['game', 'activePlayer']))
            .get(state.getIn(['game', 'activeFrame']))
    }),
    dispatch => ({
        addUser: bindActionCreators(GameActions.addUser, dispatch),
        addScore: bindActionCreators(GameActions.addScore, dispatch),
        resetGame: bindActionCreators(GameActions.resetGame, dispatch)
    })
)
class ControlBarContainer extends Component {
    static propTypes = {
        activeFrame: PropTypes.object,
        addUser: PropTypes.func.isRequired,
        addScore: PropTypes.func.isRequired,
        resetGame: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            maxPins: 10,
            finished: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.activeFrame) {
            if (nextProps.activeFrame.get('activeRoll') > 0) {
                let pinsRemained = 10 - nextProps.activeFrame.get('result');

                // supporting last frame
                if(nextProps.activeFrame.get('frameScore').size === 3) {
                    pinsRemained = nextProps.activeFrame.getIn(['frameScore',0]) === 10 ||
                        nextProps.activeFrame.getIn(['frameScore',1]) === 10 ||
                        nextProps.activeFrame.get('result') === 10 ? 10 : pinsRemained;
                }

                this.setState({
                    maxPins: pinsRemained
                });
            } else {
                this.setState({
                    finished: false
                })
            }
        } else {
            this.setState({
                maxPins: 10,
                finished: true
            });
        }
    }

    render() {
        return (
            <ControlBar
                addUser={this.props.addUser}
                addScore={this.props.addScore}
                resetGame={this.props.resetGame}
                maxPins={this.state.maxPins}
                finished={this.state.finished}
            />
        );
    }
}

export default ControlBarContainer;