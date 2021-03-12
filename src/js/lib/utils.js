import { dialogs } from './dialogs';
import { users } from './users';
import { CHANNELS, TIME_START } from 'lib/constants';
import months from 'lib/monthName';

export const randomString = length => {
    const str = 'qwertyuiopasdfghjklzxcvbnm'.split('');
    return Array(length).fill('').map(() => str[Math.floor(Math.random() * str.length)]).join('');
};

export const makeDialogs = () => {
    let result = [];
    let length = 0;
    dialogs.forEach(item => {
        const order = parseInt(Math.random() * (users.length));
        length += item.length;
        result.push(
            {
                target: CHANNELS[0].subName,
                message: item,
                replyId: null,
                time: TIME_START + length,
                authorId: users[order].id,
                isDelete: false,
                visible: ['all'],
            }
        );
    });
    // result.push({
    //     target: CHANNELS[1].subName,
    //     visible: ['all'],
    // });
    return result;
}

export const isPrivateChannelExist = (a1, a2) => {
    return a1.filter(i => {
        return a2.indexOf(i) < 0
    }).concat(a2.filter(i => {
        return a1.indexOf(i) < 0
    }));
}

export const getLastMessage = (dialogs, target) => {
    let result = '';
    let time = 0;
    dialogs.forEach(item => {
        if (item.target == target && item.time > time) {
            result = item.message;
        }
    });
    return result;
}
export const getAuthorName = id => {
    return id && users.find(item => item.id == id) ? users.find(item => item.id == id).nickname : '';
}
export const getLastAuthorName = (dialogs, target) => {
    let result = '';
    let time = 0;
    dialogs.forEach(item => {
        if (item.target == target && item.time > time) {
            result = getAuthorName(item.authorId);
        }
    });
    return result;
}

export const getPrivateName = (array, userId) => {
    return getAuthorName(array.find(item => item != userId));
}

export const getChannelList = (dialogs, onChangeChannel, activeChannel, userId) => {
    let result = [];
    let temp = [];

    CHANNELS.forEach(item => { // публичные каналы
        result.push({
            onChangeChannel,
            target: item.subName,
            name: item.name,
            author: getLastAuthorName(dialogs, item.subName),
            lastMessage: getLastMessage(dialogs, item.subName),
            activeChannel,
        });
        temp.push(item.subName);
    });

    dialogs.forEach(item => { // приватные каналы
        if (item.visible.includes(userId) && !temp.includes(item.target)
        ) {
            result.push({
                onChangeChannel,
                target: item.target,
                name: getPrivateName(item.visible, userId),
                author: getLastAuthorName(dialogs, item.target),
                lastMessage: getLastMessage(dialogs, item.target),
                activeChannel,
            });
            temp.push(item.target);
        }
    })
    return result;
}

export const getPropsChannelItem = (props, item) => {
    return {
        propsChannelItem: {
            className: props.activeChannel == item.target ? props.propsActive : props.propsNoActive,
            onClick: props.onChangeChannel,
            data: { data: item.target },
        },
        propsChannelTitle: {
            className: props.channelTitleClassName,
            children: item.name,
        },
        propsLastMessage: {
            className: props.lastMessageClassName,
            children: item.author && item.lastMessage ? `${item.author}: ${item.lastMessage}` : '...',
        },
    }
}

export const parseMessage = (dialogs, item, type) => {
    const message = dialogs.find(i => item.replyId && i.time == item.replyId);
    switch (type) {
        case 'repostAuthorName':
            if (message) {
                return users.find(i => i.id == message.authorId).nickname;
            } else {
                return message;
            }
        case 'repostMessage':
            if (message) {
                return message.message;
            } else {
                return message;
            }
    }
}

export const leftZero = number => {
    return number <= 9 ? `0${number}` : number;
}

