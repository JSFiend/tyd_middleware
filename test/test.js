
const assert = require('assert');
const http = require('http');
const axios = require('axios');
const TydMiddleware = require('../');
let tydMiddleware;
let server;

describe('think you do 中间价管理器', function() {
    it('实例化管理器', function() {
        tydMiddleware = new TydMiddleware();
        tydMiddleware.use(function (req, res) {}, function (req, res) {});
        assert(tydMiddleware.middlewares.length === 2, '实例化管理器错误，不能添加中间件');
    });
    describe('http 服务注入 管理器', function () {
        beforeEach(function () {
            tydMiddleware = new TydMiddleware();
            server = http.createServer().listen(3000);
            server.on('request', tydMiddleware.inject);
        });
        it('get 请求', async function() {
            tydMiddleware.use(function(req, res){ res.end(req.url) });
            const path = '/aa?name=combineli';
            const res = await axios.get('http://localhost:3000' + path);
            assert(res.data === path);
        });
        it('404 请求', async function () {
            const path = '/aa?name=combineli';
            try {
                const res = await axios.get('http://localhost:3000' + path);
            } catch (err) {
                assert(err.response.status === 404, `期待状态码返回404，实际是${err.response.status}`);
            }
        });
        it('500 请求', async function () {
            tydMiddleware.use(function(req, res, next) { res.end(abc)});
            try {
                const res = await axios.get('http://localhost:3000');
            } catch (err) {
                assert(err.response.status === 500, `期待状态码返回500，实际是:${err.response.status}, message:${err}`);
            }
        });
        afterEach(function () {
            server.close();
        })
    });

});

