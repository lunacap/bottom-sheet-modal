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

## BottomSheetModal Component Props

| Prop Name         |          Type           | Required | Description                                             |
|-------------------|:-----------------------:|:--------:|:--------------------------------------------------------|
| firstPaperProps   | `BottomSheetPaperProps` |    ✓     | Configuration for the primary bottom sheet              |
| secondPaperProps  | `BottomSheetPaperProps` |    -     | Configuration for the secondary (stacked) bottom sheet  |
| onOverlayPress    |      `() => void`       |    -     | Callback function triggered when the overlay is pressed |
| overlay           |    `React.ReactNode`    |    -     | Custom overlay component to replace the default overlay |
| isOverlayDisabled |        `boolean`        |    -     | When true, disables overlay interaction                 |

## BottomSheetPaperProps

| Prop Name |       Type        | Required | Description                                              |
|-----------|:-----------------:|:--------:|:---------------------------------------------------------|
| children  | `React.ReactNode` |    ✓     | Content to be rendered inside the bottom sheet           |
| header    | `React.ReactNode` |    -     | Custom header component rendered at the top of the sheet |

## BottomSheetModalRef Methods

| Method Name    |     Parameters      | Description                                                              |
|----------------|:-------------------:|:-------------------------------------------------------------------------|
| expandFirst    | `(target?: number)` | Opens the first bottom sheet. Optional target position can be specified  |
| expandSecond   | `(target?: number)` | Opens the second bottom sheet. Optional target position can be specified |
| collapseFirst  |          -          | Closes the first bottom sheet                                            |
| collapseSecond |          -          | Closes the second bottom sheet                                           |
| enableOverlay  |          -          | Enables overlay interaction                                              |
| disableOverlay |          -          | Disables overlay interaction                                             |

## Properties Available Through Ref

| Property Name |          Type           | Description                                     |
|---------------|:-----------------------:|:------------------------------------------------|
| paperState    | `BottomSheetPaperState` | Current state of the bottom sheet papers        |
| overlayState  |        `boolean`        | Current state of the overlay (enabled/disabled) |