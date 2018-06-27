import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import $ from 'jquery';

import cssDownSelect from './downSelect.less';
import colorTrans from '../tools/colorTrans';

class DownItem extends React.Component {
  state = {
    isSelect: false,
  }

  componentWillMount() {
    const { uuid, itemEdit } = this.props;
    this.uuid = uuid;
    this.setSelect();
    this.setStyle();
    this.triggerOther = itemEdit(this);
  }

  componentDidUpdate() {
    this.setStyle();
  }

  getJurge() {
    const { objCall, name } = this.props;
    const selectObj = objCall();
    const jurge = typeof selectObj[name] !== 'undefined';
    return jurge;
  }

  setSelect() {
    const jurge = this.getJurge();
    if (jurge === this.state.isSelect) { return; }
    this.setState({
      isSelect: !this.state.isSelect,
    });
  }

  setStyle() {
    const {
      selectStyle,
      normalStyle,
    } = this.props;
    const jurge = this.getJurge();
    if (jurge) {
      $(`#${this.normalID}`).remove();
      this.selectID = colorTrans(selectStyle, `.${this.uuid}.hope-downItem`);
    } else {
      $(`#${this.selectID}`).remove();
      this.normalID = colorTrans(normalStyle, `.${this.uuid}.hope-downItem`);
    }
  }

  clickHandle = () => {
    const { selectCall } = this.props;
    // 通知父组件更新状态
    selectCall(!this.state.isSelect, () => {
      // 更新状态
      this.setSelect();
      // 通知同级组件更新状态
      this.triggerOther(this.uuid);
    });
  }

  keyDownHandle = ({ keyCode }) => {
    if (keyCode === 13) this.clickHandle();
  }

  render() {
    const { value } = this.props;
    const { isSelect } = this.state;
    return (
      <li
        className={classnames('hope-downItem', cssDownSelect.downItem, this.props.uuid)}
        role="option"
        aria-selected={isSelect}
        onClick={this.clickHandle}
        onKeyDown={this.keyDownHandle}
      >
        <span>{value}</span>
      </li>
    );
  }
}

DownItem.propTypes = {
  uuid: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.string,
  objCall: PropTypes.func,
  itemEdit: PropTypes.func,
  selectCall: PropTypes.func,
  normalStyle: PropTypes.object,
  selectStyle: PropTypes.object,
};

DownItem.defaultProps = {
  name: '',
  value: '',
  selectCall: () => {},
  objCall: () => {},
  itemEdit: () => {},
  normalStyle: {},
  selectStyle: {},
};

export default DownItem;
