import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import $ from 'jQuery';

import colors from '../rules/colors.js';
import cssTable from './table.less';
import uuid from '../tools/uuid.js';
import colorTrans from '../tools/colorTrans.js';

class Line extends React.Component {
  // 状态依赖于于父组件
  setStyle() {
    const {getLeft, getHeight} = this.props;
    $(this.DOM).css({
      height: getHeight() + 'px',
      left: getLeft() + '%'
    })
  }
  componentDidMount() {
    this.setStyle()
  }
  componentDidUpdate() {
    this.setStyle()
  }
  mouseDownHandle = e => {
    const {setDrag, index} = this.props;
    e.preventDefault();
    e.stopPropagation();
    setDrag(true, this.DOM, index)
  }
  render() {
    return (
      <div
        className={classnames('hope-tbLine', cssTable.line)}
        ref={DOM => this.DOM = DOM}
        onMouseDown={this.mouseDownHandle}></div>
    )
  }
}

Line.propTypes = {}

Line.defaultProps = {}

export default Line;