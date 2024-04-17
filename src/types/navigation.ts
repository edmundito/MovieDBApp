import { TMDBMoviesListItem } from './tmdb'

export type RootStackParamList = {
  Home: undefined
  Movie: { movie: TMDBMoviesListItem }
}
