import * as c from 'lib/constants';
import { CHANNELS } from 'lib/constants';
import { randomString, isPrivateChannelExist } from 'lib/utils';

function channels(state, action) {
    const newState = JSON.parse(JSON.stringify(state));
    let doit = false;
    switch (action.type) {

        case c.USER_LOGIN:
            newState.userId = action.userId;
            newState.partialSave = [
                {
                    target: null,
                    message: '',
                    replyId: null,
                    inputView: false,
                },
            ];
            newState.activeChannel = CHANNELS[0].subName;
            return newState;
        case c.USER_LOGOUT:
            newState.userId = null;
            newState.partialSave = [
                {
                    target: null,
                    message: '',
                    replyId: null,
                    inputView: false,
                },
            ];
            newState.activeChannel = CHANNELS[0].subName;
            return newState;

        case c.CHANNELS_ACTIVE:
            newState.activeChannel = action.target;
            return newState;

        case c.CHANNELS_REPLY:
            for (let i = 0; i < newState.partialSave.length; i++) {
                if (newState.partialSave[i].target == newState.activeChannel) {
                    newState.partialSave[i].inputView = action.inputView;
                    newState.partialSave[i].replyId = action.replyId;
                    doit = true;
                    break;
                }
            };
            if (!doit) {
                newState.partialSave.push({
                    target: newState.activeChannel,
                    inputView: action.inputView,
                    replyId: action.replyId,
                });
            }
            return newState;

        case c.CHANNELS_PARTIAL_SAVE:
            for (let i = 0; i < newState.partialSave.length; i++) {
                if (newState.partialSave[i].target == newState.activeChannel) {
                    newState.partialSave[i].message = action.message;
                    doit = true;
                    break;
                }
            };
            if (!doit) {
                newState.partialSave.push({
                    target: newState.activeChannel,
                    message: action.message,
                });
            }
            return newState;

        case c.CHANNELS_INPUT_SUBMIT:
            for (let i = 0; i < newState.partialSave.length; i++) {
                if (newState.partialSave[i].target == newState.activeChannel) {
                    newState.dialogs.push({
                        target: newState.activeChannel,
                        message: newState.partialSave[i].message,
                        replyId: newState.partialSave[i].replyId,
                        time: Date.now() / 1000,
                        authorId: newState.userId,
                        isDelete: false,
                        visible: CHANNELS.find(item => item.subName == newState.activeChannel) ? ['all'] : [newState.activeChannel],
                    });
                    newState.partialSave[i].message = '';
                    newState.partialSave[i].replyId = null;
                    break;
                }
            };
            return newState;

        case c.CHANNELS_DELETE:
            for (let i = 0; i < newState.dialogs.length; i++) {
                if (newState.dialogs[i].time == action.messageId) {
                    newState.dialogs[i].isDelete = true;
                    break;
                }
            }
            return newState;

        case c.CHANNEL_PRIVATE:
            const findPrivate = [newState.userId, action.userId];
            let isFind = false;
            for (let i = 0; i < newState.dialogs.length; i++) {
                let existPrivate = newState.dialogs[i].visible;
                if (existPrivate && isPrivateChannelExist(findPrivate, existPrivate)) {
                    isFind = true;
                    break;
                }
            }
            if (!isFind) {
                newState.dialogs.push({
                    target: randomString(10),
                    visible: [newState.userId, action.userId],
                })
            }
            return newState;

        default:
            return newState;
    }
}

export default channels;
