const express = require('express');
const router = express.Router();
const axios = require('axios');

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});
router.get('/getDiscList', (req, res) => {
    axios
        .get('https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg', {
            headers: {
                referer: 'https://c.y.qq.com/',
                host: 'c.y.qq.com'
            },
            params: req.query
        })
        .then((response) => {
            res.json(response.data);
        })
        .catch((e) => {
            console.log(e)
        });
});

router.get('/getSongUrl', (req, res) => {
    axios
        .get('https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg', {
            headers: {
                referer: 'https://y.qq.com/portal/player.html'
            },
            params: req.query
        })
        .then((response) => {
            res.json(response.data);
        })
        .catch((e) => {
            console.log(e)
        });
});

module.exports = router;
