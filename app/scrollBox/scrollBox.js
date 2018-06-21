import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import $ from 'jQuery';

import colors from '../rules/colors.js';
import cssScroll from './scrollBox.less';

class ScrollBox extends React.Component {
  constructor(props) {
    super(props);
    const {
      railPly,
      railLength,
      railColor,
      railOpacity,
      railRadius,
      railPosition,
      barPly,
      barColor,
      barOpacity,
      barRadius,
      direction,
      cubicBezier
    } = props;
    this.state = {
      visible: this.props.alwaysVisible
        ? true
        : false,
      railStyle: {
        background: colors[railColor],
        opacity: railOpacity,
        borderRadius: railRadius,
        ...railPosition
      },
      barStyle: {
        background: colors[barColor],
        opacity: barOpacity,
        borderRadius: barRadius,
        transitionTimingFunction: cubicBezier
      },
      ctxStyle: {
        transitionTimingFunction: cubicBezier
      }
    }
  }
  isInBox(e) {
    const boxOffset = $(this.scrollBox).offset();
    const scrollTop = $('html').scrollTop();
    const scrollLeft = $('html').scrollLeft();
    const boxH = $(this.scrollBox).height();
    const boxW = $(this.scrollBox).width();

    const y = e.clientY - boxOffset.top + scrollTop;
    const x = e.clientX - boxOffset.left + screenLeft;
    if (y < boxH && x < boxW) 
      return true;
    return false;
  }
  setVisible(visible) {
    const {alwaysVisible} = this.props;
    if(alwaysVisible) visible = true;
    this.setState({
      visible: visible,
      railStyle: Object.assign({}, this.state.railStyle, {
        opacity: visible
          ? this.props.railOpacity
          : 0
      }),
      barStyle: Object.assign({}, this.state.barStyle, {
        opacity: visible
          ? this.props.barOpacity
          : 0
      })
    })
  }
  setScroll() {
    if (!this.scrollBox) 
      throw new Error("scrollBox hasn't mounting")
    const getBarLength = (railH, ctxH, boxH) => {
      this.rate = ctxH / railH;
      return railH * boxH / ctxH;
    };
    const {railLength, railPly, barPly, direction} = this.props;
    let railStyle,
      barStyle;
    switch (direction) {
      case 'toBottom':
        this.setState({
          railStyle: Object.assign({}, this.state.railStyle, {
            width: railPly,
            height: railLength
          })
        }, () => this.setState({
          barStyle: Object.assign({}, this.state.barStyle, {
            top: 0,
            left: 0,
            right: 0,
            width: barPly,
            height: getBarLength($(this.scrollRail).height(), $(this.scrollCtx).height(), $(this.scrollBox).height())
          }),
          ctxStyle: {
            top: 0
          }
        }));
        break;
      case 'toTop':
        this.setState({
          railStyle: Object.assign({}, this.state.railStyle, {
            width: railPly,
            height: railLength
          })
        }, () => this.setState({
          barStyle: Object.assign({}, this.state.barStyle, {
            bottom: 0,
            left: 0,
            right: 0,
            width: barPly,
            height: getBarLength($(this.scrollRail).height(), $(this.scrollCtx).height(), $(this.scrollBox).height())
          }),
          ctxStyle: {
            bottom: 0
          }
        }));
        break;
      case 'toLeft':
        this.setState({
          railStyle: Object.assign({}, this.state.railStyle, {
            width: railLength,
            height: railPly
          })
        }, () => this.setState({
          barStyle: Object.assign({}, this.state.barStyle, {
            right: 0,
            bottom: 0,
            top: 0,
            width: getBarLength($(this.scrollRail).width(), $(this.scrollCtx).width(), $(this.scrollBox).width()),
            height: barPly
          }),
          ctxStyle: {
            right: 0
          }
        }));
        break;
      case 'toRight':
        this.setState({
          railStyle: Object.assign({}, this.state.railStyle, {
            width: railLength,
            height: railPly
          })
        }, () => this.setState({
          barStyle: Object.assign({}, this.state.barStyle, {
            top: 0,
            bottom: 0,
            left: 0,
            width: getBarLength($(this.scrollRail).width(), $(this.scrollCtx).width(), $(this.scrollBox).width()),
            height: barPly
          }),
          ctxStyle: {
            left: 0
          }
        }));
        break;
    }
  }
  setStyle() {
    if (!this.scrollBox) 
      throw new Error("scrollBox hasn't mounte or update")
    $(this.scrollRail).css(this.state.railStyle);
    $(this.scrollBar).css(this.state.barStyle);
    $(this.scrollCtx).css(this.state.ctxStyle);
  }
  setDA() {
    const {direction} = this.props;
    switch (direction) {
      case 'toBottom':
        this.direct = 'top';
        this.axis = 'Y';
        break;
      case 'toTop':
        this.direct = 'bottom';
        this.axis = 'Y';
        break;
      case 'toRight':
        this.direct = 'left';
        this.axis = 'X';
        break;
      case 'toLeft':
        this.direct = 'right';
        this.axis = 'X';
        break;
    }
  }
  getOffset() {
    const {direct, axis} = this;
    const railOffset = $(this.scrollRail).offset();
    const scrollTop = $('html').scrollTop();
    const scrollLeft = $('html').scrollLeft();
    const railL = axis === 'Y'
      ? $(this.scrollRail).height()
      : $(this.scrollRail).width();
    const barL = axis === 'Y'
      ? $(this.scrollBar).height()
      : $(this.scrollBar).width();
    return e => {
      const clickPosi = e[`client${axis}`];
      let offset;
      switch (direct) {
        case 'top':
          offset = clickPosi - railOffset.top + scrollTop - barL / 2;
          break;
        case 'bottom':
          offset = railL - clickPosi + railOffset.top - scrollTop + barL / 2;
          break;
        case 'left':
          offset = clickPosi - railOffset.left + scrollLeft - barL / 2;
          break;
        case 'right':
          offset = railL - clickPosi + railOffset.left + scrollLeft + barL / 2;
          break;
      }
      if (offset > railL - barL) 
        offset = railL - barL;
      if (offset < 0) 
        offset = 0;
      return offset;
    }
  }
  visibleHandle() {
    if (this.visibleTimer) 
      clearTimeout(this.visibleTimer)
    this.visibleTimer = setTimeout(() => {
      this.setVisible(false);
      clearTimeout(this.visibleTimer);
    }, 2000)
  }
  mouseEnterHandle = e => {
    this.setVisible(true);
    this.visibleHandle();
  }
  mouseLeaveHandle = e => {
    if (this.drag) 
      return;
    this.setVisible(false);
  }
  wheelHandleCall = () => {
    const {stepMax, throttleMax, barOpacity} = this.props;
    const {direct, axis} = this;
    let record,
      timer;
    const setTimer = () => {
      clearTimeout(timer);
      timer = null;
    };
    const getTime = x => {
      const t = Math.abs(x);
      const y = throttleMax / Math.PI * (Math.PI / 2 - Math.atan((t - 80) / 15));
      return y
    }
    const getStep = x => {
      const s = Math.abs(x);
      const y = (4 / Math.PI * (Math.PI / 2 - Math.atan(-s / 15)) - 2) * stepMax / 2;
      return y
    }
    const getTemp = e => {
      const temp = {};
      const s = getStep(e[`delta${axis}`])
      const step = e[`delta${axis}`] > 0
        ? s
        : -s;
      const limit = axis === 'Y'
        ? $(this.scrollRail).height() - $(this.scrollBar).height()
        : $(this.scrollRail).width() - $(this.scrollBar).width();
      record = Number.parseInt($(this.scrollBar).css(direct)) + step;
      temp[direct] = record + 'px';
      if (record < 0) {
        temp[direct] = 0;
        record = 0;
      } else if (record > limit) {
        temp[direct] = limit + 'px';
        record = limit;
      }
      return temp;
    };
    const setTemp = e => {
      const temp = getTemp(e);
      this.setState({
        barStyle: Object.assign({}, this.state.barStyle, temp, {opacity: barOpacity}),
        ctxStyle: Object.assign({}, this.state.ctxStyle, {
          [direct]: (-record) * this.rate + 'px'
        })
      })
    };
    return e => {
      this.setVisible(true);
      this.visibleHandle();
      e.preventDefault();
      e.stopPropagation();
      if (timer) 
        return;
      setTemp(e);
      timer = setTimeout(setTimer, getTime(e[`delta${axis}`]));
    }
  }
  clickHandleCall = () => {
    const offsetFun = this.getOffset()
    const {direct} = this;
    return e => {
      const offset = offsetFun(e);
      this.setState({
        barStyle: Object.assign({}, this.state.barStyle, {
          [direct]: offset + 'px'
        }),
        ctxStyle: Object.assign({}, this.state.ctxStyle, {
          [direct]: (-offset) * this.rate + 'px'
        })
      })
    }
  }
  stopDrag() {
    this.drag = false;
  }
  startDrag = e => {
    e.stopPropagation();
    e.preventDefault();
    this.drag = true;
    const moveHandle = this.dragHandleCall();
    const upHandle = e => {
      this.stopDrag();
      $('html').off('mousemove', moveHandle);
      $('html').off('mouseup', upHandle);
      this.setVisible(this.isInBox(e));
    }
    $('html').on('mousemove', moveHandle);
    $('html').on('mouseup', upHandle);
  }
  dragHandleCall = () => {
    const offsetFun = this.getOffset();
    const {direct} = this;
    let timer;
    const setTimer = () => {
      clearTimeout(timer);
      timer = null;
    };
    return e => {
      this.setVisible(true);
      this.visibleHandle();
      if (!this.drag) 
        return;
      const offset = offsetFun(e);
      this.setState({
        barStyle: Object.assign({}, this.state.barStyle, {
          [direct]: offset + 'px'
        }),
        ctxStyle: Object.assign({}, this.state.ctxStyle, {
          [direct]: (-offset) * this.rate + 'px'
        })
      })
      timer = setTimeout(setTimer, 50);
    }
  }
  componentDidUpdate() {
    this.setStyle();
  }
  componentWillMount() {
    // setVisible不涉及DOM的计算，放在willMount前
    this.setVisible(false);
  }
  componentDidMount() {
    this.setDA();
    this.setScroll();
    this.setStyle();
  }
  render() {
    const {alwaysVisible, enableSleep, wheelStep, touchScrollStep, children} = this.props;
    return (
      <div
        onMouseEnter={this.mouseEnterHandle}
        onMouseLeave={this.mouseLeaveHandle}
        onWheel={this.wheelHandleCall()}
        ref={scrollBox => this.scrollBox = scrollBox}
        className={classnames('hopeui-scrollBox', cssScroll.scroll)}>
        <div
          className={classnames('hopeui-scrollCtx', cssScroll.scrollCtx)}
          ref={scrollCtx => this.scrollCtx = scrollCtx}>
          {children}
        </div>
        <div
          ref={scrollRail => this.scrollRail = scrollRail}
          className={classnames('hopeui-scrollRail', cssScroll.scrollRail)}
          onClick={this.clickHandleCall()}>
          <div
            ref={scrollBar => this.scrollBar = scrollBar}
            className={classnames('hopeui-scrollBar', cssScroll.scrollBar)}
            onMouseDown={this.startDrag}/>
        </div>
      </div>
    )
  }
}
ScrollBox.propTypes = {
  // 轨道宽度
  railPly: PropTypes.string,
  // 轨道长度
  railLength: PropTypes.string,
  // 滑动块宽度
  barPly: PropTypes.string,
  // 轨道颜色
  railColor: PropTypes.string,
  // 滑动块颜色
  barColor: PropTypes.string,
  // 滑动条位置
  railPosition: PropTypes.object,
  // 滚动方向
  direction: PropTypes.string,
  // 滑动块透明度
  barOpacity: PropTypes.number,
  // 轨道透明度
  railOpacity: PropTypes.number,
  // 是否始终可见
  alwaysVisible: PropTypes.bool,
  // 是否睡眠
  enableSleep: PropTypes.bool,
  // 滚轮最大滚动距离
  stepMax: PropTypes.number,
  // 滚轮最大节流时间
  throttleMax: PropTypes.number,
  // 手势滑动距离
  touchScrollStep: PropTypes.number,
  cubicBezier: PropTypes.string,
  // 滑动块圆角
  barRadius: PropTypes.string,
  // 轨道圆角
  railRadius: PropTypes.string
}

ScrollBox.defaultProps = {
  railPly: '10px',
  railLength: '100%',
  barPly: '6px',
  railColor: 'grey300',
  barColor: 'grey700',
  railPosition: {
    right: '4px',
    top: '0'
  },
  direction: 'toBottom',
  barOpacity: 0.8,
  railOpacity: 1,
  alwaysVisible: false,
  enableSleep: true,
  stepMax: 30,
  throttleMax: 100,
  cubicBezier: 'cubic-bezier(.15,.27,0,1)',
  barRadius: '4px',
  railRadius: '4px'
}

export default ScrollBox;