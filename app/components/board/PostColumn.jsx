import React, { PropTypes } from 'react';
import noop from 'lodash/noop';
import Post from './Post';
import PostAdd from './PostAdd';
import icons from '../../constants/icons';
import style from './PostBoard.scss';

const PostColumn = ({ currentUser, posts, type, icon, placeholder, onAdd, onDelete,
                      onLike, onUnlike, onEdit }) =>
(
    <div>
        <PostAdd
          onAdd={text => onAdd(type, text)}
          placeholder={placeholder}
          icon={icon}
        />
        <div className={style.columnContent}>
            { posts.map((post, index) =>
                <Post
                  key={index}
                  currentUser={currentUser}
                  post={post}
                  onLike={onLike}
                  onUnlike={onUnlike}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
            )}
        </div>
    </div>
);

PostColumn.propTypes = {
    currentUser: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    icon: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    onAdd: PropTypes.func,
    onDelete: PropTypes.func,
    onLike: PropTypes.func,
    onUnlike: PropTypes.func,
    onEdit: PropTypes.func
};

PostColumn.defaultProps = {
    currentUser: null,
    posts: [],
    type: 'well',
    icon: icons.add_circle,
    placeholder: 'New Comment',
    onAdd: noop,
    onDelete: noop,
    onLike: noop,
    onUnlike: noop,
    onEdit: noop
};

export default PostColumn;
