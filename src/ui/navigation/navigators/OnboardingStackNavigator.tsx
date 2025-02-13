import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, View} from 'react-native';

export type OnboardingStackProps = {
  SampleScreen: {};
};
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
      <OnboardingStack.Screen
        name="SampleScreen"
        component={() => (
          <View>
            <Text>OS - SampleScreen</Text>
          </View>
        )}
      />
    </OnboardingStack.Navigator>
  );
};

export default OnboardingStackNavigator;
