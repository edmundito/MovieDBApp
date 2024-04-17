import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { RootStackParamList } from '../types/navigation'
import { MovieQueryType, useMoviesQuery } from '../hooks/tmdb/useMoviesQuery'

export const MovieListScreen: React.FC<
  NativeStackScreenProps<RootStackParamList, 'Home'>
> = ({ navigation }) => {
  const { data, isLoading, isSuccess, error } = useMoviesQuery(
    MovieQueryType.NowPlaying,
    1,
  )

  const createOnPressMovie =
    (id: number) =>
    (_: GestureResponderEvent): void => {
      navigation.navigate('Movie', { movieId: id })
    }

  if (isLoading || !isSuccess) {
    console.log({ error })
    return (
      <View>
        <Text>
          {isLoading ? 'Loading...' : error?.status_message || 'Unknown error'}
        </Text>
      </View>
    )
  }

  return (
    <View>
      {data.results.map(movieListItem => {
        const { id, title } = movieListItem
        return (
          <TouchableOpacity
            key={`movie-list-item-${id}`}
            onPress={createOnPressMovie(id)}>
            <View>
              <Text>{title}</Text>
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}
