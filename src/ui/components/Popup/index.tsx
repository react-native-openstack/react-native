import {wp} from '@/ui/styles/globalStyles';
import React from 'react';
import {
  Dimensions,
  LayoutChangeEvent,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import PopupTitle from './PopupTitle';
import PopupDescription from './PopupDescription';
import PopupFooter from './PopupFooter';
import PopupButton from './PopupButton';

export type PopupProps = {
  visible?: boolean;
  closable?: boolean;
  onClose?: () => void;
  backgroundColor?: string;
  children?: React.ReactNode;
};

const Popup = ({
  visible = false,
  closable = true,
  onClose,
  backgroundColor = '#fff',
  children,
}: PopupProps) => {
  const shown = useSharedValue(false);
  const origin = useSharedValue(0);

  const animatedBackgroundStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(origin.value, [0, 1], [0, 1]),
    };
  }, [origin.value]);

  const animatedContentStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(origin.value, [0, 1], [0, 1]),
      transform: [{translateY: interpolate(origin.value, [0, 1], [30, 0])}],
    };
  }, [origin.value]);

  const closed = () => {
    if (closable) {
      onClose && onClose();
      setTimeout(() => {
        origin.value = 0;
        shown.value = false;
      }, 200);
    }
  };

  const show = () => {
    origin.value = withTiming(
      1,
      {
        duration: 300,
      },
      () => {
        shown.value = true;
      },
    );
  };

  const hide = () => {
    if (closable) {
      origin.value = withTiming(0, {duration: 300}, isFinished => {
        if (isFinished) {
          runOnJS(closed)();
        }
      });
    }
  };

  const handleLayoutContent = (e: LayoutChangeEvent) => {
    const _height = e.nativeEvent.layout.height;
    if (_height > 0) {
      show();
    }
  };

  return (
    <Modal visible={visible} transparent statusBarTranslucent>
      <Animated.View style={[styles.background, animatedBackgroundStyle]} />
      <TouchableOpacity activeOpacity={1} style={styles.popup} onPress={hide}>
        <Animated.View
          style={[
            styles.popup__container,
            {backgroundColor},
            animatedContentStyle,
          ]}>
          <TouchableOpacity activeOpacity={1} onLayout={handleLayoutContent}>
            {children}
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

// export default Popup;
export default Object.assign(Popup, {
  Title: PopupTitle,
  Description: PopupDescription,
  Footer: PopupFooter,
  Button: PopupButton,
});

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    zIndex: -1,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup__container: {
    backgroundColor: '#fff',
    width: Dimensions.get('window').width - wp(36) * 2,
    borderRadius: wp(12),
  },
});
