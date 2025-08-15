import { doSignOut } from '../../firebase/auth';

// Authentication buttons component - Sign in and sign up trigger buttons
// TODO: Implement button variants and styling

function SignInButton({ onClick }) { 
    return (
      <button onClick={onClick}>Sign In</button>
    )
  }
  
  function SignUpButton({ onClick }) {
    return (
      <button onClick={onClick}>Sign Up</button>
    )
  }
  
  function LogOutButton({ onClick }) {
    return (
      <button onClick={onClick}>Log Out</button>
    )
  }

  export { SignInButton, SignUpButton, LogOutButton }