import App from './App'
import { render, screen } from '@testing-library/react'  

it('renders the "main" app elements', () => {
  render(<App />)
  expect(screen.getByText('EngageSphere')).toBeInTheDocument()
  expect(screen.getByTestId('name')).toBeInTheDocument()
  expect(screen.getByTestId('filter')).toBeInTheDocument()
  expect(screen.getByTestId('footer')).toBeInTheDocument()
})
