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
      appearance={{
        // Clerk's sign-in/sign-up modals use our palette's primary blue.
        variables: { colorPrimary: '#1c4d8d' },
        // Hides the "Development mode" badge shown with pk_test_ keys. Cosmetic only: the app still
        // runs on Clerk's dev instance (relaxed limits). Switch to a production instance before launch.
        options: { unsafe_disableDevelopmentModeWarnings: true },
      }}
    >
      <App />
    </ClerkProvider>
  </StrictMode>,
)
