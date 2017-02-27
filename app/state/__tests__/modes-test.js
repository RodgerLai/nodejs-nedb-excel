import systemUnderTest, { toggleSummaryMode, openDrawer, closeDrawer } from '../modes';
import { LEAVE_SESSION, JOIN_SESSION, CREATE_SESSION } from '../session';
import { AUTO_LOGIN, LOGIN, LOGOUT } from '../user';

describe('State - Modes', () => {
    let state;

    beforeEach(() => {
        state = systemUnderTest(undefined, { type: '' });
    });

    it('Should start with a closed drawer', () => {
        expect(state.drawerOpen).toBe(false);
    });

    it('Should start not in summary mode', () => {
        expect(state.summaryMode).toBe(false);
    });

    describe('When opening the drawer', () => {
        beforeEach(() => {
            state = systemUnderTest(state, openDrawer());
        });

        it('Should have opened the drawer', () => {
            expect(state.drawerOpen).toBe(true);
        });

        describe('When closing the drawer', () => {
            beforeEach(() => {
                state = systemUnderTest(state, closeDrawer());
            });

            it('Should have closed the drawer', () => {
                expect(state.drawerOpen).toBe(false);
            });
        });
    });

    describe('When toggling the summary mode', () => {
        beforeEach(() => {
            state = systemUnderTest(state, toggleSummaryMode());
        });

        it('Should have set the summary mode to true', () => {
            expect(state.summaryMode).toBe(true);
        });

        describe('When toggling the summary mode again', () => {
            beforeEach(() => {
                state = systemUnderTest(state, toggleSummaryMode());
            });

            it('Should have set the summary mode back to false', () => {
                expect(state.summaryMode).toBe(false);
            });
        });

        describe('When leaving the session', () => {
            beforeEach(() => {
                state = systemUnderTest(state, { type: LEAVE_SESSION });
            });

            it('Should have set the summary mode back to false', () => {
                expect(state.summaryMode).toBe(false);
            });
        });

        describe('When joining the session', () => {
            beforeEach(() => {
                state = systemUnderTest(state, { type: JOIN_SESSION });
            });

            it('Should have set the summary mode back to false', () => {
                expect(state.summaryMode).toBe(false);
            });
        });

        describe('When creating the session', () => {
            beforeEach(() => {
                state = systemUnderTest(state, { type: CREATE_SESSION });
            });

            it('Should have set the summary mode back to false', () => {
                expect(state.summaryMode).toBe(false);
            });
        });

        describe('When auto login', () => {
            beforeEach(() => {
                state = systemUnderTest(state, { type: AUTO_LOGIN });
            });

            it('Should have set the summary mode back to false', () => {
                expect(state.summaryMode).toBe(false);
            });
        });

        describe('When the user logs in', () => {
            beforeEach(() => {
                state = systemUnderTest(state, { type: LOGIN });
            });

            it('Should have set the summary mode back to false', () => {
                expect(state.summaryMode).toBe(false);
            });
        });

        describe('When the user logs out', () => {
            beforeEach(() => {
                state = systemUnderTest(state, { type: LOGOUT });
            });

            it('Should have set the summary mode back to false', () => {
                expect(state.summaryMode).toBe(false);
            });
        });
    });
});
