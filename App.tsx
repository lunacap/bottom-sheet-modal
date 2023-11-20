import React, {useState} from 'react';
import {Button, SafeAreaView, Text, View, TextInput} from 'react-native';

import {SafeAreaProvider} from 'react-native-safe-area-context';

import BottomSheetModal, {BottomSheetCardProps} from './src';

const App = () => {
  const [isFirstBottomSheetVisible, setIsFirstBottomSheetVisible] =
    useState<boolean>(false);
  const [firstBottomSheetProps, setFirstBottomSheetProps] =
    useState<BottomSheetCardProps>({});

  const [isSecondBottomSheetVisible, setIsSecondBottomSheetVisible] =
    useState<boolean>(false);
  const [secondBottomSheetProps, setSecondBottomSheetProps] =
    useState<BottomSheetCardProps>({});

  const expandFirstBottomSheet = () => {
    const bottomSheetProps: BottomSheetCardProps = {
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
    const bottomSheetProps: BottomSheetCardProps = {
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
          isModalVisible={isFirstBottomSheetVisible}
          setIsModalVisible={setIsFirstBottomSheetVisible}
          isSecondModalVisible={isSecondBottomSheetVisible}
          setIsSecondModalVisible={setIsSecondBottomSheetVisible}
          firstBottomSheetCardProps={firstBottomSheetProps}
          secondBottomSheetProps={secondBottomSheetProps}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
