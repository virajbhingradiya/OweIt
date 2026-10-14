function Navbar() {
  return (
    <header className="navbar">
      <nav className="navbar-inner" aria-label="Main">
        <a href="/" className="navbar-brand">
          <img src="/logo.png" alt="OweIt home" width="132" height="32" />
        </a>
        <div className="navbar-actions">
          <a href="/login" className="btn btn-ghost">Log in</a>
          <a href="/signup" className="btn btn-primary">Sign up</a>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
