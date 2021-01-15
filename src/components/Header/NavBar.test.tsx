import React from 'react';
import { render} from 'test-utils';
// import '@testing-library/jest-dom/extend-expect';    // 이거 필요없는 듯?
import {screen, fireEvent} from '@testing-library/react';
//import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import {waitFor} from '@testing-library/dom';

import translationEn from 'language/translation/en.json';
import NavBar from './NavBar';

// import { StringLiteral } from 'typescript';


describe('<NavBar />', () => {

    /*
    it('matches snapshot', () => {
        const {container} = render(<Header />);
        expect(container).toMatchSnapshot();
    });
    */ 

    it('open close each category', async () => {
        render(<NavBar />);

        fireEvent.click(screen.getByRole('button', {name: 'Sports'}));
        ["disabled"]

        expect(screen.getByRole('button', {name: 'Sports'}).toHaveAttribute('aria-expanded', 'true');

        fireEvent.click(screen.getByRole('navigation', {name: 'Main Navigation Bar'}));
        
        expect(screen.queryByRole('menu', {name: 'Sports'})).not.toBeInTheDocument();
    });

    
});


// https://twitter.com/i/lists/create

// https://www.samdawson.dev/article/react-redux-use-selector-vs-connect
// https://itnext.io/how-existing-redux-patterns-compare-to-the-new-redux-hooks-b56134c650d2
// 테스팅 등으로 비교한 connect vs useSelector