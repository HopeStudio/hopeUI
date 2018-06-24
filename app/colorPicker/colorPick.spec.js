import React from 'react';
import { mount } from 'enzyme';
import $ from 'jquery';

import ColorPick from './colorPick';

describe('取色器组件', () => {
  let root = mount(
    <ColorPick color="#168FED" />,
    { attachTo: global.document.getElementById('root') },
  );
  const color = () => root.find('.hexInput input').instance().value;

  it('Hex测试', () => {
    expect(color()).toEqual('#168FED');
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
    expect(color()).toEqual('#168FED');

    root.find('.hexInput input').instance().value = '#ABC';
    root.find('.hexInput input').simulate('blur');
    expect(color()).toEqual('#AABBCC');

    root.find('.rgbInput input').at(1).instance().value = '-100';
    root.find('.rgbInput input').at(1).simulate('blur');
    root.find('.rgbInput input').at(0).instance().value = '1000';
    root.find('.rgbInput input').at(0).simulate('blur');
    root.find('.rgbInput input').at(2).instance().value = 'LY';
    root.find('.rgbInput input').at(2).simulate('blur');
    expect(color()).toEqual('#FF0000');

    /* eslint-disable no-console */
    jest.spyOn(console, 'error');
    console.error.mockImplementation(() => null);
    try {
      root.setProps({ color: 'foo' });
    } catch (e) {
      expect(e.message).toEqual('invalid color');
      root = mount(<ColorPick color="#168FED" />);
    }
    console.error.mockRestore();
    /* eslint-enable no-console */
  });

  it('颜色类型测试', () => {
    root.setProps({ color: 'red500' });
    expect(color()).toEqual('#F44336');
    root.setProps({ color: 'rgba(20, 100, 30, .5)' });
    expect(color()).toEqual('#14641E');
    root.setProps({ color: '#F0F' });
    expect(color()).toEqual('#FF00FF');
  });

  it('颜色填写测试', () => {
    root.find('.rgbInput input').at(0).instance().value = '255';
    root.find('.rgbInput input').at(0).simulate('blur');
    root.find('.rgbInput input').at(1).instance().value = '255';
    root.find('.rgbInput input').at(1).simulate('blur');
    root.find('.rgbInput input').at(2).instance().value = '52';
    root.find('.rgbInput input').at(2).simulate('blur');
    expect(color()).toEqual('#FFFF34');

    root.find('.hexInput input').instance().value = '#CB4A40';
    root.find('.hexInput input').simulate('blur');
    expect(color()).toEqual('#CB4A40');
  });

  it('色相事件测试', () => {
    root.setProps({ color: '#00F' });
    root.find('.hue').simulate('mousedown');
    root.find('.hue').simulate('mouseleave');
    const event = new $.Event('mousemove');
    event.clientY = -100;
    $('body').trigger(event);
    expect(color()).toEqual('#FF0000');
    event.clientY = 300;
    $('body').trigger(event);
    $('body').trigger('mouseup');
    expect(color()).toEqual('#FF0000');

    root.find('.hue').simulate('mousedown', { clientY: 20 });
    expect(color()).toEqual('#FF0099');
    root.find('.hue').simulate('mousemove', { clientY: 40 });
    expect(color()).toEqual('#CC00FF');
    root.find('.hue').simulate('mousemove', { clientY: 80 });
    expect(color()).toEqual('#0066FF');
    root.find('.hue').simulate('mousemove', { clientY: 160 });
    expect(color()).toEqual('#CCFF00');
    root.find('.hue').simulate('mousemove', { clientY: 180 });
    expect(color()).toEqual('#FF9900');
    root.find('.hue').simulate('mousedown', { clientY: 100 });
    root.find('.hue').simulate('mouseup');

    event.clientY = 180;
    $('body').trigger(event);
    root.find('.hue').simulate('mouseleave');
    root.find('.hue').simulate('mousemove', { clientY: 180 });
    $('body').trigger('mousemove', { clientY: -100 });
    expect(color()).toEqual('#00FFFF');
  });

  it('取色测试', () => {
    root.find('.paletteMain').simulate('mousedown', { clientX: 100, clientY: 100 });
    expect(color()).toEqual('#558080');

    root.find('.paletteMain').simulate('mousemove', { clientX: 50, clientY: 50 });
    expect(color()).toEqual('#9FBFBF');

    root.find('.paletteMain').simulate('mouseleave');
    const event = new $.Event('mousemove');
    event.clientY = -100;
    event.clientX = -100;
    $('body').trigger(event);
    expect(color()).toEqual('#FFFFFF');
    event.clientY = 300;
    event.clientX = 500;
    $('body').trigger(event);
    expect(color()).toEqual('#000000');
    $('body').trigger('mouseup');


    root.find('.paletteMain').simulate('mousedown', { clientX: 0, clientY: 0 });
    root.find('.paletteMain').simulate('mouseup');
    root.find('.paletteMain').simulate('mousemove', { clientX: 100, clientY: 100 });
    root.find('.paletteMain').simulate('mouseleave');
    event.clientY = 300;
    event.clientX = 500;
    $('body').trigger(event);
    expect(color()).toEqual('#FFFFFF');
  });
});
