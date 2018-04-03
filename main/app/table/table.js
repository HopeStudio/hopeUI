import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import $ from 'jQuery';

import colors from '../rules/colors.js';
import cssTable from './table.less';
import uuid from '../tools/uuid.js';
import colorTrans from '../tools/colorTrans.js';
import Th from './th.js';
import Tr from './tr.js';
import Td from './td.js';
import Line from './line.js';

class Table extends React.Component {
  static Td = Td
  static Tr = Tr
  static Th = Th
  static Line = Line
  children = []
  state = {
    ratioArr: [],
    totalRatio: 0
  }
  getWidth = () => {
    return $(`.${this.uuid}.hope-table`).width()
  }
  getHeight = () => {
    return $(`.${this.uuid}.hope-table`).height()
  }
  getLeft = i => () => {
    const {ratioArr, totalRatio} = this.state;
    let l = 0;
    for (let j = 0; j <= i; j++) {
      l = Number.parseFloat((l + ratioArr[j]).toFixed(8))
    }
    return Number.parseFloat(((l / totalRatio) * 100).toFixed(8))
  }
  getRatio = i => () => {
    return this.state.ratioArr[i]
  }
  getTotalRatio = () => {
    return this.state.totalRatio
  }
  getLines(ratioArr, totalRatio) {
    this.lines = ratioArr.map((item, i) => {
      if (i === ratioArr.length - 1) 
        return;
      const uuidLine = uuid(8)
      return (<Table.Line
        getHeight={this.getHeight}
        getLeft={this.getLeft(i)}
        getWidth={this.getWidth}
        setDrag={this.setDrag}
        ref={line => this
        .children
        .push(line)}
        index={i}
        key={uuidLine}/>)
    })
  }
  getThs(ratioArr, totalRatio) {
    const {headers} = this.props;
    this.th = (
      <Table.Th className={classnames('hope-th', cssTable.th)}>
        {headers.map((item, i) => {
          const uuidTd = uuid(8);
          return (
            <Table.Td
              key={uuidTd}
              uuid={uuidTd}
              getRatio={this.getRatio(i)}
              ref={td => this
              .children
              .push(td)}
              getTotalRatio={this.getTotalRatio}>
              {item.name}
            </Table.Td>
          )
        })}
      </Table.Th>
    )
  }
  getTrs(ratioArr, totalRatio) {
    const {headers, data} = this.props;
    this.trs = data.map((dataItem, i) => {
      const uuidTr = uuid(8);
      return (
        <Table.Tr key={uuidTr} uuid={uuidTr}>
          {headers.map((headerItem, j) => {
            let content = data[i][headerItem.key];
            const uuidTd = uuid(8);
            if (headerItem.key === 'hopeSerial') 
              content = i;
            return (
              <Table.Td
                key={uuidTd}
                uuid={uuidTd}
                ref={td => this
                .children
                .push(td)}
                getRatio={this.getRatio(j)}
                getTotalRatio={this.getTotalRatio}>
                {content}
              </Table.Td>
            )
          })}
        </Table.Tr>
      )
    })
  }
  childrenUpdate(fn) {
    new Promise((resolve, reject) => {
      const length = this.children.length;
      let count = 0;
      this
        .children
        .forEach((item) => {
          item.setState({}, () => {
            count++;
            if (count === length) {
              if (!fn) 
                return resolve();
              resolve(fn)
            }
          })
        })
    }).then(fn => {
      if (!fn) 
        return;
      fn()
    })
  }
  // 管理drag状态机，不涉及组件更新故不用放在state中;触发拖拽时，将line挂载在dragLine上
  setDrag = (bool = !this.drag, target, index) => {
    this.drag = bool
    if (target) {
      this.dragLine = target
      this.dragIndex = index
    }
  }
  mouseUpHandle = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setDrag(false);
  }
  mouseMoveHandleCall = () => {
    let timer;
    const setLineLeft = (e, fn) => {
      const w = this.getWidth();
      const lineOffset = $(this.dragLine).offset();
      // 移动比例
      const dragRatio = (e.clientX - lineOffset.left) / w;
      // 重新设置比例
      new Promise((resolve, reject) => {
        this.setRatioArr(this.dragIndex, dragRatio, resolve)
      }).then(() => {
        this.childrenUpdate(fn)
        this.setState({});
      })
    }
    return e => {
      if (timer || !this.drag) 
        return;
      e.preventDefault();
      e.stopPropagation();
      new Promise((resolve, reject) => {
        timer = true;
        setLineLeft(e, () => {
          resolve()
        })
      }).then(() => timer = false)
    }
  }
  mouseLeaveHandle = () => {
    this.setDrag(false)
    this.setState({})
  }
  setTotalRatio(ratioArr = this.state.ratioArr) {
    if (ratioArr.length === 0) 
      throw new Error('表格宽度计算出错');
    return ratioArr.reduce((last, item) => {
      return last + item;
    })
  }
  setRatioArr(index, offset, fn) {
    const ratioArr = this.state.ratioArr;
    const next = index + 1;
    const calculate = (ratio, offset) => {
      return Number.parseFloat((ratio + offset).toFixed(8))
    }
    const check = i => {
      const isSafe = calculate(ratioArr[i], -offset) > this.safeRatio;
      if (!isSafe) {
        if (i === ratioArr.length - 1) 
          return false;
        i++;
        return check(i)
      } else {
        return i
      }
    }
    const moveID = check(next);
    const add = calculate(ratioArr[index], offset);
    if (typeof moveID === 'number' && (add > this.safeRatio || offset > 0)) {
      const total = ratioArr[index] + ratioArr[moveID];
      ratioArr.splice(index, 1, calculate(ratioArr[index], offset))
      ratioArr.splice(moveID, 1, calculate(ratioArr[moveID], -offset))
    }
    if (fn) 
      fn()
  }
  setTdHeight() {
    // 设置td高度
    const th = $(`.${this.uuid}.hope-table .hope-th`);
    const trs = $(`.${this.uuid}.hope-table .hope-tr`);
    $(`.${this.uuid}.hope-table .hope-td`).height('auto');
    th
      .children('.hope-td')
      .height(th.height() - 10);
    trs.each((i) => {
      const temp = trs.eq(i)
      temp
        .children('.hope-td')
        .height(temp.height() - 10)
    })
  }
  setStyle() {
    // 设置trStyle和thStyle
    const {trStyle, thStyle} = this.props;
    thStyle.forEach((item, i) => {
      colorTrans(item.style, `.${this.uuid}.hope-table .hope-th .hope-td:nth-child(${item.col})`)
    })
    trStyle.forEach((item, i) => {
      colorTrans(item.style, `.${this.uuid}.hope-table .hope-tr:nth-child(${item.row
        ? item.row
        : 'n'}) .hope-td:nth-child(${item.col})`)
    })
  }
  componentWillMount() {
    const {headers} = this.props;
    this.uuid = uuid(8);
    const ratioArr = [];
    headers.forEach((item, i) => {
      const ratio = item.ratio
        ? item.ratio
        : 1;
      ratioArr.splice(i, 0, ratio)
    })
    const totalRatio = this.setTotalRatio(ratioArr);
    this.setState({ratioArr, totalRatio})
    this.getThs(ratioArr, totalRatio);
    this.getTrs(ratioArr, totalRatio);
    this.getLines(ratioArr, totalRatio);
  }
  componentDidMount() {
    this.setStyle()
    this.setTdHeight()
    this.childrenUpdate()
    this.safeRatio = 1;
  }
  componentDidUpdate() {
    this.setTotalRatio()
    this.setTdHeight()
    this.childrenUpdate()
  }
  render() {
    return (
      <div
        className={classnames('hope-table', cssTable.table, this.uuid)}
        onMouseMove={this.mouseMoveHandleCall()}
        onMouseUp={this.mouseUpHandle}
        onMouseLeave={this.mouseLeaveHandle}>
        {this.th}
        {this.trs}
        {this.lines}
      </div>
    )
  }
}

