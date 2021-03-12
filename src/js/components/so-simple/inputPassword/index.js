import React from 'react';
import './input.css';

export default (props) => {
    return (
        <input
            className="input-password"
            type="text"
            autoComplete="off"
            onKeyUp={e => props.pressKey(e)}
        />
    );
};
