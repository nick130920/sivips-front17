/*type StorageObjectMap = {
    appSession: {
        user: string;
        token: string;
    };
};*/

export type StorageObjectType = 'appSession' | 'mode';

export type StorageObjectData<T extends StorageObjectType> = {
    type: T;
    data: T extends 'appSession'
        ? { user: string; token: string; authorities: string; modo: boolean }
        : T extends 'mode'
          ? boolean
          : never;
};
