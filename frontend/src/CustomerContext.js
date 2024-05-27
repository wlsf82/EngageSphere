import { createContext, useState, useContext } from 'react'

const CustomerContext = createContext()

export const useCustomer = () => useContext(CustomerContext)

export const CustomerProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null)
  const [disabled, setDisabled] = useState(null)

  const value = {
    customer,
    setCustomer,
    disabled,
    setDisabled
  }

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  )
}
