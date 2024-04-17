import { useQuery } from 'react-query'
import { tmdbAPI } from '../../instances/tmdbAPI'
import { TMDBError, TMDBMovieDetails } from '../../types/tmdb'

export const useMovieDetailsQuery = (movieId: number) =>
  useQuery<TMDBMovieDetails, TMDBError>(['movie', movieId], async () => {
    const { data } = await tmdbAPI.get(`/movie/${movieId}`)
    return data
  })
