import {Entity, IEntity} from './Entity';
import DateTimeFormat = Intl.DateTimeFormat;
export class Reminder extends Entity {
    value: string;
    date: Date;

    constructor();
    constructor(IReminder);
    constructor(param?: IReminder | undefined) {
        super(param);
        this.value = param && param.value || null;
        this.date = param && param.date || null;
    }

}

export interface IReminder extends IEntity {
    value?: string;
    date?: Date;
}