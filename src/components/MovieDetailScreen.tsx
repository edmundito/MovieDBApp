import React, { useState } from 'react'
import {
  Image,
  Text,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/navigation'
import * as tmdb from '../hooks/tmdb'
import { useTMDBContext } from '../context/tmdb'

const windowDimensions = Dimensions.get('window')

export const MovieDetailScreen: React.FC<
  NativeStackScreenProps<RootStackParamList, 'Movie'>
> = ({ route }) => {
  const { movieId } = route?.params ?? {}
  const { data, isLoading, isSuccess } = tmdb.useMovieDetailsQuery(movieId)
  const { getTMDBImageURL } = useTMDBContext()
  const [imageSize, setImageSize] = useState<{
    width: number
    height: number
  }>()

  if (isLoading || !isSuccess) {
    return (
      <View>{isLoading ? <ActivityIndicator /> : <Text>Error!</Text>}</View>
    )
  }

  const { title, tagline, overview, poster_path } = data
  const posterImageURL = getTMDBImageURL(poster_path)

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
      <Text>{title}</Text>
      <Text>{tagline}</Text>
      <Text>{overview}</Text>
    </ScrollView>
  )
}
