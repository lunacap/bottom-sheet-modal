import {StyleSheet, useWindowDimensions} from 'react-native';

export const useBottomSheetPaperStyles = () => {
  const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = useWindowDimensions();

  return StyleSheet.create({
    paper: {
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      position: 'absolute',
      top: SCREEN_HEIGHT,
      alignSelf: 'center',
    },
  });
};
