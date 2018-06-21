import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import $ from 'jquery';

import css from './colorPick.less';
import uuid from '../tools/uuid';

class Palette extends React.Component {
  componentDidMount() {
    const { hueColor } = this.props;
    this.drawPalette(hueColor);
  }

  componentWillReceiveProps({ hueColor }) {
    const prevHueColor = this.props.hueColor;
    if (hueColor.toString() !== prevHueColor.toString()) {
      this.drawPalette(hueColor);
    }
  }

  selecting = false;
  uuid = uuid(8);

  drawPalette(hueColor) {
    const { width, height } = this.props;

    const context = this.canvas.getContext('2d');
    context.clearRect(0, 0, width, 0);

    const horizon = context.createLinearGradient(0, 0, width, 0);
    horizon.addColorStop(0, '#FFF');
    horizon.addColorStop(1, `rgb(${hueColor.join(',')})`);
    context.fillStyle = horizon;
    context.fillRect(0, 0, width, height);

    const vertical = context.createLinearGradient(0, 0, 0, height);
    vertical.addColorStop(0, 'rgba(0, 0, 0, 0)');
    vertical.addColorStop(1, 'rgba(0, 0, 0, 1)');
    context.fillStyle = vertical;
    context.fillRect(0, 0, width, height);
  }

  selectColor = this::(function selectColor(e) {
    const { offsetLeft, offsetTop } = this.canvas.parentNode;
    const { clientX, clientY } = e;
    const { scrollY } = window;
    const { width, height, onChange } = this.props;
    let x = (clientX - offsetLeft) / width;
    let y = ((clientY - offsetTop) + scrollY) / height;
    if (x > 1) x = 1;
    if (x < 0) x = 0;
    if (y > 1) y = 1;
    if (y < 0) y = 0;
    onChange(x, y);
  })

  handleMouseDown = this::(function handleMouseDown(e) {
    e.preventDefault();
    this.selecting = true;
    this.selectColor(e);
  })

  handleMouseMove = this::(function handleMouseMove(e) {
    e.preventDefault();
    if (!this.selecting) return;
    this.selectColor(e);
  })

  handleMouseLeave = this::(function handleMouseOut(e) {
    e.preventDefault();
    if (!this.selecting) return;
    $('body').one('mouseup', this.handleBodyMouseUp);
    $('body').on('mousemove', this.selectColor);
  })

  handleMouseUp = this::(function handleMouseUp(e) {
    e.preventDefault();
    this.selecting = false;
  })

  handleBodyMouseUp = this::(function handleBodyMouseUp(e) {
    e.preventDefault();
    this.selecting = false;
    $('body').off('mousemove', this.selectColor);
  })

  render() {
    const {
      width,
      height,
    } = this.props;

    const { x, y } = this.props;

    return (
      <div
        className={classnames(css.paletteMain, 'paletteMain')}
        style={{ width: `${width}px`, height: `${height}px` }}
        role="presentation"
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
        onMouseLeave={this.handleMouseLeave}
      >
        <div
          className={classnames(css.selectCir, 'selectCir')}
          style={{ left: `${x * width}px`, top: `${y * height}px` }}
        />
        <canvas ref={(ele) => { this.canvas = ele; }} />
      </div>
    );
  }
}

Palette.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  onChange: PropTypes.func,
  hueColor: PropTypes.arrayOf(PropTypes.number),
  height: PropTypes.number,
  width: PropTypes.number,
};

Palette.defaultProps = {
  onChange: () => {},
  x: 1,
  y: 0,
  hueColor: [255, 0, 0],
  height: 200,
  width: 300,
};

export default Palette;
