import React from 'react';

import ChannelListItem from 'simple/channelListItem';
import LogOut from 'so-simple/button';
import ChannelsList from 'so-simple/text';

import { getPropsChannelItem } from 'lib/utils';

export default (props) => {
    return (
        <ChannelsList {...props.propsChannelsList} >
            <LogOut {...props.propsLogOut} />
            {props.list.map(item => {
                return (
                    <ChannelListItem
                        key={item.target}
                        {...getPropsChannelItem(props.propsItem, item)}
                    />
                )
            })}
        </ChannelsList>
    );
};
