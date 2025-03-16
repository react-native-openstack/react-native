import {tk} from '@/ui/services/i18n';
import {wp} from '@/ui/styles/globalStyles';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface Props {
  onTermsOfUse: () => void;
  onPrivacy: () => void;
}

const PrivacyAndTermsOfUse = ({onTermsOfUse, onPrivacy}: Props) => {
  const styles = useStyles();
  const {t} = useTranslation();
  return (
    <View style={styles.privacyAndTermsOfUse}>
      {t(tk.loginScreen_privacyAndTermsOfUse)
        .split(/[<>]+/)
        .map((text, i) => {
          if (text.includes('#1')) {
            return (
              <TouchableOpacity
                key={i}
                style={styles.privacyAndTermsOfUse__link}
                onPress={() => onTermsOfUse()}>
                <Text style={styles.privacyAndTermsOfUse__link__text}>
                  {text.replace('#1', '')}
                </Text>
              </TouchableOpacity>
            );
          } else if (text.includes('#2')) {
            return (
              <TouchableOpacity
                key={i}
                style={styles.privacyAndTermsOfUse__link}
                onPress={() => onPrivacy()}>
                <Text style={styles.privacyAndTermsOfUse__link__text}>
                  {text.replace('#2', '')}
                </Text>
              </TouchableOpacity>
            );
          } else {
            return (
              <Text key={i} style={styles.privacyAndTermsOfUse__text}>
                {text}
              </Text>
            );
          }
        })}
    </View>
  );
};

export default PrivacyAndTermsOfUse;

const useStyles = () =>
  StyleSheet.create({
    privacyAndTermsOfUse: {
      width: '80%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginBottom: wp(24),
    },
    privacyAndTermsOfUse__text: {
      color: '#999',
      fontSize: wp(15),
    },
    privacyAndTermsOfUse__link: {},
    privacyAndTermsOfUse__link__text: {
      color: '#201F24',
      fontSize: wp(15),
      textDecorationLine: 'underline',
    },
  });
