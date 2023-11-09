import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Components/Home'

test('renders learn react link', () => {
  render(<Home user={{}} setUser={() => {}} />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
