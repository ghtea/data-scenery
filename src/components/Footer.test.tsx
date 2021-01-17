import React from 'react';
import { render, beforeAllDefault} from 'test-utils';
// import '@testing-library/jest-dom/extend-expect';    // 이거 필요없는 듯?
import {screen, fireEvent} from '@testing-library/react';
//import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
// import * from '@testing-library/dom';

import translationEn from 'language/translation/en.json';
import Footer from './Footer';
// import Modal from './Modal';

// import { StringLiteral } from 'typescript';

beforeAllDefault();


describe('<Footer />', () => {

    it('matches snapshot', () => {
        const {container} = render(<Footer />);
        expect(container).toMatchSnapshot();
    });

    
});

