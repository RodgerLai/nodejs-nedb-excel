/* eslint max-len:0 */

import systemUnderTest, {
    LOGIN_SUCCESS,
    LOGOUT,
    CHANGE_LANGUAGE_SUCCESS
} from '../user';

describe('State - User', () => {
    let state;

    beforeEach(() => {
        state = systemUnderTest(undefined, { type: '' });
    });

    it('Should start with a null user name', () => {
        expect(state.name).toBe(null);
    });

    it('Should default the user language to English', () => {
        expect(state.lang).toBe('en');
    });

    it('Should replace the name of the user when login in', () => {
        state.name = 'foo';
        state = systemUnderTest(state, { type: LOGIN_SUCCESS, payload: { name: 'bar' } });
        expect(state.name).toBe('bar');
    });

    it('Should replace the language of the user when changing the language', () => {
        state.lang = 'fr';
        state = systemUnderTest(state, { type: CHANGE_LANGUAGE_SUCCESS, payload: 'en' });
        expect(state.lang).toBe('en');
    });

    it('Should reset the name of the user when logging out', () => {
        state.name = 'foo';
        state = systemUnderTest(state, { type: LOGOUT, payload: { name: 'bar' } });
        expect(state.name).toBe(null);
    });
});
