import React from 'react'
import { PaperProvider } from 'react-native-paper'
import { App } from './App'
import { QueryClient, QueryClientProvider } from 'react-query'
import { TMDBContextProvider } from '../context/tmdb'
import { THEME } from '../constants/theme'

const queryClient = new QueryClient()

export const Main: React.FC = () => {
  return (
    <PaperProvider theme={THEME}>
      <QueryClientProvider client={queryClient}>
        <TMDBContextProvider>
          <App />
        </TMDBContextProvider>
      </QueryClientProvider>
    </PaperProvider>
  )
}
