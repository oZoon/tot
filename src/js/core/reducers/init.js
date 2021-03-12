import { VERSION, CHANNELS } from 'lib/constants';
import Records from 'lib/records';
import { makeDialogs } from 'lib/utils';

let init = {
    userId: null,
    activeChannel: CHANNELS[0].subName,
    dialogs: makeDialogs(),
    partialSave: [
        {
            target: null,
            message: '',
            replyId: null,
            inputView: false,
        },
    ],
}

const records = new Records();
const initLocalStorage = records.getRecord(`tot-systems-${VERSION}`);
if (initLocalStorage !== null) {
    init = initLocalStorage;
}
records.setRecord(`tot-systems-${VERSION}`, init);

export default init;
