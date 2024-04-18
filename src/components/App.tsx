import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { StatusBar } from 'react-native'
import { MovieListScreen } from './MovieListScreen'
import { MovieDetailScreen } from './MovieDetailScreen'
import { RootStackParamList } from '../types/navigation'
import { adaptNavigationTheme } from 'react-native-paper'

const { LightTheme } = adaptNavigationTheme({
  reactNavigationLight: DefaultTheme,
})
const NativeStackNavigator = createNativeStackNavigator<RootStackParamList>()

export const App: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="default" />
      <NavigationContainer theme={LightTheme}>
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
    </>
  )
}
