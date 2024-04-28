const DownloadCSVButton = ({ customers }) => {
  function convertArrayToCSV(data) {
    const csvRows = []
    const headers = Object.keys(data[0])
    csvRows.push(headers.join(',')) // Add heading to CSV

    for (const row of data) {
      const values = headers.map(header => {
        const escaped = ('' + row[header]).replace(/"/g, '\\"') // Escape double quotes
        return `"${escaped}"` // Ensure each field has double quotes
      })
      csvRows.push(values.join(','))
    }

    return csvRows.join('\n')
  }

  function downloadCSV(data) {
    const blob = new Blob([data], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.setAttribute('hidden', '')
    a.setAttribute('href', url)
    a.setAttribute('download', 'customers.csv')
    a.click()
    window.URL.revokeObjectURL(url)
    a.remove()
  }

  const exportCustomersToCSVHandler = () => {
    const customerData = customers.map(customer => {
      const { name, employees, size, contactInfo, address } = customer
      const dataRow = {
        Company_Name: name,
        Number_of_Employees: employees,
        Size: size,
        Contact_Name: contactInfo?.name || '',
        Contact_Email: contactInfo?.email || '',
        Street: address?.street || '',
        City: address?.city || '',
        State: address?.state || '',
        Zip_Code: address?.zipCode || '',
        Country: address?.country || ''
      }
      return dataRow
    })

    const csvData = convertArrayToCSV(customerData)
    downloadCSV(csvData)
  }

  return <button className="download-csv-button" onClick={exportCustomersToCSVHandler}>Download CSV</button>
}

export default DownloadCSVButton
