import React from 'react'
import { PaperProvider } from 'react-native-paper'
import { App } from './App'
import { QueryClient, QueryClientProvider } from 'react-query'
import { TMDBContextProvider } from '../context/tmdb'
import { THEME } from '../constants/theme'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const queryClient = new QueryClient()

export const Main: React.FC = () => {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={THEME}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <QueryClientProvider client={queryClient}>
            <TMDBContextProvider>
              <App />
            </TMDBContextProvider>
          </QueryClientProvider>
        </GestureHandlerRootView>
      </PaperProvider>
    </SafeAreaProvider>
  )
}
