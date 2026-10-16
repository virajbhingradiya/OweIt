import { Show } from '@clerk/react'
import { useEffect, useState } from 'react'
import Landing from './Landing.tsx'
import Navbar from './Navbar.tsx'

function App() {
  const [status, setStatus] = useState('checking...')

  useEffect(() => {
    fetch('/actuator/health')
      .then((res) => res.json())
      .then((body) => setStatus(body.status))
      .catch(() => setStatus('DOWN'))
  }, [])

  return (
    <>
      <Navbar />
      <Show when="signed-out">
        <Landing />
      </Show>
      <Show when="signed-in">
        <main>
          <h1>Split expenses with friends.</h1>
          <p>API status: <strong>{status}</strong></p>
        </main>
      </Show>
    </>
  )
}

export default App
