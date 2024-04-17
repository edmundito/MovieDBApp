import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { StatusBar } from 'react-native'
import { QueryClient, QueryClientProvider } from 'react-query'
import { MovieListScreen } from './MovieListScreen'
import { MovieDetailScreen } from './MovieDetailScreen'
import { RootStackParamList } from '../types/navigation'
import { TMDBContextProvider } from '../context/tmdb'

const NativeStackNavigator = createNativeStackNavigator<RootStackParamList>()

const queryClient = new QueryClient()

export const App: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="default" />
      <QueryClientProvider client={queryClient}>
        <TMDBContextProvider>
          <NavigationContainer>
            <NativeStackNavigator.Navigator initialRouteName="Home">
              <NativeStackNavigator.Screen
                name="Home"
                component={MovieListScreen}
                options={{ title: 'Popular Movies' }}
              />
              <NativeStackNavigator.Screen
                name="Movie"
                component={MovieDetailScreen}
                options={({ route }) => ({
                  title: route.params.movie.title,
                })}
              />
            </NativeStackNavigator.Navigator>
          </NavigationContainer>
        </TMDBContextProvider>
      </QueryClientProvider>
    </>
  )
}
