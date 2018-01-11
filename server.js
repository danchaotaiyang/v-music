let express = require('express');
let router = express.Router();
let axios = require('axios');

let app = express();
app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
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
            res.json(response.data)
        })
        .catch((e) => {
            console.log(e)
        });
});


app.use('/api', router);

app.listen(8090);
