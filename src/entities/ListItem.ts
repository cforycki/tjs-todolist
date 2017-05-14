import {Column, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import {List} from './List';
import {Entity} from 'typeorm/decorator/entity/Entity';

@Entity()
export class ListItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    value: string;

    @ManyToOne(type => List, list => list.items, {
        cascadeInsert: true,
        cascadeUpdate: true,
        lazy:          false
    })
    list: List;

    constructor();
    constructor(IListItem);
    constructor(param?: IListItem | undefined) {
        this.value = param && param.value || null;
    }
}

export interface IListItem {
    id?: number;
    value?: string;
    list?: List;
}