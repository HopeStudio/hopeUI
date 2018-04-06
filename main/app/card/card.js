import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import $ from 'jQuery';

import colors from '../rules/colors.js';
import cssCard from './card.less';
import uuid from '../tools/uuid.js';
import colorTrans from '../tools/colorTrans.js';

class Card extends React.Component {
  setStyle() {
    const {
      normalCardStyle,
      hoverCardStyle,
      hoverCoverStyle,
      cover,
      avatar,
      columns,
      coverRatio
    } = this.props;
    normalCardStyle.width = `${ 1 / columns * 100}%`;
    colorTrans(normalCardStyle, `.card-${this.uuid}`);
    console.log(normalCardStyle)
    colorTrans(hoverCardStyle, `.card-${this.uuid}:hover`);
    colorTrans(hoverCoverStyle, `.card-${this.uuid}:hover .${cssCard.cover}`);

    colorTrans({
      'background-image': `url(${cover})`,
      'padding-bottom': `${coverRatio * 100}%`
    }, `.card-${this.uuid} .${cssCard.cover}`);

    colorTrans({
      'background-image': `url(${avatar})`
    }, `.card-${this.uuid} .${cssCard.avatar}`);
  }

  componentWillMount() {
    this.uuid = uuid(8);
    this.setStyle();
  }

  componentDidMount() {
    const {areaStyle, title} = this.props;
  }

  render() {
    const {
      title,
      className: propClassName,
      coverBorder,
      description,
      author,
      hits,
      comments
    } = this.props;

    let descripEle = null;
    let desEle = null;
    let hitsEle = null;
    let commentsEle = null;

    if (description !== false) {
      descripEle = <div className={classnames(cssCard.description)}>{description}</div>;
    }

    if (hits !== false) {
      hitsEle = <div className={classnames(cssCard.hits)}>{hits}</div>;
    }

    if (comments !== false) {
      commentsEle = <div className={classnames(cssCard.comments)}>{comments}</div>;
    }

    return (
      <div className={classnames(propClassName, cssCard.card, `card-${this.uuid}`)}>
        <div className={classnames(cssCard.cardContent)}>
          <div className={classnames(cssCard.coverContainer, {coverBorder: coverBorder})}>
            <div className={classnames(cssCard.cover)}/>
            <div className={classnames(cssCard.info)}>
              <div className={classnames(cssCard.title)}>{title}</div>
              {descripEle}
            </div>
            <div className={classnames(cssCard.item)}>
              <div className={classnames(cssCard.author)}>
                <div className={cssCard.avatar}/>
                <div className={cssCard.authorName}>{author}</div>
              </div>
              <div className={classnames(cssCard.record)}>
                {hitsEle}
                {commentsEle}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  // 列数
  columns: PropTypes.number.isRequired,

  // 标题
  title: PropTypes.string.isRequired,

  // 描述
  description: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

  // 封面地址
  cover: PropTypes.string,

  // 封面纵横比
  coverRatio: PropTypes.number,

  // 封面图片是否受内边距限制
  coverBorder: PropTypes.bool,

  // 作者头像地址
  avatar: PropTypes.string,

  // 作者名称
  author: PropTypes.string,

  // 点击数
  hits: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),

  // 评论数
  comments: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),

  // 卡片样式
  normalCardStyle: PropTypes.object,

  // 鼠标悬停卡片样式
  hoverCardStyle: PropTypes.object,

  // 鼠标悬停封面样式
  hoverCoverStyle: PropTypes.object
};

Card.defaultProps = {
  description: false,
  columns: 4,
  title: '崔霄是真的帅',
  cover: './dist/card/cover.jpg',
  coverRatio: .75,
  coverBorder: false,
  avatar: './dist/card/avatar.png',
  author: '匿名',
  hits: false,
  comments: false,
  normalCardStyle: {
    background: 'white',
    color: 'grey900'
  },
  hoverCardStyle: {
    background: 'white',
    color: 'grey900'
  },
  hoverCoverStyle: {
    opacity: .8
  }
};

export default Card;
