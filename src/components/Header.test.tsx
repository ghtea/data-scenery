import React from 'react';
import { render} from 'test-utils';
// import '@testing-library/jest-dom/extend-expect';    // 이거 필요없는 듯?
import {screen, fireEvent} from '@testing-library/react';
//import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
// import * from '@testing-library/dom';

import translationEn from 'language/translation/en.json';
import Header from './Header';
import Modal from './Modal';

import { StringLiteral } from 'typescript';


describe('<Header />', () => {

    /*
    it('matches snapshot', () => {
        const {container} = render(<Header />);
        expect(container).toMatchSnapshot();
    });
    */ 

    it('open/close board', () => {
        render(<Header />);

        expect(screen.getByRole('button', {name: 'Open Board'})).toBeInTheDocument();
        expect(screen.queryByRole('button', {name: 'Close Board'})).not.toBeInTheDocument();
        expect(screen.getByRole('navigation', {name: 'Main Navigation'}) ).not.toHaveClass('display----flex');

        fireEvent.click(screen.getByRole('button', {name: 'Open Board'}));
        
        expect(screen.queryByRole('button', {name: 'Open Board'})).not.toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Close Board'})).toBeInTheDocument();
        expect(screen.getByRole('navigation', {name: 'Main Navigation'}) ).toHaveClass('display----flex');


        fireEvent.click(screen.getByRole('button', {name: 'Close Board'}));
        
        expect(screen.getByRole('button', {name: 'Open Board'})).toBeInTheDocument();
        expect(screen.queryByRole('button', {name: 'Close Board'})).not.toBeInTheDocument();
        expect(screen.getByRole('navigation', {name: 'Main Navigation'}) ).not.toHaveClass('display----flex');
    });


    it('open setting', () => {
        render(<Header />);
        
        fireEvent.click( screen.getByRole('button', {name: 'Open Setting'}) );
        
        render(<Modal />);

        expect(screen.getByRole('dialog', {name: translationEn['Modal.Setting_Title']})).toBeInTheDocument();

    });
    
});


// https://twitter.com/i/lists/create

// https://www.samdawson.dev/article/react-redux-use-selector-vs-connect
// https://itnext.io/how-existing-redux-patterns-compare-to-the-new-redux-hooks-b56134c650d2
// 테스팅 등으로 비교한 connect vs useSelector