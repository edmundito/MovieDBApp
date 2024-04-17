import { useQuery } from 'react-query'
import { tmdbAPI } from '../instances/tmdbAPI'
import type {
  TMDBConfiguration,
  TMDBMovieDetails,
  TMDBMoviesList,
} from '../types/tmdb'

export const enum MovieQueryType {
  NowPlaying = 'now_playing',
  Popular = 'popular',
  TopRated = 'top_rated',
  Upcoming = 'upcoming',
}

export const useConfiguration = () =>
  useQuery(['configuration'], async () => {
    const { data } = await tmdbAPI.get<TMDBConfiguration>('/configuration')
    return data
  })

export const useMoviesQuery = (type: MovieQueryType, page: number) =>
  useQuery(['movies', type, page], async () => {
    const { data } = await tmdbAPI.get<TMDBMoviesList>(`/movie/${type}`, {
      params: {
        page,
      },
    })
    return data
  })

export const useMovieDetailsQuery = (movieId: number) =>
  useQuery(['movie', movieId], async () => {
    const { data } = await tmdbAPI.get<TMDBMovieDetails>(`/movie/${movieId}`)
    return data
  })
