import { TMDBMovie } from '../types/tmdb'

export const getTMDBMovieTitle = ({
  title,
  original_title,
}: TMDBMovie): string => {
  if (original_title.toLowerCase() === title.toLowerCase()) {
    return title
  }
  return `${title} (${original_title})`
}
