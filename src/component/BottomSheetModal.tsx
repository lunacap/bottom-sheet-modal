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
import {DataTypes} from '../constants';

import {BottomSheetCard} from './BottomSheetCard';
import {styles} from './BottomSheetModal.styles';

export type BottomSheetModalProps = {
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
  isSecondModalVisible?: boolean;
  setIsSecondModalVisible?: (value: boolean) => void;
  firstBottomSheetCardProps: BottomSheetCardProps;
  secondBottomSheetProps?: BottomSheetCardProps;
  firstBottomSheetFadeOutValue?: number;
};

export type BottomSheetCardProps = PropsWithChildren<{
  isOverlayDisabled?: boolean;
  snapPosition?: number;
  overlayOpacity?: number;
  indicatorStyle?: StyleProp<ViewStyle>;
  modalStyle?: StyleProp<ViewStyle>;
}>;

export const BottomSheetModal = ({
  isModalVisible,
  setIsModalVisible,
  isSecondModalVisible,
  setIsSecondModalVisible,
  firstBottomSheetCardProps,
  secondBottomSheetProps,
  firstBottomSheetFadeOutValue,
}: BottomSheetModalProps): JSX.Element => {
  const [isModalVisibleInternal, setIsBottomVisibleInternal] =
    useState<boolean>(false);

  const [firstContentHeight, setFirstContentHeight] = useState(0);
  const [secondContentHeight, setSecondContentHeight] = useState(0);

  const AnimatedPressable = useMemo(
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

  const {overlayOpacity, bottomSheetOpacity} = useAnimatedOpacity({
    isModalVisible: isSecondModalVisible || isModalVisible,
    isSecondModalVisible: isSecondModalVisible as boolean,
    target: {
      overlay: isSecondModalVisible
        ? (secondBottomSheetProps?.overlayOpacity as number)
        : (firstBottomSheetCardProps.overlayOpacity as number),
      bottomSheet: firstBottomSheetFadeOutValue as number,
    },
  });

  const firstBottomSheetWidth = useWidth({
    shouldScale: isSecondModalVisible as boolean,
  });

  const animatedOverlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  const Overlay = () => {
    return (
      <AnimatedPressable
        style={[styles.overlay, animatedOverlayStyle]}
        onPress={handleOverlayPress}
      />
    );
  };

  const safeProperties: Array<SafeProperty> = [
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
      <Overlay />
      <BottomSheetCard
        onLayout={setFirstContentHeight}
        indicatorStyle={firstBottomSheetCardProps.indicatorStyle}
        verticalPosition={firstCardVerticalPosition}
        width={firstBottomSheetWidth}
        opacity={bottomSheetOpacity}
        overlayOpacity={firstBottomSheetCardProps.overlayOpacity}
        isOverlayDisabled={firstBottomSheetCardProps.isOverlayDisabled}
        modalStyle={firstBottomSheetCardProps.modalStyle}
        snapPosition={firstBottomSheetCardProps.snapPosition}>
        {firstBottomSheetCardProps.children}
      </BottomSheetCard>
      <BottomSheetCard
        onLayout={setSecondContentHeight}
        verticalPosition={secondCardVerticalPosition}
        indicatorStyle={secondBottomSheetProps?.indicatorStyle}
        overlayOpacity={secondBottomSheetProps?.overlayOpacity}
        isOverlayDisabled={secondBottomSheetProps?.isOverlayDisabled}
        modalStyle={secondBottomSheetProps?.modalStyle}
        snapPosition={secondBottomSheetProps?.snapPosition}>
        {secondBottomSheetProps?.children}
      </BottomSheetCard>
    </Modal>
  );
};
