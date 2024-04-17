import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { StatusBar } from 'react-native'
import { QueryClient, QueryClientProvider } from 'react-query'
import { MovieListScreen } from './MovieListScreen'
import { MovieDetailScreen } from './MovieDetailScreen'
import { RootStackParamList } from '../types/navigation'
import { TMDBContextProvider } from '../context/tmdb'

const StackNavigator = createStackNavigator<RootStackParamList>()

const queryClient = new QueryClient()

export const App: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="default" />
      <QueryClientProvider client={queryClient}>
        <TMDBContextProvider>
          <NavigationContainer>
            <StackNavigator.Navigator initialRouteName="Home">
              <StackNavigator.Screen
                name="Home"
                component={MovieListScreen}
                options={{ title: 'Popular Movies' }}
              />
              <StackNavigator.Screen
                name="Movie"
                component={MovieDetailScreen}
                options={({ route }) => ({
                  title: route.params.movie.title,
                })}
              />
            </StackNavigator.Navigator>
          </NavigationContainer>
        </TMDBContextProvider>
      </QueryClientProvider>
    </>
  )
}
