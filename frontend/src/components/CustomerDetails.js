import React, { useState } from 'react'
import { customerShape , onClickPropType } from '../propTypes'

const CustomerDetails = ({ customer, onClick }) => {
  const [showAddress, setShowAddress] = useState(false)

  const showAddressHandler = () => {
    setShowAddress(true)
  }

  const hideAddressHandler = () => {
    setShowAddress(false)
  }

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
      {showAddress ? (
        <>
          {customer.address ? (
            <div className="address-info" style={{ borderTop: '1px dashed gray' }}>
              <h3>Address</h3>
              <p><strong>Street:</strong> {customer.address.street}</p>
              <p><strong>City:</strong> {customer.address.city}</p>
              <p><strong>State:</strong> {customer.address.state}</p>
              <p><strong>Zip code:</strong> {customer.address.zipCode}</p>
              <p><strong>Country:</strong> {customer.address.country}</p>
            </div>
          ) : (
            <p>No address available</p>
          )}
          <div className="button-container show-hide-address">
            <button className='hide-address-btn' onClick={hideAddressHandler}>Hide address</button>
          </div>
        </>
      ) : (
        <div className="button-container show-hide-address">
          <button className='show-address-btn' onClick={showAddressHandler}>Show address</button>
        </div>
      )}
      <div className="button-container">
        <button onClick={onClick}>Back</button>
      </div>
    </div>
  )
}

CustomerDetails.propTypes = {
  customer: customerShape,
  onClick: onClickPropType
}

export default CustomerDetails
