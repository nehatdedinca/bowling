import {fromJS} from 'immutable';
import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createReducer from '../reducers/index';
 
export default function configureStore(initialState = {}) {
 
    const reducer = createReducer();
    const middleWares = [thunkMiddleware];
    const enhancer = compose(
        applyMiddleware(...middleWares)
    );

    const store = createStore(
       reducer,
       fromJS(initialState),
       enhancer
    );

    if (module.hot) {
        module.hot.accept('./reducer', () => {
            const createNextReducer = require('./reducer').default;

            store.replaceReducer(createNextReducer());
        });
    }

    return store;
}