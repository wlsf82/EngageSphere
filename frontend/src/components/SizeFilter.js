const SizeFilter = ({ sizeFilter, onChange }) => {
  return (
    <div className="filter-container">
      <label htmlFor="sizeFilter">Filter by size:</label>
      <select data-testid="filter" id="sizeFilter" value={sizeFilter} onChange={onChange}>
        <option value="">All</option>
        <option value="Small">Small</option>
        <option value="Medium">Medium</option>
        <option value="Big">Big</option>
      </select>
    </div>
  )
}

export default SizeFilter
