import {Request, Response} from 'express';
import * as _ from 'underscore';
import {Entity} from '../entities/Entity';
import {Router} from './Router';

export class EntityRouter<T extends Entity> extends Router {

    root: string;
    entities: Array<T>;
    Type: { new(...args) };

    constructor(type: { new(...args): T }, basePath: string) {
        super();
        this.root = basePath;
        this.entities = [];
        this.Type = type;
    }

    initRoutes() {

        this.router.get('/', async (req: Request, res: Response) => {
            res.send(this.entities);
        });

        this.router.get('/:id', async (req: Request, res: Response) => {
            let item = _.findWhere(this.entities, {id: Number.parseInt(req.params.id)});
            if (item) {
                res.json(item);
            } else {
                res.status(204);
            }
            res.send();
        });

        this.router.post('/', async (req: Request, res: Response) => {
            let entity = new this.Type(JSON.parse(req.body.entity));
            this.entities.push(entity);
            entity.id = _.chain(this.entities)
                       .pluck('id')
                       .max()
                       .value() + 1;
            res.location(req.baseUrl + '/' + entity.id);
            res.status(201);
            res.send(entity);
        });

        this.router.put('/:id', async (req: Request, res: Response) => {
            let entityUpdated = new this.Type(JSON.parse(req.body.entity));
            let index = _.findIndex(this.entities, (entity) => entity.id === entityUpdated.id);
            if (index !== -1) {
                this.entities.splice(index, 1, entityUpdated);
                res.status(204);
            } else {
                res.status(405);
            }
            res.send();
        });

        this.router.delete('/:id', async (req: Request, res: Response) => {
            let id = Number.parseInt(req.params.id);
            this.entities = _.filter(this.entities, (entity) => entity.id !== id);
            res.sendStatus(200);
        });

    }
}

export default EntityRouter;