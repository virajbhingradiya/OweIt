import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'

function Navbar() {
  return (
    <header className="navbar">
      <nav className="navbar-inner" aria-label="Main">
        <a href="/" className="navbar-brand">
          <img src="/logo.png" alt="OweIt home" width="132" height="32" />
        </a>
        <div className="navbar-actions">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button type="button" className="btn btn-ghost">Log in</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button type="button" className="btn btn-primary">Sign up</button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
