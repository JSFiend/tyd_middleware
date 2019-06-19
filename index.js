
class TydMiddleware {

    constructor() {
        this.middlewares = [];
        this.inject = this.inject.bind(this);
    }

    use(...middlewares) {
        middlewares.forEach((middleware) =>{
            if (typeof middleware !== 'function') throw new Error('中间件必须是函数');
        })
        this.middlewares = [...this.middlewares, ...middlewares];
    }

    // 作为中间件注入灵魂
    inject(req, res) {
        this.middlewares.forEach(middleware => middleware(req, res));
    }
}

module.exports = TydMiddleware;