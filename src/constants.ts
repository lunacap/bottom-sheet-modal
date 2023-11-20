import {Dimensions, Platform, KeyboardEventName} from 'react-native';
import {initialWindowMetrics} from 'react-native-safe-area-context';

export const ANIMATION_DURATION = 250;

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
  Dimensions.get('screen');

export const MAX_SNAP_POSITION =
  SCREEN_HEIGHT - ((initialWindowMetrics?.insets.top ?? 50) + 12);

export const DEFAULT_OVERLAY_OPACITY = 0.6;
export const DEFAULT_BOTTOMSHEET_OPACITY = 0.1;

export const KEYBOARD_SHOW_EVENT_NAME = Platform.select<KeyboardEventName>({
  android: 'keyboardDidShow',
  ios: 'keyboardWillShow',
}) as KeyboardEventName;

export const KEYBOARD_HIDE_EVENT_NAME = Platform.select<KeyboardEventName>({
  android: 'keyboardDidHide',
  ios: 'keyboardWillHide',
}) as KeyboardEventName;

export const TYPE_ERROR_PREFIX = 'TypeError:';

export enum DataTypes {
  STRING = 'string',
  FUNCTION = 'function',
  OBJECT = 'object',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
}

export const VALUE_WARNING_PREFIX = 'ValueWarning:';

export enum CompareTypes {
  HIGHER = 'higher',
  LOWER = 'lower',
  EQUAL = 'equal',
}
