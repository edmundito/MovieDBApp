import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import {
  ActivityIndicator,
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { RootStackParamList } from '../types/navigation'
import * as tmdb from '../hooks/tmdb'

export const MovieListScreen: React.FC<
  NativeStackScreenProps<RootStackParamList, 'Home'>
> = ({ navigation }) => {
  const { data, isLoading, isSuccess } = tmdb.useMoviesQuery(
    tmdb.MovieQueryType.NowPlaying,
    1,
  )

  const createOnPressMovie =
    (id: number) =>
    (_: GestureResponderEvent): void => {
      navigation.navigate('Movie', { movieId: id })
    }

  if (isLoading || !isSuccess) {
    return (
      <View>{isLoading ? <ActivityIndicator /> : <Text>Error!</Text>}</View>
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
