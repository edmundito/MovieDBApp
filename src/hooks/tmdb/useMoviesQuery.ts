import { useQuery } from 'react-query'
import { tmdbAPI } from '../../instances/tmdbAPI'
import { TMDBError, TMDBMoviesList } from '../../types/tmdb'

export const enum MovieQueryType {
  NowPlaying = 'now_playing',
  Popular = 'popular',
  TopRated = 'top_rated',
  Upcoming = 'upcoming',
}

export const useMoviesQuery = (type: MovieQueryType, page: number) =>
  useQuery<TMDBMoviesList, TMDBError>(['movies', type, page], async () => {
    const { data } = await tmdbAPI.get(`/movie/${type}`, {
      params: {
        page,
      },
    })
    return data
  })
