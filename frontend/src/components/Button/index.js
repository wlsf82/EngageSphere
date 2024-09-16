import styles from './Button.module.css'

const Button = ({
  icon = null,
  text = null,
  onClick = () => {}
}) => {
  return (
    <div className={styles.buttonContainer}>
      <button className={styles.button} onClick={onClick}>
        {icon}
        {text}
      </button>
    </div>
  )
}

export default Button
