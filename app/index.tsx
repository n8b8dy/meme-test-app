import type { MemeAPIResponse } from '@/types/api/meme'

import { useState } from 'react'
import { Image, Text, View } from 'react-native'
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
      <View style={styles.imageWrapper}>
        {
          memeQuery.isPending ? <Text style={[styles.infoText, styles.loadingText]}>Loading....</Text> :
            memeQuery.isError ? <Text style={[styles.infoText, styles.errorText]}>Try again later!</Text> :
              memeQuery.isRefetching ? <Text style={[styles.infoText, styles.loadingText]}>Loading...</Text> :
                <ImageZoom source={{ uri: memeQuery.data.uri }} {...imageSizes}/>
        }
      </View>

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
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    fontFamily: 'RedHatDisplay_600SemiBold',
    fontSize: 32,
    fontWeight: 'semibold',
  },
  errorText: {
    color: colors.danger,
  },
  loadingText: {
    color: colors.text.secondary,
  },
  buttonWrapper: {
    paddingVertical: 24,
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'RedHatDisplay_700Bold',
    fontSize: 24,
    color: colors.text.primary,
  },
}))

