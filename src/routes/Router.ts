import express = require('express');
import {Router as ExpressRouter} from 'express';
import {Connection} from 'typeorm';

export abstract class Router {
    router: ExpressRouter = express.Router();
    abstract root: string;

    abstract initRoutes(connection: Connection)
}
export default Router;