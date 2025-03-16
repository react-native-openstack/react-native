import Typo from '@/ui/elements/Typo';
import {Font, wp} from '@/ui/styles/globalStyles';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {SvgProps} from 'react-native-svg';

type MainTabProps = {
  active: boolean;
  icon: React.FC<SvgProps>;
  activeIcon: React.FC<SvgProps>;
  name: string;
  onPress: () => void;
};

const MainTab = ({
  active,
  icon: Icon,
  activeIcon: ActiveIcon,
  name,
  onPress,
}: MainTabProps) => {
  return (
    <TouchableOpacity style={styles.tab} onPress={onPress}>
      {active ? (
        <ActiveIcon width={wp(24)} height={wp(24)} />
      ) : (
        <Icon width={wp(24)} height={wp(24)} />
      )}
      <Typo
        font={Font.Regular}
        style={StyleSheet.flatten([
          styles.tab__nameText,
          active && styles.tab__nameTextActive,
        ])}>
        {name}
      </Typo>
    </TouchableOpacity>
  );
};

export default MainTab;

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: wp(6),
    backgroundColor: '#fff',
    height: wp(48),
  },
  tab__nameText: {
    fontSize: wp(10),
  },
  tab__nameTextActive: {
    fontWeight: '600',
  },
});
