import {useCallback, useMemo, useState} from 'react';
import {Keyboard, Modal, Pressable} from 'react-native';
import Animated, {runOnJS, useAnimatedStyle} from 'react-native-reanimated';

import {
  useAnimatedOpacity,
  useVerticalAnimatedPosition,
  useSafeProperties,
  useWidth,
  SafeProperty,
} from '../hooks';
import {CompareTypes, DataTypes} from '../constants';

import {BottomSheet, BottomSheetProps} from './BottomSheet';
import {styles} from './BottomSheetModal.styles';

export type BottomSheetModalProps = {
  /**
   * @param isBottomSheetVisible boolean value for initial bottom sheet modal visibility
   */
  isBottomSheetVisible: boolean;

  /**
   *
   * @param setIsBottomSheetVisible setter method of the useState or another asynchronous state setter method, needs to be provided for smooth opening and closing of the modal
   */
  setIsBottomSheetVisible: (value: boolean) => void;

  /**
   * @param isSecondBottomSheetVisible boolean value for the secondary bottom sheet modal visibility
   */
  isSecondBottomSheetVisible?: boolean;

  /**
   *
   * @param setIsSecondBottomSheetVisible setter method of the useState or another asynchronous state setter method for the second bottom sheet, needs to be provided for smooth opening and closing of the modal
   */
  setIsSecondBottomSheetVisible?: (value: boolean) => void;

  /**
   * @param firstBottomSheetProps properties to manange the content of the initial modal
   */
  firstBottomSheetProps: BottomSheetProps;

  /**
   * @param secondBottomSheetProps properties to manange the content of the second modal
   */
  secondBottomSheetProps?: BottomSheetProps;

  /**
   * @param firstBottomSheetFadeOutValue value to manage the fadeing out value of the initial modal when second is expanded, default value is 0.2
   */
  firstBottomSheetFadeOutValue?: number;

  /**
   * @param isOverlayDisabled property to manage whether or nor the overlay will respond to press events
   */
  isOverlayDisabled?: boolean;

  /**
   * @param overlayOpacity property to manage the density of overlay, accepts values between 0 and 1
   */
  overlayOpacity?: number;
};

const BottomSheetModal = ({
  isBottomSheetVisible,
  setIsBottomSheetVisible,
  isSecondBottomSheetVisible,
  setIsSecondBottomSheetVisible,
  firstBottomSheetProps,
  secondBottomSheetProps,
  firstBottomSheetFadeOutValue,
  isOverlayDisabled,
  overlayOpacity,
}: BottomSheetModalProps): JSX.Element => {
  const [isModalVisibleInternal, setIsBottomVisibleInternal] =
    useState<boolean>(false);

  const [firstContentHeight, setFirstContentHeight] = useState(0);
  const [secondContentHeight, setSecondContentHeight] = useState(0);

  const Overlay = useMemo(
    () => Animated.createAnimatedComponent(Pressable),
    [],
  );

  const firstBottomSheetCallback = useCallback((value: boolean) => {
    setIsBottomVisibleInternal(value);
    setIsBottomSheetVisible(value);
  }, []);

  const secondBottomSheetCallback = useCallback((value: boolean) => {
    setIsSecondBottomSheetVisible?.(value);
  }, []);

  const handleOverlayPress = useCallback(() => {
    if (isSecondBottomSheetVisible && setIsSecondBottomSheetVisible) {
      if (Keyboard.isVisible()) {
        Keyboard.dismiss();
      }
      runOnJS(setIsSecondBottomSheetVisible)(false);
    } else {
      runOnJS(setIsBottomSheetVisible)(false);
    }
  }, [isSecondBottomSheetVisible]);

  const firstSheetVerticalPosition = useVerticalAnimatedPosition({
    isBottomSheetVisible: isBottomSheetVisible,
    target: isSecondBottomSheetVisible
      ? secondContentHeight + 30
      : firstContentHeight,
    callback: firstBottomSheetCallback,
  });

  const secondSheetVerticalPosition = useVerticalAnimatedPosition({
    isBottomSheetVisible: isSecondBottomSheetVisible as boolean,
    target: secondContentHeight,
    callback: secondBottomSheetCallback,
  });

  const {overlayOpacity: overlayOpacityValue, bottomSheetOpacity} =
    useAnimatedOpacity({
      isModalVisible: isSecondBottomSheetVisible || isBottomSheetVisible,
      isSecondModalVisible: isSecondBottomSheetVisible as boolean,
      target: {
        overlay: overlayOpacity as number,
        bottomSheet: firstBottomSheetFadeOutValue as number,
      },
    });

  const firstBottomSheetWidth = useWidth({
    shouldScale: isSecondBottomSheetVisible as boolean,
  });

  const animatedOverlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacityValue.value,
  }));

  const safeProperties: Array<SafeProperty> = [
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
      propertyName: 'isOverlayDisabled',
      propertyValue: isOverlayDisabled,
      typeSafety: {
        propertyType: DataTypes.BOOLEAN,
      },
    },
    {
      propertyName: 'isSecondBottomSheetVisible',
      propertyValue: isSecondBottomSheetVisible,
      typeSafety: {
        propertyType: DataTypes.BOOLEAN,
      },
    },
    {
      propertyName: 'setIsSecondBottomSheetVisible',
      propertyValue: setIsSecondBottomSheetVisible,
      typeSafety: {
        propertyType: DataTypes.FUNCTION,
      },
    },
  ];
  useSafeProperties(safeProperties);

  return (
    <Modal visible={isModalVisibleInternal} animationType="none" transparent>
      <Overlay
        style={[styles.overlay, animatedOverlayStyle]}
        onPress={isOverlayDisabled ? undefined : handleOverlayPress}
      />
      <BottomSheet
        onLayout={setFirstContentHeight}
        indicatorStyle={firstBottomSheetProps?.indicatorStyle}
        verticalPosition={firstSheetVerticalPosition}
        width={firstBottomSheetWidth}
        opacity={bottomSheetOpacity}
        modalStyle={firstBottomSheetProps?.modalStyle}
        snapPosition={firstBottomSheetProps?.snapPosition}>
        {firstBottomSheetProps?.children}
      </BottomSheet>
      <BottomSheet
        onLayout={setSecondContentHeight}
        verticalPosition={secondSheetVerticalPosition}
        indicatorStyle={secondBottomSheetProps?.indicatorStyle}
        modalStyle={secondBottomSheetProps?.modalStyle}
        snapPosition={secondBottomSheetProps?.snapPosition}>
        {secondBottomSheetProps?.children}
      </BottomSheet>
    </Modal>
  );
};

export {BottomSheetProps};

export default BottomSheetModal;
