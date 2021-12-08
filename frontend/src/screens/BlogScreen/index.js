import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getBlogs } from '../../store/actions/blogActions';

import classes from './BlogScreen.module.css';

import Loader from '../../components/Loader';

const BlogScreen = () => {
    const dispatch = useDispatch();
    const blogList = useSelector(state => state.blogList);
    const { loading: loadingBlogs, blogs } = blogList;

    useEffect(() => {
        dispatch(getBlogs(null, 100));
    }, [dispatch]);

    return (
        <div className={classes.screen_container}>
            <div className={classes.blogs_container}>
                {
                    loadingBlogs || !blogs ? (
                        <Loader />) : (
                        blogs.map((post, idx) => (
                            <div className={classes.blog_card} key={idx}>
                                {
                                    post.image ? (
                                        <>
                                            <div className={classes.image_clipper}>
                                                <img
                                                    className={classes.blog_image}
                                                    src={post.image}
                                                    alt={post.image}
                                                />
                                            </div>
                                            <p>{post.description}</p>
                                            <Link
                                                className={classes.link}
                                                to={`/blog/${post._id}`}
                                            > - Read</Link>
                                        </>
                                    ) : <Loader afterColor="white" />
                                }
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    )
};

export default BlogScreen;