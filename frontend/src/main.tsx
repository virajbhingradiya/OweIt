import { ClerkProvider } from '@clerk/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!publishableKey) {
  throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY. Copy frontend/.env.example to frontend/.env.local.')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={publishableKey}
      // Clerk's sign-in/sign-up modals use our palette's primary blue.
      appearance={{ variables: { colorPrimary: '#1c4d8d' } }}
    >
      <App />
    </ClerkProvider>
  </StrictMode>,
)
