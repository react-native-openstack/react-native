import {AtomEffect} from 'recoil';
import storage, {StorageKey} from '@/ui/services/storage';

export const persistEffect = <T>(key: StorageKey): AtomEffect<T> => {
  return ({setSelf, onSet}) => {
    const loadPersisted = () => {
      try {
        const savedValue = storage.get(key);
        if (savedValue !== undefined && savedValue !== null) {
          setSelf(savedValue as T);
        }
      } catch (error) {
        console.error(`Failed to load saved data for key: ${key}`, error);
      }
    };

    loadPersisted();

    onSet((newValue, _, isReset) => {
      if (isReset) {
        storage.remove(key);
      } else {
        try {
          storage.set(key, newValue);
        } catch (error) {
          console.error(`Failed to save data for key: ${key}`, error);
        }
      }
    });
  };
};
