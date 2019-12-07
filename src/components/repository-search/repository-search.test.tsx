import React from 'react'
import { render, fireEvent, waitForElement } from '@testing-library/react'

import RepositorySearchComponent from './repository-search-component';

const placeholder = 'Enter repository name';

test('loads and uses passed repository', async () => {
    const { getByPlaceholderText } = render(
        <RepositorySearchComponent
            searchedRepo="victor"
            onChange={ () => {} }/>);

    let input = getByPlaceholderText(placeholder);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('value', 'victor');

    const newRepoValue = 'my - repo';

    fireEvent.change(getByPlaceholderText(placeholder), { target: { value: newRepoValue } });

    input = await waitForElement(() => getByPlaceholderText(placeholder));

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('value', newRepoValue);
});
