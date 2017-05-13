import {Request, Response} from 'express';
import {Router} from './Router';
import {List} from '../entities/List';
import * as _ from 'underscore';

export class ListsRouter extends Router {

    root: string = '/lists';
    lists: Array<List>;

    constructor() {
        super();
        this.lists = [
            {
                'id':    1,
                'items': [
                    {
                        'value': 'item 1'
                    },
                    {
                        'value': 'item 2'
                    },
                    {
                        'value': 'item 3'
                    }
                ]
            },
            {
                'id':    2,
                'items': [
                    {
                        'value': 'item 1'
                    },
                    {
                        'value': 'item 2'
                    },
                    {
                        'value': 'item 3'
                    }
                ]
            },
            {
                'id':    3,
                'items': [
                    {
                        'value': 'item 1'
                    },
                    {
                        'value': 'item 2'
                    },
                    {
                        'value': 'item 3'
                    }
                ]
            },
            {
                'id':    4,
                'items': [
                    {
                        'value': 'item 1'
                    },
                    {
                        'value': 'item 2'
                    },
                    {
                        'value': 'item 3'
                    }
                ]
            }
        ];
    }

    initRoutes() {

        this.router.get('/', async (req: Request, res: Response) => {
            res.send(this.lists);
        });

        this.router.get('/:id', async (req: Request, res: Response) => {
            let list = _.findWhere(this.lists, {id: Number.parseInt(req.params.id)});
            res.send(list);
        });

        this.router.post('/', async (req: Request, res: Response) => {
            let list = new List(JSON.parse(req.body.list));
            this.lists.push(list);
            list.id = _.chain(this.lists)
                       .pluck('id')
                       .max()
                       .value() + 1;
            res.location(req.baseUrl + '/' + list.id);
            res.status(201);
            res.send(list);
        });

        this.router.put('/:id', async (req: Request, res: Response) => {
            let listUpdated = new List(JSON.parse(req.body.list));
            let index = _.findIndex(this.lists, (list) => list.id === listUpdated.id);
            if(index !== -1){
                this.lists.splice(index, 1, listUpdated);
                res.status(204);
            }else{
                res.status(405);
            }
            res.send();
        });

        this.router.delete('/:id', async (req: Request, res: Response) => {
            let id = Number.parseInt(req.params.id);
            this.lists = _.filter(this.lists, (list) => list.id !== id);
            res.sendStatus(200);
        });

    }
}

export default ListsRouter;


