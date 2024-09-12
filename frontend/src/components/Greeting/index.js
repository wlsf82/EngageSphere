import styles from './Greeting.module.css'

const Greeting = ({ name }) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  const today = new Date()
  return (
    <div className={styles.container}>
      <h2>Hi {name || 'there'}! It is {today.toLocaleDateString("en-US", options)}.</h2>
      <p>Below is our customer list.</p>
      <p>Click on the <strong>View</strong> button of each of them to see their contact details.</p>
    </div>
  )
}

export default Greeting
