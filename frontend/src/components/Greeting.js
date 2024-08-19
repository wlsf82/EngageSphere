const Greeting = ({ name }) => {
  return (
    <>
      <p>Hi <b>{name || 'there'}</b>! It is now <b>{new Date().toDateString()}</b>.</p>
      <p>Below is our customer list.</p>
      <p>Click on the <strong>View</strong> button of each of them to see their contact details.</p>
    </>
  )
}

export default Greeting
