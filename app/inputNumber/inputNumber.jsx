import { Component } from 'react';
import cssInputNumber from './InputNumber.less';
import classnames from 'classnames';

class InputNumber extends Component {
    static defaultProps = {
        value: 0,
        step: 1,
        max: Infinity,
        min: -Infinity
    }

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value,
        }
    }

    render() {
        const { value } = this.state;
        return (
            <div className={classnames(cssInputNumber.container)}>
                <span
                    className={classnames(cssInputNumber.btnLeft, cssInputNumber.btn)}
                    onClick={this.decrease}></span>
                <div className={classnames(cssInputNumber.inputContainer)}>
                    <input type="text"
                        className={classnames(cssInputNumber.input)}
                        value={value}
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}
                        key={"244"} />
                </div>
                <span className={classnames(cssInputNumber.btnRight, cssInputNumber.btn)}
                    onClick={this.increase}></span>
            </div>
        );
    }

    increase = () => {
        this.setState((prev, props) => {
            const { value: prevValue } = prev;
            const { step, max } = props;

            let value = +prevValue + step;
            value = value > max ? max : value;
            return {
                value
            }
        });
    }

    decrease = () => {
        this.setState((prev, props) => {
            const { value: prevValue } = prev;
            const { step, min } = props;

            let value = +prevValue - step;
            value = value < min ? min : value;
            return {
                value
            }
        })
    }

    handleChange = (event) => {
        const { value } = event.target;
        const { min, max } = this.props;
        let newValue = '';
        if (value == '-' || value == '') {
            console.log(value);
            newValue = value;
            console.log(newValue)
        } else if (this.isEquation.test(value)) {
            newValue = value;
        } else {
            newValue = +value;
            newValue = newValue > max ? max : (newValue < min ? min : newValue);
            if (isNaN(value)) {
                return;
            }
        }
        this.setState({
            value: newValue
        });

    }

    handleKeyDown = (event) => {
        // key Enter
        if (event.keyCode === 13) {
            const { value } = this.state;
            // const res = value.match(this.isEquation);
            // const res = this.isEquation.exec(value);
            // console.log(res);
            // console.log(this.isEquation.$1)

            let operator = res[1] === '' ? '+' : '-';
            let result = res.slice(1);
            // console.log(result);

            const calculateValue = result.reduce((prev, cur) => {
                // console.log([prev,cur]);
                let { value, operator } = prev;
                if (cur === '-' || cur === '+') {
                    operator = cur;
                } else if(cur === undefined){
                    
                } else{
                    switch (operator) {
                        case '-':
                            value -= +cur;
                            break;
                        case '+':
                            value += +cur;
                            break;
                    }
                }
                return {
                    value,
                    operator
                }

            }, { value: 0, operator }).value;

            this.setState({
                value: calculateValue
            });
        }
    }

    isEquation = /^(-?)(?:(\d+)(\+|\-){1})*(\d+)?$/;
}

export default InputNumber;