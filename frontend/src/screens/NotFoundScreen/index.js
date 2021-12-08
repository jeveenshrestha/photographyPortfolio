import React from 'react';

import classes from './NotFoundScreen.module.css';

const NotFoundScreen = () => {

    return (
        <div className={classes.screen_container}>
            <i 
            className="fas fa-surprise" 
            style={{fontSize: '10rem', padding: "0 0 50px 0"}}
            ></i>
            <h1>Page not Found !!</h1>
        </div>
    )
};

export default NotFoundScreen;