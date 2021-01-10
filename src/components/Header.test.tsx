import React from 'react';
import { render} from 'test-utils';
// import '@testing-library/jest-dom/extend-expect';    // 이거 필요없는 듯?
import {screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import * from '@testing-library/dom';

import Header from './Header';
import { StringLiteral } from 'typescript';


describe('<Header />', () => {


    it('matches snapshot', () => {
        const {container} = render(<Header />);
        expect(container).toMatchSnapshot();
    });

    it('open board', () => {
        render(<Header />);
        fireEvent.change(screen.getByRole('button', { name: 'fancy image' }))

        // utils.getByRole('image', { name: 'fancy image' })
    });

});