export const getMessageList = (dialogs, activeChannel, userId) => {
    const width = parseInt((window.innerWidth - 270) / 2);
    const temp = dialogs.filter(item => item.target == activeChannel && !item.isDelete).sort((a, b) => {
        if (a.time < b.time) {
            return -1;
        }
        if (a.time > b.time) {
            return 1;
        }
        return 0;
    });
    const result = [];
    if (temp) {
        temp.push({
            // authorId: 'end',
        });
        console.log(temp);
        result.push({ id: 0 });
        for (let i = 0; i < temp.length - 1; i++) {
            let anyItem, anyAvatarContent, anyAvatar, anyContent, anyFirst, anyNickName, anyAnswer, anyRepost, anyRepostNickName, anyRepostMessage, anyPostMessage, anyFirstTime, anyNext, anyNextPostMessage, anyNextTime, selfItem, selfContent, selfFirst, selfRepost, selfRepostNickName, selfRepostMessage, selfPostMessage, selfFirstTime, selfNext, selfNextPostMessage, selfNextTime;

            const t1 = (new Date(temp[i].time * 1000));
            // const t2 = (new Date(temp[i].time));
            if (t1.getDate() != (new Date(result[result.length - 1].id * 1000)).getDate()) {
                result.push({
                    id: temp[i].time - 1,
                    props: {
                        newDay: {
                            className: 'message-list__show-date',
                            children: `${t1.getDate()} ${months[t1.getMonth()]}`,
                        }
                    }
                });
            }

            if (userId == temp[i].authorId) {
                selfItem = {
                    className: 'message-list__item-self',
                    style: { width: `${width}px` },
                };
                selfContent = {
                    className: 'message-list__item-content',
                    style: { width: `${width}px` },
                };
                if (
                    (temp[i - 1] && temp[i].authorId != temp[i - 1].authorId) ||
                    temp[i].replyId
                ) {
                    selfFirst = {
                        className: 'message-list__item-next-message-self',
                        // className: 'message-list__item-first-message-self',
                        style: { width: `${width - 24}px` },
                    };
                    if (temp[i].replyId) {
                        selfRepost = {
                            className: 'message-list__item-repost',
                            onClick: undefined,
                        };
                        selfRepostNickName = {
                            className: 'message-list__item-nickname',
                            children: parseMessage(temp, temp[i], 'repostAuthorName'),
                        };
                        selfRepostMessage = {
                            className: 'message-list__item-reposted',
                            children: parseMessage(temp, temp[i], 'repostMessage'),
                        };
                    }
                    selfPostMessage = {
                        className: 'message-list__item__message',
                        children: temp[i].message,
                    };
                    selfFirstTime = {
                        className: 'message__time',
                        children: `${leftZero(new Date(temp[i].time * 1000).getHours())}:${leftZero(new Date(temp[i].time * 1000).getMinutes())}`,
                    };
                } else {
                    selfNext = {
                        className: 'message-list__item-next-message-self',
                        style: { width: `${width - 24}px` },
                    };
                    selfNextPostMessage = {
                        className: 'message-list__item__message',
                        children: temp[i].message,
                    };
                    selfNextTime = {
                        className: 'message__time',
                        children: `${leftZero(new Date(temp[i].time * 1000).getHours())}:${leftZero(new Date(temp[i].time * 1000).getMinutes())}`,
                    };
                }
            }
            if (userId != temp[i].authorId) {
                anyItem = {
                    className: 'message-list__item',
                    style: { width: `${width}px` },
                };
                if (temp[i].authorId && temp[i + 1] && temp[i].authorId != temp[i + 1].authorId) {
                    anyAvatarContent = {
                        className: 'message-list__item-avatar__a',
                        onClick: undefined,
                    };
                    anyAvatar = {
                        className: 'message-list__item-avatar',
                        children: users.find(item => item.id == temp[i].authorId).nickname.charAt(0).toUpperCase(),
                    };
                    anyContent = {
                        className: 'message-list__item-content',
                        style: { width: `${width - 48}px` },
                    };
                } else {
                    anyContent = {
                        className: 'message-list__item-content',
                        style: { width: `${width - 48}px`, marginLeft: '48px' },
                    };
                }
                if (
                    (temp[i - 1] && temp[i].authorId != temp[i - 1].authorId) ||
                    i == 0
                ) {
                    anyFirst = {
                        className: 'message-list__item-first-message',
                        style: { width: `${width - 48 - 24}px` },
                    };
                    anyNickName = {
                        className: 'message-list__item-nickname-line',
                        children: temp[i].authorId ? users.find(item => item.id == temp[i].authorId).nickname : undefined,
                    };
                    anyAnswer = {
                        className: 'message-list__item__a',
                        children: 'ответить',
                        onClick: undefined,
                    };
                    if (temp[i].replyId) {
                        anyRepost = {
                            className: 'message-list__item-repost',
                            onClick: undefined,
                        };
                        anyRepostNickName = {
                            className: 'message-list__item-nickname',
                            children: parseMessage(temp, temp[i], 'repostAuthorName'),
                        };
                        anyRepostMessage = {
                            className: 'message-list__item-reposted',
                            children: parseMessage(temp, temp[i], 'repostMessage'),
                        }
                    }
                    anyPostMessage = {
                        className: 'message-list__item__message',
                        children: temp[i].message,
                    }
                    anyFirstTime = {
                        className: 'message__time',
                        children: `${leftZero(new Date(temp[i].time * 1000).getHours())}:${leftZero(new Date(temp[i].time * 1000).getMinutes())}`,
                    };
                }

                if (temp[i - 1] && temp[i].authorId == temp[i - 1].authorId) {
                    anyNext = {
                        className: 'message-list__item-next-message',
                        style: { width: `${width - 48 - 24}px` },
                    }
                    anyNextPostMessage = {
                        className: 'message-list__item__message',
                        children: temp[i].message,
                    }
                    anyNextTime = {
                        className: 'message__time',
                        children: `${leftZero(new Date(temp[i].time * 1000).getHours())}:${leftZero(new Date(temp[i].time * 1000).getMinutes())}`,
                    };
                }
            }
            result.push({
                id: temp[i].time,
                props: {
                    anyItem,
                    anyAvatarContent,
                    anyAvatar,
                    anyContent,
                    anyFirst,
                    anyNickName,
                    anyAnswer,
                    anyRepost,
                    anyRepostNickName,
                    anyRepostMessage,
                    anyPostMessage,
                    anyFirstTime,
                    anyNext,
                    anyNextPostMessage,
                    anyNextTime,
                    selfItem,
                    selfContent,
                    selfFirst,
                    selfRepost,
                    selfRepostNickName,
                    selfRepostMessage,
                    selfPostMessage,
                    selfFirstTime,
                    selfNext,
                    selfNextPostMessage,
                    selfNextTime,
                }
            });
        }
        console.log(result.length, result);
        const t2 = result.shift();
    }
    if (result.length == 1 && result[0].id === undefined) {
        result.shift();
    }
    return result;
}

export const getPartialSave = (partialSave, activeChannel) => {
    const result = partialSave.find(item => item.target == activeChannel);
    return result ? result.message : '';
}
