 export class Item {
    id!: string;
    int!: number;
    float!: number;
    color!: string;
    child!: ChildItem
}


export class ChildItem {
    id!: string;
    color!: string;
}
