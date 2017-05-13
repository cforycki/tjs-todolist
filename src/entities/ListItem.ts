export class ListItem {
    value: string;

    constructor();
    constructor({value} : {value?: string});
    constructor(param?: {value?: string} | undefined){
        this.value = param && param.value || null;
    }
}