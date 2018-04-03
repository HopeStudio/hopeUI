import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import $ from 'jQuery';

import colors from '../rules/colors.js';
import cssText from './text.less';
import uuid from '../tools/uuid.js';
import colorTrans from '../tools/colorTrans.js';
import TextItem from '../text/textItem.js';

class Text extends React.Component {
  static Item = TextItem
  state = {
    isDown: false,
    value: ''
  }
  setDown = (bool = !this.state.isDown) => {
    this.setState({isDown: bool})
  }
  setValue = (value) => {
    this.setState({
      value
    }, () => this.input.value = value)
  }
  autoComplete(base, source) {
    const arr = source.filter(item => {
      return item.includes(base)
    });
    this.itemArr = arr.map(item => {
      const itemID = uuid(8);
      return (<Text.Item
        value={item}
        setValue={this.setValue}
        setDown={this.setDown}
        key={itemID}
        uuid={itemID}/>)
    })
    this.setDown(this.itemArr.length !== 0)
  }
  changeHandle = e => {
    const {autoComplete, autoData, onChange} = this.props;
    const base = e.target.value;
    if (base.length === 0) 
      return this.setDown(false);
    onChange(base);
    if (autoComplete) {
      new Promise((resolve, reject) => {
        // 如果是函数，则传递回调
        if (typeof autoData === 'function') {
          return autoData(resolve, reject)
        }
        // 如果是数组，直接作为数据源resolve
        if (autoData.length !== 0) {
          resolve(autoData)
        }
      }).then(source => {
        this.autoComplete(base, source)
      })
    }
  }
  setArea() {
    const {type, name} = this.props;
    switch (type) {
      case 'sizable':
        this.textArea = <textArea
          name={name}
          className={classnames(cssText.textInput)}
          onChange={this.changeHandle}
          ref={input => this.input = input}/>
        break;
      default:
        this.textArea = <input
          type={type}
          name={name}
          className={classnames(cssText.textInput)}
          onChange={this.changeHandle}
          ref={input => this.input = input}/>
        break;
    }
  }
  componentWillMount() {
    this.uuid = uuid(8)
    this.setArea();
  }
  render() {
    const {className: propClassName, title, width} = this.props;
    const textDown = this.state.isDown
      ? 'textDown'
      : 'textHide';
    return (
      <div
        className={classnames(propClassName, cssText.text, this.uuid)}
        style={{
        width: width
      }}>
        <span className={classnames(cssText.textTitle)}>{title}</span>
        <div className={classnames(cssText.textBox)}>
          <div className={classnames('hope-textArea', cssText.textArea)}>
            {this.textArea}
            <div className={classnames(cssText[textDown])}>
              <ul className={classnames(cssText.textList)}>
                {this.itemArr}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Text.propTypes = {
  // text的种类
  type: PropTypes.string,
  // 是否启用自动填充
  autoComplete: PropTypes.bool,
  // 自动填充数据
  autoData: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
  // 自动补全的样式
  autoStyle: PropTypes.object,
  // 标题
  title: PropTypes.string,
  // 输入框总宽度
  width: PropTypes.string
}

Text.defaultProps = {
  type: 'password',
  name: 'name',
  width: '250px',
  autoComplete: true,
  autoData: [
    '崔霄真帅', '崔霄是真的帅', '擎天柱天下无敌！'
  ],
  onChange: () => {}
}

export default Text;