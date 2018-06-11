import React from 'react';
import { mount } from 'enzyme';

import Card from './card';

describe('卡片组件', () => {
  const data = [
    { title: '标题1', hits: 30, comments: 4 },
    { title: '标题2', description: '描述' },
    { title: '标题3' },
  ];
  const root = mount(<Card data={data} />);
  it('标题测试', () => {
    expect(root.find('.title').at(0).text()).toEqual('标题1');
  });

  it('信息测试', () => {
    expect(root.find('.info').at(1).text()).toEqual('标题2描述');
  });
});

