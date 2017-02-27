import { connect } from 'react-redux';
import flow from 'lodash/flow';
import React, { PropTypes } from 'react';
import { List, ListItem, ListSubHeader } from 'react-toolbox/lib/list';
import md5 from 'md5';
import icons from '../../constants/icons';
import translate from '../../i18n/Translate';
import { getClients } from '../../selectors';

const stateToProps = state => ({
    clients: getClients(state)
});

const getGravatar = client => `https://www.gravatar.com/avatar/${md5(client)}?d=retro`;

const renderClient = client => (
    <ListItem
      key={client}
      avatar={getGravatar(client)}
      caption={client}
      rightIcon={icons.person}
    />
);

const Clients = ({ strings, clients }) => (
    <List selectable ripple>
        <ListSubHeader caption={strings.header} />
        { clients.map(renderClient) }
    </List>
);

Clients.propTypes = {
    clients: PropTypes.array,
    strings: PropTypes.object
};

Clients.defaultProps = {
    clients: [],
    strings: {
        header: 'sb joining us right now:'
    }
};

const decorators = flow([
    connect(stateToProps),
    translate('Clients')
]);

export default decorators(Clients);
