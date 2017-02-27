import { createAction } from 'redux-actions';
import { LEAVE_SESSION, JOIN_SESSION, CREATE_SESSION } from './session';
import { AUTO_LOGIN, LOGIN, LOGOUT } from './user';

export const TOGGLE_SUMMARY_MODE = 'retrospected/modes/toggle-summary-mode';
export const OPEN_DRAWER = 'retrospected/modes/drawer/open';
export const CLOSE_DRAWER = 'retrospected/modes/drawer/close';

export default function reducer(state = {
    summaryMode: false,
    drawerOpen: false
}, action) {
    switch (action.type) {
    case TOGGLE_SUMMARY_MODE:
        return {
            ...state,
            summaryMode: !state.summaryMode
        };
    case OPEN_DRAWER:
        return {
            ...state,
            drawerOpen: true
        };
    case CLOSE_DRAWER:
        return {
            ...state,
            drawerOpen: false
        };
    case LEAVE_SESSION:
    case JOIN_SESSION:
    case CREATE_SESSION:
    case AUTO_LOGIN:
    case LOGIN:
    case LOGOUT:
        return {
            ...state,
            summaryMode: false
        };
    default:
        return state;
    }
}

export const toggleSummaryMode = createAction(TOGGLE_SUMMARY_MODE);
export const openDrawer = createAction(OPEN_DRAWER);
export const closeDrawer = createAction(CLOSE_DRAWER);
