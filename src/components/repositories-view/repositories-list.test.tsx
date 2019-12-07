import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'
import RepositoriesList from './repositories-list';
import { RepositorySearchItem } from "../../model/interfaces";

test('empty repositories list', () => {
  const { getByText } = render(<RepositoriesList items={ [] }/>);
  const linkElement = getByText(/No respositories found/);
  expect(linkElement).toBeInTheDocument();
});

test('empty repositories list', () => {
  const item: RepositorySearchItem = {
    id: 12123,
    name: 'super-repo',
    full_name: 'victor/super-repo',
    owner: {
      id: 23234,
      login: 'victor',
    },
  };
  const { queryByText } = render(
      <Router>
        <RepositoriesList items={ [item] }/>
      </Router>
  );
  const linkElement = queryByText(/No respositories found/);

  expect(linkElement).not.toBeInTheDocument();
  expect(queryByText(item.owner.login)).toBeInTheDocument();
  expect(queryByText(item.full_name)).toBeInTheDocument();
});
