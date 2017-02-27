import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Panel } from 'react-toolbox/lib/layout';
import noop from 'lodash/noop';
import flow from 'lodash/flow';
import Login from '../components/Login';
import { login, autoLogin } from '../state/user';
import Header from '../components/header/Header';
import Drawer from '../components/drawer/Drawer';
import { getCurrentUser, getCurrentLanguage } from '../selectors';
import style from './App.scss';

const stateToProps = state => ({
    user: getCurrentUser(state),
    currentLanguage: getCurrentLanguage(state)
});

const actionsToProps = dispatch => ({
    onLogin: user => dispatch(login(user)),
    autoLogin: () => dispatch(autoLogin())
});

class App extends Component {
    componentDidMount() {
        this.props.autoLogin();
    }

    renderLogin() {
        if (this.props.user) {
            return this.props.children;
        }
        return (
            <Login onLogin={this.props.onLogin} />
        );
    }

    render() {
        return (
            <Layout className={style.layout}>
                <Panel className={style.panel}>
                    <Header />
                    <Drawer />
                    <div className={style.content}>
                        { this.renderLogin() }
                    </div>
                </Panel>
            </Layout>
        );
    }
}

App.propTypes = {
    children: PropTypes.object,
    user: PropTypes.string,
    onLogin: PropTypes.func,
    autoLogin: PropTypes.func
};

App.defaultTypes = {
    children: null,
    user: null,
    onLogin: noop
};

const decorators = flow([
    connect(stateToProps, actionsToProps)
]);

export default decorators(App);
