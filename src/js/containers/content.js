import React from 'react';

import ChannelsList from 'complex/channelsList';
import ChannelContent from 'complex/channelContent';
import Content from 'so-simple/text';

export default (props) => {
    return (
        <Content {...props.content}>
            <ChannelsList {...props.channelsList} />
            <ChannelContent {...props.channelContent} />
        </Content>
    );
};
