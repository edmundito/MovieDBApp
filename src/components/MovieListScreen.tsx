import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

type RootStackParamList = {
  Home: undefined
  Movie: undefined
}

export const MovieListScreen: React.FC<
  NativeStackScreenProps<RootStackParamList, 'Home'>
> = ({ navigation }) => {
  const onPress = (_: GestureResponderEvent): void => {
    navigation.navigate('Movie')
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <Text>THE MOVIE</Text>
      </View>
    </TouchableOpacity>
  )
}
