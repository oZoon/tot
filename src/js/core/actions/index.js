import * as c from 'lib/constants';
import { users } from 'lib/users';

export const userLogIn = ({ data: { password } }) => {
    const user = users.find(item => item.password == password);
    const userId = user ? user.id : null;
    return {
        type: c.USER_LOGIN,
        userId,
    }
}

export const userLogOut = () => {
    return {
        type: c.USER_LOGOUT,
    }
}

export const changeChannel = (props) => {
    return {
        type: c.CHANNELS_ACTIVE,
        target: props.data,
    }
}

export const replyMessage = ({ data: { inputView, replyId } }) => {
    return {
        type: c.CHANNELS_REPLY,
        inputView,
        replyId,
    }
}

export const savePartial = ({ data: { message } }) => {
    return {
        type: c.CHANNELS_PARTIAL_SAVE,
        message,
    }
}

export const submitMessage = () => {
    return {
        type: c.CHANNELS_INPUT_SUBMIT,
    }
}

export const deleteMessage = ({ data: { messageId } }) => {
    return {
        type: c.CHANNELS_DELETE,
        messageId,
    }
}
