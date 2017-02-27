/* eslint react/no-string-refs:0 */
/* eslint jsx-a11y/no-static-element-interactions:0 */

import React, { PropTypes, Component } from 'react';
import noop from 'lodash/noop';
import FontIcon from 'react-toolbox/lib/font_icon';
import style from './EditableLabel.scss';
import icons from '../constants/icons';

export default class EditableLabel extends Component {
    constructor(props) {
        super(props);
        this.state = { editMode: false };
    }

    onKeyPress(e) {
        if (e.keyCode === 13) {
            this.setState({ editMode: false });
        }
    }

    renderReadOnlyMode() {
        const { value, placeholder } = this.props;

        return (
            <span className={style.view}>
                { value || placeholder }
            </span>
        );
    }

    renderViewMode() {
        const { value, placeholder, readOnly } = this.props;

        if (readOnly) {
            return this.renderReadOnlyMode();
        }

        return (
            <span
              className={style.view}
              onClick={() => this.setState({ editMode: true }, () => this.refs.input.focus())}
            >
                { value || placeholder }&nbsp;
                <FontIcon className={style.editIcon} value={icons.create} />
            </span>
        );
    }

    renderEditMode() {
        const { value, onChange } = this.props;
        return (
            <span className={style.edit}>
                <textarea
                  ref="input"
                  value={value}
                  onBlur={() => {
                      this.setState({ editMode: false });
                  }}
                  onKeyPress={e => this.onKeyPress(e.nativeEvent)}
                  onChange={v => {
                      onChange(v.target.value);
                  }}
                />
            </span>
        );
    }

    render() {
        return (
            <span className={style.editableLabel}>
                { this.state.editMode ? this.renderEditMode() : this.renderViewMode() }
            </span>
        );
    }
}

EditableLabel.propTypes = {
    value: PropTypes.string,
    readOnly: PropTypes.bool,
    placeholder: PropTypes.string,
    onChange: PropTypes.func
};

EditableLabel.defaultProps = {
    value: '',
    readOnly: false,
    placeholder: 'nothing',
    onChange: noop
};
