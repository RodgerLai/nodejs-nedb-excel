import React, { PropTypes } from 'react';
import 'flag-icon-css/css/flag-icon.min.css';
import classNames from 'classnames';
import noop from 'lodash/noop';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
import Dropdown from 'react-toolbox/lib/dropdown';
import { changeLanguage } from '../state/user';
import languages from '../i18n/languages.json';
import translate from '../i18n/Translate';
import style from './LanguagePicker.scss';
import { getCurrentLanguage } from '../selectors';

const stateToProps = state => ({
    currentLanguage: getCurrentLanguage(state)
});

const actionsToProps = dispatch => ({
    onChangeLanguage: lang => dispatch(changeLanguage(lang))
});

const renderItem = item => (
    <div>
        <div className={ classNames(`flag-icon flag-icon-${item.iso}`, style.flag) }>
            <div className={style.overlay} />
        </div>
        <div>
            <strong>{item.name}</strong><br />
            <small>{item.englishName}</small>
        </div>
    </div>
);

const LanguagePicker = ({ strings, currentLanguage, onChangeLanguage }) => (
    <Dropdown
      auto
      source={languages}
      label={strings.header}
      template={renderItem}
      value={currentLanguage}
      onChange={onChangeLanguage}
    />
);

LanguagePicker.propTypes = {
    strings: PropTypes.object,
    currentLanguage: PropTypes.string,
    onChangeLanguage: PropTypes.func
};

LanguagePicker.defaultProps = {
    currentLanguage: 'en',
    onChangeLanguage: noop,
    strings: {
        header: 'Choose a language'
    }
};

const decorators = flow([
    connect(stateToProps, actionsToProps),
    translate('LanguagePicker')
]);

export default decorators(LanguagePicker);
