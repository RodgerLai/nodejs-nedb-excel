import React, { PropTypes } from 'react';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card';
import translate from '../../i18n/Translate';
import { getSortedWellPosts, getSortedNotWellPosts, getSortedIdeasPosts } from '../../selectors';
import style from './SummaryBoard.scss';

const stateToProps = state => ({
    wellPosts: getSortedWellPosts(state),
    notWellPosts: getSortedNotWellPosts(state),
    ideasPosts: getSortedIdeasPosts(state)
});

const Post = ({ post }) => (
    <li key={post.id}>
        <span className={style.like}>+{post.likes.length}</span>&#9;
        <span className={style.dislike}>-{post.dislikes.length}</span>&#9;
        {post.content}
    </li>
);

Post.propTypes = {
    post: PropTypes.object
};

const PostType = ({ label, className, posts }) => {
    if (!posts.length) {
        return null;
    }
    return (
        <div style={{ margin: 30 }}>
            <Card>
                <CardTitle className={className}>{ label }</CardTitle>
                <CardText>
                    <ul style={{ marginLeft: 0, marginTop: 20, listStyleType: 'none' }}>
                        { posts.map(post => (
                            <Post post={post} />
                        )) }
                    </ul>
                </CardText>
            </Card>
        </div>
    );
};

PostType.propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    posts: PropTypes.array
};

const SummaryBoard = ({ wellPosts, notWellPosts, ideasPosts, strings }) => {
    if (!wellPosts.length && !notWellPosts.length && !ideasPosts.length) {
        return (
            <div className={style.summary}>
                <h4 style={{ textAlign: 'center', marginTop: 50 }}>{strings.noPosts}</h4>
            </div>
        );
    }
    return (
        <div className={style.summary}>
            <PostType
              posts={wellPosts}
              className={style.well}
              label={strings.wellQuestion}
            />
            <PostType
              posts={notWellPosts}
              className={style.notWell}
              label={strings.notWellQuestion}
            />
            <PostType
              posts={ideasPosts}
              className={style.ideas}
              label={strings.ideasQuestion}
            />
        </div>
    );
};

SummaryBoard.propTypes = {
    wellPosts: PropTypes.array.isRequired,
    notWellPosts: PropTypes.array.isRequired,
    ideasPosts: PropTypes.array.isRequired,
    strings: PropTypes.object
};

SummaryBoard.defaultProps = {
    wellPosts: [],
    notWellPosts: [],
    ideasPosts: [],
    strings: {
        notWellQuestion: 'What could be improved?',
        wellQuestion: 'What went well?',
        ideasQuestion: 'A brilliant idea to share?',
        vote: 'vote',
        votes: 'votes',
        noPosts: 'There are no posts to display'
    }
};

const decorators = flow([
    connect(stateToProps),
    translate('PostBoard'),
    translate('SummaryBoard'),
    translate('Post')
]);

export default decorators(SummaryBoard);
