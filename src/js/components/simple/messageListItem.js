import React from 'react';

import Block from 'so-simple/text';

export default (props) => {
    return (
        <>
            <Block {...props.newDay} />
            <Block {...props.anyItem}>
                <Block {...props.anyAvatarContent}>
                    <Block {...props.anyAvatar} />
                </Block>
                <Block {...props.anyContent}>
                    <Block {...props.anyFirst}>
                        <Block {...props.anyNickName} />
                        <Block {...props.anyAnswer} />
                        <Block {...props.anyRepost}>
                            <Block {...props.anyRepostNickName} />
                            <Block {...props.anyRepostMessage} />
                        </Block>
                        <Block {...props.anyPostMessage} />
                        <Block {...props.anyFirstTime} />
                    </Block>
                    <Block {...props.anyNext}>
                        <Block {...props.anyNextPostMessage} />
                        <Block {...props.anyNextTime} />
                    </Block>
                </Block>
            </Block>
            <Block {...props.selfItem}>
                <Block {...props.selfContent}>
                    <Block {...props.selfFirst}>
                        <Block {...props.selfRepost}>
                            <Block {...props.selfRepostNickName} />
                            <Block {...props.selfRepostMessage} />
                        </Block>
                        <Block {...props.selfPostMessage} />
                        <Block {...props.selfFirstTime} />
                    </Block>
                    <Block {...props.selfNext}>
                        <Block {...props.selfNextPostMessage} />
                        <Block {...props.selfNextTime} />
                    </Block>
                </Block>
            </Block>
        </>
    )
};
