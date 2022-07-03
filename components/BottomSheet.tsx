import React, {useCallback, useImperativeHandle} from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {StyleSheet, View, Dimensions} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT;

type BottomSheetProps = {
  children?: React.ReactNode;
};

export type BottomSheetRefProps = {
  scrollTo: (destination: number) => void;
  isActive: () => boolean;
  translateYFunc: () => number;
};

const BottomSheet = React.forwardRef<BottomSheetRefProps, BottomSheetProps>(
  ({children}, ref) => {
    const translateY = useSharedValue(0);
    const context = useSharedValue({y: 0});
    const active = useSharedValue(false);

    const scrollTo = useCallback((destination: number) => {
      'worklet';
      active.value = destination !== 0;

      translateY.value = withSpring(destination, {damping: 50});
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const translateYFunc = useCallback(() => {
      return translateY.value;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const isActive = useCallback(() => {
      return active.value;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useImperativeHandle(ref, () => ({scrollTo, isActive, translateYFunc}), [
      scrollTo,
      isActive,
      translateYFunc,
    ]);

    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = {y: translateY.value};
      })
      .onUpdate(event => {
        translateY.value = event.translationY + context.value.y;
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
      })
      .onEnd(() => {
        if (translateY.value > -300) {
          scrollTo(0);
        } else if (
          translateY.value < -SCREEN_HEIGHT / 2.5 &&
          translateY.value > -SCREEN_HEIGHT / 2
        ) {
          scrollTo(-300);
        } else if (translateY.value < -SCREEN_HEIGHT / 2) {
          scrollTo(MAX_TRANSLATE_Y);
        }
      });

    const rBottomSheetStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
        [25, 5],
        Extrapolate.CLAMP,
      );
      return {
        borderRadius,
        transform: [{translateY: translateY.value}],
      };
    });

    const rBottomSheetContentStyle = useAnimatedStyle(() => {
      const height = interpolate(
        translateY.value,
        [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
        [300 - 50 - 14, SCREEN_HEIGHT - 50 - 14],
        Extrapolate.CLAMP,
      );
      return {
        height,
      };
    });

    return (
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
          <View style={styles.line} />
          <Animated.View style={rBottomSheetContentStyle}>
            {children}
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    );
  },
);

export default BottomSheet;

const styles = StyleSheet.create({
  bottomSheetContainer: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    position: 'absolute',
    top: SCREEN_HEIGHT,
    height: SCREEN_HEIGHT,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 2,
  },
  bottomSheetContent: {
    flex: 1,
    backgroundColor: 'white',
  },
});
