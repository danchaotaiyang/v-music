const path = require('path');
const express = require('express');
const app = express();

app.set('view engine', 'html');
app.set('views', path.resolve('dist'));
app.engine('html', require('ejs').__express);
app.use(express.static(path.resolve('dist')));

const index = require('./router/index');
const api = require('./router/api');


app.use('/', index);
app.use('/api', api);

app.listen(8090);
