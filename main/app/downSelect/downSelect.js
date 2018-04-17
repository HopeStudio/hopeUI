import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import $ from 'jQuery';

import colors from '../rules/colors.js';
import cssDownSelect from './downSelect.less';
import uuid from '../tools/uuid.js';
import colorTrans from '../tools/colorTrans.js';
import {ArrowDropDown} from '../icons/export.js';
import DownItem from './downItem.js';

class DownSelect extends React.Component {
  static Item = DownItem
  state = {
    isDown: false,
    selectObj: {}
  }
  selectCall = (name, value) => (bool, fn) => this.setSelect(name, value, bool, fn)
  objCall = () => this.state.selectObj
  itemEdit = (() => {
    let edit = [];
    return (item) => {
      edit.push(item);
      return (uuid) => {
        const except = edit.findIndex((item) => {
          return item.uuid === uuid;
        })
        edit.forEach((item, i) => {
          if (except === i) 
            return;
          item.setSelect();
        })
      }
    }
  })()
  getItems() {
    const {data, defaultKey, selectStyle} = this.props;
    let itemArr = [];
    for (let i in data) {
      itemArr.push(
        <DownSelect.Item
          selectCall={this.selectCall(i, data[i])}
          objCall={this.objCall}
          itemEdit={this.itemEdit}
          name={i}
          value={data[i]}
          selectStyle={selectStyle}
          uuid={this.itemID[itemArr.length]}
          key={this.itemID[itemArr.length]}>
          {data[i]}
        </DownSelect.Item>
      )
    }
    return itemArr;
  }
  componentWillMount() {
    const {isMultiple, defaultKey, data} = this.props;
    if (!isMultiple && defaultKey instanceof Array) {
      throw new Error('单选框只能指定一个字符串作为默认值')
    }
    if (isMultiple && defaultKey instanceof Array) {
      defaultKey.forEach((item) => this.state.selectObj[item] = data[item])
    } else {
      this.state.selectObj[defaultKey] = data[defaultKey]
    }
    this.uuid = uuid(8);
    this.itemID = [];
    for (let i in data) {
      this
        .itemID
        .push(uuid(8))
    }
    this.itemArr = this.getItems();
  }
  setSelect(name, value, bool, fn) {
    const {isMultiple} = this.props;
    if (!bool) {
      delete this.state.selectObj[name]
      this.setState({}, () => fn())
      return;
    }
    if (isMultiple) {
      this.setState({
        selectObj: Object.assign({}, this.state.selectObj, {[name]: value})
      }, () => fn())
    } else {
      this.setState({
        selectObj: {
          [name]: value
        }
      }, () => fn())
    }
  }
  getValue() {
    const {selectObj} = this.state;
    let value = Object
      .values(selectObj)
      .join(';')
    return value;
  }
  clickHandle = e => {
    this.setState({
      isDown: !this.state.isDown
    })
  }
  changeHandle = e => {
    const {onChange} = this.props;
    onChange(e.target.value);
  }
  componentDidMount() {
    const {areaStyle} = this.props;
    colorTrans(areaStyle, `.${this.uuid} .hope-selectArea`)
  }
  render() {
    const {buttonIcon, className: propClassName, isInput, children} = this.props;
    const downBox = this.state.isDown
      ? 'downBox'
      : 'hideBox';
    return (
      <div className={classnames(propClassName, cssDownSelect.downSelect, this.uuid)}>
        <div className={classnames(cssDownSelect.selectBox)}>
          <div className={classnames('hope-selectArea', cssDownSelect.selectArea)}>
            <input
              type="text"
              className={classnames(cssDownSelect.selectInput)}
              value={this.getValue()}
              onChange={this.changeHandle}/>
          </div>
          <div className={classnames(cssDownSelect.selectBtn)} onClick={this.clickHandle}>
            {buttonIcon}
          </div>
        </div>
        <div className={classnames(cssDownSelect[downBox])}>
          <ul className={classnames(cssDownSelect.downList)}>
            {this.itemArr}
          </ul>
        </div>
      </div>
    )
  }
}

DownSelect.propTypes = {
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
  // 数据
  data: PropTypes.object.isRequired,
  // 默认选中的数据键组
  defaultKey: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
}

DownSelect.defaultProps = {
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

export default DownSelect;