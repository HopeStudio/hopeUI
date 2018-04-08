import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import $ from 'jQuery';

import colors from '../rules/colors.js';
import cssCard from './card.less';
import uuid from '../tools/uuid.js';
import colorTrans from '../tools/colorTrans.js';
import CardItem from './cardItem.js';

class Card extends React.Component {
  static Item = CardItem;

  setStyle() {
    const {
      normalCardStyle,
      hoverCardStyle,
      hoverCoverStyle,
      cover,
      avatar,
      columns,
      coverRatio,
    } = this.props;

    if (normalCardStyle.color) {
      colorTrans(
        { 'border-color': normalCardStyle.color },
        `.cardContainer-${this.uuid} .${cssCard.info}::after`
      );
    }

    colorTrans(normalCardStyle, `.cardContainer-${this.uuid} .${cssCard.cardContent}`);
    colorTrans(hoverCardStyle, `.cardContainer-${this.uuid} .${cssCard.cardContent}:hover`);
    colorTrans(
      hoverCoverStyle,
      `.cardContainer-${this.uuid} .${cssCard.card}:hover .${cssCard.cover}`
    );
    colorTrans(
      { 'padding-bottom': `${coverRatio * 100}%` },
      `.cardContainer-${this.uuid} .${cssCard.cover}`
    );
  }

  setWidth() {
    let { columns, minWidth } = this.props;
    let width = $(this.ele).innerWidth();
    if (width / columns < minWidth) columns = Math.floor(width / minWidth);
    if (columns == this.columns) return;

    $(`#${this.widthId}`).remove();
    this.widthId = colorTrans(
      { width: `${1 / columns * 100}%` },
      `.cardContainer-${this.uuid} .${cssCard.card}`
    );
  }

  componentWillMount() {
    this.uuid = uuid(8);
    this.props.data.forEach(item => item.uuid = uuid(8));
    this.setStyle();
  }

  componentDidMount() {
    this.setWidth();
    this.timer = false;
    window.addEventListener('resize', () => {
      if (this.timer) return;
      this.timer = true;
      setTimeout(() => {
        this.setWidth();
        this.timer = false;
      }, 1000);
    });
  }

  render() {
    const {
      data,
      className: propClassName,
      description,
      hits,
      comments,
    } = this.props;

    return (
      <div
        className={
          classnames(
            propClassName,
            cssCard.cardContainer,
            `cardContainer-${this.uuid}`,
            {
              [cssCard.hiddenDescription]: !description,
              [cssCard.hiddenHits]: !hits,
              [cssCard.hiddenComments]: !comments,
            }
          )
        }
        ref={ele => this.ele = ele}
      >
        {data.map(item => <Card.Item {...item} key={item.uuid}/>)}
      </div>
    );
  }
}

Card.propTypes = {
  // 数据
  data: PropTypes.arrayOf(PropTypes.object),

  // 列数
  columns: PropTypes.number.isRequired,

  // 最小卡片宽度
  minWidth: PropTypes.number,

  // 封面纵横比
  coverRatio: PropTypes.number,

  // 封面图片是否受内边距限制
  coverBorder: PropTypes.bool,

  // 是否将头像裁剪为圆形
  roundAvatar: PropTypes.bool,

  // 是否显示描述
  description: PropTypes.bool,

  // 是否显示点击数
  hits: PropTypes.bool,

  // 是否显示评论数
  comments: PropTypes.bool,

  // 卡片样式
  normalCardStyle: PropTypes.object,

  // 鼠标悬停卡片样式
  hoverCardStyle: PropTypes.object,

  // 鼠标悬停封面样式
  hoverCoverStyle: PropTypes.object,
};

Card.defaultProps = {
  data: [],
  columns: 6,
  minWidth: 200,
  coverRatio: .75,
  coverBorder: false,
  roundAvatar: true,
  description: false,
  hits: false,
  comments: false,
  normalCardStyle: {
    background: 'white',
    color: 'grey900',
  },
  hoverCardStyle: {
    background: 'white',
    color: 'grey900',
  },
  hoverCoverStyle: {
    opacity: .8,
  },
};

export default Card;
