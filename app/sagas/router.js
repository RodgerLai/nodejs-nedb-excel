import { put, select } from 'redux-saga/effects';
import { leave } from '../state/session';
import { getSessionId } from '../selectors';

export function* onLocationChange(action) {
    if (action.payload.pathname === '/') {
        const sessionId = yield select(getSessionId);
        if (sessionId) {
            yield put(leave());
        }
    }
}

export default onLocationChange;
