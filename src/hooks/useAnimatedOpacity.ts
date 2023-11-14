import {useEffect} from 'react';
import {useSharedValue, withTiming} from 'react-native-reanimated';

import {ANIMATION_DURATION, DEFAULT_OVERLAY_OPACITY} from '../constants';

export type UseAnimatedOpacityProps = {
  isModalVisible: boolean;
  target?: number;
};

export const useAnimatedOpacity = ({
  isModalVisible,
  target,
}: UseAnimatedOpacityProps) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (isModalVisible) {
      opacity.value = withTiming(target ?? DEFAULT_OVERLAY_OPACITY, {
        duration: ANIMATION_DURATION,
      });
    } else {
      opacity.value = withTiming(0, {duration: ANIMATION_DURATION});
    }
  }, [isModalVisible]);

  return opacity;
};
