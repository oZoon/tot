import React from 'react';

import ChannelItem from 'so-simple/text';
import ChannelTitle from 'so-simple/text';
import LastMessage from 'so-simple/text';

export default (props) => {
    return (
        <ChannelItem {...props.propsChannelItem}>
            <ChannelTitle {...props.propsChannelTitle} />
            <LastMessage {...props.propsLastMessage} />
        </ChannelItem>
    )
};
