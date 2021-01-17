import React from 'react';
import { render, beforeAllDefault} from 'test-utils';
// import '@testing-library/jest-dom/extend-expect';    // 이거 필요없는 듯?
import {screen, fireEvent} from '@testing-library/react';
//import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import {waitFor} from '@testing-library/dom';

import translationEn from 'language/translation/en.json';
import NavBar from './NavBar';

// import { StringLiteral } from 'typescript';

beforeAllDefault();

describe('<NavBar />', () => {

    /*
    it('matches snapshot', () => {
        const {container} = render(<Header />);
        expect(container).toMatchSnapshot();
    });
    */ 

    it.each(['Sports'])('open close each category', (name) => {

        render(<NavBar />);

        expect(screen.getByRole('button', {name: name}).getAttribute('aria-expanded')).toBe('false');

        fireEvent.click(screen.getByRole('button', {name: name}));
        expect(screen.getByRole('button', {name: name}).getAttribute('aria-expanded')).toBe('true');


        fireEvent.click(document.body);
        expect(screen.getByRole('button', {name: name}).getAttribute('aria-expanded')).toBe('false');


        fireEvent.click(screen.getByRole('button', {name: name}));
        expect(screen.getByRole('button', {name: name}).getAttribute('aria-expanded')).toBe('true');

        fireEvent.click(screen.getByRole('button', {name: name}));
        expect(screen.getByRole('button', {name: name}).getAttribute('aria-expanded')).toBe('false');
    });

});

// https://twitter.com/i/lists/create

// https://www.samdawson.dev/article/react-redux-use-selector-vs-connect
// https://itnext.io/how-existing-redux-patterns-compare-to-the-new-redux-hooks-b56134c650d2
// 테스팅 등으로 비교한 connect vs useSelector



/*

    it('open close each category', async () => {
        render(<NavBar />);

        expect(screen.getByRole('button', {name: 'Sports'}).getAttribute('aria-expanded')).toBe('false');

        fireEvent.click(screen.getByRole('button', {name: 'Sports'}));
        expect(screen.getByRole('button', {name: 'Sports'}).getAttribute('aria-expanded')).toBe('true');


        fireEvent.click(document.body);
        expect(screen.getByRole('button', {name: 'Sports'}).getAttribute('aria-expanded')).toBe('false');


        fireEvent.click(screen.getByRole('button', {name: 'Sports'}));
        expect(screen.getByRole('button', {name: 'Sports'}).getAttribute('aria-expanded')).toBe('true');

        fireEvent.click(screen.getByRole('button', {name: 'Sports'}));
        expect(screen.getByRole('button', {name: 'Sports'}).getAttribute('aria-expanded')).toBe('false');
    });


*/