import { useEffect } from 'react'
import { SplashScreen, Stack } from 'expo-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { useFonts } from 'expo-font'
import {
  RedHatDisplay_300Light,
  RedHatDisplay_400Regular,
  RedHatDisplay_500Medium,
  RedHatDisplay_600SemiBold,
  RedHatDisplay_700Bold,
  RedHatDisplay_800ExtraBold,
  RedHatDisplay_900Black,
  RedHatDisplay_300Light_Italic,
  RedHatDisplay_400Regular_Italic,
  RedHatDisplay_500Medium_Italic,
  RedHatDisplay_600SemiBold_Italic,
  RedHatDisplay_700Bold_Italic,
  RedHatDisplay_800ExtraBold_Italic,
  RedHatDisplay_900Black_Italic,
} from '@expo-google-fonts/red-hat-display'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const client = new QueryClient()

export default function RootLayout() {
  const [loaded] = useFonts({
    RedHatDisplay_300Light,
    RedHatDisplay_400Regular,
    RedHatDisplay_500Medium,
    RedHatDisplay_600SemiBold,
    RedHatDisplay_700Bold,
    RedHatDisplay_800ExtraBold,
    RedHatDisplay_900Black,
    RedHatDisplay_300Light_Italic,
    RedHatDisplay_400Regular_Italic,
    RedHatDisplay_500Medium_Italic,
    RedHatDisplay_600SemiBold_Italic,
    RedHatDisplay_700Bold_Italic,
    RedHatDisplay_800ExtraBold_Italic,
    RedHatDisplay_900Black_Italic,
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <QueryClientProvider client={client}>
      <GestureHandlerRootView>
        <Stack screenOptions={{
          headerShown: false,
        }}>
          <Stack.Screen name="index"/>
        </Stack>
      </GestureHandlerRootView>
    </QueryClientProvider>
  )
}
