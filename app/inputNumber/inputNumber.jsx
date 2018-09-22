import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import css from './InputNumber.less';
import Button from '../button/button';
import { ArrowDown, ArrowUp } from '../icons/export';

class InputNumber extends Component {
  static format(props, precision) {
    return precision ? +props.toFixed(precision) : +props.toFixed(0);
  }

  static defaultProps = {
    value: 0,
    step: 1,
    max: 10,
    min: 0,
    disabled: false,
    precision: false,
  }

  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    step: PropTypes.number,
    max: PropTypes.number,
    min: PropTypes.number,
    disabled: PropTypes.bool,
    precision: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  }

  constructor(props) {
    super(props);
    const {
      max, min, step, precision, value,
    } = Object.assign({}, this.defaultProps, props);
    this.state = {
      max: InputNumber.format(max, precision),
      min: InputNumber.format(min, precision),
      step: InputNumber.format(step, precision),
      value: InputNumber.format(value, precision),
    };
    const binds = ['increase', 'decrease', 'handleChange', 'setValue', 'plus', 'checkValue', 'test', 'handleBlur', 'handleEnterDown'];
    binds.forEach((item) => { this[item] = this[item].bind(this); });
  }

  componentDidMount() {
    this.setValue(this.props.value);
  }

  render() {
    const { disabled: inputDisable } = this.props;
    const { value, btnLeftDisable, btnRightDisable } = this.state;
    const {
      container, btn, btnLeft, inputContainer, input, btnRight, disable,
    } = css;
    return (
      <div className={classnames(container, { [disable]: inputDisable })}>
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


  handleChange(event) {
    const { value } = event.target;
    if (this.test(value)) {
      this.setValue(value);
    }
  }

  setValue(value = this.props.value) {
    this.setState(prev =>
      this.checkValue(typeof value === typeof (() => { })
        ? value(prev.value) : value));
  }

  plus(step = this.state.step) {
    if (this.props.disabled) {
      return;
    }
    this.setValue(preValue => +preValue + step);
  }

  increase() {
    this.plus();
  }

  decrease() {
    this.plus(-this.state.step);
  }

  checkValue(value) {
    const { precision } = this.props;
    const { max, min } = this.state;

    if (+value > max) {
      value = max;
    } else if (+value < min) {
      value = min;
    }
    const btnState = this.checkButton(+value);

    if (precision) {
      value = typeof value === typeof 1
        ? value.toFixed(precision) : value;
    }

    return {
      value,
      ...btnState,
    };
  }

  checkButton(value) {
    let btnLeftDisable = false;
    let btnRightDisable = false;
    const { max, min } = this.state;

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

  test(value) {
    if (this.props.precision) {
      return /(^-?\d+\.?\d*$)|(^[\s\S]{0}$)/g.exec(value);
    }
    return /^-?\d+$|^[\s\S]{0}$/g.exec(value);
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
