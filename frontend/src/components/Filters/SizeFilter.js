import styles from './Filter.module.css'

const SizeFilter = ({ size, onChange }) => {
  return (
    <div className={styles.container}>
      <label htmlFor="sizeFilter">Filter by size:</label>
      <select data-testid="size-filter" id="sizeFilter" value={size} onChange={onChange}>
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

export default SizeFilter
