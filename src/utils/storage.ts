import {MMKV} from 'react-native-mmkv';

export enum StorageKey {
  LANGUAGE = 'LANGUAGE',
  USER = 'USER',
}

const Storage = () => {
  const mmkv = new MMKV();

  const set = <T>(key: StorageKey | string, value: T) => {
    mmkv.set(key, JSON.stringify(value));
  };

  const get = <T>(key: StorageKey | string): T | null => {
    const value = mmkv.getString(key);
    if (value) {
      try {
        return JSON.parse(value) as T;
      } catch (error) {
        console.error(`Failed to parse value for key ${key}:`, error);
        return null;
      }
    }
    return null;
  };

  const remove = (key: StorageKey | string): void => {
    mmkv.delete(key);
  };

  return {
    get,
    set,
    remove,
  };
};

export default Storage();
