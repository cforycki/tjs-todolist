import {ToDo} from './ToDo';
import {ListItem} from './ListItem';
export class List extends ToDo {

    items: Array<ListItem>;

    constructor();
    constructor({id, items}: { id?: number, items?: Array<ListItem>});
    constructor(param?: { id?: number, items?: Array<ListItem>} | undefined) {
        super(param);
        this.items = param && param.items || null;
    }

}