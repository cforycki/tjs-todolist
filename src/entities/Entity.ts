export abstract class Entity implements IEntity {
    id: number;

    constructor();
    constructor(IEntity);
    constructor(param?: IEntity | undefined) {
        this.id = param && param.id || null;
    }

}

export interface IEntity {
    id?: number,
    [key: string]: any
}