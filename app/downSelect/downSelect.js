/** TODO: 手动填写、自动识别 */
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import cssDownSelect from './downSelect.less';
import uuid from '../tools/uuid';
import colorTrans from '../tools/colorTrans';
import { ArrowDropDown } from '../icons/export';
import DownItem from './downItem';

class DownSelect extends React.Component {
  static Item = DownItem
  state = {
    isDown: false,
    selectObj: {},
  }

  componentWillMount() {
    const { isMultiple, defaultKey, data } = this.props;
    if (!isMultiple && defaultKey instanceof Array) {
      throw new Error('单选框只能指定一个字符串作为默认值');
    }
    if (isMultiple && defaultKey instanceof Array) {
      defaultKey.forEach((item) => { this.state.selectObj[item] = data[item]; });
    } else {
      this.state.selectObj[defaultKey] = data[defaultKey];
    }
    this.uuid = uuid(8);
    this.itemID = [];
    Object.keys(data).forEach(() => {
      this
        .itemID
        .push(uuid(8));
    });
    this.itemArr = this.getItems();
  }

  componentDidMount() {
    const { areaStyle } = this.props;
    colorTrans(areaStyle, `.${this.uuid} .hope-selectArea`);
  }

  setSelect(name, value, bool, fn) {
    const { isMultiple } = this.props;
    if (!bool) {
      delete this.state.selectObj[name];
      this.setState({}, () => fn());
      return;
    }
    if (isMultiple) {
      this.setState({
        selectObj: Object.assign({}, this.state.selectObj, { [name]: value }),
      }, () => fn());
    } else {
      this.setState({
        selectObj: {
          [name]: value,
        },
      }, () => fn());
    }
  }

  getItems() {
    const {
      data,
      selectStyle,
      normalStyle,
    } = this.props;
    const itemArr = [];
    Object.keys(data).forEach((i) => {
      itemArr.push((
        <DownSelect.Item
          selectCall={this.selectCall(i, data[i])}
          objCall={this.objCall}
          itemEdit={this.itemEdit}
          name={i}
          value={data[i]}
          selectStyle={selectStyle}
          normalStyle={normalStyle}
          uuid={this.itemID[itemArr.length]}
          key={this.itemID[itemArr.length]}
        >
          {data[i]}
        </DownSelect.Item>
      ));
    });
    return itemArr;
  }

  getValue() {
    const { selectObj } = this.state;
    const value = Object
      .values(selectObj)
      .join(';');
    return value;
  }

  itemEdit = (() => {
    const edit = [];
    return (_item) => {
      edit.push(_item);
      return (selfUuid) => {
        const except = edit.findIndex(item => item.uuid === selfUuid);
        edit.forEach((item, i) => {
          if (except === i) { return; }
          item.setSelect();
        });
      };
    };
  })()

  objCall = () => this.state.selectObj

  selectCall = (name, value) => (bool, fn) => {
    const { onChange } = this.props;
    this.setSelect(name, value, bool, () => {
      fn();
      onChange(this.state.selectObj);
    });
  }

  clickHandle = () => {
    this.setState({
      isDown: !this.state.isDown,
    });
  }

  keyDownHandle = ({ keyCode }) => {
    if (keyCode === 13) this.clickHandle();
  }

  render() {
    const {
      buttonIcon,
      className: propClassName,
      disabled,
    } = this.props;
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
              readOnly
            />
          </div>
          <div
            className={classnames(cssDownSelect.selectBtn)}
            onClick={disabled ? null : this.clickHandle}
            onKeyDown={disabled ? null : this.keyDownHandle}
            tabIndex="0"
            role="button"
          >
            {buttonIcon}
          </div>
        </div>
        <div className={classnames(cssDownSelect[downBox])}>
          <ul className={classnames(cssDownSelect.downList)} role="listbox">
            {this.itemArr}
          </ul>
        </div>
      </div>
    );
  }
}

DownSelect.propTypes = {
  // 是否禁用
  disabled: PropTypes.bool,
  areaStyle: PropTypes.object,
  // 下拉框样式
  normalStyle: PropTypes.object,
  // 选中样式
  selectStyle: PropTypes.object,
  // 触发按钮Icon
  buttonIcon: PropTypes.object,
  // 是否多选
  isMultiple: PropTypes.bool,
  // 数据
  data: PropTypes.object.isRequired,
  // 默认选中的数据键组
  defaultKey: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  // change 时间处理程序
  onChange: PropTypes.func,
};

DownSelect.defaultProps = {
  disabled: false,
  buttonIcon: <ArrowDropDown fillcolor="grey700" />,
  onChange: () => {},
  defaultKey: '0',
  isMultiple: false,
  areaStyle: {},
  selectStyle: {
    background: 'blue400',
    color: 'grey50',
  },
  normalStyle: {
    background: 'transparent',
    color: 'grey900',
  },
};

export default DownSelect;
