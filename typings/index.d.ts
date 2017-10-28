/// <reference types="localforage" />

interface LocalForageGetItemsResult {
    [key: string]: any;
}

interface ILocalForageWithGetItems {
    getItems(keys: string[] | null): Promise<LocalForageGetItemsResult>;
    getItems(): Promise<LocalForageGetItemsResult>;
}

interface LocalForage extends ILocalForageWithGetItems { }

interface LocalForageWithGetItems extends LocalForage { }

declare module "localforage-getitems" {
    export function extendPrototype(localforage: LocalForage)
        : LocalForageWithGetItems;

    export var extendPrototypeResult: boolean;
}
