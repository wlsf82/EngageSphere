const CustomerNotFound = ({ onClick }) => {
  return (
    <div className="not-found">
      <h2>404</h2>
      <p>Customer not found.</p>
      <div className="button-container">
        <button onClick={onClick}>Back</button>
      </div>
    </div>
  )
}

export default CustomerNotFound
