import { useTheme } from '../../context/ThemeContext';

export function DarkModeButton() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div
      onClick={toggleDarkMode}
      style={{
        position: 'relative',
        width: '60px',
        height: '30px',
        backgroundColor: isDarkMode ? '#4a5568' : '#e2e8f0',
        borderRadius: '15px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        padding: '2px',
        border: '2px solid var(--buttonBorder)'
      }}
    >
      <div
        style={{
          width: '22px',
          height: '22px',
          backgroundColor: 'white',
          borderRadius: '50%',
          transform: isDarkMode ? 'translateX(30px)' : 'translateX(0px)',
          transition: 'transform 0.3s ease',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px'
        }}
      >
        {isDarkMode ? '🌙' : '☀️'}
      </div>
    </div>
  );
}
