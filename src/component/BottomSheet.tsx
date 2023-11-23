import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {LayoutChangeEvent, StyleProp, View, ViewStyle} from 'react-native';
import Animated, {SharedValue, useAnimatedStyle} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {CompareTypes, DataTypes, MAX_SNAP_POSITION} from '../constants';

import {SafeProperty, useKeyboardInfo, useSafeProperties} from '../hooks';
import {styles} from './BottomSheetModal.styles';

export type BottomSheetProps = PropsWithChildren<{
  /**
   * @param snapPosition property to override where should the modal expand to, limited to screen height - 50
   */
  snapPosition?: number;

  /**
   * @param indicatorStyle property to override stylings for the indicator, property alignSelf will be ignored
   */
  indicatorStyle?: StyleProp<ViewStyle>;

  /**
   * @param modalStyle property to override stylings for the modal, properties transform, top, width, height, position will be ignored
   */
  modalStyle?: StyleProp<ViewStyle>;
}>;

export type BottomSheetInternalProps = BottomSheetProps & {
  /**
   *
   * @param height used to provide the height of its children
   */
  onLayout: (height: number) => void;

  /**
   * @param verticalPosition used to move the bottomsheet vertically
   */
  verticalPosition: SharedValue<number>;

  /**
   * @param width used to adjust the width when secondary bottomsheet is opened
   */
  width?: SharedValue<number>;

  /**
   * @param opacity used to change the opacity of the when secondary bottom sheet is opened
   */
  opacity?: SharedValue<number>;
};

const BottomSheet = ({
  children,
  indicatorStyle,
  modalStyle,
  snapPosition,
  onLayout,
  verticalPosition,
  width,
  opacity,
}: BottomSheetInternalProps) => {
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

  const animatedSheetStyles = useAnimatedStyle(() => ({
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
      style={[styles.sheet, animatedSheetStyles, safeCustomStyles.modalStyle]}>
      <View onLayout={handleContentLayout}>
        <View style={[styles.indicator, safeCustomStyles.indicatorStyle]} />
        {children}
      </View>
    </Animated.View>
  );
};

export {BottomSheet};
