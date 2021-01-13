import React from 'react';
import { render } from 'test-utils';
import {screen, fireEvent} from '@testing-library/react';

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
