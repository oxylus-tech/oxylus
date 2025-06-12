import { getCsrf } from './utils';
export default {
    csrfToken: getCsrf(),
    axiosConfig: {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRFToken': getCsrf(),
        },
        paramsSerializer: {
            indexes: null // by default: false
        }
    },
    locales: {
        "fr": "Français",
        "en": "English",
    }
};
