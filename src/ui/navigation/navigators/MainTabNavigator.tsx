import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

export type MainTabProps = {};
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
      {/* <MainTab.Screen name="" component={} /> */}
    </MainTab.Navigator>
  );
};

export default MainTabNavigator;
