import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import {KEYBOARD_HIDE_EVENT_NAME, KEYBOARD_SHOW_EVENT_NAME} from '../constants';

export type KeyboardInfo = {
  isKeyboardVisible: boolean;
  keyboardHeight: number;
};

export const useKeyboardInfo = () => {
  const [keyboardInfo, setKeyboardInfo] = useState<KeyboardInfo>({
    isKeyboardVisible: false,
    keyboardHeight: 0,
  });

  useEffect(() => {
    const keyboardShowEvent = Keyboard.addListener(
      KEYBOARD_SHOW_EVENT_NAME,
      event => {
        setKeyboardInfo({
          isKeyboardVisible: true,
          keyboardHeight: event.startCoordinates?.height as number,
        });
      },
    );

    const keyboardHideEvent = Keyboard.addListener(
      KEYBOARD_HIDE_EVENT_NAME,
      () => {
        setKeyboardInfo(current => ({
          ...current,
          isKeyboardVisible: false,
        }));
      },
    );

    return () => {
      keyboardShowEvent.remove();
      keyboardHideEvent.remove();
    };
  }, []);

  return keyboardInfo;
};
