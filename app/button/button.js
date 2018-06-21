import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import $ from 'jquery';

import colors from '../rules/colors.js';
import cssBtn from './btnTypes.less';
import uuid from '../tools/uuid.js';
import colorTrans from '../tools/colorTrans.js';

class Button extends React.Component {
  setStyle() {
    const { customStyle } = this.props;
    colorTrans(customStyle, `.hope-button.${this.uuid}`);
  }
  componentWillMount() {
    this.uuid = uuid(8);
  }
  componentDidMount() {
    this.setStyle();
  }
  componentDidUpdate() {
    this.setStyle();
  }
  render() {
    const { 
type, content, icon, className: propClassName 
} = this.props;
    const Icon = icon || '';
    return (
      <div
        className={classnames('hope-button', propClassName, cssBtn[type], this.uuid)}
      >
        <span>{content}</span>
        {Icon}
      </div>
    );
  }
}

Button.propTypes = {
  // 按钮类型
  type: PropTypes.string.isRequired,
  // 平常样式
  customStyle: PropTypes.object,
  // 按钮文本
  content: PropTypes.string.isRequired,
  // 按钮Icon
  icon: PropTypes.object,
};

Button.defaultProps = {
  type: 'activate',
  customStyle: {},
};

export default Button;
