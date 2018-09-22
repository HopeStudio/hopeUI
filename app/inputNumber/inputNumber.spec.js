import { mount } from 'enzyme';
import React from 'react';
import InputNumber from './inputNumber';
import Button from '../button/button';

describe('计数器组件测试', () => {
  test('属性测试', () => {
    const app1 = mount(<InputNumber />);
    const app2 = mount(<InputNumber max={23} disabled />);
    expect(app1.prop('value')).toBe(0);
    expect(app1.prop('step')).toBe(1);
    expect(app1.prop('disabled')).toBeFalsy();
    expect(app1.prop('precision')).toBe(0);
    expect(app1.prop('max')).toBe(Infinity);
    expect(app1.prop('min')).toBe(-Infinity);

    expect(app2.prop('max')).toBe(23);
    expect(app2.prop('disabled')).toBeTruthy();
    expect(app2.prop('step')).toBe(1);
  });

  test('测试disabled状态', () => {
    const app1 = mount(<InputNumber disabled />);
    expect(app1.prop('disabled')).toBeTruthy();
    expect(app1.find('input').at(0).prop('disabled')).toBeTruthy();
    app1.find(Button).forEach((item) => {
      expect(item.prop('type')).toBe('disabled');
    });
  });

  test('测试按钮点击事件', () => {
    const app1 = mount(<InputNumber max={10} min={2} step={1} value={5} />);
    const btns = app1.find(Button);
    btns.at(0).simulate('click');
    expect(app1.state().value).toBe(4);
    btns.at(0).simulate('click');
    btns.at(0).simulate('click');
    expect(app1.state().value).toBe(2);
    expect(app1.find(Button).at(0).prop('type')).toBe('disabled');
    btns.at(1).simulate('click');
    expect(app1.state().value).toBe(3);
  });
});