import express from "express";
import * as AllModules from '../modules/AllModules';
function createServer() {
    const app = express();
    const CORS_ALLOW_ORIGIN = false;
    console.log(AllModules);
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
    return app;
}
export default function (options = {}) {
    const port = Number(options.port || process.env.PORT || '3000');
    const server = createServer();
    server.listen(port, () => {
        console.log(`server running @ http://localhost:${port}`);
    });
}
