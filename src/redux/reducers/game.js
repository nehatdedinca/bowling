import {fromJS} from 'immutable';
import * as Constants from '../constants';

const frame = {
    activeRoll: 0,
    frameScore: [null, null],
    result: null,
};

const lastFrame = {
    activeRoll: 0,
    frameScore: [null, null, null],
    result: null,
};

const playerScore = [frame, frame, frame, frame, frame, frame, frame, frame, frame, lastFrame];

const initialJs = {
    activePlayer: 0,
    activeFrame: 0,
    players: [playerScore]
};

const initialState = fromJS(initialJs);

export default function reducer(state = initialState, {type, payload}) {

    switch (type) {
        case Constants.ADD_USER: {
            return state.set('players', state.get('players').push(fromJS(playerScore)));
        }

        case Constants.RESET_GAME: {
            return fromJS(initialJs);
        }

        case Constants.ADD_SCORE: {
            let newState;

            let playersCount = state.get('players').size;
            let activePlayer = state.get('activePlayer');
            let activeFrame = state.get('activeFrame');
            let isLastFrame = activeFrame === 9;
            let hasStrikeFrame = activeFrame > 0
                && state.getIn(['players', activePlayer, activeFrame-1, 'frameScore', 0]) === 10;
            let hasDoubleStrike = activeFrame > 1
                && hasStrikeFrame && state.getIn(['players', activePlayer, activeFrame-2, 'frameScore', 0]) === 10;
            let hasSpareFrame = activeFrame > 0
                && state.getIn(['players', activePlayer, activeFrame-1, 'frameScore', 0]) !== 10
                && state.getIn(['players', activePlayer, activeFrame-1, 'result']) === 10;
            let activeRoll = state.getIn(['players', activePlayer, activeFrame, 'activeRoll']);
            let frameRollsCount = state.getIn(['players', activePlayer, activeFrame, 'frameScore']).size;
            let lastRollInFrame = (
                activeRoll === frameRollsCount - 1 ||
                (!isLastFrame && payload.score === 10) ||
                (isLastFrame && activeRoll === 1 && state.getIn(['players', activePlayer, activeFrame, 'result']) + payload.score < 10)
            );

            //set score for roll
            newState = state.setIn([
                'players',
                activePlayer,
                activeFrame,
                'frameScore',
                activeRoll
            ], payload.score);

            // update frame result
            newState = newState.updateIn([
                'players',
                activePlayer,
                activeFrame,
                'result'
            ], result => result + payload.score);

            // check on spare
            if (hasSpareFrame && activeRoll === 0) {
                newState = newState.updateIn([
                    'players',
                    activePlayer,
                    activeFrame - 1,
                    'result'
                ], result => result + payload.score);
            }

            // check on strike
            if (hasStrikeFrame && activeRoll <= 1) {
                newState = newState.updateIn([
                    'players',
                    activePlayer,
                    activeFrame - 1,
                    'result'
                ], result => result + payload.score);
            }

            if (hasDoubleStrike && activeRoll === 0) {
                newState = newState.updateIn([
                    'players',
                    activePlayer,
                    activeFrame - 2,
                    'result'
                ], result => result + payload.score);
            }

            // set next roll active
            newState = newState.setIn([
                'players',
                activePlayer,
                activeFrame,
                'activeRoll'
            ], lastRollInFrame ? 0 : activeRoll + 1);

            // switch players
            if (playersCount > 0 && lastRollInFrame) {
                newState = newState.set(
                    'activePlayer',
                    activePlayer === playersCount - 1 ? 0 : activePlayer + 1
                );
            }

            // set next active frame
            if (lastRollInFrame && activePlayer === playersCount - 1) {
                newState = newState.set('activeFrame', activeFrame + 1);
            }

            return newState;
        }

        default:
            return state;
    }
}