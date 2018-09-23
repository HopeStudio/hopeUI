import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import css from './inputNumber.less';
import Button from '../button/button';
import { ArrowDown, ArrowUp } from '../icons/export';

class InputNumber extends Component {
  static format(props, precision) {
    return precision ? +props.toFixed(precision) : +props.toFixed(0);
  }

  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    step: PropTypes.number,
    max: PropTypes.number,
    min: PropTypes.number,
    disabled: PropTypes.bool,
    precision: PropTypes.number,
    className: PropTypes.string,
    keyControls: PropTypes.bool,
    controls: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    value: 0,
    step: 1,
    max: Infinity,
    min: -Infinity,
    disabled: false,
    precision: 0,
    className: '',
    keyControls: true,
    controls: true,
    onChange: () => { },
    onBlur: () => { },
    onFocus: () => { },
    onClick: () => { },
  }

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
      btnLeftDisable: false,
      btnRightDisable: false,
    };
    const binds = ['handleKeyDown', 'increase', 'decrease', 'handleChange', 'setValue', 'plus', 'checkValue', 'test', 'handleBlur', 'handleEnterDown'];
    binds.forEach((item) => { this[item] = this[item].bind(this); });
  }

  componentDidMount() {
    this.setValue(this.props.value);
  }

  render() {
    const {
      disabled: inputDisable, onClick, onFocus,
    } = this.props;
    const { value, btnLeftDisable, btnRightDisable } = this.state;
    const {
      container, btn, btnLeft, inputContainer, input, btnRight, disable, controls,
    } = css;
    return (
      <div
        className={classnames(this.props.className, container, { [disable]: inputDisable })}
      >
        
        <Button
          onClick={this.decrease}
          className={classnames(btn, btnLeft, { [controls]: this.props.controls })}
          icon={<ArrowDown width="100%" height="100%" />}
          type={btnLeftDisable || inputDisable ? 'disabled' : 'activate'}
          content=""
        />
        <Button
          onClick={this.increase}
          className={classnames(btn, btnRight, { [controls]: this.props.controls })}
          icon={<ArrowUp width="100%" height="100%" />}
          type={btnRightDisable || inputDisable ? 'disabled' : 'activate'}
          content=""
        />
         <div className={inputContainer}>
          <input
            type="text"
            className={input}
            value={value}
            onChange={this.handleChange}
            key="244"
            disabled={inputDisable}
            onBlur={this.handleBlur}
            onKeyDown={this.handleKeyDown}
            onFocus={onFocus}
            onClick={onClick}
          />
        </div>
      </div>
    );
  }

  checkValue(value) {
    const { precision, max, min } = this.props;
    if (Object.is(value, NaN)) {
      value = 0;
    }

    if (+value > max) {
      value = max;
    } else if (+value < min) {
      value = min;
    }
    const btnState = this.checkButton(+value);

    value = typeof value === typeof 1
      ? value.toFixed(precision) : value;
    return {
      value,
      ...btnState,
    };
  }

  checkButton(value) {
    let btnLeftDisable = false;
    let btnRightDisable = false;
    const { max, min } = this.props;

    if (value >= max) {
      btnRightDisable = true;
    } else if (value <= min) {
      btnLeftDisable = true;
    }

    return {
      btnLeftDisable,
      btnRightDisable,
    };
  }

  setValue(value = this.props.value) {
    const { onChange } = this.props;
    this.setState(prev =>
      this.checkValue(typeof value === typeof (() => { })
        ? value(prev.value) : value), () => {
      onChange(this.state.value);
    });
  }

  plus(step = this.props.step) {
    if (this.props.disabled) {
      return;
    }
    this.setValue(preValue => +preValue + step);
  }

  increase() {
    this.plus();
  }

  decrease() {
    this.plus(-this.props.step);
  }

  test(value) {
    if (this.props.precision) {
      return /(^-(?!\.)\d*\.?\d*$|^\d*\.?\d*$)|(^[\s\S]{0}$)/g.test(value);
    }
    return /^-?\d*$|^[\s\S]{0}$/g.test(value);
  }

  handleChange(event) {
    const { value } = event.target;
    if (this.test(value)) {
      this.setValue(value);
    }
  }

  handleBlur(event) {
    const { value } = event.target;
    const { onBlur } = this.props;
    this.setValue(+value);
    onBlur(event);
  }

  handleEnterDown(event) {
    if (event.keyCode === 13) {
      const { value } = event.target;
      this.setValue(+value);
    }
  }

  handleKeyDown(event) {
    this.handleEnterDown(event);
    if (this.props.keyControls) {
      switch (event.keyCode) {
        case 38:
          this.increase();
          break;
        case 40:
          this.decrease();
          break;
        default:
          break;
      }
    }
  }
}

export default InputNumber;
