import React, {Children} from 'react';
import {StyleSheet, View} from 'react-native';

type PopupFooterProps = {
  children?: React.ReactNode;
};

const PopupFooter = ({children}: PopupFooterProps) => {
  const childArray = Children.toArray(children);
  return (
    <View style={styles.footer}>
      {childArray.map((child, index) => (
        <React.Fragment key={index}>
          {index === 1 && <View style={styles.footer__divider} />}
          {child}
        </React.Fragment>
      ))}
    </View>
  );
};

export default PopupFooter;

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#E7EAEB',
  },
  footer__divider: {
    width: 1,
    backgroundColor: '#E7EAEB',
  },
});
