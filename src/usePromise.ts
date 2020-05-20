import React from 'react'
import { RequestError, defaultError } from './types'

export const usePromise = <T, P = any>(request: (params: P) => Promise<T>, params?: P) => {
  const [data, setData] = React.useState<T>()
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<RequestError>(defaultError)

  const refetch = (promiseParams: P) => {
    setLoading(true)
    setError(defaultError)
    return handlePromise(promiseParams)
  }

  const handlePromise = (promiseParams: P) => {
    return request(promiseParams)
      .then((requestData) => {
        setData(requestData)
      })
      .catch((error) => {
        setError({
          info: error,
          occurred: true
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  React.useEffect(() => {
    let anyParam: any
    handlePromise(params !== undefined ? params : anyParam)
  }, [])

  return { loading, error, data, refetch }
}
