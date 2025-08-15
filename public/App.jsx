import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { SignInButton, SignUpButton, LogOutButton } from './components/auth/Button'
import { SignInForm, SignUpForm } from './components/auth/Input'
import { useAuth } from './context/AuthContext'
import { doSignOut } from './firebase/auth'

function App() {
  const [count, setCount] = useState(0)
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const { userLoggedIn } = useAuth()

  const openSignIn = () => setIsSignInOpen(true)
  const closeSignIn = () => setIsSignInOpen(false)
  const openSignUp = () => setIsSignUpOpen(true)
  const closeSignUp = () => setIsSignUpOpen(false)

  const handleLogout = async () => {
    try {
      await doSignOut()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      
      {!userLoggedIn ? (
        <>
          <SignInButton onClick={openSignIn} />
          <SignUpButton onClick={openSignUp} />
        </>
      ) : (
        <LogOutButton onClick={handleLogout} />
      )}
      
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <SignInForm isOpen={isSignInOpen} onClose={closeSignIn} />
      <SignUpForm isOpen={isSignUpOpen} onClose={closeSignUp} />
    </>
  )
}

export default App
