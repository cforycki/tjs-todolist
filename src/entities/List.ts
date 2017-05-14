import {OneToMany} from 'typeorm';
import {Entity as OrmEntity} from 'typeorm/decorator/entity/Entity';
import {Entity, IEntity} from './Entity';
import {ListItem} from './ListItem';

@OrmEntity()
export class List extends Entity {

    @OneToMany(type => ListItem, listItem => listItem.list, {
        cascadeInsert: true,
        cascadeUpdate: true,
        lazy:          false
    })
    items: Array<ListItem>;

    constructor();
    constructor(IList);
    constructor(param?: IList | undefined) {
        super(param);
        this.items = param && param.items || null;
    }

}

export interface IList extends IEntity {
    items?: Array<ListItem>
}