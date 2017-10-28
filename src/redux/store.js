import {fromJS} from 'immutable';
import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createReducer from './reducer';
import DevTools from '../containers/DevTools';

export default function configureStore(initialState = {}) {

    let enhancer;
    const reducer = createReducer();
    const middleWares = [thunkMiddleware];

    if (__DEV__) {
        enhancer = compose(
            applyMiddleware(...middleWares),
            DevTools.instrument()
        );
    } else {
        enhancer = compose(
            applyMiddleware(...middleWares)
        );
    }

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
