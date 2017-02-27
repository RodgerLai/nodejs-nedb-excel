import moment from 'moment';
import getState from './getState';
import {
    getPosts,
    getSessionId,
    getSummaryMode,
    getCurrentUser,
    getCurrentLanguage,
    getClients,
    getSessionName,
    getSavedSessions,
    isInviteDialogOpen,
    isDrawerOpen,
    getNotWellPosts,
    getWellPosts,
    getIdeasPosts,
    shouldDisplayDrawerButton,
    getSortedNotWellPosts,
    getSortedWellPosts,
    getSortedIdeasPosts,
    getSavedSessionsByDate,
    getCurrentLanguageInfo
} from '../index';

const state = getState();

describe('Selectors - Index', () => {
    it('getPosts', () => {
        expect(getPosts(state).length).toBe(6);
    });

    it('getSessionId', () => {
        expect(getSessionId(state)).toBe('ABCD');
    });

    it('getSummaryMode', () => {
        expect(getSummaryMode(state)).toBe(true);
    });

    it('getCurrentUser', () => {
        expect(getCurrentUser(state)).toEqual('Antoine');
    });

    it('getCurrentLanguage', () => {
        expect(getCurrentLanguage(state)).toBe('fr');
    });

    it('getClients', () => {
        expect(getClients(state)).toEqual(['Zsolt', 'James', 'Stuart']);
    });

    it('getSessionName', () => {
        expect(getSessionName(state)).toBe('FT1.1 Retro');
    });

    it('getSavedSessions', () => {
        expect(getSavedSessions(state)).toEqual([
            { name: 'Retro 1', lastJoin: moment('2014-04-19').unix() },
            { name: 'Retro 2', lastJoin: moment('1952-04-24').unix() },
            { name: 'Retro 3', lastJoin: moment('1982-11-01').unix() }
        ]);
    });

    it('isInviteDialogOpen', () => {
        expect(isInviteDialogOpen(state)).toBe(false);
    });

    it('isDrawerOpen', () => {
        expect(isDrawerOpen(state)).toBe(true);
    });

    it('getNotWellPosts', () => {
        expect(getNotWellPosts(state).length).toBe(2);
    });

    it('getWellPosts', () => {
        expect(getWellPosts(state).length).toBe(2);
    });

    it('getIdeasPosts', () => {
        expect(getIdeasPosts(state).length).toBe(2);
    });

    it('shouldDisplayDrawerButton', () => {
        expect(shouldDisplayDrawerButton(state)).toBe(true);
    });

    it('getSortedNotWellPosts', () => {
        expect(getSortedNotWellPosts(state).length).toBe(2);
    });

    it('getSortedWellPosts', () => {
        expect(getSortedWellPosts(state).length).toBe(2);
    });

    it('getSortedIdeasPosts', () => {
        expect(getSortedIdeasPosts(state).length).toBe(2);
    });

    it('getSavedSessionsByDate', () => {
        expect(getSavedSessionsByDate(state)).toEqual([
            { name: 'Retro 1', lastJoin: moment('2014-04-19').unix() },
            { name: 'Retro 3', lastJoin: moment('1982-11-01').unix() },
            { name: 'Retro 2', lastJoin: moment('1952-04-24').unix() }
        ]);
    });

    it('getCurrentLanguageInfo', () => {
        expect(getCurrentLanguageInfo(state).name).toBe('Français');
    });
});
