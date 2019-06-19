
const assert = require('assert');
const http = require('http');
const axios = require('axios');
const TydMiddleware = require('./index');
let tydMiddleware = undefined;

describe('think you do 中间价管理器', function() {
    it('实例化管理器', function() {
        tydMiddleware = new TydMiddleware();
        tydMiddleware.use(function (req, res) {}, function (req, res) {});
        assert(tydMiddleware.middlewares.length === 2, '实例化管理器错误，不能添加中间件');
    });
    it('http 服务注入 管理器', async function() {
        const server = http.createServer().listen(3000);
        server.on('request', tydMiddleware.inject);
        tydMiddleware.use(function(req, res){ res.end(req.url) });
        const path = '/aa?name=combineli'
        const res = await axios.get('http://localhost:3000' + path);
        assert(res.data === path);
        server.close();
    })
})

