import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Footer.module.css';

const Footer = () => {
    const iconStyle = { color: "white", fontSize: "3.2rem", margin: "10px 4vw" };

    const navItems = [
        { to: "/", name: "Home" },
        { to: "/gallery", name: "Gallery" },
        { to: "/blog", name: "Blog" },
    ];

    return (
        <div className={classes.footer_container}>
            <ul>
                {navItems.map((item, idx) => (
                    <li key={idx}>
                        <Link to={item.to}>
                            <p>{item.name}</p>
                        </Link>
                    </li>
                ))}
                <div className={classes.icon_container}>
                    <a href='//www.instagram.com'>
                        <i className='fab fa-instagram' style={iconStyle}></i>
                    </a>
                    <a href='//www.twitter.com'>
                        <i className='fab fa-twitter' style={iconStyle}></i>
                    </a>
                    <a href='//www.facebook.com'>
                        <i className='fab fa-facebook-square' style={iconStyle}></i>
                    </a>
                </div>
                <li className={classes.largerLink}>
                    <Link to="/contact">
                        <p>Contact Me</p>
                    </Link>
                </li>
            </ul>
        </div>
    )
};

export default Footer;