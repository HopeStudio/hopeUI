import React from 'react';
import ReactDOM from 'react-dom';

import cssReset from './rules/reset.less';
import cssRipples from './rules/ripples.less';
import Button from './button/button.js';
import ScrollBox from './scrollBox/scrollBox.js';
import CheckTick from './checkTick/checkTick.js';
import DownSelect from './downSelect/downSelect.js';
import Table from './table/table.js';
import Text from './text/text.js';
import Card from './card/card';
import DatePick from './datePick/datePick.js';

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
  CirBlank,
  CirSelect
} from './icons/export.js';

class Hope extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <div>
          <h2>DatePick</h2>
          <DatePick></DatePick>
        </div>
        <div>
          <h2>Text</h2>
          <Text title='用户名'></Text>
          <Text title='密码'></Text>
        </div>
        <div>
          <h2>Table</h2>
          <Table></Table>
        </div>
        <div>
          <h2>DownSelect</h2>
          <DownSelect data={{0: '贵州省', 1: '广东省', 2: '广西省', 3: '湖南省'}}></DownSelect>
        </div>
        <div>
          <h2>CheckTick</h2>
          <div>
            <span>崔霄帅不帅？</span>
            <CheckTick name='test1' value='有点帅' isChecked={true}>
              有点帅~
            </CheckTick>
            <CheckTick name='test1' value='贼帅'>
              贼帅！
            </CheckTick>
            <CheckTick name='test1' value='正确' disabled={true}>
              丑货！
            </CheckTick>
          </div>
          <div>
            <span>崔霄真的帅？</span>
            <CheckTick name='test2' value='真的' isMultiple={true}>
              真的
            </CheckTick>
            <CheckTick name='test2' value='确实无误' isMultiple={true}>
              确实无误
            </CheckTick>
            <CheckTick name='test2' value='正确' isMultiple={true}>
              正确
            </CheckTick>
          </div>
        </div>
        <div>
          <h2>Button</h2>
          <Button type='activate' content='activate'/>
          <Button
            type='activate'
            content='activate'
            customStyle={{
            background: 'green300',
            color: 'grey50',
            [':hover']: {
              background: 'green500',
              ['::after']: {
                transform: 'scale(1.2, 1.2)'
              }
            },
            [':active']: {
              background: 'green700'
            },
            ['::after']: {
              ['box-shadow']: '1px 2px 5px 0 grey400'
            }
          }}/>
          <Button
            type='toCircle'
            content='toCicle'
            icon={< ArrowDown size = '1em' fillcolor = 'orange300' />}/>
          <Button type='fontCharm' content='fontCharm'/>
          <Button type='disabled' content='disabled'/>
        </div>
        <div>
          <h2>Icon</h2>
          <ArrowDown size='2em' fillcolor='orange300'/>
          <ArrowUp/>
          <ArrowLeft/>
          <ArrowRight/>
          <ArrowDropDown/>
          <ArrowDropUp/>
          <ArrowDropLeft/>
          <ArrowDropRight/>
          <ArrowDropDownCircle/>
          <ArrowDropUpCircle/>
          <ArrowDropLeftCircle/>
          <ArrowDropRightCircle/>
          <Alert/>
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
          <Card colums={5} title="测试标题"/>
          <Card colums={5} title="测试标题"/>
          <Card colums={5} title="测试标题"/>
          <Card colums={5} title="测试标题"/>
          <Card colums={5} title="测试标题"/>
        </div>
      </div>
    )
  }
}
ReactDOM.render(
  <Hope/>, document.getElementById('hopeUI'),)
