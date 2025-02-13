import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text} from 'react-native';

export type MainTabProps = {
  SampleScreen: {};
};
const MainTab = createBottomTabNavigator<MainTabProps>();
const MainTabNavigator = () => {
  return (
    <MainTab.Navigator
      // tabBar={() => <></>}
      screenOptions={{
        headerShown: false,
      }}
      // initialRouteName={''}
    >
      <MainTab.Screen
        name="SampleScreen"
        component={() => (
          <View>
            <Text>MT - SampleScreen</Text>
          </View>
        )}
      />
    </MainTab.Navigator>
  );
};

export default MainTabNavigator;
