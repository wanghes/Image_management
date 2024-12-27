// const IMGURL = location.host.indexOf('localhost') > -1 ? location.protocol + "//localhost:3003": location.protocol + "//img.mousecloud.cn"
const IMGURL = location.host.indexOf("localhost") > -1 ? location.protocol + "//localhost:3003" : location.protocol + "//localhost:3003";
/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
    return !!ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
    if (!hasClass(ele, cls)) ele.className += " " + cls;
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        const reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
        ele.className = ele.className.replace(reg, " ");
    }
}

export function formatTime(time) {
    let currentTime = Math.floor(new Date().getTime() / 1000);
    let beforeOneMinute = currentTime - 60;
    let beforeOneHour = currentTime - 3600;
    let beforeOneDay = currentTime - 24 * 3600;
    let beforeSevenDay = currentTime - 7 * 24 * 3600;
    if (time > beforeOneMinute) {
        return Math.floor(currentTime - time) + "秒前";
    } else if (time > beforeOneHour) {
        return Math.floor((currentTime - time) / 60) + "分钟前";
    } else if (time > beforeOneDay) {
        return Math.floor((currentTime - time) / 3600) + "小时前";
    } else if (time > beforeSevenDay) {
        return Math.floor((currentTime - time) / (24 * 3600)) + "天前";
    } else {
        let date = new Date(time * 1000);
        let year = date.getFullYear();
        let month = String(date.getMonth() + 1).padStart(2, "0");
        let day = String(date.getDate()).padStart(2, "0");
        return year + "-" + month + "-" + day;
    }
}

export function getAssetsFile(url) {
    return new URL(IMGURL + url, import.meta.url).href;
}
