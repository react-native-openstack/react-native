import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStackNavigator from './navigators/AppStackNavigator';
import {useNavigationLogger} from '../hooks/useNavigationLogger';
import {createDeepLink} from './deepLink';
import {APP_NAME} from '@env';
import useAppInitialization from '../hooks/useAppInitialization';

const RootNavigation = () => {
  const navigationLogger = useNavigationLogger();
  const {isInitialized, isOnboardingCompleted} = useAppInitialization();
  return !isInitialized ? (
    <></>
  ) : (
    <NavigationContainer
      ref={navigationLogger.navigationRef}
      onReady={navigationLogger.handleReadyNavigation}
      onStateChange={navigationLogger.handleStateChangeNavigation}
      linking={createDeepLink(APP_NAME)}>
      <AppStackNavigator isOnboardingCompleted={isOnboardingCompleted} />
    </NavigationContainer>
  );
};

export default RootNavigation;
