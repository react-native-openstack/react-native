import {Dimensions} from 'react-native';

// 디자인 화면 크기 (Figma)
const basicDimensions = {
  width: 360,
  height: 640,
};

/**
 * 디바이스 높이에 비례하는 사이즈를 사용하는 경우
 */
export const hp = (value: number) => {
  const designHeight = basicDimensions.height;
  const screenHeight = Dimensions.get('window').height;

  const ratio = screenHeight / designHeight;

  return Math.floor(ratio * value);
};

/**
 * 디바이스 너비에 비례하는 사이즈를 사용하는 경우
 * 예: fontSize, width, height, padding, marginLeft, marginRight, marginTop, marginBottom
 */
export const wp = (value: number) => {
  const designWidth = basicDimensions.width;
  const screenWidth = Dimensions.get('window').width;

  const ratio = screenWidth / designWidth;

  return Math.floor(ratio * value);
};
