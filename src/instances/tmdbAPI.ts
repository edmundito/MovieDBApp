import axios from 'axios'
import { TMDB_API_KEY } from '@env'

export const tmdbAPI = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  timeout: 1000,
  params: {
    api_key: TMDB_API_KEY,
  },
})
