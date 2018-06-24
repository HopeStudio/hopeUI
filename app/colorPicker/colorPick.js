import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import css from './colorPick.less';
import colors from '../rules/colors';
import uuid from '../tools/uuid';
import Palette from './palette';
import HuePick from './huePick';
import ColorInput from './colorInput';

const rgbReg = /^rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*[.0-9]+\s*)?\)$/i;
const hexReg = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/i;

function parseColor(colorStr) {
  let color = colorStr;

  const rgb = color.match(rgbReg);
  if (rgb) return rgb.slice(1).map(value => parseInt(value, 10));

  const innerColor = colors[color];
  if (innerColor) color = innerColor;

  const hex = color.match(hexReg);
  if (hex) {
    let hexStr = hex[1];
    if (hexStr.length === 3) {
      hexStr = `${hexStr[0]}${hexStr[0]}${hexStr[1]}${hexStr[1]}${hexStr[2]}${hexStr[2]}`;
    }
    return [
      parseInt(hexStr.slice(0, 2), 16),
      parseInt(hexStr.slice(2, 4), 16),
      parseInt(hexStr.slice(4, 6), 16),
    ];
  }

  throw new Error('invalid color');
}

function toHueColor(color) {
  if (typeof color === 'number') {
    const block = parseInt(color * 6, 10);
    switch (block) {
      case 0: return [255, 0, ((color * 6) - block) * 255];
      case 1: return [255 - (((color * 6) - block) * 255), 0, 255];
      case 2: return [0, ((color * 6) - block) * 255, 255];
      case 3: return [0, 255, 255 - (((color * 6) - block) * 255)];
      case 4: return [((color * 6) - block) * 255, 255, 0];
      case 5: return [255, 255 - (((color * 6) - block) * 255), 0];
      default: return [255, 0, 0];
    }
  }

  const lightness = Math.min(...color);
  const saturation = (Math.max(...color) - lightness) / 255;

  let hueColor;
  if (saturation > 0) {
    hueColor = color.map(value => (value - lightness) / saturation);
  } else {
    hueColor = [255, 0, 0];
  }
  return hueColor;
}

function toRGB(hueColor, x, y) {
  return hueColor
    .map(value => Math.round((value + ((255 - value) * (1 - x))) * (1 - y)));
}

function toXY([R, G, B]) {
  const [r, g, b] = toHueColor([R, G, B]);
  if (g >= 255) {
    if (r >= 255) {
      const x = (255 * (B - G)) / (G * (b - 255));
      const y = 1 - (G / 255);
      return { x, y };
    }
    const x = (255 * (R - G)) / (G * (r - 255));
    const y = 1 - (G / 255);
    return { x, y };
  } else if (r === b) {
    const y = 1 - (R / 255);
    const x = (G + R) / R;
    return { x, y };
  }
  const y = ((((B - R - b) + r) - ((B * r) / 255)) + ((R * b) / 255)) / (r - b);
  const x = ((G + (255 * y)) - 255) / ((1 - y) * (g - 255));
  return { x, y };
}

toXY([255, 255, 52]);

class ColorPick extends React.Component {
  static Palette = Palette;
  static HuePick = HuePick;
  static ColorInput = ColorInput

  /* eslint-disable react/sort-comp */
  color = parseColor(this.props.color);
  /* eslint-enable react/sort-comp */

  state = {
    hueColor: toHueColor(this.color),
    ...toXY(this.color),
  }

  componentWillReceiveProps({ color }) {
    const newColor = parseColor(color);
    this.setState({
      hueColor: toHueColor(newColor),
      ...toXY(newColor),
    });
  }

  uuid = uuid(8);

  handlePaletteChange = this::(function handlePaletteChange(x, y) {
    const { onChange } = this.props;
    const { hueColor } = this.state;

    const color = toRGB(hueColor, x, y);
    this.setState({ x, y });
    onChange(`rgb(${color.join(',')})`);
  })

  handleHueChange = this::(function handleHueChange(hue) {
    const hueColor = toHueColor(hue);
    this.setState({ hueColor });
  })

  handleColorChange = this::(function handleColorChange(color) {
    this.setState({
      hueColor: toHueColor(color),
      ...toXY(color),
    });
  })

  render() {
    const {
      id,
      className,
      height,
      width,
    } = this.props;

    const {
      hueColor,
      x,
      y,
    } = this.state;

    const color = toRGB(hueColor, x, y);

    return (
      <div
        className={classnames(css.colorPick, 'colorPick', className)}
        id={id}
      >
        <ColorPick.Palette
          hueColor={hueColor}
          x={x}
          y={y}
          width={width - 40}
          height={height - 40}
          onChange={this.handlePaletteChange}
        />
        <ColorPick.HuePick
          height={height - 40}
          hueColor={hueColor}
          onChange={this.handleHueChange}
        />
        <ColorPick.ColorInput
          color={color}
          height={height - 200}
          onChange={this.handleColorChange}
        />
      </div>
    );
  }
}

ColorPick.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  color: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
};

ColorPick.defaultProps = {
  id: '',
  className: '',
  onChange: () => {},
  color: '#FF0000',
  height: 240,
  width: 340,
};

export default ColorPick;
