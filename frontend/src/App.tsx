import { useEffect, useState } from 'react'
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
      <main>
        <h1>Split expenses with friends.</h1>
        <p>API status: <strong>{status}</strong></p>
      </main>
    </>
  )
}

export default App
