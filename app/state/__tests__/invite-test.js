import systemUnderTest, { toggleInviteDialog } from '../invite';
import { LEAVE_SESSION, JOIN_SESSION, CREATE_SESSION } from '../session';
import { AUTO_LOGIN, LOGIN, LOGOUT } from '../user';

describe('State - Invite', () => {
    let state;

    beforeEach(() => {
        state = systemUnderTest(state, { type: '' });
    });

    it('Should start with a closed dialog', () => {
        expect(state.inviteDialogOpen).toBe(false);
    });

    describe('When opening the dialog', () => {
        beforeEach(() => {
            state = systemUnderTest(state, toggleInviteDialog());
        });

        it('Should have opened the dialog', () => {
            expect(state.inviteDialogOpen).toBe(true);
        });

        describe('When leaving the session', () => {
            beforeEach(() => {
                state = systemUnderTest(state, { type: LEAVE_SESSION });
            });

            it('Should have closed the dialog', () => {
                expect(state.inviteDialogOpen).toBe(false);
            });
        });

        describe('When joining the session', () => {
            beforeEach(() => {
                state = systemUnderTest(state, { type: JOIN_SESSION });
            });

            it('Should have closed the dialog', () => {
                expect(state.inviteDialogOpen).toBe(false);
            });
        });

        describe('When creating the session', () => {
            beforeEach(() => {
                state = systemUnderTest(state, { type: CREATE_SESSION });
            });

            it('Should have closed the dialog', () => {
                expect(state.inviteDialogOpen).toBe(false);
            });
        });

        describe('When auto login', () => {
            beforeEach(() => {
                state = systemUnderTest(state, { type: AUTO_LOGIN });
            });

            it('Should have closed the dialog', () => {
                expect(state.inviteDialogOpen).toBe(false);
            });
        });

        describe('When the user logs in', () => {
            beforeEach(() => {
                state = systemUnderTest(state, { type: LOGIN });
            });

            it('Should have closed the dialog', () => {
                expect(state.inviteDialogOpen).toBe(false);
            });
        });

        describe('When the user logs out', () => {
            beforeEach(() => {
                state = systemUnderTest(state, { type: LOGOUT });
            });

            it('Should have closed the dialog', () => {
                expect(state.inviteDialogOpen).toBe(false);
            });
        });
    });
});
