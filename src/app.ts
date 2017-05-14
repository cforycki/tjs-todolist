import 'reflect-metadata';
import * as _ from 'underscore';
import {List} from './entities/List';
import {Reminder} from './entities/Reminder';
import {User} from './entities/User';
import AllowCrossDomain from './middlewares/AllowCrossDomain';
import BodyParser from './middlewares/BodyParser';
import Middleware from './middlewares/Middleware';
import {EntityRouter} from './routes/EntityRouter';
import Router from './routes/Router';
import express = require('express');

export class App {
    private root: string = '/api';
    private app: any;
    private middlewares: Array<Middleware> = [
        new BodyParser(),
        new AllowCrossDomain()
    ];
    private routes: Array<Router> = [
        new EntityRouter(List, '/lists'),
        new EntityRouter(Reminder, '/reminders'),
        new EntityRouter(User, '/users')
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