import React, { PropTypes, Component } from 'react';
import noop from 'lodash/noop';
import flow from 'lodash/flow';
import Button from 'react-toolbox/lib/button';
import { Card, CardMedia, CardText } from 'react-toolbox/lib/card';
import { List } from 'react-toolbox/lib/list';
import { Tab, Tabs } from 'react-toolbox';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createSession } from '../state/session';
import translate from '../i18n/Translate';
import backgroundImage from '../components/images/logo.png';
import LanguagePicker from '../components/LanguagePicker';
import LogoutButton from '../components/LogoutButton';
import { getSavedSessionsByDate } from '../selectors';
import SessionTile from '../components/SessionTile';
import style from './Join.scss';


const stateToProps = state => ({
    previousSessions: getSavedSessionsByDate(state)
});

const actionsToProps = dispatch => ({
    createSession: () => dispatch(createSession()),
    goToSession: session => dispatch(push(`/session/${session.id}`))
});

class Join extends Component {
    constructor(props) {
        super(props);
        this.state = { tabIndex: 0, customSessionName: '' };
    }

    renderTabs() {
        const { previousSessions } = this.props;
        if (previousSessions.length) {
            return [
                this.renderStandardTab(),
                this.renderPreviousSessionsTab(),
                this.renderAdvancedTab()
            ];
        }
        return [this.renderStandardTab(), this.renderAdvancedTab()];
    }

    renderStandardTab() {
        const { strings } = this.props;
        return (
            <Tab label={ strings.standardTab.header } key="standard">
                <h5>{ strings.welcome }</h5><br />
                { strings.standardTab.text }<br /><br />
                <Button
                  label={ strings.standardTab.button }
                  accent
                  raised
                  onClick={ this.props.createSession }
                />
            </Tab>
        );
    }

    renderPreviousSessionsTab() {
        const { strings, previousSessions, goToSession } = this.props;
        return (
            <Tab label={ strings.previousTab.header } key="previous">
                <List selectable ripple>
                    { previousSessions.map(session =>
                        <SessionTile
                          key={session.id}
                          session={session}
                          onClick={() => goToSession(session)}
                        />
                    )}
                </List>
            </Tab>
        );
    }

    renderAdvancedTab() {
        const { strings } = this.props;
        return (
            <Tab label={ strings.advancedTab.header } key="advanced">
                <div style={{ maxWidth: 200 }}>
                    <LanguagePicker />
                    <LogoutButton />
                </div>
            </Tab>
        );
    }

    render() {
        return (
            <div style={{ padding: 20 }}>
                <Card raised className={style.join}>
                    <CardMedia style={{ backgroundColor: '#EEE' }}>
                        <img
                          src={ backgroundImage }
                          style={{ objectFit: 'contain', width: '100%', backgroundSize: 'contain', maxHeight: 150 }}
                          role="presentation"
                        />
                    </CardMedia>
                    <CardText>
                        <Tabs
                          index={this.state.tabIndex}
                          onChange={tabIndex => this.setState({ tabIndex })}
                        >
                            { this.renderTabs() }
                        </Tabs>
                    </CardText>
                </Card>
            </div>
        );
    }
}

Join.propTypes = {
    previousSessions: PropTypes.array,
    createSession: PropTypes.func,
    goToSession: PropTypes.func,
    strings: PropTypes.object
};

Join.defaultProps = {
    previousSessions: [],
    createSession: noop,
    goToSession: noop,
    strings: {
        welcome: 'Welcome to Retrospected',
        standardTab: {
            header: 'Create a Session',
            text: 'Click below and start retrospecting:',
            button: 'Create a new session'
        },
        advancedTab: {
            header: 'Advanced'
        },
        previousTab: {
            header: 'Previous sessions',
            rejoinButton: 'Rejoin'
        }
    }
};

const decorators = flow([
    connect(stateToProps, actionsToProps),
    translate('Join')
]);

export default decorators(Join);
