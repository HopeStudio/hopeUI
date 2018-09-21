import { Component } from 'react';
import classnames from 'classnames';
import css from './InputNumber.less';
import Button from '../button/button';
import { ArrowDown, ArrowUp } from '../icons/export';
/* eslint-disable */
class InputNumber extends Component {
	static defaultProps = {
		value: 0,
		step: 0.5,
		max: 100,
		min: 0,
		disabled: false,
		precision: true
	}

	constructor(props) {
		super(props);

		this.state = {
			value: this.props.value,
			btnLeftDisable: false,
			btnRightDisable: false
		}

		let binds = ['increase', 'decrease', 'handleChange', 'setValue', 'plus','checkValue','test'];
		for (let i in binds) {
			this[binds[i]] = this[binds[i]].bind(this);
		}
	}

	componentDidMount() {
		this.setValue(this.props.value);
	}

	render() {
		const {disabled: inputDisable} = this.props;
		const { value, btnLeftDisable, btnRightDisable } = this.state;
		const {container, btn, btnLeft, inputContainer, input, btnRight, disable} = css;
		return (
			<div className={classnames(container,{[disable]: inputDisable})}>
			<Button onClick={this.decrease} 
			className={classnames(btn, btnLeft)} 
			icon={<ArrowDown width='100%' height='100%'/>}
			type={btnLeftDisable || inputDisable ? 'disabled': 'activate'}
			content=''/>
				<div className={inputContainer}>
					<input
						type="text"
						className={input}
						value={value}
						onChange={this.handleChange}
						key={"244"} 
						disabled={inputDisable}/>
				</div>
			<Button 
			onClick={this.increase} 
			className={classnames(btn, btnRight)}
			icon={<ArrowUp width='100%' height='100%'/>} 
			type={btnRightDisable || inputDisable ? 'disabled': 'activate'}
			content=''/>
			</div>
		);
	}

	increase() {
		this.plus();
	}

	decrease() {
		this.plus(-this.props.step);
	}

	plus(step = this.props.step) {
		if(this.props.disabled) {
			return;
		}
		this.setValue(preValue => preValue + step);
	}

	handleChange(event) {
		const { value } = event.target;
		if(this.test(value)) {
			this.setValue(+value);
		}
	}

	setValue(value = this.props.value) {
		this.setState(prev => {
			return this.checkValue(typeof value === typeof (()=>{}) ? value(prev.value) : value);
		});
	}

	checkValue(value) {
		const { max, min } = this.props;
		let btnLeftDisable = false;
		let btnRightDisable = false;
		if(value >= max) {
			btnRightDisable = true;
			value = max;
		} else if (value <= min) {
			btnLeftDisable = true;
			value = min;
		}

		return {
			value,
			btnRightDisable,
			btnLeftDisable
		};
	}

	test(value) {
		return /^-?\d+$/g.test(value);
	}

}

export default InputNumber;