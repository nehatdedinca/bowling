import {combineReducers} from 'redux-immutablejs';
import gameReducer from './reducers/game';

export default function createReducer() {
    return combineReducers({
        game: gameReducer
    });
}
