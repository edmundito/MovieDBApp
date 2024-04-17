import React from 'react'
import { Text, View } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

type RootStackParamList = {
  Home: undefined
  Movie: undefined
}

export const MovieDetailScreen: React.FC<
  NativeStackScreenProps<RootStackParamList, 'Movie'>
> = () => {
  return (
    <View>
      <Text>THE MOVIE</Text>
    </View>
  )
}
