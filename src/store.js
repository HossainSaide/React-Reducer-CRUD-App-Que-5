import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import data from './reducer/data';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose;

export default () => {
    const store = createStore(combineReducers({
        data
    }), composeEnhancers(applyMiddleware(thunk)))
    return store;
};