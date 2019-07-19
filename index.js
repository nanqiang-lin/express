const express = require('express');
const app = express();

// body解析
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// 接口路由处理
const oauth = require('./api/oauth');
app.use('/oauth', oauth);


// 运行 127.0.0.1:9999
const port = 9999
const server = app.listen(9999, function () {
    console.log('启动成功,路径：' + '127.0.0.1:' + port)
})