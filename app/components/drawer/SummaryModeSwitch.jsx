import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import noop from 'lodash/noop';
import flow from 'lodash/flow';
import Switch from 'react-toolbox/lib/switch';
import translate from '../../i18n/Translate';
import { toggleSummaryMode } from '../../state/modes';
import { getSummaryMode } from '../../selectors';

const stateToProps = state => ({
    enabled: getSummaryMode(state)
});

const actionsToProps = dispatch => ({
    onChange: () => dispatch(toggleSummaryMode())
});

const SummaryModeSwitch = ({ enabled, onChange, strings }) => (
    <Switch checked={enabled}
      onChange={onChange}
      label={strings.summaryMode}
    />
);

SummaryModeSwitch.propTypes = {
    enabled: PropTypes.bool,
    onChange: PropTypes.func,
    strings: PropTypes.object
};

SummaryModeSwitch.defaultProps = {
    enabled: false,
    onChange: noop,
    strings: {
        summaryMode: 'Summary Mode'
    }
};

const decorators = flow([
    connect(stateToProps, actionsToProps),
    translate('Header')
]);

export default decorators(SummaryModeSwitch);
