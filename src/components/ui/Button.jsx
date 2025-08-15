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
  
  export { SignInButton, SignUpButton }