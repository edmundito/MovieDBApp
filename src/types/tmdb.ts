export interface TMDBError {
  status_code: number
  status_message: string
  success: boolean
}

export const enum TMDBImageType {
  Backdrop = 'backdrop',
  Logo = 'logo',
  Poster = 'poster',
  Profile = 'profile',
  Still = 'still',
}

export interface TMDBConfigurationImages {
  base_url: string
  secure_base_url: string
  backdrop_sizes: string[]
  logo_sizes: string[]
  poster_sizes: string[]
  profile_sizes: string[]
  still_sizes: string[]
}

export interface TMDBConfiguration {
  images: TMDBConfigurationImages
  change_keys: string[]
}

export interface TMDBMovie {
  adult: boolean
  backdrop_path: string
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface TMDBMoviesListItem extends TMDBMovie {
  genre_ids: number[]
}

export interface TMDBDateRange {
  maximum: string
  minimum: string
}

export interface TMDBMoviesList {
  dates: TMDBDateRange
  page: number
  results: TMDBMoviesListItem[]
  total_pages: number
  total_results: number
}

export interface TMDBMovieDetails extends TMDBMovie {
  belongs_to_collection: {
    id: number
    name: string
    poster_path: string
    backdrop_path: string
  }
  budget: number
  genres: {
    id: number
    name: string
  }[]

  homepage: string
  imdb_id: string
  origin_country: string[]
  production_companies: {
    id: number
    logo_path: string
    name: string
    origin_country: string
  }[]
  production_countries: {
    iso_3166_1: string
    name: string
  }[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: {
    english_name: string
    iso_639_1: string
    name: string
  }[]
  status: string // TODO: Probably an enum - 'Released' is what we know so far
  tagline: string
}
