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

  static defaultProps = {
    value: 0,
    step: 0.7,
    max: 10,
    min: -10,
    disabled: false,
    precision: 0,
    className: '',
    onChange: () => { },
    onBlur: () => { },
    onFocus: () => { },
    onClick: () => { },
  }

  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    step: PropTypes.number,
    max: PropTypes.number,
    min: PropTypes.number,
    disabled: PropTypes.bool,
    precision: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    className: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onClick: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
			value: this.props.value,
			btnLeftDisable: false,
			btnRightDisable: false,
    };
    const binds = ['increase', 'decrease', 'handleChange', 'setValue', 'plus', 'checkValue', 'test', 'handleBlur', 'handleEnterDown'];
    binds.forEach((item) => { this[item] = this[item].bind(this); });
  }

  componentDidMount() {
    this.setValue(this.props.value);
	}
	
  render() {
    const {
      disabled: inputDisable, onClick, onBlur, onFocus,
    } = this.props;
    const { value, btnLeftDisable, btnRightDisable } = this.state;
    const {
      container, btn, btnLeft, inputContainer, input, btnRight, disable,
    } = css;
    return (
      <div
        className={classnames(this.props.className, container, { [disable]: inputDisable })}
        onClick={onClick}
        onBlur={onBlur}
        onFocus={onFocus}
      >
        <Button
          onClick={this.decrease}
          className={classnames(btn, btnLeft)}
          icon={<ArrowDown width="100%" height="100%" />}
          type={btnLeftDisable || inputDisable ? 'disabled' : 'activate'}
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
            onKeyDown={this.handleEnterDown}
          />
        </div>
        <Button
          onClick={this.increase}
          className={classnames(btn, btnRight)}
          icon={<ArrowUp width="100%" height="100%" />}
          type={btnRightDisable || inputDisable ? 'disabled' : 'activate'}
          content=""
        />
      </div>
    );
  }

  checkValue(value) {
    const { precision, max, min } = this.props;
		if(Object.is(value, NaN)) {
			value = 0;
		}

    if (+value > max) {
      value = max;
    } else if (+value < min) {
      value = min;
    }
    const btnState = this.checkButton(+value);

  	value = typeof value === typeof 1
      ? +value.toFixed(precision) : value;
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
    this.setValue(+value);
  }

  handleEnterDown(event) {
    if (event.keyCode === 13) {
      const { value } = event.target;
      this.setValue(+value);
    }
  }
}

export default InputNumber;
