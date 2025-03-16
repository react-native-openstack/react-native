import {useFocusEffect} from '@react-navigation/native';
import {BackHandler} from 'react-native';

const useBackPress = (onBackPress: () => void) => {
  useFocusEffect(() => {
    const backAction = () => {
      onBackPress();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  });
};

export default useBackPress;
