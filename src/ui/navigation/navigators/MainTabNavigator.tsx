import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from '@/ui/screens/ProfileScreen';
import MainTabBar from './MainTabBar';

export type MainTabRouteProps = {
  AnalysisTab?: {};
  ProfileTab?: {};
};
const MainTab = createBottomTabNavigator<MainTabRouteProps>();
const MainTabNavigator = () => {
  return (
    <MainTab.Navigator
      tabBar={MainTabBar}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'ProfileTab'}>
      <MainTab.Screen name="ProfileTab" component={ProfileScreen} />
    </MainTab.Navigator>
  );
};

export default MainTabNavigator;
