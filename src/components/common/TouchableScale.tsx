/**
 * @flow
 */
import React, { ReactElement } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useDerivedValue,
  withTiming,
  Easing,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

type Props = {
  children: ReactElement,
  onPress(): void,
  scaleTo: number,
  disabled: boolean,
};

const TimingConfig = { duration: 50, easing: Easing.linear };

export const TouchableScale = ({
  onPress,
  children,
  scaleTo,
  disabled,
}: Props) => {
  const pressed = useSharedValue(false);
  const progress = useDerivedValue(() => {
    return pressed.value
      ? withTiming(1, TimingConfig)
      : withTiming(0, TimingConfig);
  });
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      progress.value,
      [0, 1],
      [1, scaleTo],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{ scale }],
    };
  });

  return (
    <TouchableWithoutFeedback
      onPressIn={() => {
        pressed.value = true;
      }}
      onPressOut={() => {
        pressed.value = false;
      }}
      onPress={onPress}
      disabled={disabled}>
      <Animated.View style={animatedStyle}>{children}</Animated.View>
    </TouchableWithoutFeedback>
  );
};