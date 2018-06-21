import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import $ from 'jQuery';

import colors from '../rules/colors.js';
import cssDatePick from './datePick.less';
import uuid from '../tools/uuid.js';
import colorTrans from '../tools/colorTrans.js';
import dateItem from './dateItem.js';

class DatePick extends React.Component {
  static Item = dateItem
  state = {
    year: '',
    month: '',
    day: '',
    dateObj: [],
    isDown: false
  }
  getValue() {
    const {dateObj} = this.state;
    let value = Object
      .values(dateObj)
      .join(';')
    return value;
  }
  clickHandle = e => {
    this.setState({
      isDown: !this.state.isDown
    })
  }
  changeHandle = e => {
    e.preventDefault();
    e.stopPropagation();
  }
  render() {
    const {buttonIcon, className: propClassName, children} = this.props;
    const dateDown = this.state.isDown
      ? 'dateDown'
      : 'dateHide';
    return (
      <div className={classnames(propClassName, cssDatePick.datePick, this.uuid)}>
        <div className={classnames(cssDatePick.dateBox)}>
          <div className={classnames('hope-dateArea', cssDatePick.dateArea)}>
            <input
              type="text"
              className={classnames(cssDatePick.dateInput)}
              value={this.getValue()}
              onChange={this.changeHandle}/>
          </div>
          <div className={classnames(cssDatePick.dateBtn)} onClick={this.clickHandle}>
            {buttonIcon}
          </div>
        </div>
        <div className={classnames(cssDatePick[dateDown])}>
          <ul className={classnames(cssDatePick.dateList)}>
            {this.itemArr}
          </ul>
        </div>
      </div>
    )
  }
}

DatePick.propTypes = {
  // 单日、多日或日期范围
  type: PropTypes.oneOf(['simple', 'scale', 'multiple'])
}

DatePick.defaultProps = {
  type: 'simple'
}

export default DatePick;