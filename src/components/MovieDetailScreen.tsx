import React, { useState } from 'react'
import { Image, View, ScrollView, useWindowDimensions } from 'react-native'
import { ActivityIndicator, Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/navigation'
import * as tmdb from '../hooks/tmdb'
import { TMDBImageType } from '../types/tmdb'
import { LoadingView } from './LoadingView'

export const MovieDetailScreen: React.FC<
  NativeStackScreenProps<RootStackParamList, 'Movie'>
> = ({ route }) => {
  const { movie } = route?.params ?? {}

  const windowDimensions = useWindowDimensions()

  const { data, isLoading, isSuccess, isError } = tmdb.useMovieDetailsQuery(
    movie.id,
  )
  const [imageSize, setImageSize] = useState<{
    width: number
    height: number
  }>()
  const posterImageURL = tmdb.useImageURI(
    data?.poster_path,
    TMDBImageType.Poster,
    windowDimensions.width,
  )

  if (isLoading || !isSuccess || isError) {
    return <LoadingView hasError={isError} />
  }

  const { title, tagline, overview } = data

  if (posterImageURL) {
    Image.getSize(posterImageURL, (width, height) => {
      setImageSize({ width, height })
    })
  }

  return (
    <ScrollView>
      {posterImageURL && imageSize ? (
        <Image
          source={{
            uri: posterImageURL,
            width: windowDimensions.width,
            height:
              windowDimensions.width * (imageSize.height / imageSize.width),
          }}
        />
      ) : (
        <ActivityIndicator />
      )}
      <SafeAreaView>
        <View style={{ padding: 12 }}>
          <Text variant="titleLarge">{title}</Text>
          {tagline && <Text variant="titleSmall">{tagline}</Text>}
          <Text variant="bodyMedium">{overview}</Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}
