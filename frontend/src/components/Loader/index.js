import React from 'react';
import classes from './Loader.module.css';
import styled from 'styled-components';

const BaseLoader = ({ className, children }) => (
    <div className={className}>{children}</div>
);

const StyledLoader = styled(BaseLoader)`
    width: ${props => props.width || "5em"};
    height: ${props => props.height || "5em"};
    :before {
        background: ${(props) => props.beforeColor || "#3d5aaf"};
    }
    :after {
        background: ${(props) => props.afterColor || "white"};
    }
`;

const Loader = ({ beforeColor, afterColor, width, height }) => {
    return <StyledLoader
        className={classes.loader}
        beforeColor={beforeColor}
        afterColor={afterColor}
        width={width}
        height={height}
    >
        Loading...
    </StyledLoader>
};

export default Loader;