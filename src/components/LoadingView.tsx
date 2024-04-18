import React from 'react'
import { StyleSheet } from 'react-native'
import { ActivityIndicator, Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
})

interface LoadingViewProps {
  hasError: boolean
}

export const LoadingView: React.FC<LoadingViewProps> = ({ hasError }) => {
  return (
    <SafeAreaView style={styles.container}>
      {hasError ? (
        <Text>Failed to load!</Text>
      ) : (
        <ActivityIndicator animating size="large" />
      )}
    </SafeAreaView>
  )
}
