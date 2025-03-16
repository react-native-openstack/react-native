import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '@/ui/screens/LoginScreen';

export type OnboardingStackProps = {
  LoginScreen?: {};
  App?: {};
};
const OnboardingStack = createNativeStackNavigator<OnboardingStackProps>();
const OnboardingStackNavigator = () => {
  return (
    <OnboardingStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
      initialRouteName={'LoginScreen'}>
      <OnboardingStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{gestureEnabled: false}}
      />
    </OnboardingStack.Navigator>
  );
};

export default OnboardingStackNavigator;
