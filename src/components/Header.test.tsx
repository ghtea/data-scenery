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

        const test =screen.getByRole('button', {name: 'Close'});
        expect(test).toBeNull();
        expect(screen.getByRole('navigation', {name: 'Main Navigation'})).toBeNull()

        fireEvent.click(screen.getByRole('button', {name: 'Open'}));
        
        expect(screen.getByRole('button', {name: 'Open'})).toBeNull()
        expect(screen.getByRole('button', {name: 'Close'})).toBeInTheDocument();
        expect(screen.getByRole('navigation', {name: 'Main Navigation'})).toBeInTheDocument();


        fireEvent.click(screen.getByRole('button', {name: 'Close'}));
        
        expect(screen.getByRole('button', {name: 'Open'})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Close'})).toBeNull()
        expect(screen.getByRole('navigation', {name: 'Main Navigation'})).toBeNull()

    });
    
});
