import {Entity, IEntity} from './Entity';
export class User extends Entity{
    login: string;
    firstName: string;
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

export interface IUser extends IEntity{
    login: string;
    firstName?: string;
    lastName?: string;
}