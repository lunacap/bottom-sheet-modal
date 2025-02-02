import {Button, Text, View} from 'react-native';
import {BottomSheetModal} from './src/component/BottomSheetModal';
import {useRef} from 'react';
import {BottomSheetModalRef} from './src/component/types';

const App = () => {
  const bottomSheetRef = useRef<BottomSheetModalRef>(null);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        title={'Open First Bottom Sheet'}
        onPress={() => {
          bottomSheetRef.current?.expandFirst();
        }}
      />
      <BottomSheetModal
        ref={bottomSheetRef}
        firstPaperProps={{
          header: (
            <View
              style={{
                width: '100%',
                paddingHorizontal: 12,
                paddingVertical: 16,
                backgroundColor: 'black',
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
              }}>
              <Text style={{fontSize: 16, lineHeight: 24, color: 'white'}}>
                Header First
              </Text>
            </View>
          ),
          children: (
            <View
              style={{
                width: '100%',
                height: 300,
                backgroundColor: 'black',
              }}>
              <Button
                title={'OPEN SECOND'}
                onPress={() => {
                  bottomSheetRef.current?.expandSecond();
                }}
              />
            </View>
          ),
        }}
        secondPaperProps={{
          children: (
            <View
              style={{
                backgroundColor: 'yellow',
                borderRadius: 16,
                width: '100%',
                height: 200,
              }}>
              <Button
                title={'Disable overlay'}
                onPress={() => bottomSheetRef.current?.disableOverlay()}
              />
            </View>
          ),
        }}
      />
    </View>
  );
};

export default App;
