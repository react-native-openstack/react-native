import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingStackNavigator from './OnboardingStackNavigator';
import MainTabNavigator from './MainTabNavigator';

export type AppStackRouteProps = {
  Onboarding?: {};
  Main?: {};
};

type AppStackProps = {
  isOnboardingCompleted: boolean;
};

const AppStack = createNativeStackNavigator<AppStackRouteProps>();
const AppStackNavigator = ({isOnboardingCompleted}: AppStackProps) => {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
      initialRouteName={isOnboardingCompleted ? 'Main' : 'Onboarding'}>
      <AppStack.Screen name="Onboarding" component={OnboardingStackNavigator} />
      <AppStack.Screen name="Main" component={MainTabNavigator} />
    </AppStack.Navigator>
  );
};

export default AppStackNavigator;
