import React, { PropTypes, Component } from 'react';
import noop from 'lodash/noop';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
import Board from '../components/board/Board';
import { autoJoin } from '../state/session';

const actionsToProps = dispatch => ({
    autoJoin: sessionId => dispatch(autoJoin(sessionId))
});

class Main extends Component {

    componentDidMount() {
        this.props.autoJoin(this.props.params.sessionId);
    }

    render() {
        return (
            <Board />
        );
    }
}

Main.propTypes = {
    autoJoin: PropTypes.func,
    params: PropTypes.object
};

Main.defaultProps = {
    autoJoin: noop
};

const decorators = flow([
    connect(null, actionsToProps)
]);

export default decorators(Main);
