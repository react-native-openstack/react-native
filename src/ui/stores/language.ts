import {LanguageType} from '../services/i18n';
import {StorageKey} from '@/data/storage';
import createStore from './createStore';

type State = {
  language: LanguageType | null;
};

type Actions = {
  setLanguage: (language: State['language']) => void;
  clearLanguage: () => void;
};

export const useLanguageStore = createStore<State, Actions>({
  initializer: (set, get) => ({
    language: get()?.language ?? null,
    setLanguage: language => {
      set({language});
    },
    clearLanguage: () => {
      set({language: null});
    },
  }),
  storageKey: StorageKey.LANGUAGE,
});
