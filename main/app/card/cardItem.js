import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import $ from 'jQuery';

import colors from '../rules/colors.js';
import cssCard from './card.less';
import uuid from '../tools/uuid.js';
import colorTrans from '../tools/colorTrans.js';

import { Browse, Comments } from '../icons/export';

class CardItem extends React.Component {
  setStyle() {
    const { cover, avatar } = this.props;

    colorTrans(
      { 'background-image': `url("${cover}")` },
      `.card-${this.uuid} .${cssCard.cover}`
    );

    colorTrans(
      { 'background-image': `url("${avatar}")` },
      `.card-${this.uuid} .${cssCard.avatar}`
    );
  }

  componentWillMount() {
    this.uuid = this.props.uuid;
    this.setStyle();
  }

  render() {
    const {
      title,
      coverBorder,
      description,
      author,
      hits,
      comments,
    } = this.props;

    return (
      <div className={classnames(cssCard.card, `card-${this.uuid}`)}>
        <div className={classnames(cssCard.cardContent)}>
          <div className={classnames(cssCard.coverContainer, { coverBorder: coverBorder })}>
            <div className={classnames(cssCard.cover)}/>
            <div className={classnames(cssCard.info)}>
              <div className={classnames(cssCard.title)}>{title}</div>
              <div className={classnames(cssCard.description)}>{description}</div>
            </div>
            <div className={classnames(cssCard.item)}>
              <div className={classnames(cssCard.author)}>
                <div className={cssCard.avatar}/>
                <div className={cssCard.authorName}>{author}</div>
              </div>
              <div className={classnames(cssCard.record)}>
                <div className={classnames(cssCard.hits)}>
                  <Browse/>
                  {hits}
                </div>
                <div className={classnames(cssCard.comments)}>
                  <Comments/>
                  {comments}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CardItem.propTypes = {
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
};

CardItem.defaultProps = {
  title: '崔霄是真的帅',
  description: '',
  cover: './dist/card/cover.jpg',
  avatar: './dist/card/avatar.png',
  author: '匿名',
  hits: 0,
  comments: 0,
};

export default CardItem;
