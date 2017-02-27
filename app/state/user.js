import { createAction } from 'redux-actions';

export const AUTO_LOGIN = 'retrospected/user/login/auto';
export const LOGIN = 'retrospected/user/login';
export const LOGIN_SUCCESS = 'retrospected/user/login/success';
export const LOGOUT = 'retrospected/user/logout';
export const CHANGE_LANGUAGE = 'retrospected/user/language/change';
export const CHANGE_LANGUAGE_SUCCESS = 'retrospected/user/language/change/success';

export default function reducer(state = {
    name: null,
    lang: 'en'
}, action) {
    switch (action.type) {
    case LOGIN_SUCCESS:
        return {
            ...state,
            name: action.payload.name
        };
    case CHANGE_LANGUAGE_SUCCESS:
        return {
            ...state,
            lang: action.payload
        };
    case LOGOUT:
        return {
            ...state,
            name: null
        };
    default:
        return state;
    }
}

export const autoLogin = createAction(AUTO_LOGIN);
export const login = createAction(LOGIN, user => ({ name: user }));
export const loginSuccess = createAction(LOGIN_SUCCESS, name => ({ name }));
export const logout = createAction(LOGOUT);
export const changeLanguage = createAction(CHANGE_LANGUAGE);
export const changeLanguageSuccess = createAction(CHANGE_LANGUAGE_SUCCESS);
