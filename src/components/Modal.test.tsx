import React from 'react';
import { render} from 'test-utils';
// import '@testing-library/jest-dom/extend-expect';    // 이거 필요없는 듯?
import {screen, fireEvent} from '@testing-library/react';
//import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
// import * from '@testing-library/dom';

import translationEn from 'language/translation/en.json';
import Modal from './Modal';
// import Modal from './Modal';

// import { StringLiteral } from 'typescript';

/*
describe('<Modal />', () => {

    it('matches snapshot', () => {
        const {container} = render(<Modal />);
        expect(container).toMatchSnapshot();
    });

    
});
*/
