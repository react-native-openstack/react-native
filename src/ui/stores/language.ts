import {persistEffect} from '@/ui/stores/persistEffect';
import {StorageKey} from '@/ui/services/storage';
import {atom} from 'recoil';
import {LanguageType} from '../services/i18n';

export const languageState = atom<LanguageType | null>({
  key: 'language/languageState',
  default: null,
  effects: [persistEffect<LanguageType | null>(StorageKey.LANGUAGE)],
});
