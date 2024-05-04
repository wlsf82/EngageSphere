import PropTypes from 'prop-types'
export default PropTypes

export const customerShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  employees: PropTypes.number.isRequired,
  size: PropTypes.string.isRequired,
  contactInfo: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  address: PropTypes.shape({
    street: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zipCode: PropTypes.string,
    country: PropTypes.string,
  })
})

export const paginationShape = PropTypes.shape({
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  totalCustomers: PropTypes.number.isRequired,
})

export const currentPagePropType = PropTypes.number.isRequired

export const onClickPropType = PropTypes.func.isRequired

export const onChangePropType = PropTypes.func.isRequired

export const namePropType = PropTypes.string

export const sizeFilterPropType = PropTypes.string.isRequired
