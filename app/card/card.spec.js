import React from 'react';
import { mount } from 'enzyme';

import Card from './card';

describe('卡片组件', () => {
  const data = [
    { title: '标题1', hits: 30, comments: 4 },
    { title: '标题2', description: '描述' },
    { title: '标题3' },
  ];
  const root = mount(<Card data={data} columns={5} />);
  it('信息测试', () => {
    expect(root.find('.info').at(1).text()).toEqual('标题2描述');
  });

  it('resize 测试', (done) => {
    let width = 2000;
    Object.defineProperty(root.find('.cardContainer').at(0).instance(), 'offsetWidth', {
      get: () => width,
      set: (value) => { width = value; },
    });

    expect(root.find('.card').at(0).instance().style.width).toEqual('20%');

    width = 1800;
    global.dispatchEvent(new Event('resize'));
    width = 1000;
    global.dispatchEvent(new Event('resize'));

    setTimeout(() => {
      expect(root.find('.card').at(0).instance().style.width).toEqual('25%');
      root.unmount();
      done();
    }, 1000);
  });
});

