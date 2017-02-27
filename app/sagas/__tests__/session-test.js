import { put, call, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import sagaHelper from 'redux-saga-testing';
import ls from 'local-storage';
import shortid from 'shortid';
import moment from 'moment';
import { onCreateSession,
    storeSessionToLocalStorage,
    doLoadPreviousSessions,
    onRenameSession,
    onAutoJoin
} from '../session';
import { createSessionSuccess,
    renameSession,
    joinSession,
    receiveClientList,
    loadPreviousSessions
} from '../../state/session';
import { getCurrentUser, getSessionId } from '../../selectors';

jest.mock('shortid');

const previousSessions = {
    Marcel: [
        { id: '1', name: 'Retro 1', lastJoin: moment('2014-04-19').unix() },
        { id: '2', name: 'Retro 2', lastJoin: moment('1952-04-24').unix() },
        { id: '3', name: 'Retro 3', lastJoin: moment('1982-11-01').unix() }
    ],
    Bob: [
        { id: '4', name: 'Retro 4', lastJoin: moment('1983-04-19').unix() }
    ]
};

describe('Sagas - session', () => {
    describe('When a session is created by the user', () => {
        const it = sagaHelper(onCreateSession({ payload: 'My Session' }));

        it('should generate a short ID', result => {
            expect(result).toEqual(call(shortid.generate));
            return 'ABCD';
        });

        it('and then it should get the current user', result => {
            expect(result).toEqual(select(getCurrentUser));
            return 'Marcel';
        });

        it('and then trigger the create session success action', result => {
            expect(result).toEqual(put(createSessionSuccess({ sessionId: 'ABCD' })));
        });

        it('and then store that session to local storage', result => {
            expect(result).toEqual(call(storeSessionToLocalStorage, 'Marcel', 'ABCD'));
        });

        it('and then rename the session to the name given', result => {
            expect(result).toEqual(put(renameSession('My Session')));
        });

        it('and then join this new session', result => {
            expect(result).toEqual(put(joinSession({ sessionId: 'ABCD', user: 'Marcel' })));
        });

        it('and then receive the client list as just the current user', result => {
            expect(result).toEqual(put(receiveClientList(['Marcel'])));
        });

        it('and then move to the session URL', result => {
            expect(result).toEqual(put(push('/session/ABCD')));
        });
    });

    describe('Load Previous sessions (when they exists)', () => {
        const it = sagaHelper(doLoadPreviousSessions());

        it('and then it should get the current user', result => {
            expect(result).toEqual(select(getCurrentUser));
            return 'Marcel';
        });

        it('and then retrieve the previous sessions from local storage', result => {
            expect(result).toEqual(call(ls, 'sessions'));
            return previousSessions;
        });

        it('and then load these sessions in the state', result => {
            expect(result).toEqual(put(loadPreviousSessions([
                { id: '1', name: 'Retro 1', lastJoin: moment('2014-04-19').unix() },
                { id: '2', name: 'Retro 2', lastJoin: moment('1952-04-24').unix() },
                { id: '3', name: 'Retro 3', lastJoin: moment('1982-11-01').unix() }
            ])));
        });
    });

    describe('Load Previous sessions (when they dont exists)', () => {
        const it = sagaHelper(doLoadPreviousSessions());

        it('and then it should get the current user', result => {
            expect(result).toEqual(select(getCurrentUser));
            return 'Maurice';
        });

        it('and then retrieve the previous sessions from local storage', result => {
            expect(result).toEqual(call(ls, 'sessions'));
            return previousSessions;
        });

        it('and then since none are found for this user, load an empty array in the state', result => {
            expect(result).toEqual(put(loadPreviousSessions([])));
        });
    });

    describe('When a session is renamed', () => {
        const it = sagaHelper(onRenameSession({ payload: 'My New Name' }));

        it('should get the session ID', result => {
            expect(result).toEqual(select(getSessionId));
            return '2';
        });

        it('and then it should get the current user', result => {
            expect(result).toEqual(select(getCurrentUser));
            return 'Marcel';
        });

        it('and then retrieve the previous sessions from local storage', result => {
            expect(result).toEqual(call(ls, 'sessions'));
            return previousSessions;
        });

        it('and then persist the sessions again once renamed', result => {
            expect(result).toEqual(call(ls, 'sessions', previousSessions));
        });

        it('and then load these sessions in the state', result => {
            expect(result).toEqual(put(loadPreviousSessions([
                { id: '1', name: 'Retro 1', lastJoin: moment('2014-04-19').unix() },
                { id: '2', name: 'My New Name', lastJoin: moment('1952-04-24').unix() },
                { id: '3', name: 'Retro 3', lastJoin: moment('1982-11-01').unix() }
            ])));
        });
    });

    describe('When a user auto joins', () => {
        const it = sagaHelper(onAutoJoin({ payload: 'ABCD' }));

        it('should get the session ID', result => {
            expect(result).toEqual(select(getSessionId));
            return 'WXYZ';
        });

        it('and then it should get the current user', result => {
            expect(result).toEqual(select(getCurrentUser));
            return 'Claude';
        });

        it('and then join this session', result => {
            expect(result).toEqual(put(joinSession({ sessionId: 'ABCD', user: 'Claude' })));
        });

        it('and then persist the session in local storage', result => {
            expect(result).toEqual(call(storeSessionToLocalStorage, 'Claude', 'ABCD'));
        });
    });
});
