import React from 'react'

import { usePromise, useLazyPromise } from 'react-promise-hooks'

const PromiseRequest = () => {
  return fetch('https://jsonplaceholder.typicode.com/todos/1').then((response) => response.json())
}
const PromiseRequest2 = (id) => {
  return fetch(`https://jsonplaceholder.typicode.com/todos/${id}`).then((response) => response.json())
}

const App = () => {
  const { data, error, loading } = usePromise(PromiseRequest2, 4)
  const [promiseRequest, results] = useLazyPromise(PromiseRequest)

  return (
    <div>
      <h3>usePromise()</h3>
      <p>
        {JSON.stringify(data)} {error.occurred} {loading}
      </p>
      <h3>useLazyPromise()</h3>
      <p>
        {JSON.stringify(results.data)} {error.occurred} {loading}
      </p>
      <button onClick={promiseRequest}>Invoke Lazy Promise</button>
    </div>
  )
}

export default App