Table.propTypes = {
  headers: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  thStyle: PropTypes.array,
  trStyle: PropTypes.array,
  resizable: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

Table.defaultProps = {
  headers: [
    {
      name: '序号',
      key: 'hopeSerial',
      ratio: 1
    }, {
      name: '测试标题',
      key: 'title',
      ratio: 3
    }, {
      name: '测试数字',
      key: 'number',
      ratio: 5
    }, {
      name: '测试文字',
      key: 'text',
      ratio: 8
    }
  ],
  thStyle: [
    {
      col: 2,
      style: {
        background: 'cyan700'
      }
    }, {
      col: 4,
      style: {
        ['text-align']: 'left'
      }
    }
  ],
  trStyle: [
    {
      col: 3,
      row: '2n',
      style: {
        background: 'grey500'
      }
    }, {
      col: 4,
      style: {
        ['text-align']: 'left'
      }
    }
  ],
  data: [
    {
      title: '小红小明',
      number: 300,
      text: '这是一段测试文字,这是一段测试文字,这是一段测试文字,这是一段测试文字,这是一段测试文字,这是一段测试文字'
    }, {
      title: '小智小刚',
      number: 600,
      text: 'djfhashfkfhalghgakjghhfjkdashfkjshgiahfefnkjdhgjahsjafkjeh'
    }, {
      title: 'red hat and snow white',
      number: 100,
      text: `I can't stand this horrible work which is never terminated`
    }
  ],
  width: '100%',
  resizable: true
}

export default Table;