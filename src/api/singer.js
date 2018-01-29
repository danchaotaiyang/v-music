import jsonp from '@/assets/js/jsonp';
import {commonParams, options} from './config';
import axios from 'axios/index';
import {getLocalhostIP} from '@/assets/js/dom';

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

export const getSingerDetail = (singerId) => {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg';
    const data = Object.assign({}, commonParams, {
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq',
        begin: 0,
        num: 100,
        songstatus: 1,
        g_tk: 5381,
        singermid: singerId
    });
    return jsonp(url, data, options);
};


export const getSongUrl = (songId) => {
    // let url = 'http://192.168.0.108:8090/api/getSongUrl';
    // let url = `http://10.10.6.49:8090/api/getSongUrl`;
    let url = `http://${window.ips}:8090/api/getSongUrl`;
    let data = Object.assign({}, commonParams, {
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        notice: 0,
        platform: 'yqq',
        needNewCode: 0,
        cid: 205361747,
        uin: 0,
        songmid: songId,
        filename: `C400${songId}.m4a`,
        guid: 1408057560
    });
    return axios
        .get(url, {
            params: data
        })
        .then((res) => {
            return res.data;
        });
};
