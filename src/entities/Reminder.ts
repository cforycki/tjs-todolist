import {Entity, IEntity} from './Entity';
import DateTimeFormat = Intl.DateTimeFormat;
import {Entity as OrmEntity} from 'typeorm/decorator/entity/Entity';
import {Column} from 'typeorm';

@OrmEntity()
export class Reminder extends Entity {
    @Column()
    value: string;

    @Column()
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