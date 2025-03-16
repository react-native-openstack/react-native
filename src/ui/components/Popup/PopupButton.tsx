import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {Font, wp} from '@/ui/styles/globalStyles';
import Typo from '@/ui/elements/Typo';

type PopupButtonProps = {
  bold?: boolean;
  onPress?: () => void;
  children?: React.ReactNode;
};

const PopupButton = ({bold, onPress, children}: PopupButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Typo style={styles.button__text} font={bold ? Font.Bold : Font.Regular}>
        {children}
      </Typo>
    </TouchableOpacity>
  );
};

export default PopupButton;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: wp(44.5),
  },
  button__text: {
    fontSize: wp(18),
  },
});
