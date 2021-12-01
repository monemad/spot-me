import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import friendsReducer from './friends';
import paymentsReducer from './payments';
import transfersReducer from './transfers';
import searchResultsReducer from './searchResults';

const rootReducer: any = combineReducers({
    session: sessionReducer,
    friends: friendsReducer,
    payments: paymentsReducer,
    transfers: transfersReducer,
    searchResults: searchResultsReducer
});

let enhancer: any;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger: any = require('redux-logger').default;
    const composeEnhancers: any =
        //@ts-ignore
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore: (param?: any) => any = (preloadedState?: any) => {
    return createStore(rootReducer, preloadedState, enhancer)
}

export default configureStore;
