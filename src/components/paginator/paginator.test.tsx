import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

import Paginator from './paginator';
import { Pagination } from '../../model/interfaces';


test('renders emtpy Paginator when no params passed', async () => {
    const pagination: Pagination = {

    };
    const searchedRepo = 'victor';
    const { queryAllByText } = render(
        <Paginator searchedRepo={ searchedRepo} pagination={ pagination }/>);

    const links = queryAllByText(/first|prev|next|last/);
    expect(links.length).toEqual(0);
});

test('renders links Paginator when params passed', async () => {
    const pagination: Pagination = {
        first: '1',
        prev: '2',
        next: '4',
        last: '22',
    };

    const searchedRepo = 'victor';
    const { queryAllByText, getByText } = render(
        <Router>
            <Paginator searchedRepo={ searchedRepo} pagination={ pagination }/>
        </Router>
        );

    const links = queryAllByText(/first|prev|next|last/);
    expect(links.length).toEqual(4);

    const firstLink = getByText('<< first');
    const prevLink = getByText('< prev');
    const nextLink = getByText('next >');
    const lastLink = getByText('last >>');

    expect(firstLink).toHaveAttribute('href', `/?repo=victor&page=${pagination.first}`);
    expect(prevLink).toHaveAttribute('href', `/?repo=victor&page=${pagination.prev}`);
    expect(nextLink).toHaveAttribute('href', `/?repo=victor&page=${pagination.next}`);
    expect(lastLink).toHaveAttribute('href', `/?repo=victor&page=${pagination.last}`);
});
