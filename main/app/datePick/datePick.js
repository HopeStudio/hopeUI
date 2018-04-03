import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import $ from 'jQuery';

import colors from '../rules/colors.js';
import cssDatePick from './datePick.less';
import uuid from '../tools/uuid.js';
import colorTrans from '../tools/colorTrans.js';

class DatePick extends React.Component {
  render() {
    
  }
}

DatePick.propTypes = {
  // 是否禁用
  disabled: PropTypes.bool,
  // 下拉框样式
  normalStyle: PropTypes.object,
  // 选中样式
  selectStyle: PropTypes.object,
  // 触发按钮Icon
  buttonIcon: PropTypes.object,
  // 是否多选
  isMultiple: PropTypes.bool,
  // 是否可填写
  isInput: PropTypes.bool,
  // 是否自动识别
  ableAutoComplete: PropTypes.bool,
  // 数据
  data: PropTypes.object.isRequired,
  // 默认选中的数据键组
  defaultKey: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
}

DatePick.defaultProps = {
  disabled: false,
  buttonIcon: <ArrowDropDown fillcolor='grey700'/>,
  onChange: (value) => {
    console.log(value)
  },
  defaultKey: '0',
  selectStyle: {
    background: 'blue400',
    color: 'grey50'
  },
  normalStyle: {
    background: 'transparent',
    color: 'grey900'
  }
}

export default DatePick;