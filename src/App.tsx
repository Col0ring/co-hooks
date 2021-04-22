import React, { useState, useCallback } from 'react'
import Test from './Test'
import Test2 from './Test2'
import useAsync from './hooks/useAsync'
import logo from './logo.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(10)
  const [show, setShow] = useState(true)
  const fetchFunction = useCallback((count: number) => {
    return new Promise<number>((resolve, reject) => {
      setTimeout(() => {
        resolve(count * 2)
      }, 1000)
    })
  }, [])

  const { data, loading } = useAsync(fetchFunction, [count], {}, 1)
  return (
    <div className="App">
      <header className="App-header">
        {show && <Test />}
        <Test2 />
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button
            onClick={() => {
              setCount((count) => count + 1)
            }}
          >
            count is: {count}, loading: {loading ? 'true' : 'false'}, double:{' '}
            {data}
          </button>
        </p>
        <p>
          <button
            onClick={() => {
              setShow((show) => !show)
            }}
          >
            Test Toggle
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default App
