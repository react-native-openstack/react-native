import React, {forwardRef} from 'react';
import {TextStyle, TextInputProps, Text} from 'react-native';
import {Font} from '@/ui/styles/globalStyles';

type Props = TextInputProps & {
  font: Font;
  style?: TextStyle;
};

const Typo = forwardRef(
  (
    {font = Font.Regular, style, children, ...otherProps}: Props,
    ref: React.Ref<Text>,
  ) => {
    const lineHeightRatio = 1.2;
    return (
      <Text
        {...otherProps}
        style={[
          {
            lineHeight: style?.fontSize
              ? style?.fontSize * lineHeightRatio
              : undefined,
          },
          {fontFamily: font},
          style,
        ]}
        ref={ref}>
        {children}
      </Text>
    );
  },
);

export default Typo;
