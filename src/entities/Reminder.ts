import {IToDo, ToDo} from './ToDo';
import DateTimeFormat = Intl.DateTimeFormat;
export class Reminder extends ToDo {
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

export interface IReminder extends IToDo {
    value?: string;
    date?: Date;
}