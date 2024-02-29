const Header = ({ theme, onClick }) => {
  return (
    <div className="header-container">
      <h1>EngageSphere</h1>
      <div className="theme-toggle-container">
        <button id="theme-toggle-button" onClick={onClick} aria-labelledby="theme-toggle-label" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          {theme === 'light' ? '☽' : '☀'}
        </button>
      </div>
    </div>
  )
}

export default Header
