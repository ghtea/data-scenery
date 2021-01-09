import React from 'react';
import { render, fireEvent } from 'test-utils';
// import '@testing-library/jest-dom/extend-expect';    // 이거 필요없는 듯?

import LogIn from './LogIn';
import { StringLiteral } from 'typescript';


describe('<LogIn />', () => {


    it('matches snapshot', () => {
        const utils = render(<LogIn />);
        expect(utils.container).toMatchSnapshot();
    });

    it('shows the props correctly', () => {
        const utils = render(<LogIn />);
        fireEvent.change(utils.getByRole('image', { name: 'fancy image' }))

        // utils.getByRole('image', { name: 'fancy image' })
    });

});
