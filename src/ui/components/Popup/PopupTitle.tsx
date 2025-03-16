import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Font, wp} from '@/ui/styles/globalStyles';
import Typo from '@/ui/elements/Typo';

type PopupTitleProps = {
  children?: React.ReactNode;
};

const PopupTitle = ({children}: PopupTitleProps) => {
  return (
    <View style={styles.title}>
      <Typo style={styles.title__text} font={Font.Bold}>
        {children}
      </Typo>
    </View>
  );
};

export default PopupTitle;

const styles = StyleSheet.create({
  title: {
    marginTop: wp(20),
    paddingHorizontal: wp(16),
  },
  title__text: {
    fontSize: wp(18),
    color: '#000',
    textAlign: 'center',
  },
});
