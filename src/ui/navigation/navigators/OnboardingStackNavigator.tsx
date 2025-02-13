import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export type OnboardingStackProps = {};
const OnboardingStack = createNativeStackNavigator<OnboardingStackProps>();
const OnboardingStackNavigator = () => {
  return (
    <OnboardingStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
      // initialRouteName={''}
    >
      {/* <OnboardingStack.Screen name="" component={} /> */}
    </OnboardingStack.Navigator>
  );
};

export default OnboardingStackNavigator;
