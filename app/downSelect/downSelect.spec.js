import React from 'react';
import { mount } from 'enzyme';

import DownSelect from './downSelect';

describe('下拉选择框组件', () => {
  const root = mount((
    <DownSelect data={
      {
        0: '贵州省',
        1: '广东省',
        2: '广西省',
        3: '湖南省',
      }
    }
    />
  ));

  it('下拉测试', () => {
    root.find('.selectBtn').simulate('keyDown', { keyCode: 13 });
    expect(root.state().isDown).toEqual(true);
    root.find('.downItem').at(0).simulate('keyDown', { keyCode: 10 });
    expect(root.state().isDown).toEqual(true);
  });

  it('单选测试', () => {
    root.find('.downItem').at(0).simulate('keyDown', { keyCode: 13 });
    expect(root.find('input').instance().value).toEqual('');
    root.find('.downItem').at(0).simulate('keyDown', { keyCode: 10 });
    expect(root.find('input').instance().value).toEqual('');
    root.find('.downItem').at(1).simulate('click');
    expect(root.find('input').instance().value).toEqual('广东省');
  });

  const mRoot = mount((
    <DownSelect
      data={
        {
          0: '贵州省',
          1: '广东省',
          2: '广西省',
          3: '湖南省',
        }
      }
      isMultiple
      defaultKey={['0', '1']}
    />
  ));

  it('多选测试', () => {
    mRoot.find('.downItem').at(0).simulate('keyDown', { keyCode: 13 });
    expect(mRoot.find('input').instance().value).toEqual('广东省');
    mRoot.find('.downItem').at(0).simulate('click');
    expect(mRoot.find('input').instance().value).toEqual('贵州省;广东省');
  });

  it('禁用测试', () => {
    mRoot.setProps({ disabled: true });
    root.find('.selectBtn').simulate('keyDown', { keyCode: 13 });
  });

  it('错误测试', () => {
    /* eslint-disable no-console */
    jest.spyOn(console, 'error');
    console.error.mockImplementation(() => null);
    try {
      mount((
        <DownSelect
          data={
            {
              0: '贵州省',
              1: '广东省',
              2: '广西省',
              3: '湖南省',
            }
          }
          defaultKey={['0', '1']}
        />
      ));
    } catch (e) {
      expect(e).toBeTruthy();
    }
    console.error.mockRestore();
    /* eslint-enable no-console */
  });
});
