import {Entity} from 'typeorm/decorator/entity/Entity';
import {PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class List {
    @PrimaryGeneratedColumn()
    id: number;

    constructor();
    constructor({id}: { id?: number});
    constructor(param?: { id: number} | undefined) {
        this.id = param && param.id || null;
    }

}