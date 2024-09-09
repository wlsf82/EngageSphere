import ThemeToggle from '../ThemeToggle'
import styles from './Header.module.css'

const Header = () => {
  return (
    <div className={styles.container}>
      <h1>EngageSphere</h1>
      <ThemeToggle />
    </div>
  )
}

export default Header
