import React, {useEffect} from 'react';

import Messages from 'so-simple/text';
import Title from 'so-simple/text';
import MessageList from 'so-simple/text';
import MessageListItem from 'simple/messageListItem';
import SendZone from 'simple/sendZone';

export default (props) => {
    const myRef = React.createRef();

    useEffect(() => {
        myRef.current.scrollIntoView({ behavior: "smooth" });
    }, [props.list])

    return (
        <Messages {...props.propsMessages}>
            <Title {...props.propsTitle} />
            <MessageList {...props.propsMessageList}>
                {props.list.map(item => {
                    return (
                        <MessageListItem
                            key={item.id}
                            {...item.props}
                        />
                    )
                })}
                <div ref={myRef} />
            </MessageList>
            <SendZone {...props.propsSendZone} />
        </Messages>
    );
};
