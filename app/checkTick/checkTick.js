import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import $ from 'jquery';

import colors from '../rules/colors.js';
import cssCheckTick from './checkTick.less';
import { CirBlank, CirSelect } from '../icons/export.js';
import uuid from '../tools/uuid.js';

class CheckTick extends React.Component {
  state = {
    isChecked: this.props.isChecked,
  };
  componentWillMount() {
    this.type = this.props.isMultiple
      ? 'checkbox'
      : 'radio';
    this.uuid = uuid(5);
  }
  componentDidMount() {
    $(this.input).data('check', this.setChecked.bind(this));
    this.setChecked(this.props.isChecked);
  }
  setChecked(checked) {
    const { disabled } = this.props;
    if (disabled)
      {return;}
    let isChecked;
    if (typeof checked === 'boolean') {
      isChecked = checked;
    } else {
      isChecked = !this.state.isChecked;
    }
    this.setState({
      isChecked,
    }, () => this.changeCall());
    return isChecked;
  }
  changeHandle = (e) => {
    const { disabled } = this.props;
    if (disabled)
      {return;}
    const { name, value } = this.props;
    $(`input[name=${name}][type=${this.type}]`).each((i, item) => {
      const setChecked = $(item).data('check');
      if (e.target === item) {
        setChecked();
        return true;
      }
      if (this.type === 'radio') {
        setChecked(false);
      }
    });
  }
  changeCall() {
    const { onChange, value } = this.props;
    onChange(value, this.state.isChecked);
  }
  render() {
    const {
      normalIcon,
      checkedIcon,
      disabledIcon,
      children,
      className: propClassName,
      isMultiple,
      isChecked,
      disabled,
      value,
      name,
    } = this.props;
    const NormalIcon = normalIcon || '';
    const CheckedIcon = checkedIcon || '';
    const normalClass = this.state.isChecked
      ? 'normalIconOff'
      : 'normalIconOn';
    const checkedClass = this.state.isChecked
      ? 'checkedIconOn'
      : 'checkedIconOff';
    const disabledClass = disabled
      ? 'disabledIcon'
      : 'disabled';
    const disabledAnti = disabled
      ? 'disabled'
      : '';
    const disabledText = disabled
      ? 'text-disabled'
      : '';
    const disabledBox = disabled
      ? 'checkTick-disabled'
      : '';
    return (
      <div
        className={classnames(propClassName, cssCheckTick.checkTick, cssCheckTick[disabledBox])}
        key={this.uuid}
      >
        <label className={classnames(cssCheckTick.label)}>
          <input
            className={classnames(cssCheckTick.input)}
            ref={input => this.input = input}
            type={this.type}
            name={name}
            value={value}
            onChange={this.changeHandle} 
          />
          <div
            className={classnames(cssCheckTick[normalClass], cssCheckTick[disabledAnti])}
          >
            {NormalIcon}
          </div>
          <div
            className={classnames(cssCheckTick[checkedClass], cssCheckTick[disabledAnti])}
          >
            {CheckedIcon}
          </div>
          <div className={classnames(cssCheckTick[disabledClass])}>
            {disabledIcon}
          </div>
          <span className={classnames(cssCheckTick.text, cssCheckTick[disabledText])}>{children}</span>
        </label>
      </div>
    );
  }
}

CheckTick.propTypes = {
  // 未激活Icon
  normalIcon: PropTypes.object,
  // 激活Icon
  checkedIcon: PropTypes.object,
  // disabled态的Icon
  disabledIcon: PropTypes.object,
  // 是否初始选中
  isChecked: PropTypes.bool,
  // 是否多选
  isMultiple: PropTypes.bool,
  // input name属性
  name: PropTypes.string.isRequired,
  // input value属性
  value: PropTypes.string.isRequired,
  // 单个TICK变化后的回调
  onChange: PropTypes.func,
  // 是否禁用
  disabled: PropTypes.bool,
};

CheckTick.defaultProps = {
  normalIcon: <CirBlank />,
  checkedIcon: <CirSelect fillcolor="blue300" />,
  disabledIcon: <CirBlank fillcolor="grey500" />,
  isChecked: false,
  isMultiple: false,
  onChange: (value, checked) => {},
  disabled: false,
};

export default CheckTick;
