import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import $ from 'jquery';

import css from './colorPick.less';
import uuid from '../tools/uuid';

function toHue(hueColor) {
  const [r, g, b] = hueColor;
  const sixth = 1 / 6;
  if (g === 0) {
    if (r === 255) return (sixth * 0) + (b / 1530);
    return (sixth * 2) - (r / 1530);
  } else if (r === 0) {
    if (b === 255) return (sixth * 2) + (g / 1530);
    return (sixth * 4) - (b / 1530);
  }
  if (g === 255) return (sixth * 4) + (r / 1530);
  return (sixth * 6) - (g / 1530);
}

class HuePick extends React.Component {
  state = { hue: toHue(this.props.hueColor) }

  componentWillReceiveProps({ hueColor }) {
    const hue = toHue(hueColor);
    this.setState({ hue });
  }

  shouldComponentUpdate() {
    const { hueColor } = this.props;
    const hue = toHue(hueColor);
    if (this.state.hue - hue === 1) return false;
    return true;
  }

  uuid = uuid(8);
  selecting = false;

  selectHue(e) {
    const { offsetTop } = this.ele;
    const { clientY } = e;
    const { scrollY } = window;
    const { height, onChange } = this.props;
    const hue = ((clientY - offsetTop) + scrollY) / height;
    this.setState({ hue });
    onChange(hue);
  }

  handleMouseDown = this::(function handleMouseDown(e) {
    e.preventDefault();
    this.selecting = true;
    this.selectHue(e);
  })

  handleMouseMove = this::(function handleMouseMove(e) {
    e.preventDefault();
    if (!this.selecting) return;
    this.selectHue(e);
  })

  handleMouseLeave = this::(function handleMouseOut(e) {
    e.preventDefault();
    if (!this.selecting) return;
    $('body').one('mouseup', this.handleBodyMouseUp);
    $('body').on('mousemove', this.handleBodyMouseMove);
  })

  handleMouseUp = this::(function handleMouseUp(e) {
    e.preventDefault();
    this.selecting = false;
  })

  handleBodyMouseUp = this::(function handleBodyMouseUp(e) {
    e.preventDefault();
    this.selecting = false;
    $('body').off('mousemove', this.handleBodyMouseMove);
  })

  handleBodyMouseMove = this::(function handleBodyMouseMove(e) {
    e.preventDefault();
    const { offsetTop } = this.ele;
    const { clientY } = e;
    const { scrollY } = window;
    const { height, onChange } = this.props;
    let hue = ((clientY - offsetTop) + scrollY) / height;

    if (hue > 1) hue = 1;
    if (hue < 0) hue = 0;

    this.setState({ hue });
    return onChange(hue);
  })

  render() {
    const { height } = this.props;
    const { hue } = this.state;
    return (
      <div
        className={classnames(css.hue, 'hue')}
        style={{ height: `${height}px` }}
        ref={(ele) => { this.ele = ele; }}
        role="presentation"
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
        onMouseLeave={this.handleMouseLeave}
      >
        <div
          className={classnames(css.huePointer, 'huePointer')}
          style={{ top: `${hue * height}px` }}
        >
          <div className={classnames(css.arrowOut, 'arrow')} />
          <div className={classnames(css.arrow, 'arrow')} />
        </div>
      </div>
    );
  }
}

HuePick.propTypes = {
  onChange: PropTypes.func,
  height: PropTypes.number,
  hueColor: PropTypes.arrayOf(PropTypes.number),
};

HuePick.defaultProps = {
  onChange: () => {},
  height: 200,
  hueColor: [255, 0, 0],
};

export default HuePick;
