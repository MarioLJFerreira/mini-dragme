// Button component - All button types (primary, secondary, danger)
// TODO: Implement button component with different variants 

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

  function DarkModeButton({ onClick }) {
    return (
      <button onClick={onClick}>Dark Mode</button>
    )
  }
  
  export { SignInButton, SignUpButton, DarkModeButton }