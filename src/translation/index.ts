import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {NativeModules, Platform} from 'react-native/types';
import {validateTranslationKeys} from '@/utils/translationKeys';

import en from './resources/en.json';
import ko from './resources/ko.json';
import ja from './resources/ja.json';

let locale =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager?.settings?.AppleLocale ||
      NativeModules.SettingsManager?.settings?.AppleLanguages?.[0] ||
      'en'
    : NativeModules.I18nManager?.localeIdentifier || 'en';

if (locale.indexOf('_') !== -1) {
  locale = locale.split('_')[0];
}

const resources: Record<string, {translation: typeof en}> = {
  en: {
    translation: en,
  },
  ko: {
    translation: ko,
  },
  ja: {
    translation: ja,
  },
};

// Validation Check
if (__DEV__) {
  Object.keys(resources).forEach(key => {
    const resource = resources[key];
    validateTranslationKeys(key, resource.translation);
  });
}

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  lng: locale, // 감지된 언어로 설정
  resources,
  fallbackLng: 'en', // 대체 언어
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
