import {useEffect} from 'react';
import {useSharedValue, withTiming} from 'react-native-reanimated';

import {ANIMATION_DURATION, SCREEN_WIDTH} from '../constants';

export type UseScaleAndOrderProps = {
  shouldScale: boolean;
};

export const useWidth = ({shouldScale}: UseScaleAndOrderProps) => {
  const widthSharedValue = useSharedValue(SCREEN_WIDTH);

  useEffect(() => {
    if (shouldScale) {
      widthSharedValue.value = withTiming(SCREEN_WIDTH * 0.9, {
        duration: ANIMATION_DURATION,
      });
    } else {
      widthSharedValue.value = withTiming(SCREEN_WIDTH, {
        duration: ANIMATION_DURATION,
      });
    }
  }, [shouldScale]);

  return widthSharedValue;
};
