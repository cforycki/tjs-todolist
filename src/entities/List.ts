import {IToDo, ToDo} from './ToDo';
import {ListItem} from './ListItem';
export class List extends ToDo {

    items: Array<ListItem>;

    constructor();
    constructor(IList);
    constructor(param?: IList | undefined) {
        super(param);
        this.items = param && param.items || null;
    }

}

export interface IList extends IToDo {
    items?: Array<ListItem>
}