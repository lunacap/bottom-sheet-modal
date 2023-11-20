import {PropsWithChildren, useCallback, useMemo, useState} from 'react';
import {Keyboard, Modal, Pressable, StyleProp, ViewStyle} from 'react-native';
import Animated, {runOnJS, useAnimatedStyle} from 'react-native-reanimated';

import {
  useAnimatedOpacity,
  useVerticalAnimatedPosition,
  useSafeProperties,
  useWidth,
  SafeProperty,
} from '../hooks';
import {CompareTypes, DataTypes} from '../constants';

import {BottomSheetCard} from './BottomSheetCard';
import {styles} from './BottomSheetModal.styles';

export type BottomSheetModalProps = {
  /**
   * @param isModalVisible boolean value for initial bottom sheet modal visibility
   */
  isModalVisible: boolean;

  /**
   *
   * @param setIsModalVisible setter method of the useState or another asynchronous state setter method, needs to be provided for smooth opening and closing of the modal
   */
  setIsModalVisible: (value: boolean) => void;

  /**
   * @param isSecondModalVisible boolean value for the secondary bottom sheet modal visibility
   */
  isSecondModalVisible?: boolean;

  /**
   *
   * @param setIsSecondModalVisible setter method of the useState or another asynchronous state setter method for the second bottom sheet, needs to be provided for smooth opening and closing of the modal
   */
  setIsSecondModalVisible?: (value: boolean) => void;

  /**
   * @param firstBottomSheetCardProps properties to manange the content of the initial modal
   */
  firstBottomSheetCardProps: BottomSheetCardProps;

  /**
   * @param secondBottomSheetProps properties to manange the content of the second modal
   */
  secondBottomSheetProps?: BottomSheetCardProps;

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

export type BottomSheetCardProps = PropsWithChildren<{
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

const BottomSheetModal = ({
  isModalVisible,
  setIsModalVisible,
  isSecondModalVisible,
  setIsSecondModalVisible,
  firstBottomSheetCardProps,
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
    setIsModalVisible(value);
  }, []);

  const secondBottomSheetCallback = useCallback((value: boolean) => {
    setIsSecondModalVisible?.(value);
  }, []);

  const handleOverlayPress = useCallback(() => {
    if (isSecondModalVisible && setIsSecondModalVisible) {
      if (Keyboard.isVisible()) {
        Keyboard.dismiss();
      }
      runOnJS(setIsSecondModalVisible)(false);
    } else {
      runOnJS(setIsModalVisible)(false);
    }
  }, [isSecondModalVisible]);

  const firstCardVerticalPosition = useVerticalAnimatedPosition({
    isCardVisible: isModalVisible,
    target: isSecondModalVisible
      ? secondContentHeight + 30
      : firstContentHeight,
    callback: firstBottomSheetCallback,
  });

  const secondCardVerticalPosition = useVerticalAnimatedPosition({
    isCardVisible: isSecondModalVisible as boolean,
    target: secondContentHeight,
    callback: secondBottomSheetCallback,
  });

  const {overlayOpacity: overlayOpacityValue, bottomSheetOpacity} =
    useAnimatedOpacity({
      isModalVisible: isSecondModalVisible || isModalVisible,
      isSecondModalVisible: isSecondModalVisible as boolean,
      target: {
        overlay: overlayOpacity as number,
        bottomSheet: firstBottomSheetFadeOutValue as number,
      },
    });

  const firstBottomSheetWidth = useWidth({
    shouldScale: isSecondModalVisible as boolean,
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
      propertyName: 'isModalVisible',
      propertyValue: isModalVisible,
      typeSafety: {
        propertyType: DataTypes.BOOLEAN,
      },
    },
    {
      propertyName: 'setIsModalVisible',
      propertyValue: setIsModalVisible,
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
      <BottomSheetCard
        onLayout={setFirstContentHeight}
        indicatorStyle={firstBottomSheetCardProps?.indicatorStyle}
        verticalPosition={firstCardVerticalPosition}
        width={firstBottomSheetWidth}
        opacity={bottomSheetOpacity}
        modalStyle={firstBottomSheetCardProps?.modalStyle}
        snapPosition={firstBottomSheetCardProps?.snapPosition}>
        {firstBottomSheetCardProps?.children}
      </BottomSheetCard>
      <BottomSheetCard
        onLayout={setSecondContentHeight}
        verticalPosition={secondCardVerticalPosition}
        indicatorStyle={secondBottomSheetProps?.indicatorStyle}
        modalStyle={secondBottomSheetProps?.modalStyle}
        snapPosition={secondBottomSheetProps?.snapPosition}>
        {secondBottomSheetProps?.children}
      </BottomSheetCard>
    </Modal>
  );
};

export default BottomSheetModal;
