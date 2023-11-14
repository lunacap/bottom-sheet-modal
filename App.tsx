import React, {useState} from 'react';
import {Button, SafeAreaView, Text, TextInput, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {BottomSheetModal} from './src';

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [val, setVal] = useState<string>('');
  const [rendered, setRendered] = useState<boolean>(false);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{width: '100%', height: '100%'}}>
        <Button title="Show Modal" onPress={() => setIsModalVisible(true)} />
        <BottomSheetModal
          withOverlay
          overlayOpacity={0.3}
          setIsModalVisible={setIsModalVisible}
          isModalVisible={isModalVisible}>
          <View>
            <Text>Input</Text>
            <TextInput value={val} onChangeText={setVal} multiline />
            <Button title="Submit" onPress={() => setIsModalVisible(false)} />
          </View>
          <View>
            <Text>Original Text</Text>
            {rendered && (
              <>
                <Text>Rendered Text 1</Text>
                <Text>Rendered Text 2</Text>
                <Text>Rendered Text 3</Text>
                <Text>Rendered Text 4</Text>
                <Text>Rendered Text 5</Text>
              </>
            )}
            <Button
              title="render texts"
              onPress={() => setRendered(current => !current)}
            />
          </View>
        </BottomSheetModal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
