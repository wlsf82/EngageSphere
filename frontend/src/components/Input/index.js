import styles from './Input.module.css'

const Input = ({ disabled, onChange }) => {
  return (
    <div className={styles.container}>
      <label className="sr-only" htmlFor="name">Your name</label>
      <input
        type="text"
        id="name"
        autoComplete="off"
        data-testid="name"
        placeholder="E.g., John Doe"
        onChange={onChange}
        disabled={disabled}
        maxlength="40"
      />
    </div>
  )
}

export default Input
