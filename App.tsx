import React, {useState} from 'react';
import {Button, SafeAreaView, Text, View, TextInput} from 'react-native';

import {SafeAreaProvider} from 'react-native-safe-area-context';

import BottomSheetModal, {BottomSheetProps} from './src';

const App = () => {
  const [isFirstBottomSheetVisible, setIsFirstBottomSheetVisible] =
    useState<boolean>(false);
  const [firstBottomSheetProps, setFirstBottomSheetProps] =
    useState<BottomSheetProps>({});

  const [isSecondBottomSheetVisible, setIsSecondBottomSheetVisible] =
    useState<boolean>(false);
  const [secondBottomSheetProps, setSecondBottomSheetProps] =
    useState<BottomSheetProps>({});

  const expandFirstBottomSheet = () => {
    const bottomSheetProps: BottomSheetProps = {
      children: (
        <View style={{paddingHorizontal: 16, paddingTop: 16, height: 200}}>
          <Text>Title for First</Text>
          <Button title="Show Second Modal" onPress={expandSecondBottomSheet} />
          <Text>Write Some Text</Text>
          <TextInput
            style={{
              width: '100%',
              height: 50,
              borderColor: 'black',
              borderWidth: 1,
            }}
          />
        </View>
      ),
    };
    setFirstBottomSheetProps(bottomSheetProps);
    setIsFirstBottomSheetVisible(true);
  };

  const secondBottomSheetView = () => {
    return (
      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: 16,
          height: 250,
        }}>
        <Text>Title for Second</Text>
        <Text>Write Some Text</Text>
        <TextInput
          style={{
            width: '100%',
            height: 50,
            borderColor: 'black',
            borderWidth: 1,
          }}
        />
      </View>
    );
  };

  const expandSecondBottomSheet = () => {
    const bottomSheetProps: BottomSheetProps = {
      children: <>{secondBottomSheetView()}</>,
    };
    setSecondBottomSheetProps(bottomSheetProps);
    setIsSecondBottomSheetVisible(true);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{width: '100%', height: '100%'}}>
        <Button title="Show Modal" onPress={expandFirstBottomSheet} />
        <BottomSheetModal
          isBottomSheetVisible={isFirstBottomSheetVisible}
          setIsBottomSheetVisible={setIsFirstBottomSheetVisible}
          isSecondBottomSheetVisible={isSecondBottomSheetVisible}
          setIsSecondBottomSheetVisible={setIsSecondBottomSheetVisible}
          firstBottomSheetProps={firstBottomSheetProps}
          secondBottomSheetProps={secondBottomSheetProps}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
