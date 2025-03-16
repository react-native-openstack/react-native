import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  ArrowLeftIcon,
  FilterFillIcon,
  FilterIcon,
  MenuIcon,
} from '@/ui/assets/icon';
import {Font, wp} from '@/ui/styles/globalStyles';
import Typo from '@/ui/elements/Typo';
import {useTranslation} from 'react-i18next';
import {tk} from '@/ui/services/i18n';

export enum HeaderButtonType {
  Menu = 'menu',
  Back = 'back',
  Done = 'done',
  Filter = 'filter',
  FilterActive = 'filterActive',
}

type HeaderButtonProps = {
  icon?: HeaderButtonType;
  onPress?: () => void;
  children?: React.ReactNode;
};

const HeaderButton = ({icon, onPress, children}: HeaderButtonProps) => {
  const {t} = useTranslation();
  const size = wp(32);
  return (
    <TouchableOpacity style={styles.headerButton} onPress={onPress}>
      {HeaderButtonType.Menu === icon && (
        <>
          <MenuIcon width={size} height={size} />
        </>
      )}
      {HeaderButtonType.Back === icon && (
        <>
          <ArrowLeftIcon width={size} height={size} />
          <Typo style={styles.headerButton__text} font={Font.Regular}>
            {t(tk.back)}
          </Typo>
        </>
      )}
      {HeaderButtonType.Done === icon && (
        <>
          <Typo
            style={StyleSheet.flatten([
              styles.headerButton__text,
              styles.headerButton__textDone,
            ])}
            font={Font.Bold}>
            {t(tk.save)}
          </Typo>
        </>
      )}
      {HeaderButtonType.Filter === icon && (
        <>
          <FilterIcon width={size - wp(4)} height={size - wp(4)} />
        </>
      )}
      {HeaderButtonType.FilterActive === icon && (
        <>
          <FilterFillIcon width={size - wp(4)} height={size - wp(4)} />
        </>
      )}
    </TouchableOpacity>
  );
};

export default HeaderButton;

const styles = StyleSheet.create({
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerButton__text: {
    color: '#333333',
    fontSize: wp(16),
    letterSpacing: -0.4,
  },
  headerButton__textDone: {
    paddingRight: wp(15),
  },
});
