import React from 'react'
import { PropsWithChildren, createContext, useContext } from 'react'
import * as tmdb from '../hooks/tmdb'
import { TMDBConfiguration } from '../types/tmdb'
import { LoadingView } from '../components/LoadingView'

interface TMDBContext {
  configuration: TMDBConfiguration
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
  const {
    data: configuration,
    isLoading,
    isSuccess,
    isError,
  } = tmdb.useConfiguration()

  if (isLoading || !isSuccess || isError) {
    return <LoadingView hasError={isError} />
  }

  return (
    <TMDBContext.Provider value={{ configuration }}>
      {children}
    </TMDBContext.Provider>
  )
}
