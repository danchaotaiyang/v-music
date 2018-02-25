import jsonp from '@/assets/js/jsonp';
import {commonParams, options} from './config';
import axios from 'axios/index';

export const getLyric = (mid) => {
    const url = 'http://192.168.0.108:8090/api/getLyric';
    const data = Object.assign({}, commonParams, {
        songmid: mid,
        pcachetime: +new Date(),
        platform: 'yqq',
        hostUin: 0,
        needNewCode: 0,
        g_tk: 979646617,
        format: 'json'
    });

    return axios
        .get(url, {
            params: data
        })
        .then((res) => {
            return Promise.resolve(res.data);
        });
};
