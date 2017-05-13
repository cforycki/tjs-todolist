export abstract class ToDo {
    id: number;

    constructor();
    constructor({id}: { id?: number});
    constructor(param?: { id?: number} | undefined) {
        this.id = param && param.id || null;
    }

}