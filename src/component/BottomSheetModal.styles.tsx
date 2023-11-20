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
    alignSelf: 'center',
  },
  indicator: {
    alignSelf: 'center',
    width: 48,
    height: 8,
    backgroundColor: 'lightgray',
    borderRadius: 4,
  },
  overlay: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: 'black',
  },
});
