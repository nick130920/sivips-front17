import { StorageObjectData, StorageObjectType } from './storage.types';
import { JwtPayload } from 'jwt-decode';

type StorageOptions = {
    api?: 'LocalStorage' | 'SessionStorage';
};

function getStorageApi(api: StorageOptions['api']): Storage {
    return api === 'SessionStorage' ? sessionStorage : localStorage;
}

function getItem<T extends StorageObjectType>(
    item: string,
    options?: StorageOptions,
): StorageObjectData<T>['data'] | null {
    const api = getStorageApi(options?.api || 'LocalStorage');
    const data = api.getItem(item.toString());
    return data ? (JSON.parse(data) as StorageObjectData<T>['data']) : null;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function setItem<T extends StorageObjectType>(
    itemName: string,
    data: JwtPayload | string,
    options?: StorageOptions,
): void {
    if (data === null || data === undefined) {
        return;
    }

    const api = getStorageApi(options?.api || 'LocalStorage');
    api.setItem(itemName, JSON.stringify(data));
}

function removeItem<T extends StorageObjectType>(item: T, options?: StorageOptions): void {
    const api = getStorageApi(options?.api || 'LocalStorage');
    api.removeItem(item);
}

function clear(options?: StorageOptions): void {
    const api = getStorageApi(options?.api || 'LocalStorage');
    api.clear();
}

export const storage = {
    getItem,
    setItem,
    removeItem,
    clear,
};
