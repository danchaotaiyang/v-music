import jsonp from '@/assets/js/jsonp';
import axios from 'axios';
import {commonParams, options} from './config';
import {getLocalhostIP} from '@/assets/js/dom';

export const getRecommend = () => {
    let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';

    let data = Object.assign({}, commonParams, {
        platform: 'h5',
        uin: 0,
        needNewCode: 1
    });

    return jsonp(url, data, options);
};

export const getDiscList = () => {
    // let url = 'http://192.168.0.108:8090/api/getDiscList';
    let url = `http://${window.ips}:8090/api/getDiscList`;
    let data = Object.assign({}, commonParams, {
        rnd: Math.random(),
        hostUin: 0,
        platform: 'yqq',
        needNewCode: 0,
        categoryId: 10000000,
        sortId: 5,
        sin: 0,
        ein: 29,
        format: 'json'
    });
    return axios
        .get(url, {
            params: data
        })
        .then((res) => {
            return res.data;
        });
};


