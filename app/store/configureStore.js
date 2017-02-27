/* global __DEVELOPMENT__ __USE_GA__ __DEVTOOLS__ */
/* eslint global-require: 0 */

import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import DevTools from '../components/DevTools';
import reducers from '../state';
import sagas from '../sagas';
import { socketIoMiddleware } from '../middlewares/socketio';

export default function configureStore(initialState = {}, browserHistory) {
    const middlewares = [];
    const sagaMiddleware = createSagaMiddleware();
    middlewares.push(thunk);
    middlewares.push(routerMiddleware(browserHistory));
    middlewares.push(socketIoMiddleware);
    middlewares.push(sagaMiddleware);

    if (__DEVELOPMENT__) {
        const createLogger = require('redux-logger');
        const logger = createLogger({ predicate:
            (getState, action) => action.type !== 'EFFECT_TRIGGERED' &&
                                  action.type !== 'EFFECT_RESOLVED' });
        middlewares.push(logger);
    }

    if (__USE_GA__) {
        const { googleAnalyticsMiddleware } = require('../middlewares/ga');
        middlewares.push(googleAnalyticsMiddleware);
    }

    let createStoreWithMiddleware = applyMiddleware(...middlewares);

    if (__DEVTOOLS__) {
        createStoreWithMiddleware = compose(
            createStoreWithMiddleware,
            DevTools.instrument()
        );
    }

    const finalCreateStore = createStoreWithMiddleware(createStore);
    const store = finalCreateStore(reducers, initialState);
    sagaMiddleware.run(sagas);

    if (__DEVELOPMENT__) {
        if (module.hot) {
            // Enable Webpack hot module replacement for reducers
            module.hot.accept('../state', () => {
                const nextReducer = require('../state');
                store.replaceReducer(nextReducer);
            });
        }
    }

    return store;
}
