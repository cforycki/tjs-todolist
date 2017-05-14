import {Entity, IEntity} from './Entity';
import {Entity as OrmEntity} from 'typeorm/decorator/entity/Entity';
import {Column} from 'typeorm';

@OrmEntity()
export class User extends Entity {
    @Column({unique: true, nullable: false})
    login: string;
    @Column()
    firstName: string;
    @Column()
    lastName: string;

    constructor();
    constructor(IUser);
    constructor(param?: IUser | undefined) {
        super(param);
        this.login = param && param.login || null;
        this.firstName = param && param.firstName || null;
        this.lastName = param && param.lastName || null;
    }

}

export interface IUser extends IEntity {
    login: string;
    firstName?: string;
    lastName?: string;
}