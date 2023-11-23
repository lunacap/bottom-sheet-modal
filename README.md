# React Native Bottom Sheet Modal Library

A simple, easy to use and performant bottom sheet library for react-native.

## Installation

Install by running

```
npm install @lunacap/bottom-sheet-modal

yarn add @lunacap/bottom-sheet-modal
```

In the libraries dependencies, react-native-reanimated and react-native-safe-area-context packages are utilized so if they are not installed in your project you need to install these packages and add their native components as well.

## Usage

The modal utilizes states for displaying. It can be connected to redux or you can use local states.

The BottomSheetProps type is the definition for the visible modal and the BottomSheetModalProps type is the definiton for the container component.

This library allows you to stack two bottom sheets on top of each other.

```
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
```

## Available Props

### Modal

| PropName                      |          type          | required |                                                        Description |
| ----------------------------- | :--------------------: | -------- | -----------------------------------------------------------------: |
| isBottomSheetVisible          |        boolean         | yes      |                Prop for the initial visibility of the bottom sheet |
| setIsBottomSheetVisible       | action setter function | yes      |                                  Prop for updating the outer state |
| isSecondBottomSheetVisible    |        boolean         | no       |                Prop for the stacked visibility of the bottom sheet |
| setIsSecondBottomSheetVisible | action setter function | no       |                                  Prop for updating the outer state |
| firstBottomSheetProps         |          Card          | yes      |                                           Initial sheet properties |
| secondBottomSheetProps        |          Card          | no       |                                            Second sheet properties |
| firstBottomSheetFadeOutValue  |         number         | no       | Fading value for the initial bottom sheet after the first one, 0-1 |
| isOverlayDisabled             |        boolean         | no       |                            Whether or not the overlay is pressable |
| overlayOpacity                |         number         | no       |                                               Overlay opacity, 0-1 |

### Card

| PropName       |       type        | required |                                   Description |
| -------------- | :---------------: | -------- | --------------------------------------------: |
| snapPosition   |      number       | no       | Prop for determining the position of the card |
| indicatorStyle | view style object | no       |       Prop for overriding the indicator style |
| modalStyle     | view style object | no       |           Prop for overriding the modal style |
