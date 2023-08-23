export const DBConfig = {
  name: 'MyDB',
  version: 1,
  objectStoresMeta: [
    {
      store: 'people',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'email', keypath: 'email', options: { unique: false } },
      ],
    },
    {
      store: 'task',
      storeConfig: { keyPath: '_id', autoIncrement: false },
      storeSchema: [
        { name: '_id', keypath: '_id', options: { unique: true } },
        { name: 'name', keypath: 'name', options: { unique: false } },
      ],
    },
  ],
};