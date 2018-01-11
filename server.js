let express = require('express');
let router = express.Router();
let axios = require('axios');

let app = express();
app.all('*', (req, res, next) => {
    res.headers('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
router.get('/getDiscList', (req, res) => {
    let url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
    axios
        .get(url, {
            headers: {
                referer: 'https://c.y.qq.com',
                host: 'c.y.qq.com'
            },
            params: req.query,
            format: 'json'
        })
        .then((response) => {
            res.end(response.json);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.use('/api', router);

app.listen(8090);
