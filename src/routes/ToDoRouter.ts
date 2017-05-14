import {Request, Response} from 'express';
import * as _ from 'underscore';
import {ToDo} from '../entities/ToDo';
import {Router} from './Router';

export class ToDoRouter<T extends ToDo> extends Router {

    root: string;
    todos: Array<T>;
    Type: { new(...args) };

    constructor(type: { new(...args):T }, basePath: string) {
        super();
        this.root = basePath;
        this.todos = [];
        this.Type = type;
    }

    initRoutes() {

        this.router.get('/', async (req: Request, res: Response) => {
            res.send(this.todos);
        });

        this.router.get('/:id', async (req: Request, res: Response) => {
            let item = _.findWhere(this.todos, {id: Number.parseInt(req.params.id)});
            if (item) {
                res.json(item);
            }else{
                res.status(204);
            }
            res.send();
        });

        this.router.post('/', async (req: Request, res: Response) => {
            let todo = new this.Type(JSON.parse(req.body.todo));
            this.todos.push(todo);
            todo.id = _.chain(this.todos)
                       .pluck('id')
                       .max()
                       .value() + 1;
            res.location(req.baseUrl + '/' + todo.id);
            res.status(201);
            res.send(todo);
        });

        this.router.put('/:id', async (req: Request, res: Response) => {
            let todoUpdated = new this.Type(JSON.parse(req.body.list));
            let index = _.findIndex(this.todos, (todo) => todo.id === todoUpdated.id);
            if (index !== -1) {
                this.todos.splice(index, 1, todoUpdated);
                res.status(204);
            } else {
                res.status(405);
            }
            res.send();
        });

        this.router.delete('/:id', async (req: Request, res: Response) => {
            let id = Number.parseInt(req.params.id);
            this.todos = _.filter(this.todos, (todo) => todo.id !== id);
            res.sendStatus(200);
        });

    }
}

export default ToDoRouter;