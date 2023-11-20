import {useCallback, useEffect, useMemo, useState} from 'react';
import {LayoutChangeEvent, View, ViewStyle} from 'react-native';
import Animated, {SharedValue, useAnimatedStyle} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {CompareTypes, DataTypes, MAX_SNAP_POSITION} from '../constants';

import {SafeProperty, useKeyboardInfo, useSafeProperties} from '../hooks';
import {BottomSheetCardProps} from './BottomSheetModal';
import {styles} from './BottomSheetModal.styles';

export type BottomSheetCardInternalProps = BottomSheetCardProps & {
  onLayout: (height: number) => void;
  verticalPosition: SharedValue<number>;
  width?: SharedValue<number>;
  opacity?: SharedValue<number>;
};

const BottomSheetCard = ({
  children,
  indicatorStyle,
  isOverlayDisabled,
  modalStyle,
  snapPosition,
  onLayout,
  verticalPosition,
  width,
  opacity,
  overlayOpacity,
}: BottomSheetCardInternalProps) => {
  const [contentHeight, setContentHeight] = useState<number>(0);
  const {bottom: safeAreaBottom} = useSafeAreaInsets();

  const keyboardInfo = useKeyboardInfo();

  const totalHeight = useMemo(
    () =>
      contentHeight +
      (keyboardInfo.isKeyboardVisible ? keyboardInfo.keyboardHeight : 0) +
      safeAreaBottom,
    [contentHeight, keyboardInfo.isKeyboardVisible, safeAreaBottom],
  );

  const safeProperties: Array<SafeProperty> = [
    {
      propertyName: 'isOverlayDisabled',
      propertyValue: isOverlayDisabled,
      typeSafety: {
        propertyType: DataTypes.BOOLEAN,
      },
    },
    {
      propertyName: 'overlayOpacity',
      propertyValue: overlayOpacity,
      typeSafety: {
        propertyType: DataTypes.NUMBER,
      },
      valueSafety: [
        {
          compareType: CompareTypes.HIGHER,
          compareValue: 1,
        },
        {
          compareType: CompareTypes.LOWER,
          compareValue: 0,
        },
      ],
    },
    {
      propertyName: 'snapPosition',
      propertyValue: snapPosition,
      typeSafety: {
        propertyType: DataTypes.NUMBER,
      },
      valueSafety: [
        {
          compareType: CompareTypes.HIGHER,
          compareValue: MAX_SNAP_POSITION,
        },
        {
          compareType: CompareTypes.LOWER,
          compareValue: 0,
        },
      ],
    },
  ];

  useSafeProperties(safeProperties);

  const safeCustomStyles = useMemo(() => {
    if (modalStyle) {
      delete (modalStyle as ViewStyle)['transform'];
      delete (modalStyle as ViewStyle)['top'];
      delete (modalStyle as ViewStyle)['width'];
      delete (modalStyle as ViewStyle)['height'];
      delete (modalStyle as ViewStyle)['position'];
    }
    if (indicatorStyle) {
      delete (indicatorStyle as ViewStyle)['alignSelf'];
    }

    return {modalStyle, indicatorStyle};
  }, [modalStyle, indicatorStyle]);

  const handleContentLayout = useCallback((event: LayoutChangeEvent) => {
    setContentHeight(event.nativeEvent.layout.height);
  }, []);

  const animatedModalCardStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: verticalPosition.value,
      },
    ],
    ...(width && {width: width.value}),
    ...(opacity && {opacity: opacity.value}),
  }));

  useEffect(() => {
    onLayout(snapPosition ?? totalHeight);
  }, [totalHeight, snapPosition]);

  return (
    <Animated.View
      style={[
        styles.modalCard,
        animatedModalCardStyles,
        safeCustomStyles.modalStyle,
      ]}>
      <View onLayout={handleContentLayout}>
        <View style={[styles.indicator, safeCustomStyles.indicatorStyle]} />
        {children}
      </View>
    </Animated.View>
  );
};

export {BottomSheetCard};