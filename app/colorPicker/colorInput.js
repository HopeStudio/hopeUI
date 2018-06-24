import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import css from './colorPick.less';
import uuid from '../tools/uuid';

const hexReg = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/i;

function toHex([r, g, b]) {
  return (`#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}` +
    `${b.toString(16).padStart(2, '0')}`).toUpperCase();
}

function parseColor(colorStr) {
  const hex = colorStr.match(hexReg);
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

class ColorInput extends React.Component {
  componentDidMount() {
    const { color } = this.props;
    this.inputColor(color);
  }

  componentWillReceiveProps({ color }) {
    this.inputColor(color);
  }

  uuid = uuid(8);

  handleBlur = this::(function handleChange(e) {
    let color = [...this.props.color];
    const { onChange } = this.props;
    const key = e.target.name;
    if (key === 'Hex') {
      const { value } = e.target;
      if (!hexReg.test(value)) {
        return onChange(color);
      }
      color = parseColor(value);
      onChange(color);
      return true;
    }
    let value = parseInt(e.target.value, 10) || 0;
    if (value > 255) value = 255;
    if (value < 0) value = 0;
    switch (key) {
      case 'G':
        color[1] = value;
        break;
      case 'B':
        color[2] = value;
        break;
      default:
        color[0] = value;
        break;
    }

    onChange(color);
    return true;
  })

  inputColor(color) {
    const [r, g, b] = color;
    this.R.value = r;
    this.G.value = g;
    this.B.value = b;
    this.Hex.value = toHex(color);
  }

  render() {
    const { height, color } = this.props;

    return (
      <div
        className={classnames(css.colorInput, 'colorInput')}
      >
        <div
          className={classnames(css.display, 'display')}
          style={{
            height: `${height}px`,
            backgroundColor: `rgb(${color.join(',')})`,
          }}
        />
        <div className={classnames(css.inputTitle, 'inputTitle')}>R</div>
        <input
          className={classnames(css.rgbInput, 'rgbInput')}
          onBlur={this.handleBlur}
          name="R"
          ref={(ele) => { this.R = ele; }}
        />
        <div className={classnames(css.inputTitle, 'inputTitle')}>G</div>
        <input
          className={classnames(css.rgbInput, 'rgbInput')}
          onBlur={this.handleBlur}
          name="G"
          ref={(ele) => { this.G = ele; }}
        />
        <div className={classnames(css.inputTitle, 'inputTitle')}>B</div>
        <input
          className={classnames(css.rgbInput, 'rgbInput')}
          onBlur={this.handleBlur}
          name="B"
          ref={(ele) => { this.B = ele; }}
        />
        <div className={classnames(css.inputTitle, 'inputTitle')}>Hex</div>
        <input
          className={classnames(css.hexInput, 'hexInput')}
          onBlur={this.handleBlur}
          name="Hex"
          ref={(ele) => { this.Hex = ele; }}
        />
      </div>
    );
  }
}

ColorInput.propTypes = {
  height: PropTypes.number,
  color: PropTypes.arrayOf(PropTypes.number),
  onChange: PropTypes.func,
};

ColorInput.defaultProps = {
  onChange: () => {},
  height: 40,
  color: [255, 0, 0],
};

export default ColorInput;
