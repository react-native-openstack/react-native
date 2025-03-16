import {StateCreator, create} from 'zustand';
import {PersistStorage, persist} from 'zustand/middleware';

import storage, {StorageKey} from '@/data/storage';

const createStore = <State, Actions>({
  initializer,
  storageKey,
}: {
  initializer: StateCreator<State & Actions>;
  storageKey: StorageKey;
}) => {
  const storeStorage: PersistStorage<State> = {
    setItem: (key, value) => storage.set(key, value.state),
    getItem: async key => {
      const data = await storage.get<State>(key);
      return data ? {state: data} : null;
    },
    removeItem: key => storage.remove(key),
  };

  return create<State & Actions>()(
    persist(initializer, {
      name: storageKey,
      storage: storeStorage,
    }),
  );
};

export default createStore;
