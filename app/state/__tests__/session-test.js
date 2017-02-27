/* eslint max-len:0 */

import systemUnderTest, {
    CREATE_SESSION_SUCCESS,
    JOIN_SESSION,
    RECEIVE_CLIENT_LIST,
    LEAVE_SESSION,
    RENAME_SESSION,
    RECEIVE_SESSION_NAME,
    LOAD_PREVIOUS_SESSIONS
} from '../session';

describe('State - Session', () => {
    let state;

    beforeEach(() => {
        state = systemUnderTest(undefined, { type: '' });
    });

    it('Should start with a null session id', () => {
        expect(state.id).toEqual(null);
    });

    it('Should start with a null session name', () => {
        expect(state.name).toEqual(null);
    });

    it('Should start with an empty list of clients', () => {
        expect(state.clients).toEqual([]);
    });

    it('Should start with an empty list of previous sessions', () => {
        expect(state.previousSessions).toEqual([]);
    });

    it('Should set the session id when creating the session', () => {
        state = systemUnderTest(state, { type: CREATE_SESSION_SUCCESS, payload: { sessionId: 123 } });
        expect(state.id).toEqual(123);
    });

    it('Should set the session id when joining the session', () => {
        state = systemUnderTest(state, { type: JOIN_SESSION, payload: { sessionId: 123 } });
        expect(state.id).toEqual(123);
    });

    it('Should populate and replace the client list when receiving it from the server', () => {
        state.clients = ['foo'];
        state = systemUnderTest(state, { type: RECEIVE_CLIENT_LIST, payload: ['bar', 'bouh'] });
        expect(state.clients).toEqual(['bar', 'bouh']);
    });

    it('Should reset the id, name and clients list when leaving the session', () => {
        state.clients = ['foo', 'bar'];
        state.id = 123;
        state.name = 'session';
        state = systemUnderTest(state, { type: LEAVE_SESSION });
        expect(state.id).toBe(null);
        expect(state.name).toBe(null);
        expect(state.clients).toEqual([]);
    });

    it('Should replace the name of the session when renaming the session', () => {
        state.name = 'foo';
        state = systemUnderTest(state, { type: RENAME_SESSION, payload: 'bar' });
        expect(state.name).toBe('bar');
    });

    it('Should replace the name of the session when receiving a new name', () => {
        state.name = 'foo';
        state = systemUnderTest(state, { type: RECEIVE_SESSION_NAME, payload: 'bar' });
        expect(state.name).toBe('bar');
    });

    it('Should populate and replace the previous sessions list after loading it', () => {
        state.previousSessions = ['foo'];
        state = systemUnderTest(state, { type: LOAD_PREVIOUS_SESSIONS, payload: ['bar', 'bouh'] });
        expect(state.previousSessions).toEqual(['bar', 'bouh']);
    });
});
