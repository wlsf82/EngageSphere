const Input = ({ disabled, onChange }) => {
  return (
    <div className="input-container">
      <label className="sr-only" htmlFor="name">Your name</label>
      <input
        type="text"
        id="name"
        data-testid="name"
        placeholder="E.g., John Doe"
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  )
}

export default Input
