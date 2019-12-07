import React from 'react';
import { render } from '@testing-library/react';
import RepositoriesList from './repositories-list';

test('renders learn react link', () => {
  const { getByText } = render(<RepositoriesList items={ [] }/>);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
