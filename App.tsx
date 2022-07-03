import React, {useCallback, useRef} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import BottomSheet, {BottomSheetRefProps} from './components/BottomSheet';

const App = () => {
  const bottomSheetRef = useRef<BottomSheetRefProps>(null);

  const onPress = useCallback(() => {
    const isActive = bottomSheetRef?.current?.isActive();
    if (isActive) {
      bottomSheetRef?.current?.scrollTo(0);
    } else {
      bottomSheetRef?.current?.scrollTo(-300);
    }
  }, []);

  return (
    <GestureHandlerRootView style={styles.flex}>
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} />
        <TouchableOpacity style={styles.button} onPress={onPress} />
      </View>
      <BottomSheet ref={bottomSheetRef}>
        <ScrollView style={styles.bottomSheetContent}>
          <Text>TEST1</Text>
          <Text>TEST2</Text>
          <Text>TEST3</Text>
          <Text>TEST4</Text>
          <Text>TEST5</Text>
          <Text>TEST6</Text>
          <Text>TEST7</Text>
          <Text>TEST8</Text>
          <Text>TEST9</Text>
          <Text>TEST10</Text>
          <Text>TEST11</Text>
          <Text>TEST12</Text>
          <Text>TEST13</Text>
          <Text>TEST14</Text>
          <Text>TEST15</Text>
          <Text>TEST16</Text>
          <Text>TEST17</Text>
          <Text>TEST18</Text>
          <Text>TEST19</Text>
          <Text>TEST20</Text>
          <Text>TEST21</Text>
          <Text>TEST22</Text>
          <Text>TEST23</Text>
          <Text>TEST24</Text>
          <Text>TEST25</Text>
          <Text>TEST26</Text>
          <Text>TEST27</Text>
          <Text>TEST28</Text>
          <Text>TEST29</Text>
          <Text>TEST30</Text>
          <Text>TEST31</Text>
          <Text>TEST32</Text>
          <Text>TEST33</Text>
          <Text>TEST34</Text>
          <Text>TEST35</Text>
          <Text>TEST36</Text>
          <Text>TEST37</Text>
          <Text>TEST38</Text>
          <Text>TEST39</Text>
        </ScrollView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 50,
    borderRadius: 25,
    opacity: 0.5,
    aspectRatio: 1,
    backgroundColor: 'white',
  },
  bottomSheetContent: {
    flex: 1,
    backgroundColor: 'orange',
  },
});

export default App;
