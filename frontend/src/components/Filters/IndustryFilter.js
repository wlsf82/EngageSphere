import styles from './Filter.module.css'

const IndustryFilter = ({ industry, onChange }) => {
  return (
    <div className={styles.container}>
      <label htmlFor="industryFilter">Filter by industry:</label>
      <select data-testid="industry-filter" id="industryFilter" value={industry} onChange={onChange}>
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

export default IndustryFilter
