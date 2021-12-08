import React from 'react';
import classes from './FormField.module.css';

const FormField = (props) => {
    const { label, type, config, value, changed } = props;

    let inputElement = null;

    switch (type) {
        case 'input':
            inputElement = (
                <input
                    className={classes.text}
                    {...config}
                    value={value}
                    onChange={changed}
                />
            )
            break
        case 'textarea':
            inputElement = (
                <textarea
                    className={classes.text}
                    {...config}
                    value={value}
                    onChange={changed}
                />
            )
            break
        default:
            inputElement = (
                <textarea
                    className={classes.text}
                    {...config}
                    value={value}
                    onChange={changed}
                />
            )
    };

    return <div className={classes.input}>
        <label className={classes.label}>{label}</label>
        {inputElement}
    </div>
}

export default FormField;