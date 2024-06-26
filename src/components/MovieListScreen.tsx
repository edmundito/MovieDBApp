import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useMemo } from 'react'
import { GestureResponderEvent, View } from 'react-native'
import { ActivityIndicator, List } from 'react-native-paper'
import { RootStackParamList } from '../types/navigation'
import * as tmdb from '../hooks/tmdb'
import { TMDBImageType, TMDBMoviesListItem } from '../types/tmdb'
import { LoadingView } from './LoadingView'
import { FlatList } from 'react-native-gesture-handler'
import { getTMDBMovieTitle } from '../utils/tmdb'

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
  const {
    data,
    fetchNextPage,
    isLoading,
    isSuccess,
    isError,
    isFetchingNextPage,
  } = tmdb.useMoviesInfiniteQuery(tmdb.MovieQueryType.NowPlaying)

  const items = useMemo<TMDBMoviesListItem[]>(
    () => (data?.pages ? data?.pages.flatMap(item => item.results) : []),
    [data?.pages],
  )

  const totalPages = useMemo<number>(
    () => data?.pages?.[0]?.total_pages ?? 0,
    [data],
  )

  const hasMorePages = useMemo<boolean>(
    () => totalPages > 0 && items.length < totalPages,
    [items.length, totalPages],
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
      renderItem={({ item, item: { poster_path } }) => {
        return (
          <List.Item
            title={getTMDBMovieTitle(item)}
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
      ListFooterComponent={
        <MovieListFooter isLoading={isFetchingNextPage} isEnd={!hasMorePages} />
      }
    />
  )
}

interface MovieListFooterProps {
  isLoading: boolean
  isEnd: boolean
}

export const MovieListFooter: React.FC<MovieListFooterProps> = ({
  isLoading,
  isEnd,
}) => (
  <View style={{ display: 'flex', alignContent: 'center', padding: 8 }}>
    {isLoading && !isEnd && <ActivityIndicator />}
  </View>
)
