import { put, select } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';
import { onLocationChange } from '../router';
import { leave } from '../../state/session';
import { getSessionId } from '../../selectors';

describe('Sagas - router', () => {
    describe('When a user changes location to /', () => {
        const it = sagaHelper(onLocationChange({ payload: { pathname: '/' } }));

        it('should get the session ID', result => {
            expect(result).toEqual(select(getSessionId));
            return '123';
        });

        it('and then call the leave action', result => {
            expect(result).toEqual(put(leave()));
        });
    });

    describe('When a user changes location to /session/xxx', () => {
        const it = sagaHelper((onLocationChange({ payload: { pathname: '/session/xxx' } })));

        it('should NOT get the session ID', result => {
            expect(result).not.toEqual(select(getSessionId));
            expect(result).toBe(undefined);
        });
    });

    describe('When a user changes location to / and no session is running', () => {
        const it = sagaHelper((onLocationChange({ payload: { pathname: '/' } })));

        it('should get the session ID', result => {
            expect(result).toEqual(select(getSessionId));
            return null;
        });

        it('then it should do nothing', result => {
            expect(result).toBe(undefined);
        });
    });
});
