import express = require('express');
import {Router as ExpressRouter} from 'express';

export abstract class Router {
    router: ExpressRouter = express.Router();
    abstract root: string;

    abstract initRoutes()
}
export default Router;