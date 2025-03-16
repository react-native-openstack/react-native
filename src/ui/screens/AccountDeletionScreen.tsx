// "ad-title": "계정 삭제",
// "ad-bodyTitle": "계정을 삭제하기 전 알아야 할 내용",
// "ad-bodyContent": "계정 삭제 시, 모든 기록이 사라지며 복구가 불가능합니다.",
// "ad-delete": "삭제하기",
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {Font, wp} from '../styles/globalStyles';
import {useTranslation} from 'react-i18next';
import HeaderButton, {
  HeaderButtonType,
} from '../components/Header/HeaderButton';
import {tk} from '../services/i18n';
import Typo from '../elements/Typo';
import Header from '../components/Header';
import {useUserStore} from '../stores/user';
import removeUser from '@/domain/usecase/user/removeUser';
import {AppStackRouteProps} from '../navigation/navigators/AppStackNavigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import useBackPress from '../hooks/useBackPress';

type AccountDeletionScreenProps = NativeStackScreenProps<
  AppStackRouteProps,
  'AccountDeletionScreen'
> & {};

const AccountDeletionScreen = ({
  route,
  navigation,
}: AccountDeletionScreenProps) => {
  useBackPress(() => {});
  const {user, setUser} = useUserStore();
  const {t} = useTranslation();

  const handlePressDeleteAccount = async () => {
    if (user) {
      await removeUser({user});
      setUser(null);
      navigation.reset({
        index: 0,
        routes: [{name: 'Onboarding'}],
      });
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header
        leftButton={
          <HeaderButton
            icon={HeaderButtonType.Back}
            onPress={navigation.goBack}
          />
        }>
        {t(tk.accountDeletionScreen_title)}
      </Header>
      <View style={styles.screen__divider} />
      <View style={styles.title}>
        <Typo style={styles.title__text} font={Font.Regular}>
          {t(tk.accountDeletionScreen_bodyTitle)}
        </Typo>
      </View>
      <View style={styles.content}>
        <Typo style={styles.content__text} font={Font.Regular}>
          {t(tk.accountDeletionScreen_bodyContent)}
        </Typo>
      </View>
      <View style={styles.line} />
      <View style={styles.dataList}>
        <Typo style={styles.dataList__data} font={Font.Regular}>
          - Remove your card groups
        </Typo>
        <Typo style={styles.dataList__data} font={Font.Regular}>
          - Remove your cards
        </Typo>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handlePressDeleteAccount}>
        <Typo style={styles.button__text} font={Font.Regular}>
          {t(tk.accountDeletionScreen_delete)}
        </Typo>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AccountDeletionScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: 'relative',
  },
  screen__divider: {
    height: 1,
    backgroundColor: '#eee',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: wp(24),
  },
  title__text: {
    fontSize: wp(18),
    textDecorationLine: 'underline',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: wp(12),
  },
  content__text: {
    fontSize: wp(14),
    textAlign: 'center',
    color: '#bbb',
  },
  line: {},
  dataList: {
    paddingVertical: wp(24),
    marginHorizontal: wp(12),
    backgroundColor: '#eee',
    borderRadius: wp(12),
    marginTop: wp(24),
  },
  dataList__data: {
    paddingHorizontal: wp(24),
    fontSize: wp(18),
    paddingVertical: wp(8),
  },
  button: {
    marginHorizontal: wp(12),
    marginTop: wp(36),
    height: wp(56),
    backgroundColor: '#000',
    borderRadius: wp(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  button__text: {
    fontSize: wp(18),
    color: '#fff',
  },
});
