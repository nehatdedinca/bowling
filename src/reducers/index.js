import {combineReducers} from 'redux-immutablejs';
import gameReducer from './gameReducer';

export default function createReducer() {
    return combineReducers({
        game: gameReducer
    });
}