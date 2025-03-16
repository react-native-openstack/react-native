import React from 'react';
import {
  Image,
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {Font, hp, wp} from '@/ui/styles/globalStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import Typo from '@/ui/elements/Typo';
import {useUserStore} from '@/ui/stores/user';
import {GuestIcon} from '@/ui/assets/icon';
import SocialLoginButton from '@/ui/components/SocialLoginButton';
import {useTranslation} from 'react-i18next';
import {tk} from '@/ui/services/i18n';
import syncSocialAccountWithUser from '@/domain/usecase/user/syncSocialAccountWithUser';
import {
  AuthenticationProvider,
  signIn,
} from '@/ui/services/firebase/firebaseAuthentication';

type DrawerContentsProps = DrawerContentComponentProps & {};

const DrawerContents = ({navigation}: DrawerContentsProps) => {
  const {t} = useTranslation();
  const {user, setUser} = useUserStore();

  const handlePressPrivacy = async () => {
    const url = t(tk.privacyLink);
    Linking.openURL(url);
  };

  const handlePressTermsOfUse = async () => {
    const url = t(tk.termsOfUseLink);
    Linking.openURL(url);
  };

  const handlePressSupport = async () => {
    const url = t(tk.supportLink);
    Linking.openURL(url);
  };

  const handlePressAccountDeletion = () => {
    navigation.reset({
      routes: [
        {
          name: 'App',
          state: {
            routes: [{name: 'Main'}, {name: 'AccountDeletionScreen'}],
          },
        },
      ],
    });
  };

  const handlePressSignInWithGoogle = async () => {
    if (user) {
      const userData = await signIn({
        provider: AuthenticationProvider.Google,
      });
      const socialUser = await syncSocialAccountWithUser({
        currentUser: user,
        socialUser: {
          id: userData.user.email ?? userData.user.uid,
          email: userData.user.email ?? '',
          thumbnail_url: userData.user.photoURL ?? '',
          name: userData.user.displayName ?? '',
          onboarding_completed: true,
          _refUser: user,
        },
      });
      setUser(socialUser);
    }
  };

  const handlePressSignInWithApple = async () => {
    if (user) {
      const userData = await signIn({
        provider: AuthenticationProvider.Apple,
      });
      const socialUser = await syncSocialAccountWithUser({
        currentUser: user,
        socialUser: {
          id: userData.user.email ?? userData.user.uid,
          email: userData.user.email ?? '',
          thumbnail_url: userData.user.photoURL ?? '',
          name: userData.user.displayName ?? '',
          onboarding_completed: true,
          _refUser: user,
        },
      });
      setUser(socialUser);
    }
  };

  return (
    <SafeAreaView style={styles.drawer}>
      <View style={styles.drawer__profile}>
        {user && user.thumbnail_url ? (
          <Image
            source={{uri: user.thumbnail_url}}
            style={styles.drawer__profile__image}
          />
        ) : (
          <GuestIcon width={wp(56)} height={wp(56)} />
        )}
        <View style={styles.drawer__profile__details}>
          <Typo
            font={Font.Medium}
            style={styles.drawer__profile__details__class}>
            {user?.email ? user.email : user?.id?.slice(0, 7)}
          </Typo>
          <Typo
            font={Font.Medium}
            style={styles.drawer__profile__details__name}>
            {user && user.name ? user.name : 'Guest'}
          </Typo>
        </View>
      </View>
      <View style={styles.drawer__menuList}>
        <TouchableOpacity
          style={styles.drawer__menuList__menu}
          onPress={handlePressPrivacy}>
          <Typo font={Font.Medium} style={styles.drawer__menuList__menu__label}>
            {t(tk.privacyPolicy)}
          </Typo>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawer__menuList__menu}
          onPress={handlePressTermsOfUse}>
          <Typo font={Font.Medium} style={styles.drawer__menuList__menu__label}>
            {t(tk.termsOfUse)}
          </Typo>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawer__menuList__menu}
          onPress={handlePressSupport}>
          <Typo font={Font.Medium} style={styles.drawer__menuList__menu__label}>
            {t(tk.support)}
          </Typo>
        </TouchableOpacity>
        {user?.email?.includes('@') && (
          <TouchableOpacity
            style={styles.drawer__menuList__menu}
            onPress={handlePressAccountDeletion}>
            <Typo
              font={Font.Medium}
              style={StyleSheet.flatten([
                styles.drawer__menuList__menu__label,
                styles.drawer__menuList__menu__labelRed,
              ])}>
              {t(tk.accountDeletion)}
            </Typo>
          </TouchableOpacity>
        )}
      </View>
      {!user?.email?.includes('@') && (
        <View style={styles.drawer__button}>
          <SocialLoginButton
            type="google"
            onPress={handlePressSignInWithGoogle}
          />
        </View>
      )}
      {Platform.OS === 'ios' && !user?.email?.includes('@') && (
        <View style={styles.drawer__button}>
          <SocialLoginButton
            type="apple"
            onPress={handlePressSignInWithApple}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default DrawerContents;

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  drawer__profile: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(12),
    paddingVertical: wp(24),
    borderBottomWidth: wp(1),
    borderColor: '#ddd',
  },
  drawer__profile__image: {
    width: wp(56),
    height: wp(56),
    borderRadius: wp(30),
  },
  drawer__profile__details: {
    flexDirection: 'column',
  },
  drawer__profile__details__class: {
    paddingLeft: wp(12),
    fontSize: wp(15),
    color: '#B0B0A7',
  },
  drawer__profile__details__name: {
    paddingLeft: wp(12),
    fontSize: wp(17),
    marginTop: wp(4),
  },
  drawer__menuList: {
    marginBottom: 'auto',
  },
  drawer__menuList__menu: {
    paddingHorizontal: wp(16),
    flexDirection: 'row',
    alignItems: 'center',
    height: wp(48),
    borderBottomWidth: wp(1),
    borderColor: '#ddd',
  },
  drawer__menuList__menu__label: {
    fontSize: wp(17),
  },
  drawer__menuList__menu__labelRed: {
    color: 'red',
  },
  drawer__button: {
    paddingHorizontal: wp(12),
    marginBottom: hp(8),
  },
});
