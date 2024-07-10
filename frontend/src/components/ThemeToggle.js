import { useEffect, useState } from 'react'

const ThemeToggler = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  const toggleThemeHandler = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="theme-toggle-container">
      <button
        id="theme-toggle-button"
        onClick={toggleThemeHandler}
        aria-label={`theme ${theme} activated`}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer'
        }}
      >{theme === 'light' ? '☽' : '☀'}</button>
    </div>
  )
}

export default ThemeToggler
