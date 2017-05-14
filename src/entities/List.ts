import {Entity, IEntity} from './Entity';
import {ListItem} from './ListItem';
export class List extends Entity {

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