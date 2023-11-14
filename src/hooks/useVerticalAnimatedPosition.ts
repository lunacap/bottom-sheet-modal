import {useEffect} from 'react';
import {runOnJS, useSharedValue, withTiming} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {ANIMATION_DURATION, MAX_EXPANSION_TARGET} from '../constants';

export type UseVerticalAnimatedPositionProps = {
  isModalVisible: boolean;
  target: number;
  callback: (value: boolean) => void;
};

export const useVerticalAnimatedPosition = ({
  isModalVisible,
  target,
  callback,
}: UseVerticalAnimatedPositionProps) => {
  const verticalPosition = useSharedValue(0);
  const {bottom: safeAreaBottom} = useSafeAreaInsets();

  useEffect(() => {
    const sum = safeAreaBottom + target;
    const capped = sum <= MAX_EXPANSION_TARGET ? sum : MAX_EXPANSION_TARGET;
    if (isModalVisible) {
      runOnJS(callback)(true);
      verticalPosition.value = withTiming(-capped, {
        duration: ANIMATION_DURATION,
      });
    } else {
      verticalPosition.value = withTiming(
        0,
        {duration: ANIMATION_DURATION},
        () => runOnJS(callback)(false),
      );
    }
  }, [isModalVisible, target]);

  return verticalPosition;
};
