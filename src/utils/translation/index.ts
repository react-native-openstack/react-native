// i18n.js
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {NativeModules, Platform} from 'react-native';

import en from './resources/en.json';
import ko from './resources/ko.json';
import ja from './resources/ja.json';
import storage, {StorageKey} from '../storage';

const resources = {
  en: {translation: en},
  ko: {translation: ko},
  ja: {translation: ja},
};

const loadLanguage = (): string => {
  let language = storage.get<string>(StorageKey.LANGUAGE) ?? '';
  if (language.length === 0) {
    language =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager?.settings?.AppleLocale ||
          NativeModules.SettingsManager?.settings?.AppleLanguages?.[0] ||
          'en'
        : NativeModules.I18nManager?.localeIdentifier || 'en';
    if (language && language.indexOf('_') !== -1) {
      language = language.split('_')[0];
    }
  }
  return language;
};

const initializeI18n = () => {
  const language = loadLanguage();
  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v4',
    lng: language,
    resources,
    fallbackLng: 'en',
    interpolation: {escapeValue: false},
    react: {useSuspense: false},
  });
};

initializeI18n();

export enum LanguageType {
  EN = 'en',
  KO = 'ko',
  JA = 'ja',
}

export const setLanguage = (lang: LanguageType) => {
  storage.set<string>(StorageKey.LANGUAGE, lang);
  i18n.changeLanguage(lang);
};

export default i18n;
