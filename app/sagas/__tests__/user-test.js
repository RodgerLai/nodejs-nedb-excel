import { put, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import sagaHelper from 'redux-saga-testing';
import ls from 'local-storage';
import { onLogin, onAutoLogin, onLeaveSession, onChangeLanguage, onLogout } from '../user';
import { doLoadPreviousSessions } from '../session';
import { loginSuccess, changeLanguageSuccess } from '../../state/user';

describe('Sagas - user', () => {
    describe('When a user logs in', () => {
        const it = sagaHelper(onLogin({ payload: { name: 'Apolline' } }));

        it('should store that name in local storage', result => {
            expect(result).toEqual(call(ls, 'username', 'Apolline'));
        });

        it('and then call login success', result => {
            expect(result).toEqual(put(loginSuccess('Apolline')));
        });

        it('and then load the previous sessions', result => {
            expect(result).toEqual(call(doLoadPreviousSessions));
        });
    });

    describe('When a user auto logs in and has a username and language stored', () => {
        const it = sagaHelper(onAutoLogin());

        it('check if we have a username alreday in local storage', result => {
            expect(result).toEqual(call(ls, 'username'));
            return 'Claire';
        });

        it('and then we should login as this user automatically', result => {
            expect(result).toEqual(put(loginSuccess('Claire')));
        });

        it('then we should try to get the default language from local storage', result => {
            expect(result).toEqual(call(ls, 'language'));
            return 'fr';
        });

        it('and then set the language to this default', result => {
            expect(result).toEqual(put(changeLanguageSuccess('fr')));
        });

        it('and then load the previous sessions', result => {
            expect(result).toEqual(call(doLoadPreviousSessions));
        });
    });

    describe('When a user auto logs in and has no username or language stored', () => {
        const it = sagaHelper(onAutoLogin());

        it('check if we have a username alreday in local storage', result => {
            expect(result).toEqual(call(ls, 'username'));
        });

        it('then we should try to get the default language from local storage', result => {
            expect(result).toEqual(call(ls, 'language'));
        });

        it('and then load the previous sessions', result => {
            expect(result).toEqual(call(doLoadPreviousSessions));
        });
    });

    describe('When a user disconnets', () => {
        const it = sagaHelper(onLeaveSession());

        it('should redirect to the main page', result => {
            expect(result).toEqual(put(push('/')));
        });
    });

    describe('When a user changes describes language', () => {
        const it = sagaHelper(onChangeLanguage({ payload: 'de' }));

        it('should store this new default language to the local storage', result => {
            expect(result).toEqual(call(ls, 'language', 'de'));
        });

        it('and then should say the language change was a success', result => {
            expect(result).toEqual(put(changeLanguageSuccess('de')));
        });
    });

    describe('When a user logs out', () => {
        const it = sagaHelper(onLogout());

        it('should reset the stored user', result => {
            expect(result).toEqual(call(ls, 'username', null));
        });

        it('and it should reset the stored language', result => {
            expect(result).toEqual(call(ls, 'language', 'en'));
        });
    });
});
