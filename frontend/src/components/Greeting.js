const Greeting = ({ name }) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  const today = new Date()
  return (
    <>
      <p>Hi <b>{name || 'there'}</b>! It is now <b>{today.toLocaleDateString("en-US", options)}</b>.</p>
      <p>Below is our customer list.</p>
      <p>Click on the <strong>View</strong> button of each of them to see their contact details.</p>
    </>
  )
}

export default Greeting
