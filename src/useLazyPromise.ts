import React from 'react'
import { RequestError, defaultError } from './types'

type UseLazyPromise<T, P> = [(params: P) => Promise<any>, { loading: boolean; done: boolean; error: RequestError; data: T | null }]

export const useLazyPromise = <T, P>(request: (data: P) => Promise<T>): UseLazyPromise<T, P> => {
  const [done, setDone] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [data, setData] = React.useState<T | null>(null)
  const [error, setError] = React.useState<RequestError>(defaultError)

  const handleRequest = (data: P): Promise<void> => {
    setDone(false)
    setLoading(true)
    setError(defaultError)
    return request(data)
      .then(setData)
      .catch((error) => {
        setError({
          info: error,
          occurred: true
        })
      })
      .finally(() => {
        setLoading(false)
        setDone(true)
      })
  }

  return [handleRequest, { loading, error, done, data }]
}
