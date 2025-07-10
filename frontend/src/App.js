import { useEffect, useState } from 'react'

import { useCookieConsent } from './components/CookieConsent/useCookieConsent'

import styles from './App.module.css'

import CookieConsent from './components/CookieConsent'
import CustomerDetails from './components/CustomerDetails'
import DownloadCSV from './components/DownloadCSV'
import EmptyState from './components/EmptyState'
import Footer from './components/Footer'
import Greeting from './components/Greeting'
import Header from './components/Header'
import IndustryFilter from './components/Filters/IndustryFilter'
import Messenger from './components/Messenger'
import Pagination from './components/Pagination'
import SizeFilter from './components/Filters/SizeFilter'
import Table from './components/Table'

const serverPort = 3001
const serverURL = process.env.REACT_APP_HEROKU_API_URL || `http://localhost:${serverPort}`

const App = () => {
  const [consent, giveConsent, declineConsent] = useCookieConsent()
  const [name, setName] = useState('')
  const [customers, setCustomers] = useState([])
  const [customer, setCustomer] = useState(null)
  const [inputDisabled, setInputDisabled] = useState(false)

  const [sizeFilter, setSizeFilter] = useState('All')
  const [industryFilter, setIndustryFilter] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [paginationInfo, setPaginationInfo] = useState(() => ({
    totalPages: 1,
    limit: parseInt(localStorage.getItem('paginationLimit'), 10) || 10,
  }))

  const [initialFetchDone, setInitialFetchDone] = useState(false)

  useEffect(() => {
    localStorage.setItem('paginationLimit', paginationInfo.limit.toString())
  }, [paginationInfo.limit])

  useEffect(() => {
    getCustomers(currentPage, paginationInfo.limit, sizeFilter, industryFilter)
  }, [currentPage, paginationInfo.limit, sizeFilter, industryFilter])

  useEffect(() => {
    if (initialFetchDone && customers.length === 0) {
      setInputDisabled(true)
    } else {
      // setInputDisabled(false)
    }
  }, [initialFetchDone, customers])

  async function getCustomers(page, limit, sizeFilter, industryFilter) {
    try {
      const response = await fetch(`${serverURL}/customers?page=${page}&limit=${limit}&size=${sizeFilter}&industry=${industryFilter}`, { method: 'GET' })
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

  const inputChangeHandler = event => setName(event.target.value)

  const customerActionClickHandler = customer => {
    setCustomer(customer)
    setInputDisabled(true)
  }
  const customerDetailsBackButtonClickHandler = () => {
    setCustomer(null)
    setInputDisabled(false)
  }

  const limitChangeHandler = event => {
    const newLimit = parseInt(event.target.value, 10)
    setPaginationInfo(prevState => ({ ...prevState, limit: newLimit }))
    setCurrentPage(1)
  }

  const paginationPrevClickHandler = () =>
    setCurrentPage(prev => Math.max(prev - 1, 1))
  const paginationNextClickHandler = () =>
    setCurrentPage(prev => (prev < paginationInfo.totalPages ? prev + 1 : prev))

  const sizeFilterChangeHandler = event => {
    setSizeFilter(event.target.value)
    setCurrentPage(1)
  }

  const industryFilterChangeHandler = event => {
    setIndustryFilter(event.target.value)
    setCurrentPage(1)
  }

  return (
    <>
      <main className={styles.container}>
        <Header inputDisabled={inputDisabled} inputChangeHandler={inputChangeHandler} />
        {customer ? (
          <CustomerDetails customer={customer} onClick={customerDetailsBackButtonClickHandler} />
        ) : (
          <>
            <div className={styles.filtersContainer}>
              <SizeFilter size={sizeFilter} onChange={sizeFilterChangeHandler} />
              <IndustryFilter industry={industryFilter} onChange={industryFilterChangeHandler} />
            </div>
            <div data-testid='table' className={styles.tableContainer}>
              {initialFetchDone ? (
                customers.length ? (
                  <>
                    <Greeting name={name} />
                    <Table
                      customers={customers}
                      customerActionClickHandler={customerActionClickHandler}
                    />
                    <Pagination
                      currentPage={currentPage}
                      paginationInfo={paginationInfo}
                      onClickPrev={paginationPrevClickHandler}
                      onClickNext={paginationNextClickHandler}
                      onChange={limitChangeHandler}
                    />
                    <DownloadCSV customers={customers} />
                  </>
                ) : (
                  <EmptyState />
                )
              ) : <p id='loading'>Loading...</p>}
            </div>
          </>
        )}
        {!consent && (
          <CookieConsent
            giveConsentClickHandler={giveConsent}
            declineConsentClickHandler={declineConsent}
          />
        )}
      </main>
      <Messenger />
      <Footer />
    </>
  )
}

export default App
