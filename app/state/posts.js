import findIndex from 'lodash/findIndex';
import { createAction } from 'redux-actions';
import { LEAVE_SESSION, CREATE_SESSION_SUCCESS, JOIN_SESSION } from './session';

export const ADD_POST = 'retrospected/posts/add';
export const ADD_POST_SUCCESS = 'retrospected/posts/add/success';
export const RECEIVE_POST = 'retrospected/posts/receive/add';
export const RECEIVE_BOARD = 'retrospected/posts/receive-all';
export const RECEIVE_DELETE_POST = 'retrospected/posts/receive/delete';
export const DELETE_POST = 'retrospected/posts/delete';
export const LIKE = 'retrospected/posts/like';
export const LIKE_SUCCESS = 'retrospected/posts/like/success';
export const RECEIVE_LIKE = 'retrospected/posts/receive/like';
export const EDIT_POST = 'retrospected/posts/edit';
export const RECEIVE_EDIT_POST = 'retrospected/posts/receive/edit';

const postReducer = (state = {}, action) => {
    switch (action.type) {
    case LIKE_SUCCESS:
    case RECEIVE_LIKE: {
        const array = action.payload.like ? 'likes' : 'dislikes';
        return {
            ...state,
            [array]: state[array].concat(action.payload.user)
        };
    }
    case EDIT_POST:
    case RECEIVE_EDIT_POST:
        return {
            ...state,
            content: action.payload.content
        };
    default:
        return state;
    }
};

export default function reducer(state = [], action) {
    switch (action.type) {
    case ADD_POST_SUCCESS:
    case RECEIVE_POST:
        return [
            ...state,
            action.payload
        ];
    case RECEIVE_BOARD:
        return action.payload;
    case DELETE_POST:
    case RECEIVE_DELETE_POST:
        return state.filter(p => p.id !== action.payload.id);
    case LIKE_SUCCESS:
    case RECEIVE_LIKE:
    case EDIT_POST:
    case RECEIVE_EDIT_POST: {
        const index = findIndex(state, p => p.id === action.payload.post.id);
        return index > -1 ? [
            ...state.slice(0, index),
            postReducer(state[index], action),
            ...state.slice(index + 1)
        ] : state;
    }
    case LEAVE_SESSION:
    case CREATE_SESSION_SUCCESS:
    case JOIN_SESSION:
        return [];
    default:
        return state;
    }
}

export const addPost = createAction(ADD_POST, (postType, content) => ({ postType, content }));
export const addPostSuccess = createAction(ADD_POST_SUCCESS);
export const deletePost = createAction(DELETE_POST);
export const like = createAction(LIKE, post => ({ post, like: true }));
export const unlike = createAction(LIKE, post => ({ post, like: false }));
export const likeSuccess = createAction(LIKE_SUCCESS);
export const editPost = createAction(EDIT_POST, (post, content) => ({ post, content }));
