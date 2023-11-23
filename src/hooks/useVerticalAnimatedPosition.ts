import {useEffect} from 'react';
import {runOnJS, useSharedValue, withTiming} from 'react-native-reanimated';

import {ANIMATION_DURATION, MAX_SNAP_POSITION} from '../constants';

export type UseVerticalAnimatedPositionProps = {
  isBottomSheetVisible: boolean;
  target: number;
  callback: (value: boolean) => void;
};

export const useVerticalAnimatedPosition = ({
  isBottomSheetVisible,
  target,
  callback,
}: UseVerticalAnimatedPositionProps) => {
  const verticalPosition = useSharedValue(0);

  useEffect(() => {
    const capped = target <= MAX_SNAP_POSITION ? target : MAX_SNAP_POSITION;
    if (isBottomSheetVisible) {
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
  }, [isBottomSheetVisible, target]);

  return verticalPosition;
};
