import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {wp} from '../styles/globalStyles';
import {MainTabRouteProps} from '../navigation/navigators/MainTabNavigator';
import Typo from '../elements/Typo';
import {SafeAreaView} from 'react-native-safe-area-context';

type ProfileScreenProps = NativeStackScreenProps<
  MainTabRouteProps,
  'ProfileTab'
> & {};

const ProfileScreen = ({route, navigation}: ProfileScreenProps) => {
  return (
    <SafeAreaView>
      <Typo>ProfileScreen</Typo>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  view: {
    width: wp(20),
    height: wp(20),
  },
});
