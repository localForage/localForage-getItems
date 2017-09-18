/// <reference types="localforage" />

interface LocalForageGetItemsResult {
    [key: string]: any;
}

interface LocalForageWithGetItems extends LocalForage {
    getItems(keys: string[] | null): Promise<LocalForageGetItemsResult>;
    getItems(): Promise<LocalForageGetItemsResult>;
}

declare module "localforage-getitems" {
    export function extendPrototype(localforage: LocalForage)
        : LocalForageWithGetItems;

    export var extendPrototypeResult: boolean;
}
