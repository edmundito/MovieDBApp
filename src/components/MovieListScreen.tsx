import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import {
  ActivityIndicator,
  GestureResponderEvent,
  ScrollView,
  Text,
  View,
} from 'react-native'
import { RootStackParamList } from '../types/navigation'
import * as tmdb from '../hooks/tmdb'
import { TMDBImageType, TMDBMoviesListItem } from '../types/tmdb'
import { List } from 'react-native-paper'

interface MovieListItemProps {
  posterPath: string
}

const MovieListItem: React.FC<MovieListItemProps> = ({ posterPath }) => {
  const uri = tmdb.useImageURI(posterPath, TMDBImageType.Poster, 56)

  return <List.Image source={{ uri }} />
}

export const MovieListScreen: React.FC<
  NativeStackScreenProps<RootStackParamList, 'Home'>
> = ({ navigation }) => {
  const { data, isLoading, isSuccess } = tmdb.useMoviesQuery(
    tmdb.MovieQueryType.NowPlaying,
    1,
  )

  const createOnPressMovie =
    (movie: TMDBMoviesListItem) =>
    (_: GestureResponderEvent): void => {
      navigation.navigate('Movie', { movie })
    }

  if (isLoading || !isSuccess) {
    return (
      <View>{isLoading ? <ActivityIndicator /> : <Text>Error!</Text>}</View>
    )
  }

  return (
    <ScrollView>
      {data.results.map(movieListItem => {
        const { id, title, poster_path } = movieListItem
        return (
          <List.Item
            key={`movie-list-item-${id}`}
            title={title}
            onPress={createOnPressMovie(movieListItem)}
            // eslint-disable-next-line react/no-unstable-nested-components
            left={props => (
              <MovieListItem {...props} posterPath={poster_path} />
            )}
          />
        )
      })}
    </ScrollView>
  )
}
