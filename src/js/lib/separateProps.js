import { CHANNELS } from 'lib/constants';
import { getChannelList, getAuthorName, getMessageList, getPartialSave } from 'lib/utils';
export default props => {
    const {
        userId,
        activeChannel,
        dialogs,
        partialSave,

        onChangeChannel,
        onDeleteMessage,
        onReplyMessage,
        onSavePartial,
        onSubmitMessage,
        onUserLogIn,
        onUserLogOut,

    } = props;


    const propsMessageList = {
        className: 'messages__message-list',
    }
    const propsMessages = {
        className: 'messages',
    }
    const propsTitle = {
        className: 'messages__title',
        children: CHANNELS[CHANNELS.findIndex(item => item.subName == activeChannel)].name,
    }
    const channelContent = {
        propsMessages,
        propsTitle,
        propsMessageList,
        list: getMessageList(dialogs, activeChannel, userId),
        propsSendZone: {
            propsInputWrap: {
                className: 'messages_send-zone',
            },
            propsInput: {
                className: 'messages_send-zone__input',
                onSavePartial,
                partialData: getPartialSave(partialSave, activeChannel),
                onSave: onSubmitMessage,
            },
        }
    }

    const content = {
        className: 'content',
    }
    const propsChannelsList = {
        className: 'big-chats',
    }
    const propsLogOut = {
        className: 'btn-logout',
        pressButton: onUserLogOut,
        children: `(${getAuthorName(userId)}) ВЫХОД`,
    }
    const channelsList = {
        propsChannelsList,
        list: getChannelList(dialogs, onChangeChannel, activeChannel, userId),
        propsLogOut,
        propsItem: {
            activeChannel,
            propsActive: 'big-chats__item-active',
            propsNoActive: 'big-chats__item',

            channelTitleClassName: 'big-chats__title',
            lastMessageClassName: 'big-chats__last-message',
            onChangeChannel,
        },
    }



    const propsContent = {
        channelsList,
        channelContent,
        content,
    }



    const propsAuth = {
        onUserLogIn,
        propsText: {
            children: 'Введите пароль',
        },
        propsButton: {
            children: 'ВХОД',
        },
    };



    return {
        userId,
        propsAuth,
        propsContent,
    }
}
