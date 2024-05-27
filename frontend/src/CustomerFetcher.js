import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useCustomer } from './CustomerContext'

import CustomerDetails from './components/CustomerDetails'
import CustomerNotFound from './components/CustomerNotFound'

function CustomerFetcher({ customers }) {
  const navigate = useNavigate()

  const { id } = useParams()

  const { customer, setCustomer, setDisabled } = useCustomer()

  useEffect(() => {
    setDisabled(true)
    customers.find(customer => {
      if (customer.id === parseInt(id)) {
        setCustomer(customer)
        return true
      }
      return false
    })
  }, [customers, id, setCustomer, setDisabled])

  const backButtonClickHandler = () => {
    setCustomer(null)
    setDisabled(false)
    navigate('/customers')
  }

  if (customer) return <CustomerDetails customer={customer} onClick={backButtonClickHandler} />
  return <CustomerNotFound onClick={backButtonClickHandler}/>
}

export default CustomerFetcher
