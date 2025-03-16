import {Font, wp} from '@/ui/styles/globalStyles';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import TypoInput from '../elements/TypoInput';
import Typo from '../elements/Typo';

type FormInputProps = {
  placeholder?: string;
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
};

const FormInput = ({
  placeholder = '',
  label,
  value = '',
  onChange,
}: FormInputProps) => {
  return (
    <View style={styles.item}>
      {label && (
        <View style={styles.item__label}>
          <Typo style={styles.item__label__text} font={Font.Regular}>
            {label}
          </Typo>
        </View>
      )}
      <View style={styles.item__input}>
        {placeholder.length > 0 && value.length === 0 && (
          <View style={styles.item__input__placeholder}>
            <TypoInput
              style={styles.item__input__placeholder__text}
              font={Font.Regular}
              value={placeholder}
              editable={false}
            />
          </View>
        )}
        <TypoInput
          style={styles.item__input__text}
          font={Font.Regular}
          value={value}
          onChangeText={onChange}
        />
      </View>
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    height: wp(44),
    backgroundColor: '#fff',
  },
  item__label: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(15),
  },
  item__label__text: {
    fontSize: wp(14),
    color: '#969FA2',
  },
  item__input: {
    flex: 1,
    justifyContent: 'center',
  },
  item__input__placeholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  item__input__placeholder__text: {
    fontSize: wp(16),
    color: '#6d7d81ba',
  },
  item__input__text: {
    fontSize: wp(16),
    color: '#333333',
    // backgroundColor: 'aqua',
  },
});
