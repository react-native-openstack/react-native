import User from '@/domain/model/User';
import {StorageKey} from '@/data/storage';
import createStore from './createStore';

type State = {
  user: User | null;
};

type Actions = {
  setUser: (user: State['user']) => void;
  clearUser: () => void;
};

export const useUserStore = createStore<State, Actions>({
  initializer: (set, get) => ({
    user: get()?.user ?? null,
    setUser: user => {
      set({user});
    },
    clearUser: () => {
      set({user: null});
    },
  }),
  storageKey: StorageKey.USER,
});
