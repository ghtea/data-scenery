import React from 'react';
import { render} from 'test-utils';
// import '@testing-library/jest-dom/extend-expect';    // 이거 필요없는 듯?
import {screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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


            const buttonOpen = screen.getByRole('button', {name: 'Open'});
        expect(buttonOpen).toBeInTheDocument();

        fireEvent.click(buttonOpen);

            const buttonClose = screen.getByRole('button', {name: 'Close'});
        expect(buttonClose).toBeInTheDocument();

            const navigationMain = screen.getByRole('navigation', {name: 'Main Navigation'});
        expect(navigationMain).toBeInTheDocument();


        fireEvent.click(screen.getByRole('button', {name: 'Close'}));


        screen.getByRole('button', {name: 'Open'});
        // utils.getByRole('image', { name: 'fancy image' })
    });
    
});
