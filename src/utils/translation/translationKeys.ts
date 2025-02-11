import _ from 'lodash';

export const tk = {
  // Common
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
