import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_BLOG_RESET } from '../../store/constants/blogConstants';
import { getBlogDetails, updateBlog } from '../../store/actions/blogActions';

import FormField from '../../components/FormField';
import classes from './EditBlogScreen.module.css';

const EditBlogScreen = ({ match, history }) => {
    const blogId = match.params.id;

    const dispatch = useDispatch();
    const { blog } = useSelector(state => state.blogDetails);
    const { success: successUpdate } = useSelector(state => state.blogUpdate);

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: UPDATE_BLOG_RESET });
            history.push('/admin');
        } else {
            if (!blog || blogId !== blog._id) {
                dispatch(getBlogDetails(blogId));
            } else {
                setFormState({
                    title: blog.title,
                    image: blog.image,
                    content: blog.content,
                    description: blog.description,
                })
            }
        }
    }, [dispatch, blog, history, blogId, successUpdate]);

    // Form State

    const [formState, setFormState] = useState({
        title: "",
        image: "",
        content: "",
        description: "",
    });

    const formConfig = {
        title: {
            type: 'input',
            config: { type: "text", placeholder: 'Blog title' },
        },
        image: {
            type: 'input',
            config: { type: "text", placeholder: 'Blog image' },
        },
        content: {
            type: 'textarea',
            config: { type: "text", placeholder: 'Blog content' },
        },
        description: {
            type: 'input',
            config: { type: "text", placeholder: 'Blog description' },
        },
    };

    const formElements = [];
    for (let key in formState) {
        formElements.push({ id: key, setup: formConfig[key], values: formState[key] });
    };

    const inputChangedHandler = (event, inputIdentifier) => {
        formElements.forEach((formElement) => {
            if (inputIdentifier === formElement.id) {
                setFormState({
                    ...formState,
                    [inputIdentifier]: event.target.value,
                })
            }
        })
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateBlog({
            _id: blogId,
            title: formState.title,
            image: formState.image,
            content: formState.content,
            description: formState.description,
        }))
    };

    const goBackHandler = () => {
        history.push("/login");
    }

    return (
        <div className={classes.screen_container}>
            <button onClick={goBackHandler}>Go Back</button>
            <h2>Edit Blog</h2>

            <form onSubmit={submitHandler} className={classes.form} >
                {formElements.map(formElement => (
                    <FormField
                        key={formElement.id}
                        type={formElement.setup.type}
                        config={formElement.setup.config}
                        value={formElement.value}
                        changed={(event) => inputChangedHandler(event, formElement.id)}
                    />
                ))}
                <button type="submit">Submit</button>
            </form>
        </div>
    )
};

export default EditBlogScreen;

