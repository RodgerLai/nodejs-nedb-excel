import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Drawer from 'react-toolbox/lib/drawer';
import Clients from './Clients';
import LanguagePicker from '../LanguagePicker';
import SummaryModeSwitch from './SummaryModeSwitch';
import LeaveButton from './LeaveButton';
import LogoutButton from '../LogoutButton';
import ForkMe from './ForkMe';
import { closeDrawer } from '../../state/modes';
import { isDrawerOpen } from '../../selectors';

const stateToProps = state => ({
    open: isDrawerOpen(state)
});

const actionsToProps = dispatch => ({
    onClose: () => dispatch(closeDrawer())
});

const NavDrawer = ({ open, onClose }) => (
    <Drawer active={open}
      type="right"
      onOverlayClick={onClose}
    >
        <div style={{ margin: '0 10px' }}>
            <LanguagePicker />
            <SummaryModeSwitch />
        </div>

        <Clients />
        <br />
        <br />
        <LeaveButton />
        <LogoutButton />
        <ForkMe />
    </Drawer>
);

NavDrawer.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func
};

export default connect(stateToProps, actionsToProps)(NavDrawer);
