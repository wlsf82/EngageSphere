const Input = ({ customer, customers, onChange }) => {
  return (
    <div className="input-container">
      <input
        autoFocus
        type="text"
        id="name"
        data-testid="name"
        placeholder="Enter your name"
        onChange={onChange}
        disabled={customer || !customers.length ? true : false}
      />
    </div>
  )
}

export default Input
