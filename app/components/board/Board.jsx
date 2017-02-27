import React, { PropTypes } from 'react';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
import PostBoard from './PostBoard';
import SummaryBoard from './SummaryBoard';
import SessionName from './SessionName';
import { getSummaryMode } from '../../selectors';

const stateToProps = state => ({
    summaryMode: getSummaryMode(state)
});

const Board = ({ summaryMode }) => (
    <div>
        <div style={ { width: '100%', textAlign: 'center' } }>
            <SessionName />
        </div>
        { summaryMode ? <SummaryBoard /> : <PostBoard /> }
    </div>
);

Board.propTypes = {
    summaryMode: PropTypes.bool
};

Board.defaultProps = {
    summaryMode: false
};

const decorators = flow([
    connect(stateToProps)
]);

export default decorators(Board);
