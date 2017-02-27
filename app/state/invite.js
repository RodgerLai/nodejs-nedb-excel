import { createAction } from 'redux-actions';
import { LEAVE_SESSION, JOIN_SESSION, CREATE_SESSION } from './session';
import { AUTO_LOGIN, LOGIN, LOGOUT } from './user';

export const TOGGLE_INVITE_DIALOG = 'retrospected/invite/toggle-dialog';

export default function reducer(state = {
    inviteDialogOpen: false
}, action) {
    switch (action.type) {
    case TOGGLE_INVITE_DIALOG:
        return {
            ...state,
            inviteDialogOpen: !state.inviteDialogOpen
        };
    case LEAVE_SESSION:
    case JOIN_SESSION:
    case CREATE_SESSION:
    case AUTO_LOGIN:
    case LOGIN:
    case LOGOUT:
        return {
            ...state,
            inviteDialogOpen: false
        };
    default:
        return state;
    }
}

export const toggleInviteDialog = createAction(TOGGLE_INVITE_DIALOG);
