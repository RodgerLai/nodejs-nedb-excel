import moment from 'moment';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from '../../state';
import sagas from '../../sagas';
import { loginSuccess, changeLanguage } from '../../state/user';
import { createSessionSuccess,
    receiveClientList,
    renameSession,
    loadPreviousSessions
} from '../../state/session';
import { toggleSummaryMode,
    openDrawer
} from '../../state/modes';
import {
    addPost
} from '../../state/posts';

export const getStore = () => {
    const initialState = {};
    const middlewares = [];
    const sagaMiddleware = createSagaMiddleware();
    middlewares.push(sagaMiddleware);

    const createStoreWithMiddleware = applyMiddleware(...middlewares);

    const finalCreateStore = createStoreWithMiddleware(createStore);
    const store = finalCreateStore(reducers, initialState);
    sagaMiddleware.run(sagas);

    return store;
};

export default () => {
    const store = getStore();

    store.dispatch(loginSuccess('Antoine'));
    store.dispatch(changeLanguage('fr'));
    store.dispatch(createSessionSuccess({ sessionId: 'ABCD' }));
    store.dispatch(receiveClientList(['Zsolt', 'James', 'Stuart']));
    store.dispatch(renameSession('FT1.1 Retro'));
    store.dispatch(loadPreviousSessions([
        { name: 'Retro 1', lastJoin: moment('2014-04-19').unix() },
        { name: 'Retro 2', lastJoin: moment('1952-04-24').unix() },
        { name: 'Retro 3', lastJoin: moment('1982-11-01').unix() }
    ]));
    store.dispatch(toggleSummaryMode());
    store.dispatch(openDrawer());
    store.dispatch(addPost('well', 'Nicolas Sarkozy'));
    store.dispatch(addPost('well', 'Bruno Lemaire'));
    store.dispatch(addPost('notWell', 'François Hollande'));
    store.dispatch(addPost('notWell', 'Cécile Duflot'));
    store.dispatch(addPost('ideas', 'Emmanuel Macron'));
    store.dispatch(addPost('ideas', 'Manuel Valls'));

    return store.getState();
};
