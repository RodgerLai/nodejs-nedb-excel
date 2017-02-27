/* eslint no-prototype-builtins: 0 */
/* Todo: check why this is not recommended */

import { put, select, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import shortid from 'shortid';
import ls from 'local-storage';
import find from 'lodash/find';
import { joinSession,
    createSessionSuccess,
    receiveClientList,
    renameSession,
    loadPreviousSessions } from '../state/session';
import { getCurrentUser, getSessionId } from '../selectors';

export function* storeSessionToLocalStorage(currentUser, sessionId) {
    let savedSessions = ls.get('sessions');
    if (savedSessions === null) {
        savedSessions = {};
    }

    if (!savedSessions.hasOwnProperty(currentUser)) {
        savedSessions[currentUser] = [];
    }

    let savedSession = find(savedSessions[currentUser], session => session.id === sessionId);
    if (!savedSession) {
        savedSession = {
            id: sessionId
        };
        savedSessions[currentUser].push(savedSession);
    }
    savedSession.lastJoin = Date.now();
    ls.set('sessions', savedSessions);

    yield put(loadPreviousSessions(savedSessions[currentUser]));
}

export function* onAutoJoin(action) {
    const sessionId = action.payload;
    const currentSession = yield select(getSessionId);
    const currentUser = yield select(getCurrentUser);

    if (sessionId && sessionId !== currentSession) {
        yield put(joinSession({
            sessionId,
            user: currentUser
        }));
        yield call(storeSessionToLocalStorage, currentUser, sessionId);
    }
}

export function* onRenameSession(action) {
    const currentSession = yield select(getSessionId);
    const currentUser = yield select(getCurrentUser);
    let savedSessions = yield call(ls, 'sessions');
    savedSessions = savedSessions || {};
    const savedSession = find(savedSessions[currentUser],
        session => session.id === currentSession);
    if (savedSession) {
        savedSession.name = action.payload;
        yield call(ls, 'sessions', savedSessions);
        yield put(loadPreviousSessions(savedSessions[currentUser]));
    }
}

export function* doLoadPreviousSessions() {
    const currentUser = yield select(getCurrentUser);
    const sessions = yield call(ls, 'sessions');
    const userSessions = !!sessions &&
            sessions.hasOwnProperty(currentUser) ? sessions[currentUser] : [];
    yield put(loadPreviousSessions(userSessions));
}

export function* onCreateSession(action) {
    const sessionId = yield call(shortid.generate);
    const sessionName = action.payload || null;
    const user = yield select(getCurrentUser);
    yield put(createSessionSuccess({ sessionId }));
    yield call(storeSessionToLocalStorage, user, sessionId);
    yield put(renameSession(sessionName));
    yield put(joinSession({ sessionId, user }));
    yield put(receiveClientList([user]));
    yield put(push(`/session/${sessionId}`));
}
