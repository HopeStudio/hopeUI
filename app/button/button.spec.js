import React from 'react';
import { shallow } from 'enzyme';

import Button from './button';

describe('按钮组件', () => {
  const root = shallow(<Button content="some text" />);
  it('内容测试', () => {
    expect(root.text()).toEqual('some text');
  });

  it('事件测试', (done) => {
    root.find('div').at(0).simulate('click');
    root.setProps({ onClick: () => done() });
    root.find('div').at(0).simulate('click');
  });
});

