import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import $ from 'jQuery';

import colors from '../rules/colors.js';
import cssText from './text.less';
import uuid from '../tools/uuid.js';
import colorTrans from '../tools/colorTrans.js';

class TextItem extends React.Component {
  setStyle() {
    const {itemStyle} = this.props;
    if (itemStyle) {
      $(`#${this.normalID}`).remove();
      this.selectID = colorTrans(selectStyle, `.${this.uuid}.hope-textItem`)
    }
  }
  componentWillMount() {
    const {itemEdit, uuid} = this.props;
    this.uuid = uuid;
  }
  componentDidMount(){
    this.setStyle();
  }
  componentDidUpdate() {
    this.setStyle();
  }
  clickHandle = e => {
    const {setValue, setDown, value} = this.props;
    // 通知父组件更新状态
    setValue(value);
    setDown(false);
  }
  render() {
    const {className: propClassName, value} = this.props;
    return (
      <li
        className={classnames('hope-textItem', cssText.textItem, this.props.uuid)}
        onClick={this.clickHandle}>
        <span>{value}</span>
      </li>
    )
  }
}

TextItem.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
  setDown: PropTypes.func
}

TextItem.defaultProps = {
  value: 'nothing',
}

export default TextItem;