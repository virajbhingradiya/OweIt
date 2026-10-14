import { useEffect, useState } from 'react'

function App() {
  const [status, setStatus] = useState('checking...')

  useEffect(() => {
    fetch('/actuator/health')
      .then((res) => res.json())
      .then((body) => setStatus(body.status))
      .catch(() => setStatus('DOWN'))
  }, [])

  return (
    <main>
      <h1>
        <img src="/logo.png" alt="OweIt" width="263" height="64" />
      </h1>
      <p>Split expenses with friends.</p>
      <p>API status: <strong>{status}</strong></p>
    </main>
  )
}

export default App
