import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

import { useDispatch, useSelector } from 'react-redux';
import { getBlogDetails } from '../../store/actions/blogActions';

import Loader from '../../components/Loader';

import classes from './BlogPostScreen.module.css';

const BlogPostScreen = ({ match, history }) => {
    const dispatch = useDispatch();
    const blogId = match.params.id;
    const blogDetails = useSelector(state => state.blogDetails);
    const { loading: loadingBlogDetails, blog } = blogDetails;

    useEffect(() => {
        if (!blog || blog._id !== blogId) {
            dispatch(getBlogDetails(blogId));
        }

    }, [dispatch, blog, blogId]);

    const getBackHandler = () => {
        history.push('/blog');
    };

    return (
        <div className={classes.screen_container}>
            {loadingBlogDetails || !blog ? <Loader /> : (
                <div className={classes.post_container}>
                    <h3>{blog.title}</h3>
                    <p>{blog.content}</p>
                    <ReactMarkdown source={blog.content} />
                </div>
            )}
            <button onClick={getBackHandler}>Go Back</button>
        </div>
    )
};

export default BlogPostScreen;