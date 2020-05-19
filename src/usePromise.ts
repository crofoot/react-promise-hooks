import React from 'react'
import { RequestError, defaultError } from './types'

export const usePromise = <T extends any>(request: () => Promise<any>) => {
  const [data, setData] = React.useState<T>()
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<RequestError>(defaultError)

  const refetch = () => {
    setLoading(true)
    setError(defaultError)
    return handleRequest()
  }

  const handleRequest = () => {
    return request()
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
    handleRequest()
  }, [])

  return { loading, error, data, refetch }
}
