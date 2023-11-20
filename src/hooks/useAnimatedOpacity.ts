import {useEffect} from 'react';
import {useSharedValue, withTiming} from 'react-native-reanimated';

import {
  ANIMATION_DURATION,
  DEFAULT_BOTTOMSHEET_OPACITY,
  DEFAULT_OVERLAY_OPACITY,
} from '../constants';

export type UseAnimatedOpacityProps = {
  isModalVisible: boolean;
  isSecondModalVisible: boolean;
  target?: {
    overlay: number;
    bottomSheet: number;
  };
};

export const useAnimatedOpacity = ({
  isModalVisible,
  isSecondModalVisible,
  target,
}: UseAnimatedOpacityProps) => {
  const overlayOpacity = useSharedValue(0);
  const bottomSheetOpacity = useSharedValue(1);

  useEffect(() => {
    if (isModalVisible) {
      overlayOpacity.value = withTiming(
        target?.overlay ?? DEFAULT_OVERLAY_OPACITY,
        {
          duration: ANIMATION_DURATION,
        },
      );
    } else {
      overlayOpacity.value = withTiming(0, {duration: ANIMATION_DURATION});
    }
  }, [isModalVisible]);

  useEffect(() => {
    if (isSecondModalVisible) {
      bottomSheetOpacity.value = withTiming(
        target?.bottomSheet ?? DEFAULT_BOTTOMSHEET_OPACITY,
      );
    } else {
      bottomSheetOpacity.value = withTiming(1 ?? DEFAULT_BOTTOMSHEET_OPACITY);
    }
  }, [isSecondModalVisible]);

  return {overlayOpacity, bottomSheetOpacity};
};
