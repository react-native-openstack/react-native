import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Font, wp} from '@/ui/styles/globalStyles';
import Typo from '@/ui/elements/Typo';

type PopupDescriptionProps = {
  children?: React.ReactNode;
};

const PopupDescription = ({children}: PopupDescriptionProps) => {
  return (
    <View style={styles.description}>
      <Typo style={styles.description__text} font={Font.Regular}>
        {children}
      </Typo>
    </View>
  );
};

export default PopupDescription;

const styles = StyleSheet.create({
  description: {
    marginTop: wp(12),
    marginBottom: wp(14),
    paddingHorizontal: wp(16),
  },
  description__text: {
    fontSize: wp(14),
    color: '#969FA2',
    textAlign: 'center',
  },
});
