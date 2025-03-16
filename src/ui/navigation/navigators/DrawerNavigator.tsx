import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import OnboardingStackNavigator from './OnboardingStackNavigator';
import AppStackNavigator from './AppStackNavigator';
import DrawerContents from './DrawerContents';

export type DrawerRouteProps = {
  Onboarding?: {};
  App?: {};
};

type DrawerProps = {
  isOnboardingCompleted: boolean;
};

const Drawer = createDrawerNavigator<DrawerRouteProps>();
const DrawerNavigator = ({isOnboardingCompleted}: DrawerProps) => {
  return (
    <Drawer.Navigator
      drawerContent={DrawerContents}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={isOnboardingCompleted ? 'App' : 'Onboarding'}>
      <Drawer.Screen name="Onboarding" component={OnboardingStackNavigator} />
      <Drawer.Screen name="App" component={AppStackNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
