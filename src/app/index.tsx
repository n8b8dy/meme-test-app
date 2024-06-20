import type { MemeAPIResponse } from '@/types/api/meme'

import { useState } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useQuery } from '@tanstack/react-query'
import { ImageZoom } from '@likashefqet/react-native-image-zoom'

import { Button } from '@/components/buttons/Button'
import { createThemedStyles } from '@/styles/createThemedStyles'

export default function Index() {
  const { top } = useSafeAreaInsets()
  const { width: safeWidth } = useSafeAreaFrame()
  const [imageSizes, setImageSizes] = useState({
    width: 0,
    height: 0,
  })

  const memeQuery = useQuery({
    queryKey: ['meme'],
    queryFn: async () => {
      const response = await fetch('https://meme-api.com/gimme')
      if (!response.ok) throw new Error(response.statusText)

      const data = await response.json() as MemeAPIResponse
      const uri = data.preview[data.preview.length - 1]

      await Image.getSize(uri, (width, height) => {
        setImageSizes({
          width: safeWidth,
          height: (height / width) * safeWidth,
        })
      }, (error) => {
        throw error
      })

      return { ...data, uri }
    },
  })

  return (
    <View
      style={[{ paddingTop: top }, styles.screen]}
    >
      <ScrollView contentContainerStyle={styles.imageWrapper}>
        {
          memeQuery.isPending || memeQuery.isRefetching ? <Text style={[styles.infoText, styles.loadingText]}>Loading....</Text> :
            memeQuery.isError ? <Text style={[styles.infoText, styles.errorText]}>Try again later!</Text> :
              <>
                <ImageZoom
                  source={{ uri: memeQuery.data.uri }}
                  {...imageSizes}
                  style={{ zIndex: 1, flex: 0 }}
                />
                <View>
                  <Text style={styles.imageText}>{memeQuery.data.title}</Text>
                </View>
              </>
        }
      </ScrollView>

      <View style={styles.buttonWrapper}>
        <Button onPress={() => memeQuery.refetch()}>
          <Text style={styles.buttonText}>Generate</Text>
        </Button>
      </View>
    </View>
  )
}

const styles = createThemedStyles(({ colors }) => ({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
  },
  imageWrapper: {
    flex: 1,
    gap: 8,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  imageText: {
    fontFamily: 'RedHatDisplay_600SemiBold',
    fontSize: 20,
    color: colors.text.primary,
    paddingHorizontal: 8,
  },
  infoText: {
    fontFamily: 'RedHatDisplay_500Medium',
    fontSize: 32,
  },
  errorText: {
    color: colors.danger,
  },
  loadingText: {
    color: colors.text.secondary,
  },
  buttonWrapper: {
    paddingVertical: 12,
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'RedHatDisplay_700Bold',
    fontSize: 24,
    color: colors.text.primary,
  },
}))

