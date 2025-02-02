import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {Pressable, StyleSheet} from 'react-native';
import {BottomSheetPaperState, OverlayProps} from './types';
import {FC, memo} from 'react';
import {ANIMATION_DURATION} from './constants';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Overlay: FC<OverlayProps> = memo(
  ({bottomSheetPaperState, onPress}) => {
    const animatedOverlayStyles = useAnimatedStyle(() => {
      return {
        opacity:
          bottomSheetPaperState.value === BottomSheetPaperState.NONE
            ? withTiming(0, {duration: ANIMATION_DURATION})
            : withTiming(0.5, {duration: ANIMATION_DURATION}),
      };
    });

    return (
      <AnimatedPressable
        onPress={onPress}
        style={[
          StyleSheet.absoluteFill,
          animatedOverlayStyles,
          {backgroundColor: 'black'},
        ]}
      />
    );
  },
);
