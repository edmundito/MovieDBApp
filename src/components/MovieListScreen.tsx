import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { GestureResponderEvent, ScrollView } from 'react-native'
import { List } from 'react-native-paper'
import { RootStackParamList } from '../types/navigation'
import * as tmdb from '../hooks/tmdb'
import { TMDBImageType, TMDBMoviesListItem } from '../types/tmdb'
import { LoadingView } from './LoadingView'

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
  const { data, isLoading, isSuccess, isError } = tmdb.useMoviesQuery(
    tmdb.MovieQueryType.NowPlaying,
    1,
  )

  const createOnPressMovie =
    (movie: TMDBMoviesListItem) =>
    (_: GestureResponderEvent): void => {
      navigation.navigate('Movie', { movie })
    }

  if (isLoading || !isSuccess || isError) {
    return <LoadingView hasError={isError} />
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
