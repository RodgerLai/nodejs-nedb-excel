/* eslint react/no-string-refs:0 */

import Input from 'react-toolbox/lib/input';
import React, { PropTypes, Component } from 'react';
import noop from 'lodash/noop';

class EnterInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    onKeyPress(e) {
        if (e.keyCode === 13) {
            this.props.onEnter(this.state.value);
            this.setState({ value: '' });
        }
    }

    render() {
        return (
            <Input
              type="input"
              label={this.props.placeholder}
              icon={this.props.icon}
              value={this.state.value}
              maxLength={this.props.maxLength}
              onChange={value => this.setState({ value })}
              onKeyPress={e => this.onKeyPress(e.nativeEvent)}
              ref="input"
            />
        );
    }
}

EnterInput.propTypes = {
    onEnter: PropTypes.func,
    icon: PropTypes.string,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number
};

EnterInput.defaultProps = {
    onEnter: noop,
    icon: 'add',
    placeholder: 'Type something',
    maxLength: null
};

export default EnterInput;
