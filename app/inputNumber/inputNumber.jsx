import { Component } from 'react';
import classnames from 'classnames';
import css from './InputNumber.less';
import utils from './utils';
/* eslint-disable */
class InputNumber extends Component {
	static defaultProps = {
		value: 0,
		step: 1,
		max: 10,
		min: -10,
	}

	constructor(props) {
		super(props);

		this.state = {
			value: this.props.value,
		}

		let binds = ['increase', 'decrease', 'handleChange', 'setValue', 'plus'];
		for (let i in binds) {
			this[binds[i]] = this[binds[i]].bind(this);
		}
	}

	render() {
		const { value } = this.state;
		const {container, btn, btnLeft, inputContainer, input, btnRight} = css;
		return (
			<div className={container}>
				<span
					className={classnames(btn, btnLeft)}
					onClick={this.decrease}>
				</span>
				<div className={inputContainer}>
					<input
						type="text"
						className={input}
						value={value}
						onChange={this.handleChange}
						onKeyDown={this.handleKeyDown}
						key={"244"} />
				</div>
				<span
					className={classnames(btn, btnRight)}
					onClick={this.increase}>
				</span>
			</div>
		);
	}

	increase() {
		this.plus();
	}

	decrease() {
		this.plus(-this.props.step);
	}

	plus(step = this.props.step, reverse = false) {
		this.setState((prev, props) => {
			const { value: prevVal } = prev;
			const { min, max } = props;
			const curVal = prevVal + (reverse ? -step : step);
			const value = utils.range(curVal, min, max);

			return {
				value
			}
		})
	}

	handleChange(event) {
		const { value: prevVal } = event.target;
		let value = '';

		if (utils.isEquation(prevVal)) {
			value = prevVal;
			this.setValue(value);
		}
	}


	setValue(value, range = false) {
		if (range) {
			const { max, min } = this.props;
			value = utils.range(value, min, max);
		}
		this.setState({
			value
		});
	}
}

export default InputNumber;