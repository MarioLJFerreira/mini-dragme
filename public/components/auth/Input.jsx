import { useState } from 'react';
import styles from '/src/styles/forms.module.css';
import { doSignInWithEmailAndPassword, doSignInWithGoogle, doCreateUserWithEmailAndPassword } from '../../firebase/auth';
import { useAuth } from '../../context/AuthContext';

// Authentication forms component - Sign in and sign up popup forms
// TODO: Implement form validation and authentication logic

function SignInForm({ isOpen, onClose }) { 
    if (!isOpen) return null;
    const { userLoggedIn } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const onSubmit = async (e) => {
      e.preventDefault()
      if(!isSigningIn){
        setIsSigningIn(true)
        setErrorMessage('')
        try {
          await doSignInWithEmailAndPassword(email, password)
          onClose()
        } catch (error) {
          setErrorMessage(error.message)
        } finally {
          setIsSigningIn(false)
        }
      }
    }

    const onGoogleSignIn = async (e) => {
      e.preventDefault()
      if(!isSigningIn){
        setIsSigningIn(true)
        setErrorMessage('')
        try {
          await doSignInWithGoogle()
          onClose()
        } catch (error) {
          setErrorMessage(error.message)
        } finally {
          setIsSigningIn(false)
        }
      }
    }

    return (
      <div className={styles.popupOverlay} onClick={onClose}>
        <div className={styles.popupCard} onClick={(e) => e.stopPropagation()}>
          <h2 className={styles.popupTitle}>Sign In</h2>
          {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
          <form className={styles.popupForm} onSubmit={onSubmit}>
            <div className={styles.inputGroup}>
              <input 
                type="email" 
                placeholder="Email" 
                className={styles.popupInput}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <input 
                type="password" 
                placeholder="Password" 
                className={styles.popupInput}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className={styles.popupButton} disabled={isSigningIn}>
              {isSigningIn ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          
          <div className={styles.divider}>
            <span>or</span>
          </div>
          
          <button className={styles.googleButton} onClick={onGoogleSignIn} disabled={isSigningIn}>
            <svg className={styles.googleIcon} viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            {isSigningIn ? 'Signing In...' : 'Sign in with Google'}
          </button>
        </div>
      </div>
    )
  }
  
  function SignUpForm({ isOpen, onClose }) {
    if (!isOpen) return null;
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const onSubmit = async (e) => {
      e.preventDefault()
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match')
        return
      }
      if(!isRegistering){
        setIsRegistering(true)
        setErrorMessage('')
        try {
          await doCreateUserWithEmailAndPassword(email, password)
          onClose()
        } catch (error) {
          setErrorMessage(error.message)
        } finally {
          setIsRegistering(false)
        }
      }
    }

    const onGoogleSignIn = async (e) => {
      e.preventDefault()
      if(!isRegistering){
        setIsRegistering(true)
        setErrorMessage('')
        try {
          await doSignInWithGoogle()
          onClose()
        } catch (error) {
          setErrorMessage(error.message)
        } finally {
          setIsRegistering(false)
        }
      }
    }

    return (
      <div className={styles.popupOverlay} onClick={onClose}>
        <div className={styles.popupCard} onClick={(e) => e.stopPropagation()}>
          <h2 className={styles.popupTitle}>Sign Up</h2>
          {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
          <form className={styles.popupForm} onSubmit={onSubmit}>
            <div className={styles.inputGroup}>
              <input 
                type="email" 
                placeholder="Email" 
                className={styles.popupInput}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <input 
                type="password" 
                placeholder="Password" 
                className={styles.popupInput}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <input 
                type="password" 
                placeholder="Confirm Password" 
                className={styles.popupInput}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className={styles.popupButton} disabled={isRegistering}>
              {isRegistering ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
          
          <div className={styles.divider}>
            <span>or</span>
          </div>
          
          <button className={styles.googleButton} onClick={onGoogleSignIn} disabled={isRegistering}>
            <svg className={styles.googleIcon} viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C3.99 20.53 7.7 23 12 23z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            {isRegistering ? 'Creating Account...' : 'Sign up with Google'}
          </button>
        </div>
      </div>
    )
  }
  
  export { SignInForm, SignUpForm }