import {Request, Response} from 'express';
import {Connection, FindOptions} from 'typeorm';
import {Entity} from '../entities/Entity';
import {Router} from './Router';

export class EntityRouter<T extends Entity> extends Router {

    root: string;
    entities: Array<T>;
    Type: { new(...args) };
    private findOptions: FindOptions;

    constructor(type: { new(...args): T }, basePath: string, findOptions?: FindOptions) {
        super();
        this.root = basePath;
        this.findOptions = findOptions;
        this.entities = [];
        this.Type = type;
    }

    initRoutes(connection: Connection) {
        let entityRepository = connection.getRepository(this.Type);

        this.router.get('/', async (req: Request, res: Response) => {
            let entities: Array<T> = [];
            if (this.findOptions) {
                entities = await entityRepository.find(this.findOptions)
                                                 .catch(this.handleError);
            } else {
                entities = await entityRepository.find()
                                                 .catch(this.handleError);
            }
            res.send(entities);
        });

        this.router.get('/:id', async (req: Request, res: Response) => {
            let id = Number.parseInt(req.params.id);
            if (id) {
                let entity = await entityRepository.findOneById(id, this.findOptions)
                                                   .catch(this.handleError);
                if (entity) {
                    res.status(200);
                    res.send(entity);
                    return;
                }
            }
            res.sendStatus(404);
        });

        this.router.post('/', async (req: Request, res: Response) => {
            let entity = new this.Type(JSON.parse(req.body.entity));
            entity.id = null;
            await entityRepository.persist(entity)
                                  .then((entity) => {
                                      res.location(req.baseUrl + '/' + entity.id);
                                      res.status(201);
                                      res.send(entity);
                                  })
                                  .catch(this.handleError);
        });

        this.router.put('/:id', async (req: Request, res: Response) => {
            let id = Number.parseInt(req.params.id) || null;
            let entity = new this.Type(JSON.parse(req.body.entity));
            if (entity && entity.id && id === entity.id && await entityRepository.findOneById(entity.id)
                                                                                 .catch(this.handleError)) {
                await entityRepository.persist(entity)
                                      .catch(this.handleError);
                res.status(204);
            } else {
                res.status(405);
            }
            res.send();
        });

        this.router.delete('/:id', async (req: Request, res: Response) => {
            let id = req.params.id || null;
            if (id) {
                let entity = await entityRepository.findOneById(id)
                                                   .catch(this.handleError);
                if(entity) {
                    await entityRepository.remove(entity)
                                          .catch(this.handleError);
                }
            }
            res.sendStatus(200);
        });

    }

    private handleError(error) {
        console.error(error);
        return null;
    }
}

export default EntityRouter;