import React from 'react';
import {Image, Linking, Platform, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {Font, wp} from '@/ui/styles/globalStyles';
import {OnboardingStackProps} from '@/ui/navigation/navigators/OnboardingStackNavigator';
import {
  AuthenticationProvider,
  signIn,
} from '@/ui/services/firebase/firebaseAuthentication';
import createUser from '@/domain/usecase/user/createUser';
import Typo from '@/ui/elements/Typo';
import {useUserStore} from '@/ui/stores/user';
import {LogoAppImage} from '@/ui/assets/images';
import SocialLoginButton from '@/ui/components/SocialLoginButton';
import PrivacyAndTermsOfUse from './PrivacyAndTermsOfUse';
import {useTranslation} from 'react-i18next';
import {tk} from '@/ui/services/i18n';
import {SafeAreaView} from 'react-native-safe-area-context';

type LoginScreenProps = NativeStackScreenProps<
  OnboardingStackProps,
  'LoginScreen'
> & {};

const LoginScreen = ({route, navigation}: LoginScreenProps) => {
  const {t} = useTranslation();
  const {setUser} = useUserStore();

  const handlePressGuestLogin = async () => {
    const userData = await signIn({provider: AuthenticationProvider.Guest});
    const user = await createUser({
      user: {
        id: userData.user.email ?? userData.user.uid,
        email: userData.user.email ?? '',
        thumbnail_url: userData.user.photoURL ?? '',
        name: userData.user.displayName ?? '',
        onboarding_completed: true,
      },
    });
    setUser(user);
    navigation.navigate('App');
  };

  const handlePressGoogleLogin = async () => {
    const userData = await signIn({provider: AuthenticationProvider.Google});
    const user = await createUser({
      user: {
        id: userData.user.email ?? userData.user.uid,
        email: userData.user.email ?? '',
        thumbnail_url: userData.user.photoURL ?? '',
        name: userData.user.displayName ?? '',
        onboarding_completed: true,
      },
    });
    setUser(user);
    navigation.navigate('App');
  };

  const handlePressAppleLogin = async () => {
    const userData = await signIn({provider: AuthenticationProvider.Apple});
    const user = await createUser({
      user: {
        id: userData.user.email ?? userData.user.uid,
        email: userData.user.email ?? '',
        thumbnail_url: userData.user.photoURL ?? '',
        name: userData.user.displayName ?? '',
        onboarding_completed: true,
      },
    });
    setUser(user);
    navigation.navigate('App');
  };

  const handlePressPrivacy = async () => {
    const url = t(tk.privacyLink);
    Linking.openURL(url);
  };

  const handlePressTermsOfUse = async () => {
    const url = t(tk.termsOfUseLink);
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.logo}>
        <Image
          style={styles.logo__icon}
          source={LogoAppImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.title}>
        <Typo style={styles.title__text} font={Font.SemiBold}>
          {t(tk.loginScreen_title)}
        </Typo>
      </View>
      <View style={styles.description}>
        <Typo style={styles.description__text} font={Font.Light}>
          {t(tk.loginScreen_subtitle)}
        </Typo>
      </View>
      <View style={styles.buttons}>
        <View style={styles.buttons__button}>
          <SocialLoginButton type="guest" onPress={handlePressGuestLogin} />
        </View>
        <View style={styles.buttons__button}>
          <SocialLoginButton type="google" onPress={handlePressGoogleLogin} />
        </View>
        {Platform.OS === 'ios' && (
          <View style={styles.buttons__button}>
            <SocialLoginButton type="apple" onPress={handlePressAppleLogin} />
          </View>
        )}
      </View>
      <PrivacyAndTermsOfUse
        onPrivacy={handlePressPrivacy}
        onTermsOfUse={handlePressTermsOfUse}
      />
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginTop: wp(100),
  },
  logo__icon: {
    width: wp(150),
    height: wp(150),
  },
  title: {},
  title__text: {
    fontSize: wp(28),
    color: '#333',
  },
  description: {
    marginTop: wp(12),
  },
  description__text: {
    fontSize: wp(18),
    color: '#7b7b7b',
    textAlign: 'center',
    lineHeight: wp(18) * 1.5,
  },
  buttons: {
    flexDirection: 'column',
    width: '85%',
    marginTop: 'auto',
    marginBottom: wp(12),
  },
  buttons__button: {
    marginTop: wp(12),
  },
});
