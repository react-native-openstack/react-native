import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTabNavigator from './MainTabNavigator';
import AccountDeletionScreen from '@/ui/screens/AccountDeletionScreen';

export type AppStackRouteProps = {
  Onboarding?: {};
  Main?: {};
  AccountDeletionScreen?: {};
};

type AppStackProps = {};

const AppStack = createNativeStackNavigator<AppStackRouteProps>();
const AppStackNavigator = ({}: AppStackProps) => {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade_from_bottom',
      }}
      initialRouteName={'Main'}>
      <AppStack.Screen name="Main" component={MainTabNavigator} />
      <AppStack.Screen
        name="AccountDeletionScreen"
        component={AccountDeletionScreen}
      />
    </AppStack.Navigator>
  );
};

export default AppStackNavigator;
