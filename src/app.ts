import 'reflect-metadata';
import * as _ from 'underscore';
import AllowCrossDomain from './middlewares/AllowCrossDomain';
import BodyParser from './middlewares/BodyParser';
import Middleware from './middlewares/Middleware';
import Router from './routes/Router';
import express = require('express');
import {ListRouter} from './routes/ListRouter';

export class App {
    private root: string = '/api';
    private app: any;
    private middlewares: Array<Middleware> = [
        new BodyParser(),
        new AllowCrossDomain()
    ];
    private routes: Array<Router> = [
        new ListRouter()
    ];

    constructor() {
        (async () => {
            this.app = express();

            this.initMiddlewares();
            this.initRoutes();

            this.app.listen(3000, function () {
                console.log('Listening on port 3000...');
            });
        })();
    }

    initMiddlewares() {
        if (this.app) {
            _.each(this.middlewares, (middleware) => this.app.use(middleware.handler));
        }
    }

    initRoutes() {
        if (this.app) {
            _.each(this.routes, (router: Router) => {
                router.initRoutes();
                this.app.use(this.root + router.root, router.router);
            });
        }
    }

}
new App();