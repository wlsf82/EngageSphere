import styles from './Button.module.css'

const Button = ({
  primary = true,
  icon = null,
  text = '',
  onClick = () => {},
  disabled = false
}) => {
  return (
    <div className={styles.buttonContainer}>
      <button
        className={primary ? styles.button : styles.secondaryButton}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
      >
        {icon}
        {text}
      </button>
    </div>
  )
}

export default Button
