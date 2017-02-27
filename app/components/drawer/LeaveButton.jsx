import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import noop from 'lodash/noop';
import flow from 'lodash/flow';
import Button from 'react-toolbox/lib/button';
import translate from '../../i18n/Translate';
import { leave } from '../../state/session';
import icons from '../../constants/icons';

const actionsToProps = dispatch => ({
    onClick: () => dispatch(leave())
});

const LeaveButton = ({ onClick, strings }) => (
    <Button
      label={strings.leave}
      icon={icons.exit_to_app}
      onClick={onClick}
      accent
    />
);

LeaveButton.propTypes = {
    onClick: PropTypes.func,
    strings: PropTypes.object
};

LeaveButton.defaultProps = {
    onClick: noop,
    strings: {
        leave: 'Leave'
    }
};

const decorators = flow([
    connect(null, actionsToProps),
    translate('Header')
]);

export default decorators(LeaveButton);
