import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import $ from 'jQuery';

import cssCard from './card.less';
import uuid from '../tools/uuid';
import colorTrans from '../tools/colorTrans';
import CardItem from './cardItem';

class Card extends React.Component {
  static Item = CardItem;

  componentWillMount() {
    this.uuid = uuid(8);
    this.props.data.forEach((item) => { item.uuid = uuid(8); });
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

  componentDidUpdate() {
    this.clearStyle();
    this.setWidth();
    this.setStyle();
  }

  componentWillUnmount() {
    this.clearStyle();
  }

  setWidth() {
    let { columns } = this.props;
    const { minWidth } = this.props;
    const width = $(this.ele).innerWidth();
    if (width / columns < minWidth) columns = Math.floor(width / minWidth);
    if (columns === this.columns) return;

    this.columns = columns;
    $(`#${this.widthId}`).remove();
    this.widthId = colorTrans(
      { width: `${(1 / columns) * 100}%` },
      `.cardContainer-${this.uuid} .${cssCard.card}`,
    );
  }


  setStyle() {
    const {
      fontColor,
      mainColor,
      anxiliaryColor,
      embellishmentColor,
      coverRatio,
    } = this.props;

    const { styleId } = this;

    // 设置边框颜色
    styleId.push(colorTrans(
      { 'border-color': anxiliaryColor },
      `.cardContainer-${this.uuid} .${cssCard.item}`,
    ));

    // 设置背景色
    styleId.push(colorTrans(
      {
        background: mainColor,
        color: fontColor,
      },
      `.cardContainer-${this.uuid} .${cssCard.cardContent}`,
    ));

    // 设置 hover 样式
    styleId.push(colorTrans(
      {
        color: embellishmentColor,
      },
      `.cardContainer-${this.uuid} .${cssCard.cardContent}:hover .${cssCard.title}`,
    ));

    // 设置封面图片长宽比
    styleId.push(colorTrans(
      { 'padding-bottom': `${coverRatio * 100}%` },
      `.cardContainer-${this.uuid} .${cssCard.cover}`,
    ));
  }

  clearStyle() {
    this.styleId.forEach(id => $(`#${id}`).remove());
    this.styleId = [];
    $(this.widthId).remove();
    this.widthId = undefined;
  }


  styleId = [];

  render() {
    const {
      data,
      className: propClassName,
      showAuthor,
      description,
      hits,
      comments,
      coverBorder,
      roundAvatar,
      hover,
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
              [cssCard.roundAvatar]: roundAvatar,
              [cssCard.coverBorder]: coverBorder,
              [cssCard.hiddenItem]: !showAuthor,
            },
            ...hover.map(name => cssCard[name]),
          )
        }
        ref={(ele) => { this.ele = ele; }}
      >
        {data.map(item => (
          <Card.Item
            {...item}
            showAuthor={showAuthor}
            key={item.uuid}
          />
        ))}
      </div>
    );
  }
}

const itemData = PropTypes.shape({
  // 标题
  title: PropTypes.string.isRequired,
  // 描述
  description: PropTypes.string,
  // 封面地址
  cover: PropTypes.string,
  // 作者头像地址
  avatar: PropTypes.string,
  // 作者名称
  author: PropTypes.string,
  // 点击数
  hits: PropTypes.number,
  // 评论数
  comments: PropTypes.number,
});

const hoverEffect = PropTypes.oneOf([
  // 图片放大
  'PicZoom',
  // 图片变亮
  'PicBrighten',
  // 浮动
  'Float',
  // 阴影
  'Shadow',
]);

Card.propTypes = {
  className: PropTypes.string,
  // 数据
  data: PropTypes.arrayOf(itemData),
  // 列数
  columns: PropTypes.number.isRequired,
  // 最小卡片宽度
  minWidth: PropTypes.number,
  // 封面纵横比
  coverRatio: PropTypes.number,
  // 封面图片 hover 效果
  hover: PropTypes.arrayOf(hoverEffect),
  // 是否显示作者栏
  showAuthor: PropTypes.bool,
  // 字体颜色
  fontColor: PropTypes.string,
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
  // 主色
  mainColor: PropTypes.string,
  // 辅助色
  anxiliaryColor: PropTypes.string,
  // 点缀色
  embellishmentColor: PropTypes.string,
};

Card.defaultProps = {
  className: '',
  data: [],
  minWidth: 215,
  coverRatio: 0.75,
  hover: ['Float', 'Shadow'],
  fontColor: 'black',
  coverBorder: false,
  showAuthor: true,
  roundAvatar: false,
  description: false,
  hits: false,
  comments: false,
  mainColor: 'white',
  anxiliaryColor: 'orange500',
  embellishmentColor: 'orange900',
};

export default Card;
