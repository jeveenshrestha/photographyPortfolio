import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Assets
import classes from './HomeScreen.module.css';
import me from '../../assets/icons/me.JPG';
import skyline from '../../assets/icons/skyline.jpg'

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getBlogs } from '../../store/actions/blogActions';
import { getImages } from '../../store/actions/imageActions';
import Loader from '../../components/Loader';

const HomeScreen = () => {

    const dispatch = useDispatch();

    const blogList = useSelector((state) => state.blogList);
    const { loading: loadingBlogs, blogs } = blogList;

    const imageList = useSelector((state) => state.imageList);
    const { loading: loadingImages, images } = imageList;

    useEffect(() => {
        dispatch(getBlogs(null, 3));
        dispatch(getImages(null, 6));
    }, [dispatch]);

    return (
        <div className={classes.screen_container}>
            <div className={classes.slide}>
                <div className={classes.greySquare}>
                    <h1 className={classes.title}>Jeveen Shrestha</h1>
                    <h1 className={classes.title}>Photography</h1>
                </div>
                <img className={classes.slide_image} src={me} alt="me" />
            </div>
            <div className={classes.blogSlide}>
                <img className={classes.blogSlide_image} src={skyline} alt="skyline" />
                <div className={classes.blogs_container}>
                    {loadingBlogs || !blogs ? <Loader /> : blogs.map((post, idx) => (
                        <div className={classes.blog_card} key={idx}>
                            {post.image ? (<>
                                <div className={classes.image_clipper}>
                                    <img className={classes.blog_image} src={post.image} alt={post.image} />
                                </div>
                                <p>{post.description}</p>
                            </>) : <Loader />}
                        </div>
                    ))}
                </div>
                <Link className={classes.link2} to='/blog'> - More</Link>
            </div>
            <div className={classes.imagesSlide_container}>
                {loadingImages || !images ? (
                    <Loader />
                ) : (
                    images.map((item, idx) => (
                        <div key={idx}>
                            <img
                                className={classes.imagesSlide_image}
                                src={item.src[0]}
                                alt={item.alt}
                            />
                        </div>
                    ))
                )}
                <div className={classes.imagesSlide_bottom}>
                    <Link className={classes.link} to='/gallery'>
                        - More
                    </Link>
                </div>
            </div>
            <div className={classes.actionSlide_container}>
                <h1>Show The World</h1>
                <h2>What you're made of</h2>

                <button>Get Started</button>
            </div>
        </div>
    );
}

export default HomeScreen;