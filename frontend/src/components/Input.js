import React from 'react'
import PropTypes, { customerShape, onChangePropType } from '../propTypes'

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

Input.propTypes = {
  customer: customerShape,
  customers: PropTypes.arrayOf(customerShape).isRequired,
  onChange: onChangePropType,
}

export default Input
