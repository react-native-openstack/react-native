import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';

import {Font, wp} from '@/ui/styles/globalStyles';
import Typo from '../elements/Typo';
import {LogoAppleImage, LogoGoogleImage} from '../assets/images';
import {GuestIcon} from '../assets/icon';
import {useTranslation} from 'react-i18next';
import {tk} from '../services/i18n';

interface SocialLoginButtonProps extends TouchableOpacityProps {
  type: 'google' | 'apple' | 'guest';
}

const SocialLoginButton = ({type, onPress}: SocialLoginButtonProps) => {
  const {t} = useTranslation();
  return (
    <TouchableOpacity
      style={[
        styles.button,
        type === 'google' && styles.buttonGoogle,
        type === 'apple' && styles.buttonApple,
        type === 'guest' && styles.buttonGuest,
      ]}
      onPress={onPress}>
      <View style={styles.button__icon}>
        {type === 'guest' ? (
          <GuestIcon width={wp(32)} height={wp(32)} />
        ) : (
          <Image
            style={styles.button__icon__image}
            source={type === 'google' ? LogoGoogleImage : LogoAppleImage}
            resizeMode="contain"
          />
        )}
      </View>
      <Typo
        font={Font.Medium}
        style={StyleSheet.flatten([
          styles.button__icon__text,
          type === 'google' && styles.button__icon__textGoogle,
          type === 'apple' && styles.button__icon__textApple,
          type === 'guest' && styles.button__icon__textGuest,
        ])}>
        {type === 'google' && t(tk.continueWithGoogle)}
        {type === 'apple' && t(tk.continueWithApple)}
        {type === 'guest' && t(tk.continueWithGuest)}
      </Typo>
    </TouchableOpacity>
  );
};

export default SocialLoginButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    borderRadius: wp(10),
    borderWidth: 1,
    minHeight: wp(56),
    overflow: 'hidden',
  },
  buttonGoogle: {
    backgroundColor: '#fff',
    borderColor: '#e5e5e5',
  },
  buttonApple: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  buttonGuest: {
    backgroundColor: '#fff',
    borderColor: '#e5e5e5',
  },
  button__icon: {
    marginRight: wp(15),
  },
  button__icon__image: {
    width: wp(24),
    height: wp(24),
  },
  button__icon__text: {
    fontSize: wp(17),
    color: '#757575',
    paddingRight: wp(15),
    paddingBottom: Platform.OS === 'ios' ? 0 : wp(4),
  },
  button__icon__textGoogle: {
    color: '#757575',
  },
  button__icon__textApple: {
    color: '#fff',
  },
  button__icon__textGuest: {
    color: '#757575',
  },
});
