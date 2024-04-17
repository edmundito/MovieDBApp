import React, { useCallback } from 'react'
import { PropsWithChildren, createContext, useContext } from 'react'
import * as tmdb from '../hooks/tmdb'
import { TMDBConfiguration } from '../types/tmdb'
import { Text, View } from 'react-native'

type GetImageURLFunction = (path: string) => string | undefined

interface TMDBContext {
  configuration: TMDBConfiguration
  getTMDBImageURL: GetImageURLFunction
}

const TMDBContext = createContext<TMDBContext | undefined>(undefined)

export const useTMDBContext = (): TMDBContext => {
  const context = useContext(TMDBContext)
  if (context === undefined) {
    throw new Error('TMDBContext is undefined')
  }

  return context
}

export const TMDBContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { data: configuration, isLoading, isSuccess } = tmdb.useConfiguration()

  const getTMDBImageURL = useCallback<GetImageURLFunction>(
    (path: string) => {
      return configuration
        ? [configuration.images.secure_base_url, 'original', path].join('/')
        : undefined
    },
    [configuration],
  )

  if (isLoading || !isSuccess) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <TMDBContext.Provider value={{ configuration, getTMDBImageURL }}>
      {children}
    </TMDBContext.Provider>
  )
}
