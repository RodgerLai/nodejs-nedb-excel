import ls from 'local-storage';
import { put, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { changeLanguageSuccess, loginSuccess } from '../state/user';
import { doLoadPreviousSessions } from './session';

export function* onLogout() {
    yield call(ls, 'username', null);
    yield call(ls, 'language', 'en');
}

export function* onChangeLanguage(action) {
    yield call(ls, 'language', action.payload);
    yield put(changeLanguageSuccess(action.payload));
}

export function* onLeaveSession() {
    yield put(push('/'));
}

export function* onAutoLogin() {
    const username = yield call(ls, 'username');
    if (username) {
        yield put(loginSuccess(username));
    }
    const language = yield call(ls, 'language');
    if (language) {
        yield put(changeLanguageSuccess(language));
    }
    yield call(doLoadPreviousSessions);
}

export function* onLogin(action) {
    yield call(ls, 'username', action.payload.name);
    yield put(loginSuccess(action.payload.name));
    yield call(doLoadPreviousSessions);
}
