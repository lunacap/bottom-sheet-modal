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

The BottomSheetCardProps type is the definition for the visible modal and the BottomSheetModalProps type is the definiton for the container component.

This library allows you to stack two bottom sheets on top of each other.

```
function App(): JSX.Element {
  const [isModalExpanded, setIsModalExpanded] = useState<boolean>(false);
  const [bottomSheetProps, setBottomSheetProps] =
    useState<BottomSheetModalProps>();

  const [isSecondModalExpanded, setIsSecondModalExpanded] =
    useState<boolean>(false);
  const [secondBottomSheetProps, setSecondBottomSheetProps] =
    useState<BottomSheetModalProps>();

  const handleExpandSecond = () => {
    const bottomSheetProps: BottomSheetCardProps = {
      children: (
        <View style={{width: '100%', height: 150}}>
          <Text>Bottom Sheet Content Second</Text>
        </View>
      ),
    };
    setSecondBottomSheetProps(bottomSheetProps);
    setIsSecondModalExpanded(true);
  };

  const handleExpand = () => {
    const bottomSheetProps: BottomSheetCardProps = {
      children: (
        <View style={{width: '100%', height: 300}}>
          <Text>Bottom Sheet Content Second</Text>
          <Button title="expand second" onPress={handleExpandSecond} />
        </View>
      ),
    };
    setBottomSheetProps(bottomSheetProps);
    setIsModalExpanded(true);
  };
  return (
    <SafeAreaProvider>
      <Button title="expand" onPress={handleExpand} />
      <BottomSheet
        isModalVisible={isModalExpanded}
        setIsModalVisible={setIsModalExpanded}
        firstBottomSheetCardProps={bottomSheetProps}
        isSecondModalVisible={isSecondModalExpanded}
        setIsSecondModalVisible={setIsSecondModalExpanded}
        secondBottomSheetProps={secondBottomSheetProps}
      />
    </SafeAreaProvider>
  );
}
```

## Available Props

### Modal

| PropName                     |          type          | required |                                                        Description |
| ---------------------------- | :--------------------: | -------- | -----------------------------------------------------------------: |
| isModalVisible               |        boolean         | yes      |                Prop for the initial visibility of the bottom sheet |
| setIsModalVisible            | action setter function | yes      |                                  Prop for updating the outer state |
| isSecondModalVisible         |        boolean         | no       |                Prop for the stacked visibility of the bottom sheet |
| setIsSecondModalVisible      | action setter function | no       |                                  Prop for updating the outer state |
| firstBottomSheetCardProps    |          Card          | yes      |                                            Initial card properties |
| secondBottomSheetProps       |          Card          | no       |                                             Second card properties |
| firstBottomSheetFadeOutValue |         number         | no       | Fading value for the initial bottom sheet after the first one, 0-1 |
| isOverlayDisabled            |        boolean         | no       |                            Whether or not the overlay is pressable |
| overlayOpacity               |         number         | no       |                                               Overlay opacity, 0-1 |

### Card

| PropName       |       type        | required |                                   Description |
| -------------- | :---------------: | -------- | --------------------------------------------: |
| snapPosition   |      number       | no       | Prop for determining the position of the card |
| indicatorStyle | view style object | no       |       Prop for overriding the indicator style |
| modalStyle     | view style object | no       |           Prop for overriding the modal style |
