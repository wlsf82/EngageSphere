import styles from './Pagination.module.css'

const Pagination = ({
  currentPage,
  paginationInfo,
  onClickPrev,
  onClickNext,
  onChange
}) => {
  return (
    <div data-testid="pagination" className={styles.container}>
      <button onClick={onClickPrev} disabled={currentPage === 1}>Prev</button>
      <span>Page {currentPage} of {paginationInfo.totalPages}</span>
      <button onClick={onClickNext} disabled={currentPage === paginationInfo.totalPages}>Next</button>
      <select onChange={onChange} value={paginationInfo.limit} aria-label="Pagination limit" name="pagination-limit">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    </div>
  )
}

export default Pagination
