import express from "express";
import parseModule from "./parseModule";
import request from '../utils/request';
import chalk from 'chalk';
import getCurrentTime from "../utils/getCurrentTime";
function regRoute(app) {
    const modules = parseModule();
    for (const { route, handler } of modules) {
        app.use(route, async ({ query, params, body, originalUrl }, res) => {
            const collect = {
                query,
                params,
                body
            };
            try {
                const response = await handler(collect, (method, url, config = {}) => {
                    return request({
                        method,
                        url,
                        ...config
                    });
                });
                console.log(`${chalk.green(`[200 OK] [${getCurrentTime()}]`)} ${decodeURI(originalUrl)}`);
                res.send(response);
            }
            catch (e) {
                console.log(`${chalk.red(`[${e.code} ERROR] [${getCurrentTime()}]`)} ${decodeURI(originalUrl)}`);
                res.statusCode = 400;
                res.send(e);
            }
        });
    }
}
function createServer() {
    const app = express();
    const CORS_ALLOW_ORIGIN = false;
    /**
     * CORS & Preflight request
    */
    app.use((req, res, next) => {
        if (req.path !== '/' && !req.path.includes('.')) {
            res.set({
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': CORS_ALLOW_ORIGIN || req.headers.origin || '*',
                'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
                'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
                'Content-Type': 'application/json; charset=utf-8',
            });
        }
        req.method === 'OPTIONS' ? res.status(204).end() : next();
    });
    /**
     * reg module
     */
    regRoute(app);
    return app;
}
export default function (options = {}) {
    const port = Number(options.port || process.env.PORT || '3000');
    const server = createServer();
    server.listen(port, () => {
        console.log(`server running @ http://localhost:${port}`);
    });
}
