# React Native Bottom Sheet Modal Library

A simple, easy to use and performant bottom sheet library for react-native.

## Installation

Install by running

```
npm install @lunacap/bottom-sheet-modal

yarn add @lunacap/bottom-sheet-modal
```

In the libraries dependencies, react-native-reanimated and react-native-safe-area-context packages are utilized so if
they are not installed in your project you need to install these packages and add their native components as well.

## Usage

The modal utilizes states for displaying. It can be connected to redux or you can use local states.

The BottomSheetProps type is the definition for the visible modal and the BottomSheetModalProps type is the definiton
for the container component.

This library allows you to stack two bottom sheets on top of each other.

```
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
```

## Available Props

### Modal

| PropName                      |          type          | required |                                                        Description |
|-------------------------------|:----------------------:|----------|-------------------------------------------------------------------:|
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
|----------------|:-----------------:|----------|----------------------------------------------:|
| snapPosition   |      number       | no       | Prop for determining the position of the card |
| indicatorStyle | view style object | no       |       Prop for overriding the indicator style |
| modalStyle     | view style object | no       |           Prop for overriding the modal style |
