# react-promise-hooks

> Lightweight hook package to handle promises

[![NPM](https://img.shields.io/npm/v/react-promise-hooks.svg)](https://www.npmjs.com/package/react-promise-hooks) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm i react-promise-hooks
```

## Usage

#### usePromise()

- Invoked on render of component

```tsx
const { data, error, loading, refetch } = usePromise(PromiseFunction)
```

#### useLazyPromise()

- Invoked when promiseRequest function is called

```tsx
const [promiseRequest, { data, error, loading, done }] = useLazyPromise(PromiseRequest)
```

#### Example Component

```tsx
const PromiseRequest = () => {
  return fetch('https://jsonplaceholder.typicode.com/todos/1').then((response) => response.json())
}

const App = () => {
  const { data, error, loading } = usePromise(PromiseRequest)
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
```

## License

MIT © [crofoot](https://github.com/crofoot)
