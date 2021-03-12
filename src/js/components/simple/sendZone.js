import React from 'react';

import Block from 'so-simple/text';
import Reply from 'so-simple/text';
import Input from 'so-simple/input';

export default (props) => {
    return (
        <Block {...props.propsInputWrap}>
            <Reply {...props.propsReply} />
            <Input {...props.propsInput} />
        </Block>
    );
};
