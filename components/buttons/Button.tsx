import type { GestureResponderEvent } from 'react-native'

import Animated from 'react-native-reanimated';
import { Pressable, View, ViewProps } from 'react-native'
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import LinearGradient from 'react-native-linear-gradient'

import { createThemedStyles } from '@/styles/createThemedStyles'
import { theme } from '@/styles/theme'

export interface ButtonProps {
  onPress: (event: GestureResponderEvent) => void
}

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)

export const Button = ({ children, onPress, style, ...props }: ButtonProps & ViewProps) => {
  const progress = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(progress.value, { duration: 100 }),
  }))

  return (
    <Pressable
      onPressIn={() => progress.value = 0.8}
      onPressOut={() => progress.value = 1}
      onPress={onPress}
    >
      <View>
        <AnimatedLinearGradient
          useAngle
          angle={45}
          colors={[
            theme.colors.brand.primary,
            theme.colors.brand.secondary,
          ]}
          style={[
            styles.button,
            style,
            animatedStyle,
          ]}
          {...props}
        >
          {children}
        </AnimatedLinearGradient>
      </View>
    </Pressable>
  )
}

const styles = createThemedStyles(({ colors }) => ({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
}))