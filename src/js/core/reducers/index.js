import init from './init';
import channels from './channels';

export default (state = init, action) => channels(state, action);
