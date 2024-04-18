import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useMemo } from 'react'
import { GestureResponderEvent } from 'react-native'
import { List } from 'react-native-paper'
import { RootStackParamList } from '../types/navigation'
import * as tmdb from '../hooks/tmdb'
import { TMDBImageType, TMDBMoviesListItem } from '../types/tmdb'
import { LoadingView } from './LoadingView'
import { FlatList } from 'react-native-gesture-handler'

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
  const { data, fetchNextPage, isLoading, isSuccess, isError } =
    tmdb.useMoviesInfiniteQuery(tmdb.MovieQueryType.NowPlaying)

  const items = useMemo(
    () => (data?.pages ? data?.pages.flatMap(item => item.results) : []),
    [data?.pages],
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
    <FlatList
      data={items}
      keyExtractor={({ id }, index) => `movie-list-item-${id}-${index}`}
      renderItem={({ item, item: { title, poster_path } }) => {
        return (
          <List.Item
            title={title}
            onPress={createOnPressMovie(item)}
            // eslint-disable-next-line react/no-unstable-nested-components
            left={props => (
              <MovieListItem {...props} posterPath={poster_path} />
            )}
          />
        )
      }}
      onEndReachedThreshold={0.2}
      onEndReached={() => {
        if (items.length > 0) {
          fetchNextPage()
        }
      }}
    />
  )
}
