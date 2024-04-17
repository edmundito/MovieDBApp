import React from 'react'
import { Text, View } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/navigation'
import { useMovieDetailsQuery } from '../hooks/tmdb/useMovieDetailsQuery'

export const MovieDetailScreen: React.FC<
  NativeStackScreenProps<RootStackParamList, 'Movie'>
> = ({ route }) => {
  const { movieId } = route?.params ?? {}
  const { data, isLoading, isSuccess, error } = useMovieDetailsQuery(movieId)

  if (isLoading || !isSuccess) {
    return (
      <View>
        <Text>
          {isLoading ? 'Loading...' : error?.status_message || 'Unknown error'}
        </Text>
      </View>
    )
  }

  const { title, tagline, overview } = data

  return (
    <View>
      <Text>{title}</Text>
      <Text>{tagline}</Text>
      <Text>{overview}</Text>
    </View>
  )
}
