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
    <div className={classnames(cssCard.card, 'card', `card-${uuid}`)}>
      <div className={classnames(cssCard.cardContent, 'cardContent')}>
        <div className={classnames(cssCard.coverContainer, 'coverContainer')}>
          <div
            className={classnames(cssCard.cover, 'cover')}
            style={{ backgroundImage: `url("${cover}")` }}
          />
        </div>
        <div className={classnames(cssCard.info, 'info')}>
          <div className={classnames(cssCard.title, 'title')}>{title}</div>
          <div className={classnames(cssCard.description, 'description')}>{description}</div>
        </div>
        <div className={classnames(cssCard.item, 'item')}>
          <div className={classnames(cssCard.author, 'author')}>
            <div
              className={classnames(cssCard.avatar, 'avatar')}
              style={{ backgroundImage: `url(${avatar})` }}
            />
            <div className={classnames(cssCard.authorName, 'authorName')}>{author}</div>
          </div>
          <div className={classnames(cssCard.record, 'record')}>
            <div className={classnames(cssCard.hits, 'hits')}>
              <Browse />
              {hits}
            </div>
            <div className={classnames(cssCard.comments, 'comments')}>
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
