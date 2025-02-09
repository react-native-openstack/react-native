declare var __E2E__: boolean;

declare module '@env' {
  export const E2E: string;
  export const FIREBASE_AUTH_WEB_CLIENT_ID: string;
  // export const PRODUCTION_SERVER: string;
  // export const LOCAL_SERVER: string;
  // export const LOCAL_SERVER_ANDROID: string;
}

declare var require: any;

declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module '*.webp' {
  const src: string;
  export default src;
}
