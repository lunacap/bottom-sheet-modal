import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {useBottomSheetPaperStyles} from './BottomSheetPaper.styles';
import {FC, memo} from 'react';
import {View} from 'react-native';
import {BottomSheetPaperPropsInternal} from './types';

export const BottomSheetPaper: FC<BottomSheetPaperPropsInternal> = memo(
  ({onLayout, scaleX, position, header, children}) => {
    const paperStyles = useBottomSheetPaperStyles();

    const paperAnimatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: -position.value,
          },
          {
            scaleX: scaleX?.value ?? 1,
          },
        ],
      };
    });

    return (
      <Animated.View style={[paperStyles.paper, paperAnimatedStyle]}>
        <View>{header}</View>
        <View onLayout={onLayout}>{children}</View>
      </Animated.View>
    );
  },
);
