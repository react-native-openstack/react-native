import {Dimensions} from 'react-native';

// 디자인 화면 크기 (Figma)
const basicDimensions = {
  width: 360,
  height: 640,
};

const {width: initialWidth, height: initialHeight} = Dimensions.get('window');

let screenWidth = initialWidth;
let screenHeight = initialHeight;

Dimensions.addEventListener('change', ({window}) => {
  screenWidth = window.width;
  screenHeight = window.height;
});

export const hp = (value: number) =>
  Math.floor((screenHeight / basicDimensions.height) * value);

export const wp = (value: number) =>
  Math.floor((screenWidth / basicDimensions.width) * value);
