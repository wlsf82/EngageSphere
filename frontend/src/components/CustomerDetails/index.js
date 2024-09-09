import { useState } from 'react'
import styles from './CustomerDetails.module.css'

const CustomerDetails = ({ customer, onClick }) => {
  const [showAddress, setShowAddress] = useState(false)

  const showAddressHandler = () => {
    setShowAddress(true)
  }

  const hideAddressHandler = () => {
    setShowAddress(false)
  }

  return (
    <div className={styles.container}>
      <h2>Customer Details</h2>
      <p><strong>Company ID:</strong> {customer.id}</p>
      <p><strong>Company name:</strong> {customer.name}</p>
      <p><strong>Number of employees:</strong> {customer.employees}</p>
      <p><strong>Size:</strong> {customer.size}</p>
      <p><strong>Industry:</strong> {customer.industry}</p>
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
            <div style={{ borderTop: '1px dashed gray' }}>
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
          <div className={`${styles.buttonContainer} ${styles.showHideAddress}`}>
            <button className={styles.hideAddressBtn} onClick={hideAddressHandler}>Hide address</button>
          </div>
        </>
      ) : (
        <div className={`${styles.buttonContainer} ${styles.showHideAddress}`}>
          <button className={styles.showAddressBtn} onClick={showAddressHandler}>Show address</button>
        </div>
      )}
      <div className={styles.buttonContainer}>
        <button onClick={onClick}>Back</button>
      </div>
    </div>
  )
}

export default CustomerDetails
