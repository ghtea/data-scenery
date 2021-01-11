import React from 'react';
import { render} from 'test-utils';
// import '@testing-library/jest-dom/extend-expect';    // 이거 필요없는 듯?
import {screen, fireEvent} from '@testing-library/react';
//import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
// import * from '@testing-library/dom';

import translationEn from 'language/translation/en.json';
import Header from './Header';
import { StringLiteral } from 'typescript';


describe('<Header />', () => {

    /*
    it('matches snapshot', () => {
        const {container} = render(<Header />);
        expect(container).toMatchSnapshot();
    });
    */ 

    /*
    it('check translations', () => {
        render(<Header />);
        screen.getByText(translationEn['Nav.LogIn']);
    });
    */
    
    it('open/close board', () => {
        render(<Header />);

        expect(screen.getByRole('button', {name: 'Open'})).toBeInTheDocument();
        expect(screen.queryByRole('button', {name: 'Close'})).not.toBeInTheDocument();
        expect(screen.getByRole('navigation', {name: 'Main Navigation'}) ).not.toHaveClass('display----flex');

        fireEvent.click(screen.getByRole('button', {name: 'Open'}));
        
        expect(screen.queryByRole('button', {name: 'Open'})).not.toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Close'})).toBeInTheDocument();
        expect(screen.getByRole('navigation', {name: 'Main Navigation'}) ).toHaveClass('display----flex');


        fireEvent.click(screen.getByRole('button', {name: 'Close'}));
        
        expect(screen.getByRole('button', {name: 'Open'})).toBeInTheDocument();
        expect(screen.queryByRole('button', {name: 'Close'})).not.toBeInTheDocument();
        expect(screen.getByRole('navigation', {name: 'Main Navigation'}) ).not.toHaveClass('display----flex');
    });
    
});
