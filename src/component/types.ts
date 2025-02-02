import {PropsWithChildren} from 'react';
import {LayoutChangeEvent} from 'react-native';
import {DerivedValue, SharedValue} from 'react-native-reanimated';

export enum BottomSheetPaperState {
  NONE = 'NONE',
  FIRST = 'FIRST',
  SECOND = 'SECOND',
}

export interface BottomSheetModalRef {
  expandFirst: (target?: number) => void;
  expandSecond: (target?: number) => void;
  collapseFirst: () => void;
  collapseSecond: () => void;
  paperState: BottomSheetPaperState;
  enableOverlay: () => void;
  disableOverlay: () => void;
  overlayState: boolean;
}

export interface BottomSheetPaperProps extends PropsWithChildren {
  header?: React.ReactNode;
}

export interface BottomSheetModalProps {
  firstPaperProps: BottomSheetPaperProps;
  secondPaperProps?: BottomSheetPaperProps;
  onOverlayPress?: () => void;
  overlay?: React.ReactNode;
  isOverlayDisabled?: boolean;
}

export interface BottomSheetPaperPropsInternal extends BottomSheetPaperProps {
  onLayout: (e: LayoutChangeEvent) => void;
  scaleX?: DerivedValue<number>;
  position: SharedValue<number>;
}

export interface OverlayProps {
  bottomSheetPaperState: SharedValue<BottomSheetPaperState>;
  onPress: () => void;
  customOverlay?: React.ReactNode;
}
