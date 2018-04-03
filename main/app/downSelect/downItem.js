import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import $ from 'jQuery';

import colors from '../rules/colors.js';
import cssDownSelect from './downSelect.less';
import uuid from '../tools/uuid.js';
import colorTrans from '../tools/colorTrans.js';

class DownItem extends React.Component {
  state = {
    isSelect: false
  }
  getJurge() {
    const {objCall, name} = this.props;
    const selectObj = objCall();
    const jurge = typeof selectObj[name] !== 'undefined';
    return jurge;
  }
  setSelect() {
    const jurge = this.getJurge();
    if (jurge === this.state.isSelect) 
      return;
    this.setState({
      isSelect: !this.state.isSelect
    })
  }
  setStyle() {
    const {selectStyle, normalStyle} = this.props;
    const jurge = this.getJurge();
    if (jurge) {
      $(`#${this.normalID}`).remove();
      this.selectID = colorTrans(selectStyle, `.${this.uuid}.hope-downItem`)
    } else {
      $(`#${this.selectID}`).remove();
      this.normalID = colorTrans(normalStyle, `.${this.uuid}.hope-downItem`)
    }
  }
  componentWillMount() {
    const {uuid, itemEdit} = this.props;
    this.uuid = uuid;
    this.setSelect();
    this.setStyle();
    this.triggerOther = itemEdit(this);
  }
  componentDidUpdate() {
    this.setStyle();
  }
  clickHandle = e => {
    const {selectCall} = this.props;
    // 通知父组件更新状态
    selectCall(!this.state.isSelect, () => {
      // 更新状态
      this.setSelect();
      // 通知同级组件更新状态
      this.triggerOther(this.uuid)
    });
  }
  render() {
    const {className: propClassName, value} = this.props;
    return (
      <li
        className={classnames('hope-downItem', cssDownSelect.downItem, this.props.uuid)}
        onClick={this.clickHandle}>
        <span>{value}</span>
      </li>
    )
  }
}

DownItem.propTypes = {}

DownItem.defaultProps = {}

export default DownItem;