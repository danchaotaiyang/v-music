import jsonp from '@/assets/js/jsonp';
import {commonParams, options} from './config';

export const getSingerList = () => {
    const url = 'https://szc.y.qq.com/v8/fcg-bin/v8.fcg';
    const data = Object.assign({}, commonParams, {
        channel: 'singer',
        page: 'list',
        key: 'all_all_all',
        pagesize: 100,
        pagenum: 1,
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq',
        g_tk: 20974630,
    });
    return jsonp(url, data, options);
};
