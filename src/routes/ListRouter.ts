import {Request, Response} from 'express';
import {Router} from './Router';

export class ListRouter extends Router {

    root: string = '/list';

    initRoutes() {

        this.router.get('/', async (req: Request, res: Response) => {
            res.sendStatus(501);
        });

        this.router.get('/:id', async (req: Request, res: Response) => {
            res.sendStatus(501);
        });

        this.router.post('/', async (req: Request, res: Response) => {
            res.sendStatus(501);
        });

        this.router.put('/:id', async (req: Request, res: Response) => {
            res.sendStatus(501);
        });

        this.router.delete('/:id', async (req: Request, res: Response) => {
            res.sendStatus(501);
        });

    }
}

export default ListRouter;


