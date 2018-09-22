import { Component } from 'react';
import classnames from 'classnames';
import css from './InputNumber.less';
import Button from '../button/button';
import { ArrowDown, ArrowUp } from '../icons/export';
/* eslint-disable */
class InputNumber extends Component {
	static defaultProps = {
		value: 0,
		step: 0.6,
		max: 100,
		min: 0,
		disabled: false,
		precision: false
	}

	constructor(props) {
		super(props);
		const { max, min, step, precision, value } = Object.assign({}, this.defaultProps, props);
		this.state = {
			max: this.format(max, precision),
			min: this.format(min, precision),
			step: this.format(step, precision),
			value: this.format(value, precision)
		}
		let binds = ['increase', 'decrease', 'handleChange', 'setValue', 'plus', 'checkValue', 'test', 'handleBlur', 'handleEnterDown'];
		for (let i in binds) {
			this[binds[i]] = this[binds[i]].bind(this);
		}
	}

	format(props, precision) {
		return precision ? +props.toFixed(precision) : +props.toFixed(0);
	}

	componentDidMount() {
		this.setValue(this.props.value);
	}

	render() {
		const { disabled: inputDisable } = this.props;
		const { value, btnLeftDisable, btnRightDisable } = this.state;
		const { container, btn, btnLeft, inputContainer, input, btnRight, disable } = css;
		return (
			<div className={classnames(container, { [disable]: inputDisable })}>
				<Button onClick={this.decrease}
					className={classnames(btn, btnLeft)}
					icon={<ArrowDown width='100%' height='100%' />}
					type={btnLeftDisable || inputDisable ? 'disabled' : 'activate'}
					content=''
				/>
				<div className={inputContainer}>
					<input
						type="text"
						className={input}
						value={value}
						onChange={this.handleChange}
						key={"244"}
						disabled={inputDisable}
						onBlur={this.handleBlur}
						onKeyDown={this.handleEnterDown}
					/>
				</div>
				<Button
					onClick={this.increase}
					className={classnames(btn, btnRight)}
					icon={<ArrowUp width='100%' height='100%' />}
					type={btnRightDisable || inputDisable ? 'disabled' : 'activate'}
					content=''
				/>
			</div>
		);
	}

	increase() {
		this.plus();
	}

	decrease() {
		this.plus(-this.state.step);
	}

	plus(step = this.state.step) {
		if (this.props.disabled) {
			return;
		}
		this.setValue(preValue => +preValue + step);
	}

	handleChange(event) {
		const { value } = event.target;
		console.log(this.test(value));
		if (this.test(value)) {
			this.setValue(value);
		}
	}

	setValue(value = this.props.value) {
		this.setState(prev => {
			return this.checkValue(typeof value === typeof (() => { }) ? value(prev.value) : value);
		});
	}

	checkValue(value) {
		const { max, min, precision } = this.props;
		value = +value > max
			? max : +value < min
				? min : value;
		let btnState = this.checkButton(+value);

		if (precision) {
			value = typeof value === typeof 1
				? value.toFixed(precision) : value;
		}


		return {
			value,
			...btnState
		};
	}

	checkButton(value) {
		let btnLeftDisable = false;
		let btnRightDisable = false;
		const { max, min } = this.props;

		value >= max
			? btnRightDisable = true : value <= min
				? btnLeftDisable = true : 0;

		return {
			btnLeftDisable,
			btnRightDisable
		}
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