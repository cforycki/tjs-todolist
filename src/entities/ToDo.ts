export abstract class ToDo implements IToDo {
    id: number;

    constructor();
    constructor(IToDo);
    constructor(param?: IToDo | undefined) {
        this.id = param && param.id || null;
    }

}

export interface IToDo {
    id?: number,
    [key: string]: any
}