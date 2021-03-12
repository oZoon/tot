import React from 'react';
import './button.css';

export default (props) => {
    return (
        <button
            className={props.className || 'btn'}
            onClick={() => props.pressButton()}
        >
            {props.children}
        </button>
    )
};
