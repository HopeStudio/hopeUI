import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import cssCard from './card.less';

import { Browse, Comments } from '../icons/export';

function CardItem(props) {
  const {
    uuid,
    cover,
    avatar,
    title,
    description,
    author,
    hits,
    comments,
  } = props;

  return (
    <div className={classnames(cssCard.card, `card-${uuid}`)}>
      <div className={cssCard.cardContent}>
        <div className={cssCard.coverContainer}>
          <div
            className={cssCard.cover}
            style={{ backgroundImage: `url("${cover}")` }}
          />
        </div>
        <div className={cssCard.info}>
          <div className={cssCard.title}>{title}</div>
          <div className={cssCard.description}>{description}</div>
        </div>
        <div className={cssCard.item}>
          <div className={cssCard.author}>
            <div
              className={cssCard.avatar}
              style={{ backgroundImage: `url(${avatar})` }}
            />
            <div className={cssCard.authorName}>{author}</div>
          </div>
          <div className={cssCard.record}>
            <div className={cssCard.hits}>
              <Browse />
              {hits}
            </div>
            <div className={cssCard.comments}>
              <Comments />
              {comments}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

CardItem.propTypes = {
  uuid: PropTypes.string.isRequired,
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
  description: '',
  cover: './dist/card/cover.jpg',
  avatar: './dist/card/avatar.png',
  author: '匿名',
  hits: 0,
  comments: 0,
};

export default CardItem;
