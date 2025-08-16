// Header component - Top navigation bar
import { SignInButton, SignUpButton, LogOutButton } from '/src/components/auth/Button.jsx'
import { SignInForm, SignUpForm } from '/src/components/auth/Input.jsx'
import { useAuth } from '/src/context/AuthContext.jsx'
import { doSignOut } from '/src/firebase/auth'
import { useState } from 'react'
import styles from '../../styles/layout.module.css'
import logo from '../../assets/logo.svg'
import { DarkModeButton } from '../ui/ThemeToggle.jsx'

export default function Header() {
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
        <header className={styles.header}>
            <div className={styles.headerLogo}>
                <img src={logo} alt="DragMe Logo" className={styles.logo} />
            </div>
            <div className={styles.headerButtons}>
                <DarkModeButton />
                {!userLoggedIn ? (
                    <>
                        <SignInButton onClick={openSignIn} />
                        <SignUpButton onClick={openSignUp} />
                    </>
                ) : (
                    <LogOutButton onClick={handleLogout} />
                )}
            </div>
            <SignInForm isOpen={isSignInOpen} onClose={closeSignIn} />
            <SignUpForm isOpen={isSignUpOpen} onClose={closeSignUp} />
        </header>
    );
}
