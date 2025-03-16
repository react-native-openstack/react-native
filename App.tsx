import React, {useEffect, useRef} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import RootNavigation from '@/ui/navigation/RootNavigation';
import {I18nextProvider} from 'react-i18next';
import i18n from '@/ui/services/i18n';
import mobileAds, {
  AdsConsent,
  AdsConsentDebugGeography,
} from 'react-native-google-mobile-ads';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';

function App() {
  const isMobileAdsStartCalledRef = useRef(false);

  useEffect(() => {
    if (__DEV__) {
      AdsConsent.reset();
    }

    AdsConsent.requestInfoUpdate({
      debugGeography: AdsConsentDebugGeography.EEA,
    });

    AdsConsent.gatherConsent()
      .then(startGoogleMobileAdsSDK)
      .catch(error => console.error('Consent gathering failed:', error));
  }, []);

  async function startGoogleMobileAdsSDK() {
    if (isMobileAdsStartCalledRef.current) {
      return;
    }

    const {canRequestAds} = await AdsConsent.getConsentInfo();
    if (!canRequestAds) {
      return;
    }

    isMobileAdsStartCalledRef.current = true;

    const gdprApplies = await AdsConsent.getGdprApplies();
    let hasConsentForPurposeOne = false;

    if (gdprApplies) {
      hasConsentForPurposeOne = (
        await AdsConsent.getPurposeConsents()
      ).startsWith('1');
    }

    if (!gdprApplies || hasConsentForPurposeOne) {
      const result = await check(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
      if (result === RESULTS.DENIED) {
        await request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
      }
    }
    await mobileAds().initialize();
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <I18nextProvider i18n={i18n}>
        <RootNavigation />
      </I18nextProvider>
    </GestureHandlerRootView>
  );
}

export default App;
