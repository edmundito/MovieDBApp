import { useQuery } from 'react-query'
import { tmdbAPI } from '../instances/tmdbAPI'
import type {
  TMDBConfiguration,
  TMDBImageType,
  TMDBMovieDetails,
  TMDBMoviesList,
} from '../types/tmdb'
import { useTMDBContext } from '../context/tmdb'
import { useMemo } from 'react'

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

const getImageSizeFromWidth = (
  imageSizes: string[] | undefined,
  width: number,
): string => {
  if (imageSizes) {
    for (let imageSize of imageSizes) {
      if (imageSize === 'default' || imageSize[0] !== 'w') {
        break
      }

      const imageWidth: number = parseInt(imageSize.substring(1), 10)
      if (width < imageWidth) {
        return imageSize
      }
    }
  }

  return 'default'
}

export const useImageURI = (
  path: string | undefined,
  type: TMDBImageType,
  width: number,
): string | undefined => {
  const { configuration } = useTMDBContext()
  return useMemo(() => {
    if (!configuration || !path) {
      return undefined
    }

    const size = getImageSizeFromWidth(
      configuration.images[`${type}_sizes`],
      width,
    )

    const url: string = [configuration.images.secure_base_url, size, path].join(
      '',
    )

    return url
  }, [configuration, path, type, width])
}
