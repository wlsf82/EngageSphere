const Greeting = ({ name }) => {
  return (
    <>
      <p>Hi <b>{name || 'there'}</b>! It is now <b>{new Date().toDateString()}</b>.</p>
      <p>Below is our customer list.</p>
      <p>Click on each of them to view their contact details.</p>
    </>
  )
}

export default Greeting
