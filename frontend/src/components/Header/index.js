import Input from '../Input'
import ThemeToggle from '../ThemeToggle'

import styles from './Header.module.css'

const Header = ({ inputDisabled, inputChangeHandler }) => {
  return (
    <div className={styles.container}>
      <h1>EngageSphere</h1>
      <ThemeToggle />
      <Input disabled={inputDisabled} onChange={inputChangeHandler} />
    </div>
  )
}

export default Header
