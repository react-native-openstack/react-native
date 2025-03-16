import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, View} from 'react-native';

type MainTabBarProps = BottomTabBarProps & {};

const MainTabBar = ({state, navigation}: MainTabBarProps) => {
  return (
    <View style={styles.tabBar}>
      {/* <MainTab
        active={state.index === 0}
        icon={AnalysisIcon}
        activeIcon={AnalysisActiveIcon}
        name="분석"
        onPress={() => navigation.navigate('AnalysisTab')}
      /> */}
      {/* <MainTab
        active={state.index === 1}
        icon={ProfileIcon}
        activeIcon={ProfileActiveIcon}
        name="내 정보"
        onPress={() => navigation.navigate('ProfileTab')}
      /> */}
    </View>
  );
};

export default MainTabBar;

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#E7EAEB',
  },
});
