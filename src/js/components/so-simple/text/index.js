import React from 'react';
import './text.css';

export default props => {
    let result;
    props.className ?
        result = (
            <span
                style={props.style || null}
                className={props.className || 'text'}
                onClick={() => props.onClick ? props.data ? props.onClick(props.data) : props.onClick() : null}
            >
                {props.children}
            </span>
        ) :
        result = null;
    return result;
};
