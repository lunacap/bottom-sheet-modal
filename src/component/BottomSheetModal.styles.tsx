import {StyleSheet} from 'react-native';

import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../constants';

export const styles = StyleSheet.create({
  modalCard: {
    position: 'absolute',
    top: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  indicator: {
    alignSelf: 'center',
    width: 36,
    height: 4,
    backgroundColor: 'lightgray',
    left: 0,
    right: 0,
    top: 0,
  },
  overlay: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: 'black',
  },
});
