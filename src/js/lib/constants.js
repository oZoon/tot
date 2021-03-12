import packageJson from '../../../package.json';
export const VERSION = packageJson.version;

export const PRIVATE_ACCEPT = true;

export const CHANNELS = [
    {
        name: 'Корпоративная сеть: рабочие вопросы',
        subName: 'corp',
    },
    {
        name: 'Корпоративная сеть: флудилка',
        subName: 'flood',
    }
];
export const TIME_START = 1613839602;

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';

export const CHANNELS_ACTIVE = 'CHANNELS_ACTIVE';
export const CHANNELS_REPLY = 'CHANNELS_REPLY';
export const CHANNELS_PARTIAL_SAVE = 'CHANNELS_PARTIAL_SAVE';
export const CHANNELS_INPUT_SUBMIT = 'CHANNELS_INPUT_SUBMIT';
export const CHANNELS_DELETE = 'CHANNELS_DELETE';
export const CHANNEL_PRIVATE = 'CHANNEL_PRIVATE';

export const ACTIVITY_INPUT_VIEW = 'ACTIVITY_INPUT_VIEW';
export const ACTIVITY_USER_CARD_VIEW = 'ACTIVITY_USER_CARD_VIEW';
