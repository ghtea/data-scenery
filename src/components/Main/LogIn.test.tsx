import React from 'react';
import { render } from 'test-utils';
import '@testing-library/jest-dom/extend-expect';

import LogIn from './LogIn';
import { StringLiteral } from 'typescript';


describe('<LogIn />', () => {
    it('matches snapshot', () => {
        const utils = render(<LogIn />);
        expect(utils.container).toMatchSnapshot();
    });
});
