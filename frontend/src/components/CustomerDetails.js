const CustomerDetails = ({ customer, onClick }) => {
  return (
    <div className="customer-details">
      <h2>Customer Details</h2>
      <p><strong>Company name:</strong> {customer.name}</p>
      <p><strong>Number of employees:</strong> {customer.employees}</p>
      <p><strong>Size:</strong> {customer.size}</p>
      {customer.contactInfo ? (
        <>
          <p><strong>Contact name:</strong> {customer.contactInfo.name}</p>
          <p><strong>Contact email:</strong> {customer.contactInfo.email}</p>
        </>
      ) : (
        <p>No contact info available</p>
      )}
      <div className="button-container">
        <button onClick={onClick}>Back</button>
      </div>
    </div>
  )
}

export default CustomerDetails
