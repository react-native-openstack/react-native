import React, {forwardRef} from 'react';
import {TextStyle, TextInputProps, TextInput} from 'react-native';
import {Font} from '@/ui/styles/globalStyles';

type Props = TextInputProps & {
  font: Font;
  style?: TextStyle;
};

const TypoInput = forwardRef(
  ({font, style, ...otherProps}: Props, ref: React.Ref<TextInput>) => {
    const lineHeightRatio = 1.2;
    return (
      <TextInput
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
        ref={ref}
      />
    );
  },
);

export default TypoInput;
