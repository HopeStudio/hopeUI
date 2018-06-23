import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import cssBtn from './btnTypes.less';
import uuid from '../tools/uuid';
import colorTrans from '../tools/colorTrans';

class Button extends React.Component {
  componentWillMount() {
    this.uuid = uuid(8);
  }

  componentDidMount() {
    this.setStyle();
  }

  componentDidUpdate() {
    this.setStyle();
  }

  setStyle() {
    const { customStyle } = this.props;
    colorTrans(customStyle, `.hope-button.${this.uuid}`);
  }

  render() {
    const {
      type,
      content,
      icon,
      className: propClassName,
      onClick,
    } = this.props;
    return (
      <div
        className={classnames('hope-button', propClassName, cssBtn[type], this.uuid)}
        role="button"
        tabIndex="0"
        onClick={onClick}
        onKeyDown={onClick}
      >
        <span>{content}</span>
        {icon}
      </div>
    );
  }
}

Button.propTypes = {
  // 按钮类型
  type: PropTypes.string,
  // 平常样式
  customStyle: PropTypes.object,
  // 按钮文本
  content: PropTypes.string.isRequired,
  // 按钮Icon
  icon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  // 点击事件
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'activate',
  customStyle: {},
  icon: '',
  onClick: () => null,
};

export default Button;
