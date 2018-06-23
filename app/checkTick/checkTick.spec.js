import React from 'react';
import { mount } from 'enzyme';

import CheckTick from './checkTick';

describe('按钮组件', () => {
  const result = { A: undefined, B: undefined, C: undefined };
  const result2 = { A: undefined, B: undefined, C: undefined };

  function handleChange(value, checked) {
    result[value] = checked;
  }
  function handleChange2(value, checked) {
    result2[value] = checked;
  }

  const root = mount((
    <div>
      <CheckTick name="test1" value="A" onChange={handleChange} isChecked>A</CheckTick>
      <CheckTick name="test1" value="B" onChange={handleChange}>B</CheckTick>
      <CheckTick name="test1" value="C" onChange={handleChange} disabled>C</CheckTick>
    </div>
  ));
  const root2 = mount((
    <div>
      <CheckTick name="test2" value="A" isMultiple>A</CheckTick>
      <CheckTick name="test2" value="B" onChange={handleChange2} isMultiple>B</CheckTick>
      <CheckTick name="test2" value="C" onChange={handleChange2} isMultiple>C</CheckTick>
    </div>
  ));

  document.body.appendChild(root.instance());
  document.body.appendChild(root2.instance());

  it('内容测试', () => {
    expect(root.text()).toEqual('ABC');
  });

  it('单选测试', () => {
    const eleB = root.find('input').at(1).instance();
    const eleC = root.find('input').at(2).instance();
    root.find('input').at(1).simulate('change', { target: eleB });
    root.find('input').at(2).simulate('change', { target: eleC });
    expect(result.A).toEqual(false);
    expect(result.B).toEqual(true);
  });

  it('多选测试', () => {
    const eleB = root2.find('input').at(1).instance();
    const eleC = root2.find('input').at(2).instance();
    root2.find('input').at(0).simulate('change');
    root2.find('input').at(1).simulate('change', { target: eleB });
    root2.find('input').at(2).simulate('change', { target: eleC });
    expect(result2.B).toEqual(true);
    expect(result2.C).toEqual(true);
  });
});
