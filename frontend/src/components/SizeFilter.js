import React from 'react'
import { sizeFilterPropType, onChangePropType } from '../propTypes'

const SizeFilter = ({ sizeFilter, onChange }) => {
  return (
    <div className="filter-container">
      <label htmlFor="sizeFilter">Filter by size:</label>
      <select data-testid="filter" id="sizeFilter" value={sizeFilter} onChange={onChange}>
        <option value="All">All</option>
        <option value="Small">Small</option>
        <option value="Medium">Medium</option>
        <option value="Enterprise">Enterprise</option>
        <option value="Large Enterprise">Large Enterprise</option>
        <option value="Very Large Enterprise">Very Large Enterprise</option>
      </select>
    </div>
  )
}

SizeFilter.propTypes = {
  sizeFilter: sizeFilterPropType,
  onChange: onChangePropType,
}

export default SizeFilter
