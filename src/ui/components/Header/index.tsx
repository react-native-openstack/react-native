import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Font, wp} from '@/ui/styles/globalStyles';
import Typo from '@/ui/elements/Typo';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type HeaderProps = {
  leftButton?: React.ReactNode;
  rightButton?: React.ReactNode;
  children?: React.ReactNode;
};

const Header = ({leftButton, rightButton, children}: HeaderProps) => {
  return (
    <View style={styles.header}>
      {leftButton && (
        <View style={[styles.header__button, styles.header__buttonLeft]}>
          {leftButton}
        </View>
      )}
      <Typo font={Font.SemiBold} style={styles.header__title__text}>
        {children}
      </Typo>
      {rightButton && (
        <View style={[styles.header__button, styles.header__buttonRight]}>
          {rightButton}
        </View>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    height: wp(48),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header__button: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    height: '100%',
    minWidth: wp(48),
    top: 0,
    zIndex: 999,
  },
  header__buttonLeft: {
    left: 0,
  },
  header__buttonRight: {
    right: 0,
  },
  header__title: {},
  header__title__text: {
    fontSize: wp(17),
  },
});
