const origin = require('jsonp');

const param = (data) => {
    let url = '';
    for (let k in data) {
        let v = data[k] !== 'undefined' ? data[k] : '';
        url += `&${k}=${encodeURIComponent(v)}`;
    }
    return url ? url.substring(1) : '';
};

const jsonp = (url, data, option) => {
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data);
    return new Promise((resolve, reject) => {
        origin(url, option, (err, data) => {
            if (!err) {
                resolve(data);
            } else {
                reject(err);
            }
        });
    });
};

export default jsonp;
