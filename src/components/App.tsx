import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { StatusBar } from 'react-native'
import { QueryClient, QueryClientProvider } from 'react-query'
import { MovieListScreen } from './MovieListScreen'
import { MovieDetailScreen } from './MovieDetailScreen'

type RootStackParamList = {
  Home: undefined
  Movie: undefined
}

const StackNavigator = createStackNavigator<RootStackParamList>()

const queryClient = new QueryClient()

export const App: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="default" />
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <StackNavigator.Navigator initialRouteName="Home">
            <StackNavigator.Screen name="Home" component={MovieListScreen} />
            <StackNavigator.Screen name="Movie" component={MovieDetailScreen} />
          </StackNavigator.Navigator>
        </QueryClientProvider>
      </NavigationContainer>
    </>
  )
}
