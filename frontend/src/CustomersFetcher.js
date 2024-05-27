import DownloadCSV from './components/DownloadCSV'
import EmptyState from './components/EmptyState'
import Greeting from './components/Greeting'
import Pagination from './components/Pagination'
import SizeFilter from './components/SizeFilter'
import Table from './components/Table'

function CustomersFetcher({
  sizeFilter,
  filterChangeHandler,
  initialFetchDone,
  customers,
  name,
  customerClickHandler,
  currentPage,
  paginationInfo,
  paginationNextClickHandler,
  paginationPrevClickHandler,
  limitChangeHandler
}) {
  return (
    <>
      <SizeFilter sizeFilter={sizeFilter} onChange={filterChangeHandler} />
      <div data-testid="table" className="table-container">
        {initialFetchDone ? (
          customers.length ? (
            <>
              <Greeting name={name} />
              <Table
                customers={customers}
                customerClickHandler={customerClickHandler}
              />
              <Pagination
                currentPage={currentPage}
                paginationInfo={paginationInfo}
                onClickPrev={paginationPrevClickHandler}
                onClickNext={paginationNextClickHandler}
                onChange={limitChangeHandler}
              />
              <div className="download-csv-button-container">
                <DownloadCSV customers={customers} />
              </div>
            </>
          ) : (
            <EmptyState />
          )
        ) : <p id="loading">Loading...</p>}
      </div>
    </>
  )
}

export default CustomersFetcher
