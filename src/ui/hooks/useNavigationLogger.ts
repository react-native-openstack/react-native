// src/navigation/navigationLogger.ts
import {useRef} from 'react';
import {NavigationContainerRef} from '@react-navigation/native';
import {getAnalytics} from '@react-native-firebase/analytics';

export const useNavigationLogger = <T extends {}>() => {
  const navigationRef = useRef<NavigationContainerRef<T>>(null);
  const navigationRouteNameRef = useRef<string | undefined>(undefined);

  const handleReadyNavigation = () => {
    const currentRoute = navigationRef.current?.getCurrentRoute();
    navigationRouteNameRef.current = currentRoute?.name;
  };

  const handleStateChangeNavigation = async () => {
    const previousRouteName = navigationRouteNameRef.current;
    const currentRoute = navigationRef.current?.getCurrentRoute();
    const currentRouteName = currentRoute?.name;

    if (previousRouteName !== currentRouteName && currentRouteName) {
      await getAnalytics().logScreenView({
        screen_name: currentRouteName,
        screen_class: currentRouteName,
      });
    }
    navigationRouteNameRef.current = currentRouteName;
  };

  return {
    navigationRef,
    handleReadyNavigation,
    handleStateChangeNavigation,
  };
};
