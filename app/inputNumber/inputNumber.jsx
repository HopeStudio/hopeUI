import {Component} from 'react';
import cssInputNumber from './InputNumber.less';
import classnames from 'classnames';

class InputNumber extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
           <div>
               <span className={classnames(cssInputNumber.btnLeft, cssInputNumber.btn)}></span>
               <span className={classnames(cssInputNumber.btnRight, cssInputNumber.btn)}></span>
               <input type="text" 
                className={classnames(cssInputNumber.input)}/>
           </div>
        );
    }
}

export default InputNumber;