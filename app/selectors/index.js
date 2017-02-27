/* eslint no-undef:0 */
import { createSelector } from 'reselect';
import find from 'lodash/find';
import sortBy from 'lodash/sortBy';
import languages from '../i18n/languages.json';

// Utility functions
const sortByVotes = posts => sortBy(posts, p => -(p.likes.length - p.dislikes.length));
const sortByLastJoin = sessions => sortBy(sessions, s => -s.lastJoin);
const filterByType = type => posts => posts.filter(p => p.postType === type);
const findLanguageInfo = lang => find(languages, { value: lang });

// Simple Selectors
export const getPosts = state => state.posts;
export const getSessionId = state => state.session.id;
export const getSummaryMode = state => state.modes.summaryMode;
export const getCurrentUser = state => state.user.name;
export const getCurrentLanguage = state => state.user.lang;
export const getClients = state => state.session.clients;
export const getSessionName = state => state.session.name;
export const getSavedSessions = state => state.session.previousSessions;
export const getCurrentUrl = () => window.location.href;
export const isInviteDialogOpen = state => state.invite.inviteDialogOpen;
export const isDrawerOpen = state => state.modes.drawerOpen;

// Selector Factories
const getPostsOfType = type => createSelector(getPosts, filterByType(type));

// Combined Selectors
export const getNotWellPosts = getPostsOfType('notWell');
export const getWellPosts = getPostsOfType('well');
export const getIdeasPosts = getPostsOfType('ideas');
export const shouldDisplayDrawerButton = createSelector(
    [getCurrentUser, getSessionId], (user, sessionId) => !!user && !!sessionId);
export const getSortedNotWellPosts = createSelector(getNotWellPosts, sortByVotes);
export const getSortedWellPosts = createSelector(getWellPosts, sortByVotes);
export const getSortedIdeasPosts = createSelector(getIdeasPosts, sortByVotes);
export const getSavedSessionsByDate = createSelector(getSavedSessions, sortByLastJoin);
export const getCurrentLanguageInfo = createSelector(getCurrentLanguage, findLanguageInfo);
