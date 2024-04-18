import React, { useState } from 'react'
import {
  Image,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/navigation'
import * as tmdb from '../hooks/tmdb'
import { TMDBImageType } from '../types/tmdb'
import { Text } from 'react-native-paper'

const windowDimensions = Dimensions.get('window')

export const MovieDetailScreen: React.FC<
  NativeStackScreenProps<RootStackParamList, 'Movie'>
> = ({ route }) => {
  const { movie } = route?.params ?? {}
  const { data, isLoading, isSuccess } = tmdb.useMovieDetailsQuery(movie.id)
  const [imageSize, setImageSize] = useState<{
    width: number
    height: number
  }>()

  const posterImageURL = tmdb.useImageURI(
    data?.poster_path,
    TMDBImageType.Poster,
    windowDimensions.width,
  )

  if (isLoading || !isSuccess) {
    return (
      <View>{isLoading ? <ActivityIndicator /> : <Text>Error!</Text>}</View>
    )
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
      <Text variant="titleLarge">{title}</Text>
      <Text variant="titleSmall">{tagline}</Text>
      <Text variant="bodyMedium">{overview}</Text>
    </ScrollView>
  )
}
