/* eslint jsx-a11y/no-static-element-interactions:0 */

import React, { PropTypes } from 'react';
import noop from 'lodash/noop';
import flow from 'lodash/flow';
import AppBar from 'react-toolbox/lib/app_bar';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import style from './Header.scss';
import Invite from './Invite';
import translate from '../../i18n/Translate';
import { getCurrentUser } from '../../selectors';
import OpenDrawerButton from './OpenDrawerButton';

const stateToProps = state => ({
    user: getCurrentUser(state)
});

const actionsToProps = dispatch => ({
    goToHomepage: () => dispatch(push('/'))
});

const Header = ({ strings, goToHomepage, user }) => (
    <div>
        <AppBar fixed className={style.header}>
            <div className={style.titles}>
                <a onClick={goToHomepage}>首页 <br />
                    <span className={style.subtitle}>{ strings.subtitle }</span>
                </a>
            </div>
            <div className={ style.navigation }>
                <span className={style.user}>{ user }</span>
                <Invite />
                <OpenDrawerButton />
            </div>
        </AppBar>
    </div>
);

Header.propTypes = {
    user: PropTypes.string,
    goToHomepage: PropTypes.func,
    strings: PropTypes.object
};

Header.defaultTypes = {
    user: null,
    goToHomepage: noop,
    strings: {
        subtitle: '媒体资源信息化'
    }
};

const decorators = flow([
    connect(stateToProps, actionsToProps),
    translate('Header')
]);

export default decorators(Header);
