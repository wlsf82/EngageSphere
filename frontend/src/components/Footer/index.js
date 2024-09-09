import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.container} data-testid="footer">
      <p>Copyright 2024 - Talking About Testing</p>
      <ul>
        <li>
          <a href="https://hotmart.com/pt-br/club/cypress-playground-ate-a-nuvem" target="_blank" rel="noopener noreferrer">Hotmart</a>
        </li>
        <li>
          <a href="https://udemy.com/user/walmyr" target="_blank" rel="noopener noreferrer">Udemy</a>
        </li>
        <li>
          <a href="https://talkingabouttesting.com" target="_blank" rel="noopener noreferrer">Blog</a>
        </li>
        <li>
          <a href="https://youtube.com/@talkingabouttesting" target="_blank" rel="noopener noreferrer">YouTube</a>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
