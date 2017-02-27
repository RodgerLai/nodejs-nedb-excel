import React, { PropTypes } from 'react';
import noop from 'lodash/noop';
import { Card, CardText, CardActions } from 'react-toolbox/lib/card';
import { default as Button } from 'react-toolbox/lib/button';
import classNames from 'classnames';
import EditableLabel from '../EditableLabel';
import style from './Post.scss';
import icons from '../../constants/icons';
import translate from '../../i18n/Translate';

const canVote = (post, currentUser) =>
    post.likes.indexOf(currentUser) === -1 &&
    post.dislikes.indexOf(currentUser) === -1 &&
    currentUser !== post.user;

const canEdit = (post, currentUser) => currentUser === post.user;

const renderDelete = (post, currentUser, strings, onDelete) => {
    if (currentUser === post.user) {
        return (
            <Button
              icon={ icons.delete_forever }
              label={ strings.deleteButton }
              raised
              className={ style.deleteButton }
              onClick={ () => onDelete(post) }
            />
        );
    }

    return null;
};

const renderButton = (post, currentUser, name, icon, className, onClick) => {
    const canUserVote = canVote(post, currentUser);
    const votes = post[name].length;
    const label = votes ? votes.toString() : '-';
    const classNameFinal = classNames(className, canUserVote ? null : style.disabled);
    const visible = canUserVote || votes > 0;

    if (!visible) {
        return null;
    }
    return (
        <Button
          icon={icon}
          label={label}
          onClick={canUserVote ? onClick : noop}
          raised={canUserVote}
          className={classNameFinal}
          disabled={!canUserVote}
        />
    );
};

const Post = ({ post, currentUser, onEdit, onLike, onUnlike, onDelete, strings }) => (
    <div className={classNames(style.post, style[post.postType])}>
        <Card raised className={style.card}>
            <CardText>
                <EditableLabel
                  value={post.content}
                  readOnly={!canEdit(post, currentUser)}
                  placeholder={strings.noContent}
                  onChange={v => onEdit(post, v)}
                />
            </CardText>
            <CardActions>
                <div className={style.actions}>
                    { renderButton(post, currentUser,
                        'likes',
                        icons.thumb_up,
                        style.like,
                        () => onLike(post)) }
                    { renderButton(post, currentUser,
                        'dislikes',
                        icons.thumb_down,
                        style.dislike,
                        () => onUnlike(post)) }
                    { renderDelete(post, currentUser, strings, onDelete) }
                </div>
            </CardActions>
        </Card>
    </div>
);

Post.propTypes = {
    post: PropTypes.object.isRequired,
    currentUser: PropTypes.string.isRequired,
    onDelete: PropTypes.func,
    onLike: PropTypes.func,
    onUnlike: PropTypes.func,
    onEdit: PropTypes.func,
    strings: PropTypes.object
};

Post.defaultProps = {
    post: null,
    currentUser: null,
    onDelete: noop,
    onLike: noop,
    onUnlike: noop,
    onEdit: noop,
    strings: {
        deleteButton: 'Delete',
        noContent: '(This post has no content)'
    }
};

export default translate('Post')(Post);
