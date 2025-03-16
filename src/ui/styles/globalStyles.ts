import {Dimensions} from 'react-native';

// 디자인 화면 크기 (6.1 인치)
const basicDimensions = {
  width: 393,
  height: 852,
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

export enum Font {
  Thin = '100_Inter_Thin',
  ExtraLight = '200_Inter_ExtraLight',
  Light = '300_Inter_Light',
  Regular = '400_Inter_Regular',
  Medium = '500_Inter_Medium',
  SemiBold = '600_Inter_SemiBold',
  Bold = '700_Inter_Bold',
  ExtraBold = '800_Inter_ExtraBold',
  Black = '900_Inter_Black',
}
