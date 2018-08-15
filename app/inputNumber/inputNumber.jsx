import { Component } from 'react';
import cssInputNumber from './InputNumber.less';
import classnames from 'classnames';
import utils from './utils';

class InputNumber extends Component {
    static defaultProps = {
        value: 0,
        step: 1,
        max: 100,
        min: -100,
        calculable: false
    }

    constructor(props) {
        super(props);
        // initial state
        this.state = {
            value: this.props.value,
        }

        // bind methods
        let binds = ['increase', 'decrease', 'handleChange', 'handleKeyDown', 'setValue', 'plus'];
        for (let i in binds) {
            this[binds[i]] = this[binds[i]].bind(this);
        }
    }

    render() {
        const { value } = this.state;
        return (
            <div className={classnames(cssInputNumber.container)}>
                <span
                    className={classnames(cssInputNumber.btnLeft, cssInputNumber.btn)}
                    onClick={this.decrease}>
                </span>
                <div className={classnames(cssInputNumber.inputContainer)}>
                    <input
                        type="text"
                        className={classnames(cssInputNumber.input)}
                        value={value}
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}
                        key={"244"} />
                </div>
                <span
                    className={classnames(cssInputNumber.btnRight, cssInputNumber.btn)}
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
            const curVal = utils.calculateFromString(prevVal) + (reverse ? -step : step);
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


    handleKeyDown(event) {
        // key Enter
        if (event.keyCode === 13) {
            const { value } = this.state;
            let newValue = utils.calculateFromString(value);
            this.setValue(newValue, true);
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