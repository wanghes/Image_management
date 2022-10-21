import defaultSettings from '@/settings';

const title = defaultSettings.title || '墨菲信息流系统2.0';

export default function getPageTitle(pageTitle) {
    if (pageTitle) {
        return `${pageTitle} - ${title}`;
    }
    return `${title}`;
};
