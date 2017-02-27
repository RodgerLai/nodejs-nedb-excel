/* eslint max-len:0 */

import {
    LEAVE_SESSION,
    JOIN_SESSION,
    CREATE_SESSION_SUCCESS
} from '../session';

import systemUnderTest, {
    ADD_POST_SUCCESS,
    RECEIVE_POST,
    RECEIVE_BOARD,
    DELETE_POST,
    RECEIVE_DELETE_POST,
    LIKE_SUCCESS,
    RECEIVE_LIKE,
    EDIT_POST,
    RECEIVE_EDIT_POST
} from '../posts';

describe('State - Posts', () => {
    let state;

    beforeEach(() => {
        state = systemUnderTest(undefined, { type: '' });
    });

    it('Should start with an empty array of posts', () => {
        expect(state).toEqual([]);
    });

    it('Should add a new post locally', () => {
        state = systemUnderTest(state, { type: ADD_POST_SUCCESS, payload: 'blah' });
        expect(state.length).toBe(1);
        expect(state[0]).toEqual('blah');
    });

    it('Should add a new post when sent by the server', () => {
        state = systemUnderTest(state, { type: RECEIVE_POST, payload: 'blah' });
        expect(state.length).toBe(1);
        expect(state[0]).toEqual('blah');
    });

    it('Should add the post to the end of the array', () => {
        state = systemUnderTest(state, { type: ADD_POST_SUCCESS, payload: 'foo' });
        state = systemUnderTest(state, { type: ADD_POST_SUCCESS, payload: 'bar' });
        expect(state.length).toBe(2);
        expect(state[0]).toEqual('foo');
        expect(state[1]).toEqual('bar');
    });

    it('Should replaces all posts when receiving a new board from the server', () => {
        state = systemUnderTest(state, { type: ADD_POST_SUCCESS, payload: 'foo' });
        state = systemUnderTest(state, { type: RECEIVE_BOARD, payload: ['hey', 'ho'] });
        expect(state.length).toBe(2);
        expect(state[0]).toEqual('hey');
        expect(state[1]).toEqual('ho');
    });

    it('Should delete the correct post when deleting locally or via the server', () => {
        state = systemUnderTest(state, { type: ADD_POST_SUCCESS, payload: { id: 1 } });
        state = systemUnderTest(state, { type: ADD_POST_SUCCESS, payload: { id: 2 } });
        state = systemUnderTest(state, { type: ADD_POST_SUCCESS, payload: { id: 3 } });
        state = systemUnderTest(state, { type: ADD_POST_SUCCESS, payload: { id: 4 } });
        state = systemUnderTest(state, { type: DELETE_POST, payload: { id: 2 } });
        state = systemUnderTest(state, { type: RECEIVE_DELETE_POST, payload: { id: 3 } });
        expect(state.length).toBe(2);
        expect(state[0].id).toEqual(1);
        expect(state[1].id).toEqual(4);
    });

    it('Should add the user name to the list of likes', () => {
        state = systemUnderTest(state, { type: ADD_POST_SUCCESS, payload: { id: 1, likes: [] } });
        state = systemUnderTest(state, { type: ADD_POST_SUCCESS, payload: { id: 2, likes: [] } });
        state = systemUnderTest(state, { type: ADD_POST_SUCCESS, payload: { id: 3, likes: [] } });
        state = systemUnderTest(state, { type: LIKE_SUCCESS, payload: { post: { id: 1 }, like: true, user: 'A' } });
        state = systemUnderTest(state, { type: RECEIVE_LIKE, payload: { post: { id: 2 }, like: true, user: 'B' } });
        expect(state[0].likes.length).toBe(1);
        expect(state[1].likes.length).toBe(1);
        expect(state[2].likes.length).toBe(0);
        expect(state[0].likes[0]).toBe('A');
        expect(state[1].likes[0]).toBe('B');
    });

    it('Should edit the correct post both locally or via the server', () => {
        state = systemUnderTest(state, { type: ADD_POST_SUCCESS, payload: { id: 1, content: 'A' } });
        state = systemUnderTest(state, { type: ADD_POST_SUCCESS, payload: { id: 2, content: 'B' } });
        state = systemUnderTest(state, { type: ADD_POST_SUCCESS, payload: { id: 3, content: 'C' } });
        state = systemUnderTest(state, { type: EDIT_POST, payload: { post: { id: 1 }, content: 'A2' } });
        state = systemUnderTest(state, { type: RECEIVE_EDIT_POST, payload: { post: { id: 2 }, content: 'B2' } });
        expect(state[0].content).toBe('A2');
        expect(state[1].content).toBe('B2');
        expect(state[2].content).toBe('C');
        expect(state.length).toBe(3);
    });

    it('Should reset the posts when leaving the session', () => {
        state = [1, 2, 3];
        state = systemUnderTest(state, { type: LEAVE_SESSION });
        expect(state).toEqual([]);
    });

    it('Should reset the posts when creating a new session', () => {
        state = [1, 2, 3];
        state = systemUnderTest(state, { type: CREATE_SESSION_SUCCESS });
        expect(state).toEqual([]);
    });

    it('Should reset the posts when joining the session', () => {
        state = [1, 2, 3];
        state = systemUnderTest(state, { type: JOIN_SESSION });
        expect(state).toEqual([]);
    });
});
