import React from 'react';

export default (props) => {
    return (
        <input
            className={props.className || 'input'}
            type="text"
            onChange={e => props.onSavePartial({ data: { message: e.target.value } })}
            value={props.partialData}
            autoComplete="off"
            onKeyDown={e => e.key == 'Enter' ? props.onSave() : null}
        />
    );
};
