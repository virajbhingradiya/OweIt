import { SignUpButton } from '@clerk/react'
import './Landing.css'

// Sample group shown in the hero. The numbers add up: ₹14,220 split three ways is ₹4,740 each.
const sampleExpenses = [
  { label: 'Villa, 2 nights', paidBy: 'You', amount: '₹9,600' },
  { label: 'Beach shack dinner', paidBy: 'Meera', amount: '₹3,180' },
  { label: 'Scooter rental', paidBy: 'Kabir', amount: '₹1,440' },
]

const steps = [
  { title: 'Add an expense', text: 'Enter what you paid and who it was for. It takes a few seconds.' },
  { title: 'Split it your way', text: 'Equally, by exact amounts, or by shares. OweIt does the math.' },
  { title: 'Settle up', text: 'See one clear balance per friend, and mark it paid when they pay you back.' },
]

function SignUpCta() {
  return (
    <SignUpButton mode="modal">
      <button type="button" className="btn btn-primary btn-lg">Sign up</button>
    </SignUpButton>
  )
}

function Landing() {
  return (
    <main className="landing">
      <section className="hero">
        <div className="hero-copy">
          <h1>Split bills, not friendships.</h1>
          <p>Track shared expenses with friends, see who owes what, and settle up without the awkward math.</p>
          <div className="hero-actions">
            <SignUpCta />
            <a href="#how-it-works" className="btn btn-ghost btn-lg">How it works</a>
          </div>
        </div>

        <figure className="sample-group" aria-label="Example of a group's balances in OweIt">
          <figcaption>Weekend in Goa</figcaption>
          <ul>
            {sampleExpenses.map((e) => (
              <li key={e.label}>
                <span>
                  {e.label}
                  <small>Paid by {e.paidBy}</small>
                </span>
                <strong>{e.amount}</strong>
              </li>
            ))}
          </ul>
          <div className="sample-balances">
            <p>Meera owes you <strong>₹1,560</strong></p>
            <p>Kabir owes you <strong>₹3,300</strong></p>
          </div>
        </figure>
      </section>

      <section id="how-it-works" className="steps">
        <h2>Three steps, then you're even.</h2>
        <ol>
          {steps.map((s) => (
            <li key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="features">
        <h2>Built for real group spending</h2>
        <div className="bento">
          <article className="tile tile-ice tile-wide">
            <h3>Groups for every occasion</h3>
            <p>Trips, flatmates, office lunches. Each group keeps its own expenses and balances.</p>
          </article>
          <article className="tile tile-navy">
            <h3>Balances that add up</h3>
            <p>Every rupee is accounted for, so nobody has to recheck the math.</p>
          </article>
          <article className="tile tile-plain">
            <h3>Uneven splits are fine</h3>
            <p>Someone skipped dinner? Leave them out of that expense.</p>
          </article>
          <article className="tile tile-blue tile-wide">
            <h3>Sign in your way</h3>
            <p>Use email and password, or continue with Google. Accounts are secured by Clerk.</p>
          </article>
        </div>
      </section>

      <section className="closing">
        <h2>Ready to stop chasing payments?</h2>
        <SignUpCta />
      </section>

      <footer className="landing-footer">
        <img src="/logo.png" alt="OweIt" width="99" height="24" />
        <small>© 2026 OweIt</small>
      </footer>
    </main>
  )
}

export default Landing
