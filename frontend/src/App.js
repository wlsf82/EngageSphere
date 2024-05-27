import { useEffect, useState } from 'react'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'

import { useCustomer } from './CustomerContext'

import CustomerFetcher from './CustomerFetcher'
import CustomersFetcher from './CustomersFetcher'

import Input from './components/Input'
import Header from './components/Header'
import Footer from './components/Footer'

const serverPort = 3001
const serverURL = process.env.REACT_APP_HEROKU_API_URL || `http://localhost:${serverPort}`

const App = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [customers, setCustomers] = useState([])
  const { setCustomer, disabled, setDisabled } = useCustomer()

  const [sizeFilter, setSizeFilter] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [paginationInfo, setPaginationInfo] = useState(() => ({
    totalPages: 1,
    limit: parseInt(localStorage.getItem('paginationLimit'), 10) || 10,
  }))

  const [initialFetchDone, setInitialFetchDone] = useState(false)

  useEffect(() => {
    localStorage.setItem('paginationLimit', paginationInfo.limit.toString())
    getCustomers(currentPage, paginationInfo.limit, sizeFilter)
  }, [currentPage, paginationInfo.limit, sizeFilter])

  async function getCustomers(page, limit, sizeFilter) {
    try {
      const response = await fetch(`${serverURL}/customers?page=${page}&limit=${limit}&size=${sizeFilter}`, { method: 'GET' })
      const jsonResponse = await response.json()
      const { customers, pageInfo } = jsonResponse

      setCustomers(customers)
      setPaginationInfo(prevState => ({ ...prevState, totalPages: pageInfo.totalPages }))
    } catch (error) {
      console.error(error)
    } finally {
      setInitialFetchDone(true)
    }
  }

  const inputChangeHandler = ({ target }) => setName(target.value)

  const customerClickHandler = customer => {
    setDisabled(true)
    setCustomer(customer)
    navigate(`/customers/${customer.id}`)
  }

  const limitChangeHandler = ({ target }) => {
    const newLimit = parseInt(target.value, 10)
    setPaginationInfo(prevState => ({ ...prevState, limit: newLimit }))
    setCurrentPage(1)
  }

  const paginationPrevClickHandler = () =>
    setCurrentPage(prev => Math.max(prev - 1, 1))
  const paginationNextClickHandler = () =>
    setCurrentPage(prev => (prev < paginationInfo.totalPages ? prev + 1 : prev))

  const filterChangeHandler =  ({ target }) => {
    setSizeFilter(target.value)
    setCurrentPage(1)
  }

  return (
    <>
      <main className="container">
        <Header />
        <Input disabled={disabled} onChange={inputChangeHandler} />
        <Routes>
          <Route path="/" element={<Navigate replace to="/customers" />} />
          <Route path="customers" element={
            <CustomersFetcher
              sizeFilter={sizeFilter}
              filterChangeHandler={filterChangeHandler}
              initialFetchDone={initialFetchDone}
              customers={customers}
              name={name}
              customerClickHandler={customerClickHandler}
              currentPage={currentPage}
              paginationInfo={paginationInfo}
              paginationNextClickHandler={paginationNextClickHandler}
              paginationPrevClickHandler={paginationPrevClickHandler}
              limitChangeHandler={limitChangeHandler}
            />
          } />
          <Route path="customers/:id" element={<CustomerFetcher customers={customers} />} />
          <Route path="*" element={<Navigate replace to="/customers" />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
