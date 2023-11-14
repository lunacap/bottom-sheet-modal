import React, {PropsWithChildren, useCallback, useMemo, useState} from 'react';
import {LayoutChangeEvent, Modal, Pressable, View} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';

import {useKeyboardInfo} from '../hooks/useKeyboardInfo';
import {useAnimatedOpacity, useVerticalAnimatedPosition} from '../hooks';
import {styles} from './BottomSheetModal.styles';

export type BottomSheetModalProps = PropsWithChildren<{
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
  withOverlay?: boolean;
  isOverlayDisabled?: boolean;
  scrollPosition?: number;
  overlayOpacity?: number;
}>;

export const BottomSheetModal = ({
  isModalVisible,
  setIsModalVisible,
  children,
  withOverlay,
  isOverlayDisabled,
  scrollPosition,
  overlayOpacity,
}: BottomSheetModalProps): JSX.Element => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [contentHeight, setContentHeight] = useState(0);

  const keyboardInfo = useKeyboardInfo();

  const totalHeight = useMemo(
    () =>
      contentHeight +
      (keyboardInfo.isKeyboardVisible ? keyboardInfo.keyboardHeight : 0),
    [contentHeight, keyboardInfo.isKeyboardVisible],
  );
  const Overlay = useMemo(
    () => Animated.createAnimatedComponent(Pressable),
    [],
  );

  const updateModalState = useCallback((value: boolean) => {
    setIsVisible(value);
    setIsModalVisible(value);
  }, []);

  const handleContentLayout = useCallback((event: LayoutChangeEvent) => {
    setContentHeight(event.nativeEvent.layout.height);
  }, []);

  const handleOverlayPress = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const verticalPosition = useVerticalAnimatedPosition({
    isModalVisible,
    target: scrollPosition ?? totalHeight,
    callback: updateModalState,
  });

  const overlayOpacityH = useAnimatedOpacity({
    isModalVisible,
    target: overlayOpacity,
  });

  const animatedModalCardStyles = useAnimatedStyle(() => ({
    transform: [{translateY: verticalPosition.value}],
  }));

  const animatedOverlayStyles = useAnimatedStyle(() => ({
    opacity: overlayOpacityH.value,
  }));
  return (
    <Modal visible={isVisible} animationType="none" transparent>
      {withOverlay && (
        <Overlay
          style={[styles.overlay, animatedOverlayStyles]}
          disabled={isOverlayDisabled}
          onPress={handleOverlayPress}
        />
      )}
      <Animated.View style={[styles.modalCard, animatedModalCardStyles]}>
        <View onLayout={handleContentLayout}>
          <View style={styles.indicator} />
          {children}
        </View>
      </Animated.View>
    </Modal>
  );
};
