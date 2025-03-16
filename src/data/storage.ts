import Card from '@/domain/model/Card';
import Deck from '@/domain/model/Deck';
import User from '@/domain/model/User';
import AsyncStorage from '@react-native-async-storage/async-storage';

export enum StorageKey {
  CARD_LIST_FILTER = 'CARD_LIST_FILTER',
  LANGUAGE = 'LANGUAGE',
  USER = 'USER',
  CACHED_STUDY = 'CACHED_STUDY',
  CACHED_DECK_LIST = 'CACHED_DECK_LIST',
  CACHED_CARD_LIST = 'CACHED_CARD_LIST',
}

export type StorageData = {
  [StorageKey.CARD_LIST_FILTER]: {
    minCorrect: number;
    minInCorrect: number;
    maxCorrect: number;
    maxInCorrect: number;
  };
  [StorageKey.LANGUAGE]: string;
  [StorageKey.USER]: User;
  [StorageKey.CACHED_STUDY]: {
    deck: Deck;
    cardList: Card[];
    currentIndex: number;
  };
  [StorageKey.CACHED_DECK_LIST]: {
    data: Deck[];
    cached_at_millis: number;
  };
  [StorageKey.CACHED_CARD_LIST]: {
    data: Card[];
    cached_at_millis: number;
  };
};

const Storage = () => {
  // const mmkv = new MMKV();

  const set = <T>(key: StorageKey | string, value: T) => {
    // mmkv.set(key, JSON.stringify(value));
    AsyncStorage.setItem(key, JSON.stringify(value));
  };

  const get = async <T>(key: StorageKey | string): Promise<T | null> => {
    // const value = mmkv.getString(key);
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
    // mmkv.delete(key);
    await AsyncStorage.removeItem(key);
  };

  return {
    get,
    set,
    remove,
  };
};

export default Storage();
