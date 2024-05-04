import React from 'react'
import {
  currentPagePropType,
  paginationShape,
  onClickPropType,
  onChangePropType
} from '../propTypes'

const Pagination = ({
  currentPage,
  paginationInfo,
  onClickPrev,
  onClickNext,
  onChange
}) => {
  return (
    <div data-testid="pagination" className="pagination">
      <button onClick={onClickPrev} disabled={currentPage === 1}>Prev</button>
      <span>Page {currentPage} of {paginationInfo.totalPages}</span>
      <button onClick={onClickNext} disabled={currentPage === paginationInfo.totalPages}>Next</button>
      <select onChange={onChange} value={paginationInfo.limit} aria-label="Pagination limit">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    </div>
  )
}

Pagination.propTypes = {
  currentPage: currentPagePropType,
  onClickPrev: onClickPropType,
  onClickNext: onClickPropType,
  onChange: onChangePropType,
  paginationInfo: paginationShape
}

export default Pagination
