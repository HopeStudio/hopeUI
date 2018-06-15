import React from 'react';
import { mount } from 'enzyme';

import ColorPick from './colorPick';

describe('取色器组件', () => {
  const root = mount(<ColorPick color="#168FED" />);
  it('Hex测试', () => {
    expect(root.find('.hexInput input').instance().value).toEqual('#168FED');
  });

  it('RGB测试', () => {
    expect(root.find('.rgbInput input').at(1).instance().value).toEqual('143');
  });

  it('色块测试', () => {
    expect(root.find('.display').props().style.backgroundColor).toEqual('rgb(22,143,237)');
  });

  it('错误值测试', () => {
    root.find('.hexInput input').instance().value = '#168FED1';
    root.find('.hexInput input').simulate('blur');
    expect(root.find('.hexInput input').instance().value).toEqual('#168FED');

    root.find('.rgbInput input').at(1).instance().value = '-100';
    root.find('.rgbInput input').at(1).simulate('blur');
    root.find('.rgbInput input').at(0).instance().value = '1000';
    root.find('.rgbInput input').at(0).simulate('blur');
    root.find('.rgbInput input').at(2).instance().value = 'LY';
    root.find('.rgbInput input').at(2).simulate('blur');
    expect(root.find('.hexInput input').instance().value).toEqual('#FF0000');
  });

  it('颜色刷新测试', () => {
    root.find('.rgbInput input').at(0).instance().value = '40';
    root.find('.rgbInput input').at(0).simulate('blur');
    root.find('.rgbInput input').at(1).instance().value = '44';
    root.find('.rgbInput input').at(1).simulate('blur');
    root.find('.rgbInput input').at(2).instance().value = '52';
    root.find('.rgbInput input').at(2).simulate('blur');
    expect(root.find('.hexInput').instance().value).toEqual('#282C34');

    root.find('.hexInput input').instance().value = '#CB4A40';
    root.find('.hexInput input').simulate('blur');
    expect(root.find('.hexInput').instance().value).toEqual('#CB4A40');

    root.find('.paletteMain').simulate('mousedown', { clientX: 100, clientY: 100 });
    expect(root.find('.hexInput').instance().value).toEqual('#7F5855');

    root.find('.paletteMain').simulate('mousemove', { clientX: 50, clientY: 50 });
    expect(root.find('.hexInput').instance().value).toEqual('#BFA19F');

    root.find('.hue').simulate('mousedown', 200);
    expect(root.find('.hexInput').instance().value).toEqual('#BF9F9F');

    root.find('.hue').simulate('mousemove', 0);
    expect(root.find('.hexInput').instance().value).toEqual('#BF9F9F');

    root.setProps({ color: '#F00' });
    expect(root.find('.hexInput').instance().value).toEqual('#FF0000');
  });

  it('色相测试', () => {
    const hueProps = root.find('HuePick').props();
    const hueRoot = mount(<ColorPick.HuePick {...hueProps} />);
    expect(hueRoot.state().hue).toEqual(0);
  });
});
