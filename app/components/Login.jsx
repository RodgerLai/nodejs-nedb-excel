/* eslint react/no-string-refs:0 */

import React, { PropTypes, Component } from 'react';
import noop from 'lodash/noop';
import flow from 'lodash/flow';
import Button from 'react-toolbox/lib/button';
import EnterInput from './EnterInput';
import translate from '../i18n/Translate';
import LanguagePicker from './LanguagePicker';
import icons from '../constants/icons';
import style from './Login.scss';

class Login extends Component {
    render() {
        return (
            <div className={style.login}>
                <LanguagePicker />
                <EnterInput
                  placeholder={this.props.strings.namePlaceholder}
                  icon={icons.people}
                  onEnter={this.props.onLogin} ref="input"
                  maxLength={12}
                />
                <Button label={this.props.strings.buttonLabel}
                  accent
                  raised
                  onClick={() => {
                      const text = this.refs.input.state.value;
                      if (text) {
                          this.props.onLogin(text);
                      }
                  }}
                />
            </div>
        );
    }
}

Login.propTypes = {
    onLogin: PropTypes.func,
    strings: PropTypes.object
};

Login.defaultProps = {
    onLogin: noop,
    strings: {
        namePlaceholder: 'Who are you exactly? Enter your name here',
        buttonLabel: 'Let\'s start'
    }
};

const decorators = flow([
    translate('Login')
]);

export default decorators(Login);
