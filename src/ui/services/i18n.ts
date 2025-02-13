import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {NativeModules, Platform} from 'react-native';
import _ from 'lodash';
import storage, {StorageKey} from './storage';

import de from '@/ui/assets/translation/de.json';
import en from '@/ui/assets/translation/en.json';
import es from '@/ui/assets/translation/es.json';
import fr from '@/ui/assets/translation/fr.json';
import id from '@/ui/assets/translation/id.json';
import ja from '@/ui/assets/translation/ja.json';
import ko from '@/ui/assets/translation/ko.json';
import pl from '@/ui/assets/translation/pl.json';
import pt from '@/ui/assets/translation/pt.json';
import vi from '@/ui/assets/translation/vi.json';
import zh from '@/ui/assets/translation/zh.json';

const resources = {
  de: {translation: de},
  en: {translation: en},
  es: {translation: es},
  fr: {translation: fr},
  id: {translation: id},
  ja: {translation: ja},
  ko: {translation: ko},
  pl: {translation: pl},
  pt: {translation: pt},
  vi: {translation: vi},
  zh: {translation: zh},
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
  DE = 'de',
  EN = 'en',
  ES = 'es',
  FR = 'fr',
  ID = 'id',
  JA = 'ja',
  KO = 'ko',
  PL = 'pl',
  PT = 'pt',
  VI = 'vi',
  ZH = 'zh',
}

export const setLanguage = (lang: LanguageType) => {
  storage.set<string>(StorageKey.LANGUAGE, lang);
  i18n.changeLanguage(lang);
};

// TODO 추가되지 않은 키는 여기에 추가해주세요.
export const tk = {
  privacyLink: 'privacyLink',
  termsOfUseLink: 'termsOfUseLink',
  supportLink: 'supportLink',
};

export const validateTranslationKeys = (lang: string, json: any) => {
  const keys = Object.values(tk);
  keys.forEach(key => {
    if (_.isEmpty(json[key])) {
      console.error(`[${lang}] 값이 없음 = ${key}`);
    }
  });
};

export default i18n;
