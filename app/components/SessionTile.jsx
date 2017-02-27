import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import noop from 'lodash/noop';
import flow from 'lodash/flow';
import { ListItem } from 'react-toolbox/lib/list';
import moment from 'moment';
import md5 from 'md5';
import translate from '../i18n/Translate';
import icons from '../constants/icons';
import { getCurrentLanguageInfo } from '../selectors';

const stateToProps = state => ({
    languageInfo: getCurrentLanguageInfo(state)
});

const getGravatar = client => `https://www.gravatar.com/avatar/${md5(client)}?d=identicon`;

const SessionTile = ({ session, strings, languageInfo, onClick }) => {
    const lastJoined = moment(session.lastJoin)
        .locale(languageInfo ? languageInfo.iso : 'en')
        .fromNow();
    const name = session.name || strings.defaultSessionName;

    return (
        <ListItem
          avatar={getGravatar(name)}
          caption={ name }
          legend={ lastJoined }
          rightIcon={icons.open_in_new}
          onClick={onClick}
          selectable
        />
    );
};


SessionTile.propTypes = {
    session: PropTypes.object.isRequired,
    languageInfo: PropTypes.object,
    strings: PropTypes.object,
    onClick: PropTypes.func
};

SessionTile.defaultProps = {
    session: null,
    languageInfo: null,
    onClick: noop,
    strings: {
        defaultSessionName: 'My Retrospective'
    }
};

const decorators = flow([
    connect(stateToProps),
    translate('SessionName')
]);

export default decorators(SessionTile);
