const SegmentFilter = ({ segment, onChange }) => {
  return (
    <div className="filter-container">
      <label htmlFor="segmentFilter">Filter by segment:</label>
      <select data-testid="segment-filter" id="segmentFilter" value={segment} onChange={onChange}>
        <option value="All">All</option>
        <option value="Logistics">Logistics</option>
        <option value="Retail">Retail</option>
        <option value="Technology">Technology</option>
        <option value="HR">HR</option>
        <option value="Finance">Finance</option>
      </select>
    </div>
  )
}

export default SegmentFilter
