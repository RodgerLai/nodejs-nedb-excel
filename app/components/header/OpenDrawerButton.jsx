/* eslint no-confusing-arrow:0 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import noop from 'lodash/noop';
import flow from 'lodash/flow';
import { IconButton } from 'react-toolbox/lib/button';
import translate from '../../i18n/Translate';
import { shouldDisplayDrawerButton } from '../../selectors';
import { openDrawer } from '../../state/modes';

const stateToProps = state => ({
    displayDrawerButton: shouldDisplayDrawerButton(state)
});

const actionsToProps = dispatch => ({
    onClick: () => dispatch(openDrawer())
});

const OpenDrawerButton = ({ displayDrawerButton, onClick }) => displayDrawerButton ? (
    <IconButton icon="menu" inverse onClick={ onClick } />
  ) : null;

OpenDrawerButton.propTypes = {
    displayDrawerButton: PropTypes.bool,
    onClick: PropTypes.func
};

OpenDrawerButton.defaultProps = {
    displayDrawerButton: false,
    onClick: noop
};

const decorators = flow([
    connect(stateToProps, actionsToProps),
    translate('Header')
]);

export default decorators(OpenDrawerButton);
