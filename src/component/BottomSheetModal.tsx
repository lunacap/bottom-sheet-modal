import {LayoutChangeEvent, Modal} from 'react-native';
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {BottomSheetPaper} from './BottomSheetPaper';
import {
  runOnJS,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {ANIMATION_DURATION} from './constants';
import {
  BottomSheetModalProps,
  BottomSheetModalRef,
  BottomSheetPaperState,
} from './types';
import {Overlay} from './Overlay';

export const BottomSheetModal = forwardRef<
  BottomSheetModalRef,
  BottomSheetModalProps
>(
  (
    {
      firstPaperProps,
      secondPaperProps,
      onOverlayPress,
      overlay,
      isOverlayDisabled = false,
    },
    ref,
  ) => {
    const [isVisible, setVisible] = useState(false);
    const bottomSheetPaperState = useSharedValue(BottomSheetPaperState.NONE);
    const firstPaperContentHeight = useSharedValue(0);
    const secondPaperContentHeight = useSharedValue(0);
    const firstPaperTarget = useSharedValue<number | null>(null);
    const secondPaperTarget = useSharedValue<number | null>(null);

    const overlayDisabled = useRef<boolean>(isOverlayDisabled);

    const secondPaperPosition = useDerivedValue(() => {
      if (bottomSheetPaperState.value === BottomSheetPaperState.SECOND) {
        if (secondPaperTarget.value) {
          return withTiming(secondPaperTarget.value, {
            duration: ANIMATION_DURATION,
          });
        } else {
          return withTiming(secondPaperContentHeight.value, {
            duration: ANIMATION_DURATION,
          });
        }
      } else {
        return withTiming(0, {duration: ANIMATION_DURATION});
      }
    });

    const firstPaperPosition = useDerivedValue(() => {
      if (bottomSheetPaperState.value === BottomSheetPaperState.FIRST) {
        if (firstPaperTarget.value) {
          return withTiming(firstPaperTarget.value, {
            duration: ANIMATION_DURATION,
          });
        } else {
          return withTiming(firstPaperContentHeight.value, {
            duration: ANIMATION_DURATION,
          });
        }
      } else if (bottomSheetPaperState.value === BottomSheetPaperState.SECOND) {
        if (secondPaperTarget.value) {
          return withTiming(secondPaperTarget.value + 16, {
            duration: ANIMATION_DURATION,
          });
        } else {
          return withTiming(secondPaperContentHeight.value + 16, {
            duration: ANIMATION_DURATION,
          });
        }
      } else {
        return withTiming(0, {duration: ANIMATION_DURATION}, () => {
          runOnJS(setVisible)(false);
        });
      }
    });

    const firstScaleX = useDerivedValue<number>(() =>
      bottomSheetPaperState.value === BottomSheetPaperState.FIRST ||
      bottomSheetPaperState.value === BottomSheetPaperState.NONE
        ? withTiming(1, {duration: ANIMATION_DURATION})
        : withTiming(0.9, {duration: ANIMATION_DURATION}),
    );

    const expandFirst = useCallback((target?: number) => {
      bottomSheetPaperState.value = BottomSheetPaperState.FIRST;
      if (target) {
        firstPaperTarget.value = target;
      }
      runOnJS(setVisible)(true);
    }, []);

    const expandSecond = useCallback((target?: number) => {
      bottomSheetPaperState.value = BottomSheetPaperState.SECOND;
      if (target) {
        secondPaperTarget.value = target;
      }
    }, []);

    const collapseFirst = useCallback(() => {
      bottomSheetPaperState.value = BottomSheetPaperState.NONE;
      firstPaperTarget.value = null;
      runOnJS(setVisible)(false);
    }, []);

    const collapseSecond = useCallback(() => {
      bottomSheetPaperState.value = BottomSheetPaperState.FIRST;
      secondPaperTarget.value = null;
    }, []);

    const enableOverlay = useCallback(() => {
      overlayDisabled.current = false;
    }, []);

    const disableOverlay = useCallback(() => {
      overlayDisabled.current = true;
    }, []);

    const handleFirstPaperLayout = useCallback((e: LayoutChangeEvent) => {
      firstPaperContentHeight.value = e.nativeEvent.layout.height;
    }, []);

    const handleSecondPaperLayout = useCallback((e: LayoutChangeEvent) => {
      secondPaperContentHeight.value = e.nativeEvent.layout.height;
    }, []);

    const handleOverlayPress = useCallback(() => {
      if (overlayDisabled.current) {
        return;
      }
      if (bottomSheetPaperState.value === BottomSheetPaperState.SECOND) {
        bottomSheetPaperState.value = BottomSheetPaperState.FIRST;
      } else {
        bottomSheetPaperState.value = BottomSheetPaperState.NONE;
      }
      onOverlayPress?.();
    }, []);

    useImperativeHandle(ref, () => ({
      expandFirst,
      collapseFirst,
      collapseSecond,
      expandSecond,
      disableOverlay,
      enableOverlay,
      get paperState() {
        return bottomSheetPaperState.value;
      },
      get overlayState() {
        return overlayDisabled.current;
      },
    }));

    return (
      <Modal visible={isVisible} animationType={'none'} transparent>
        <Overlay
          bottomSheetPaperState={bottomSheetPaperState}
          onPress={handleOverlayPress}
          customOverlay={overlay}
        />
        <BottomSheetPaper
          header={firstPaperProps.header}
          position={firstPaperPosition}
          onLayout={handleFirstPaperLayout}
          scaleX={firstScaleX}
          children={firstPaperProps.children}
        />
        {secondPaperProps ? (
          <BottomSheetPaper
            header={secondPaperProps.header}
            position={secondPaperPosition}
            onLayout={handleSecondPaperLayout}
            children={secondPaperProps.children}
          />
        ) : null}
      </Modal>
    );
  },
);
