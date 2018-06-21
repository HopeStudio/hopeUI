import React from 'react';
import ReactDOM from 'react-dom';

import './rules/reset.less';
import './rules/ripples.less';
import Button from './button/button';
import ScrollBox from './scrollBox/scrollBox';
import CheckTick from './checkTick/checkTick';
import DownSelect from './downSelect/downSelect';
import Table from './table/table';
import Text from './text/text';
import Card from './card/card';
import DatePick from './datePick/datePick';
import ColorPick from './colorPicker/colorPick';

import {
  ArrowDown,
  ArrowUp,
  ArrowLeft,
  ArrowRight,
  ArrowDropDown,
  ArrowDropUp,
  ArrowDropLeft,
  ArrowDropRight,
  ArrowDropDownCircle,
  ArrowDropUpCircle,
  ArrowDropLeftCircle,
  ArrowDropRightCircle,
  Alert,
} from './icons/export';

/* eslint-disable react/prefer-stateless-function */
class Hope extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h2>DatePick</h2>
          <DatePick />
        </div>
        <div>
          <h2>Text</h2>
          <Text title="用户名" />
          <Text title="密码" />
        </div>
        <div>
          <h2>Table</h2>
          <Table />
        </div>
        <div>
          <h2>DownSelect</h2>
          <DownSelect data={{
0: '贵州省', 1: '广东省', 2: '广西省', 3: '湖南省',
 }}
          />
        </div>
        <div>
          <h2>CheckTick</h2>
          <div>
            <span>崔霄帅不帅？</span>
            <CheckTick name="test1" value="有点帅" isChecked>
              有点帅~
            </CheckTick>
            <CheckTick name="test1" value="贼帅">
              贼帅！
            </CheckTick>
            <CheckTick name="test1" value="正确" disabled>
              丑货！
            </CheckTick>
          </div>
          <div>
            <span>崔霄真的帅？</span>
            <CheckTick name="test2" value="真的" isMultiple>
              真的
            </CheckTick>
            <CheckTick name="test2" value="确实无误" isMultiple>
              确实无误
            </CheckTick>
            <CheckTick name="test2" value="正确" isMultiple>
              正确
            </CheckTick>
          </div>
        </div>
        <div>
          <h2>Button</h2>
          <Button type="activate" content="activate" />
          <Button
            type="activate"
            content="activate"
            customStyle={{
            background: 'green300',
            color: 'grey50',
            ':hover': {
              background: 'green500',
              '::after': {
                transform: 'scale(1.2, 1.2)',
              },
            },
            ':active': {
              background: 'green700',
            },
            '::after': {
              'box-shadow': '1px 2px 5px 0 grey400',
            },
          }}
          />
          <Button
            type="toCircle"
            content="toCicle"
            icon={<ArrowDown size="1em" fillcolor="orange300" />}
          />
          <Button type="fontCharm" content="fontCharm" />
          <Button type="disabled" content="disabled" />
        </div>
        <div>
          <h2>Icon</h2>
          <ArrowDown size="2em" fillcolor="orange300" />
          <ArrowUp />
          <ArrowLeft />
          <ArrowRight />
          <ArrowDropDown />
          <ArrowDropUp />
          <ArrowDropLeft />
          <ArrowDropRight />
          <ArrowDropDownCircle />
          <ArrowDropUpCircle />
          <ArrowDropLeftCircle />
          <ArrowDropRightCircle />
          <Alert />
        </div>
        <div>
          <h2>ScrollBox</h2>
          <ScrollBox>
            <p>这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，</p>
            <p>这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，</p>
            <p>这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，</p>
            <p>这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，这里是用来测试的文章，</p>
          </ScrollBox>
        </div>
        <div>
          <h2>Card</h2>
          <Card
            columns={6}
            description
            hits
            comments
            data={
            [
              {
                title: '测试标题0',
                description: '这是一段描述文字',
                hits: 111,
                comments: 123,
              },
              {
                title: '测试标题1',
                description: '这是一段描述文字',
                hits: 111,
                comments: 123,
              },
              {
                title: '测试标题2',
                description: '这是一段描述文字',
                hits: 111,
                comments: 123,
              },
              {
                title: '测试标题3',
                description: '这是一段描述文字',
                hits: 111,
                comments: 123,
              },
              {
                title: '测试标题4',
                description: '这是一段描述文字',
                hits: 111,
                comments: 123,
              },
              {
                title: '测试标题5',
                description: '这是一段描述文字',
                hits: 111,
                comments: 123,
              },
            ]
          }
          />
        </div>
        <div>
          <h2>
            ColorPick
          </h2>
          <ColorPick />
        </div>
      </div>
    );
  }
}
ReactDOM.render(<Hope />, document.getElementById('hopeUI'));
