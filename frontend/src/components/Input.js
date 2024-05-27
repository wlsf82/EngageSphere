const Input = ({ disabled, onChange }) => {
  return (
    <div className="input-container">
      <input
        autoFocus
        type="text"
        id="name"
        data-testid="name"
        placeholder="Enter your name"
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  )
}

export default Input
