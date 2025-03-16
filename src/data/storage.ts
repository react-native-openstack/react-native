import User from '@/domain/model/User';
import AsyncStorage from '@react-native-async-storage/async-storage';

export enum StorageKey {
  LANGUAGE = 'LANGUAGE',
  USER = 'USER',
}

export type StorageData = {
  [StorageKey.LANGUAGE]: string;
  [StorageKey.USER]: User;
};

const Storage = () => {
  const set = <T>(key: StorageKey | string, value: T) => {
    AsyncStorage.setItem(key, JSON.stringify(value));
  };

  const get = async <T>(key: StorageKey | string): Promise<T | null> => {
    const value = await AsyncStorage.getItem(key);
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

  const remove = async (key: StorageKey | string): Promise<void> => {
    await AsyncStorage.removeItem(key);
  };

  return {
    get,
    set,
    remove,
  };
};

export default Storage();
