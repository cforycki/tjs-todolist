import {PrimaryGeneratedColumn} from 'typeorm';
import {AbstractEntity} from 'typeorm/decorator/entity/AbstractEntity';

@AbstractEntity()
export abstract class Entity implements IEntity {
    @PrimaryGeneratedColumn()
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