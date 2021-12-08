import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import classes from '../AdminScreen.module.css';

import { useDispatch, useSelector } from 'react-redux';
import {
    createBlog,
    deleteBlog,
    getBlogs,
} from '../../../store/actions/blogActions';

import { CREATE_BLOG_REQUEST, CREATE_BLOG_RESET } from '../../../store/constants/blogConstants';

const BlogSection = (props) => {
    const { history } = props;
    const dispatch = useDispatch();

    const blogCreate = useSelector((state) => state.blogCreate);
    const { success: successCreateBlog, blog: createdBlog } = blogCreate;

    const blogList = useSelector((state) => state.blogList);
    const { loading: loadingBlogs, blogs } = blogList;

    const blogDelete = useSelector((state) => state.blogDelete);
    const { success: successBlogDelete, } = blogDelete;

    const createBlogHandler = (e) => {
        e.preventDefault();
        dispatch(createBlog());
     };

    const deleteBlogHandler = (id) => { 
        if(window.confirm('Are you sure?')) {
            dispatch(deleteBlog(id));
        }
    };

    const editBlogHandler = (id) => { 
        if(id) {
            history.push(`/admin/blog/${id}/edit`);
        }
    };

    useEffect(() => {
        dispatch({ type: CREATE_BLOG_RESET });
        dispatch(getBlogs(null, 100));

        if (successCreateBlog) {
            history.push(`/admin/blog/${createdBlog._id}/edit`)
        }
    }, [dispatch, history, successCreateBlog, createdBlog, successBlogDelete])

    return <div className={classes.section_container}>
        <div className={classes.controls_container}>
            <div>
                <button onClick={createBlogHandler}>Add a Blog</button>
            </div>
        </div>

        <div className={classes.blogs_container}>
            {loadingBlogs || !blogs ? (
                <div>...loading...</div>
            ) : (
                blogs.map((post, idx) => (
                    <div className={classes.blog_card} key={idx}>
                        {post.image ? (
                            <>
                                <div className={classes.image_clipper}>
                                    <img className={classes.blog_image} src={post.image} alt={post.image} />
                                </div>
                                <p>{post.description}</p>
                                <button onClick={() => deleteBlogHandler(post._id)}>Delete</button>
                                <button onClick={() => editBlogHandler(post._id)}>Edit</button>
                            </>
                        ) : <div>...Loading...</div>}
                    </div>
                ))
            )}
        </div>
    </div>
};

export default withRouter(BlogSection);